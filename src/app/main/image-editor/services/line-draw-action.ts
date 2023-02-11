interface Coordinate {
    x: number,
    y: number
};

interface Resolution {
    width: number;
    height: number;
};

interface LineStyle {
    color: string;
    size: number;
}

class LineDrawAction {
    private lineStart: Coordinate;
    private lineSegments: Coordinate[];
    private originalResolution: Resolution;
    private lineStyle: LineStyle;

    constructor(lineStart: Coordinate, originalResolution: Resolution, lineStyle: LineStyle) {
        this.lineStart = lineStart;
        this.originalResolution = originalResolution;
        this.lineStyle = lineStyle;
        this.lineSegments = [];
    }

    addLineSegment(lineSegment: Coordinate) {
        this.lineSegments.push(lineSegment);
    }

    getLineStartForResolution(resolution: Resolution): Coordinate {
        return {
            x: resolution.width * (this.lineStart.x / this.originalResolution.width),
            y: resolution.height * (this.lineStart.y / this.originalResolution.height)
        };
    }

    getLineSegmentsForResolution(resolution: Resolution): Coordinate[] {
        return this.lineSegments.map(lineSegment => {
            return {
                x: resolution.width * (lineSegment.x / this.originalResolution.width),
                y: resolution.height * (lineSegment.y / this.originalResolution.height) 
            };
        });
    }

    getLineStyle(): LineStyle { return this.lineStyle; }
};

export { Coordinate, Resolution, LineStyle, LineDrawAction };