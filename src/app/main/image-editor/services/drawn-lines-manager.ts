import { Coordinate, LineDrawAction, LineStyle, Resolution } from "./line-draw-action";

export class DrawnLinesManager {
    private drawnLines: LineDrawAction[] = [];
    private undoneDrawnLines: LineDrawAction[] = [];
    private activeDrawingLine: LineDrawAction;


    startNewLine(lineStart: Coordinate, resolution: Resolution, style: LineStyle) {
        this.activeDrawingLine = new LineDrawAction(lineStart, resolution, style);
    }

    addLineSegmentToActiveLine(lineCoordinates: Coordinate) {
        this.activeDrawingLine.addLineSegment(lineCoordinates);
    }

    commitActiveLine() {
        if (this.activeDrawingLine.hasLineSegments()) {
            this.drawnLines.push(this.activeDrawingLine);
        }
    }

    undo() {
        const action = this.drawnLines.pop();
        if (action !== undefined) {
            this.undoneDrawnLines.push(action);
            return true;
        }
        return false;
    }

    redo() {
        const action = this.undoneDrawnLines.pop();
        if (action !== undefined) {
            this.drawnLines.push(action);
            return true;
        }
        return false;
    }

    getDrawnLines(): LineDrawAction[] { return this.drawnLines; }
    getActiveLine(): LineDrawAction { return this.activeDrawingLine; }
}