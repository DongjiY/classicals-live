import { CoordinateObject } from "./CoordinateObject";
import { Coordinate } from "./SeatingCanvas";

export type ShapeType = "CIRC" | "RECT";

type Opts = {
  color: string;
  size: number;
};

export class Shape extends CoordinateObject {
  public type: ShapeType;
  public color: string = "#000000";
  public size: number = 150;

  constructor(type: ShapeType, options: Opts, x?: number, y?: number) {
    super(x, y);

    this.type = type;
    this.color = options.color;
    this.size = options.size;
  }

  containsPoint(pos: Coordinate): boolean {
    switch (this.type) {
      case "CIRC":
        return (
          Math.pow(pos.x - this.x, 2) + Math.pow(pos.y - this.y, 2) <
          Math.pow(this.size / 2, 2)
        );
      case "RECT":
        return (
          pos.x >= this.x - this.size / 2 &&
          pos.x <= this.x + this.size / 2 &&
          pos.y >= this.y - this.size / 2 &&
          pos.y <= this.y + this.size / 2
        );
    }
  }
}
