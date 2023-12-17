import { Coordinate } from "./SeatingCanvas";
import generateUUID from "@/util/uuid";

export class CoordinateObject {
  private _id: string;
  private _x: number;
  private _y: number;

  constructor(x?: number, y?: number) {
    this._id = generateUUID();
    this._x = x ?? 0;
    this._y = y ?? 0;
  }

  get id() {
    return this._id;
  }

  get x(): number {
    return this._x;
  }

  set x(value: number) {
    this._x = value;
  }

  get y(): number {
    return this._y;
  }

  set y(value: number) {
    this._y = value;
  }

  getCoords(): Coordinate {
    return {
      x: this._x,
      y: this._y,
    };
  }
}
