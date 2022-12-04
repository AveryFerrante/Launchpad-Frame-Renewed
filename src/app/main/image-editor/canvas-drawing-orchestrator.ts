import { fromEvent, merge, Observable } from 'rxjs';
import { concatMap, finalize, map, takeUntil, tap } from 'rxjs/operators';

type Coordinate = {
    x: number,
    y: number
};

interface LineDrawAction {
    moveTo: Coordinate;
    lineTo: Coordinate[]
}

class CanvasDrawingOrchestrator {
    private canvasElement: HTMLCanvasElement;
    private drawnLinesTracker: LineDrawAction[] = [];
    constructor(canvasElement: HTMLCanvasElement) {
        this.canvasElement = canvasElement;
    }

    enableImageDrawing() {
        const drawStart$ = this.configureEventListenersFor(['mousedown', 'touchstart']);
        const drawMove$ = this.configureEventListenersFor(['mousemove', 'touchmove']);
        const drawEnd$ = this.configureEventListenersFor(['mouseup', 'touchend']);

        const renderingContext = this.canvasElement.getContext('2d');
        drawStart$.pipe(
            tap((drawStartEvent) => this.drawnLinesTracker.push(this.initializeLine(renderingContext, drawStartEvent))),
            concatMap(() => drawMove$.pipe(takeUntil(drawEnd$), finalize(() => console.log(this.drawnLinesTracker)))),
            tap((drawLineEvent) => { this.drawnLinesTracker[this.drawnLinesTracker.length - 1].lineTo.push(drawLineEvent); this.drawLine(renderingContext, drawLineEvent); })
        ).subscribe();
    }

    redrawLines(oldWidth: number, oldHeight: number) {
        let renderingContext = this.canvasElement.getContext('2d');
        let widthScaleChangeFactor = this.canvasElement.width / oldWidth;
        let heightScaleChangeFactor = this.canvasElement.height / oldHeight;
        this.drawnLinesTracker.forEach(drawnLine => {
            drawnLine.moveTo = { x: widthScaleChangeFactor > 1 ? drawnLine.moveTo.x / widthScaleChangeFactor : drawnLine.moveTo.x * widthScaleChangeFactor,
                                 y: heightScaleChangeFactor > 1 ? drawnLine.moveTo.y / heightScaleChangeFactor : drawnLine.moveTo.y * heightScaleChangeFactor }
            this.initializeLine(renderingContext, drawnLine.moveTo);
            drawnLine.lineTo.forEach(lineTo => { 
                lineTo = { x: widthScaleChangeFactor > 1 ? lineTo.x / widthScaleChangeFactor : lineTo.x * widthScaleChangeFactor,
                                 y: heightScaleChangeFactor > 1 ? lineTo.y / heightScaleChangeFactor : lineTo.y * heightScaleChangeFactor }
                this.drawLine(renderingContext, lineTo)
            })
        });
    }

    private drawLine(renderingContext: CanvasRenderingContext2D, coordinates: Coordinate) {
        renderingContext.lineTo(coordinates.x, coordinates.y);
        renderingContext.stroke();
    }

    private initializeLine(renderingContext: CanvasRenderingContext2D, coordinates: Coordinate): LineDrawAction {
        renderingContext.beginPath();
        renderingContext.fillStyle = "#A80B25";
        renderingContext.lineCap = 'round';
        renderingContext.lineWidth = 8;
        renderingContext.moveTo(coordinates.x, coordinates.y);
        return { moveTo: coordinates, lineTo: [] };
    }

    private configureEventListenersFor(eventNames: string[]): Observable<Coordinate> {
        let toCanvasCoordinates$ = eventNames.map(eventName => fromEvent(this.canvasElement, eventName).pipe(map(this.eventToCanvasCoordinate)));
        return merge(...toCanvasCoordinates$)
    }

    private eventToCanvasCoordinate(event: Event) {
        let castedEvent: MouseEvent | Touch = event instanceof MouseEvent ? (event as MouseEvent) : (event as TouchEvent).changedTouches[0];
        return {
            x: castedEvent.clientX - (event.target as HTMLCanvasElement).offsetLeft,
            y: castedEvent.clientY - (event.target as HTMLCanvasElement).offsetTop
        }
    }
}

export { CanvasDrawingOrchestrator }