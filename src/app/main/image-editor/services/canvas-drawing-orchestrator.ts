import { fromEvent, merge, Observable, of, Subscription } from 'rxjs';
import { concatMap, delay, finalize, map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { Coordinate, LineDrawAction, LineStyle, Resolution } from './line-draw-action';



class CanvasDrawingOrchestrator {
    private image: HTMLImageElement;
    private renderingContext: CanvasRenderingContext2D;
    private drawnLinesTracker: LineDrawAction[] = [];
    private currentLineStyle: LineStyle;

    private drawingListenerSubscription: Subscription;
    private windowResizeListenerSubscription: Subscription;
    constructor(private canvasElement: HTMLCanvasElement, image: HTMLImageElement) {
        this.renderingContext = canvasElement.getContext('2d');
        this.image = image;
        this.drawingListenerSubscription = this.initializeDrawingListener().subscribe();
        this.windowResizeListenerSubscription = this.initializeWindowResizeListener().subscribe();
        this.displayImageOnCanvas();
        this.currentLineStyle = { color: 'rgba(100, 100, 100, 0.5)', size: 8 };
    }

    deactivate() {
        this.drawingListenerSubscription.unsubscribe();
        this.windowResizeListenerSubscription.unsubscribe();
    }

    private initializeDrawingListener(): Observable<Coordinate> {
        const drawStart$ = this.configureEventListenersFor(['mousedown', 'touchstart']);
        const drawMove$ = this.configureEventListenersFor(['mousemove', 'touchmove']);
        const drawEnd$ = this.configureEventListenersFor(['mouseup', 'touchend']);

        return drawStart$.pipe(
            tap((drawStartCoordinates: Coordinate) => {
                let resolution: Resolution = { width: this.canvasElement.width, height: this.canvasElement.height };
                let drawAction = new LineDrawAction(drawStartCoordinates, resolution, this.currentLineStyle);
                this.initializeLineStart(drawAction);
                this.drawnLinesTracker.push(drawAction);
            }),
            concatMap(() => drawMove$.pipe(takeUntil(drawEnd$))),
            tap((drawLineEvent: Coordinate) => {
                this.drawnLinesTracker[this.drawnLinesTracker.length - 1].addLineSegment(drawLineEvent);
                this.drawLine(drawLineEvent);
            })
        );
    }

    private initializeWindowResizeListener(): Observable<UIEvent> {
        return fromEvent(window, 'resize').pipe(
            this.ensureResizeIsCompleted(),
            tap(() => this.displayImageOnCanvas())
        );
    }

    private ensureResizeIsCompleted() {
        return switchMap((event: UIEvent) => of(event).pipe(delay(100)));
    }

    private drawLinesToScale() {
        let resolution: Resolution = { width: this.canvasElement.width, height: this.canvasElement.height };
        this.drawnLinesTracker.forEach(drawnLine => {
            this.initializeLineStart(drawnLine);
            drawnLine.getLineSegmentsForResolution(resolution).forEach(lineSegment => this.drawLine(lineSegment));
        });
    }

    private drawLine(coordinates: Coordinate) {
        this.renderingContext.lineTo(coordinates.x, coordinates.y);
        this.renderingContext.stroke();
    }

    private initializeLineStart(lineDrawAction: LineDrawAction) {
        this.renderingContext.beginPath();
        this.renderingContext.strokeStyle = lineDrawAction.getLineStyle().color;
        this.renderingContext.lineCap = 'round';
        this.renderingContext.lineWidth = lineDrawAction.getLineStyle().size;
        let coordinates = lineDrawAction.getLineStartForResolution({ width: this.canvasElement.width, height: this.canvasElement.height });
        this.renderingContext.moveTo(coordinates.x, coordinates.y);
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

    private displayImageOnCanvas() {
        this.renderingContext.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
        this.resizeCanvas();
        this.renderingContext.drawImage(this.image, 0, 0, this.image.naturalWidth, this.image.naturalHeight, 0, 0, this.canvasElement.width, this.canvasElement.height);
        this.drawLinesToScale();
    }

    private resizeCanvas() {
        let hRatio = window.innerWidth / this.image.naturalWidth;
        let vRatio = window.innerHeight / this.image.naturalHeight;
        let ratio = Math.min(hRatio, vRatio);
        this.canvasElement.width = this.image.naturalWidth * ratio;
        this.canvasElement.height = this.image.naturalHeight * ratio;
    }
}

export { CanvasDrawingOrchestrator }