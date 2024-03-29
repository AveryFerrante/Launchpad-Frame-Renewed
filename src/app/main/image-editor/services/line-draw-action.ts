import { environment } from "src/environments/environment";

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

    hasLineSegments(): boolean {
        return this.lineSegments.length > 0;
    }

    addLineSegment(lineSegment: Coordinate) {
        this.lineSegments.push(lineSegment);
    }

    getLineStartForResolution(resolution: Resolution): Coordinate {
        return this.scaleLineCoordinatesForResolution(resolution, this.lineStart);
    }

    getLineSegmentsForResolution(resolution: Resolution): Coordinate[] {
        return this.lineSegments.map(lineSegment => this.scaleLineCoordinatesForResolution(resolution, lineSegment));
    }

    private scaleLineCoordinatesForResolution(newResolution: Resolution, lineCoordinates: Coordinate): Coordinate {
        return {
            x: Math.floor(newResolution.width * (lineCoordinates.x / this.originalResolution.width)),
            y: Math.floor(newResolution.height * (lineCoordinates.y / this.originalResolution.height))
        }
    }

    getLineStyleForResolution(resolution: Resolution): LineStyle {
        // TODO: Maybe base the size change only on the width ratio change? (i.e. picture gets thicker so line gets thicker, but height doesnt matter?)
        const ratioChange = (resolution.width * resolution.height) / (this.originalResolution.width * this.originalResolution.height);
        return {
            color: this.lineStyle.color,
            size: this.clampWithinConfiguredBrushSizeRange(this.lineStyle.size * ratioChange)
        };
    }

    private clampWithinConfiguredBrushSizeRange(value: number): number {
        return Math.min(Math.max(value, environment.imageEditingProperties.minBrushSize), environment.imageEditingProperties.maxBrushSize);
    }
};

export { Coordinate, Resolution, LineStyle, LineDrawAction };