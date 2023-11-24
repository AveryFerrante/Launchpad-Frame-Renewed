import { from, fromEvent, merge, Observable, of, Subscription } from 'rxjs';
import { concatMap, delay, finalize, map, mergeMap, switchMap, take, takeUntil, tap } from 'rxjs/operators';
import { DrawnLinesManager } from './drawn-lines-manager';
import { Coordinate, LineDrawAction, LineStyle, Resolution } from './line-draw-action';



class CanvasDrawingOrchestrator {
    private renderingContext: CanvasRenderingContext2D;
    private currentLineStyle: LineStyle;
    private drawnLinesManager: DrawnLinesManager = new DrawnLinesManager();

    private drawingListenerSubscription: Subscription;
    private windowResizeListenerSubscription: Subscription;
    constructor(private canvasElement: HTMLCanvasElement, private image: HTMLImageElement, initialLineStyle: LineStyle) {
        this.renderingContext = canvasElement.getContext('2d', { alpha: false });
        this.drawingListenerSubscription = this.initializeDrawingListener().subscribe();
        this.windowResizeListenerSubscription = this.initializeWindowResizeListener().subscribe();
        this.currentLineStyle = { ...initialLineStyle };
        this.displayImageOnCanvas();
    }

    deactivate() {
        this.drawingListenerSubscription.unsubscribe();
        this.windowResizeListenerSubscription.unsubscribe();
    }

    setLineStyle(lineStyle: LineStyle) {
        this.currentLineStyle = lineStyle;
    }

    undoLastDrawAction() {
        if (this.drawnLinesManager.undo()) {
            this.displayImageOnCanvas();
        }
    }

    redoLastDrawAction() {
        if (this.drawnLinesManager.redo()) {
            this.displayImageOnCanvas();
        }
    }

    saveImage(): Observable<File> {
        const tempCanvas: HTMLCanvasElement = document.createElement('canvas');
        const tempRenderingContext = tempCanvas.getContext('2d');

        tempCanvas.width = this.image.naturalWidth;
        tempCanvas.height = this.image.naturalHeight;
        tempRenderingContext.drawImage(this.image, 0, 0);
        this.drawLinesToScale(tempCanvas, tempRenderingContext);


        return from(fetch(tempCanvas.toDataURL('image/png'))).pipe(
            mergeMap((response: Response) => response.arrayBuffer()),
            take(1),
            map((arrayBuffer: ArrayBuffer) => new File([arrayBuffer], 'edited-image', { type: 'image/png' }))
        );
    }

    private initializeDrawingListener(): Observable<Coordinate> {
        const drawStart$ = this.configureEventListenersFor(['mousedown', 'touchstart']);
        const drawMove$ = this.configureEventListenersFor(['mousemove', 'touchmove']);
        const drawEnd$ = this.configureEventListenersFor(['mouseup', 'touchend']);

        return drawStart$.pipe(
            tap((drawStartCoordinates: Coordinate) => {
                let resolution: Resolution = { width: this.canvasElement.width, height: this.canvasElement.height };
                this.drawnLinesManager.startNewLine(drawStartCoordinates, resolution, { ...this.currentLineStyle });
                this.initializeLineStart(this.canvasElement, this.renderingContext, this.drawnLinesManager.getActiveLine());
            }),
            concatMap(() => drawMove$.pipe(takeUntil(drawEnd$), finalize(() => this.drawnLinesManager.commitActiveLine()))),
            tap((drawLineEvent: Coordinate) => {
                this.drawnLinesManager.addLineSegmentToActiveLine(drawLineEvent);
                this.drawLine(this.renderingContext, drawLineEvent);
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

    private drawLinesToScale(canvasElement: HTMLCanvasElement, renderingContext: CanvasRenderingContext2D) {
        let resolution: Resolution = { width: canvasElement.width, height: canvasElement.height };
        this.drawnLinesManager.getDrawnLines().forEach(drawnLine => {
            this.initializeLineStart(canvasElement, renderingContext, drawnLine);
            drawnLine.getLineSegmentsForResolution(resolution).forEach(lineSegment => this.drawLine(renderingContext, lineSegment));
        });
    }

    private drawLine(renderingContext: CanvasRenderingContext2D, coordinates: Coordinate) {
        renderingContext.lineTo(coordinates.x, coordinates.y);
        renderingContext.stroke();
    }

    private initializeLineStart(canvasElement: HTMLCanvasElement, renderingContext: CanvasRenderingContext2D, lineDrawAction: LineDrawAction) {
        const lineStyle = lineDrawAction.getLineStyleForResolution({ width: canvasElement.width, height: canvasElement.height });
        this.setRenderingContextLineStyle(renderingContext, lineStyle);
        renderingContext.beginPath();
        let coordinates = lineDrawAction.getLineStartForResolution({ width: canvasElement.width, height: canvasElement.height });
        renderingContext.moveTo(coordinates.x, coordinates.y);
    }

    private setRenderingContextLineStyle(renderingContext: CanvasRenderingContext2D, lineStyle: LineStyle) {
        renderingContext.strokeStyle = lineStyle.color;
        renderingContext.lineWidth = lineStyle.size;
        renderingContext.lineCap = 'round';
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
        this.drawLinesToScale(this.canvasElement, this.renderingContext);
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