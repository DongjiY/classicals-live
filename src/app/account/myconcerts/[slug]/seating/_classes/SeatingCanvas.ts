import { Shape } from "./Shape";
import styles from "../_styles/SeatingMap.module.css";

export type Coordinate = {
  x: number;
  y: number;
};

const MAX_ZOOM_OUT = 0.3;
const MIN_ZOOM_SHOW_GRID = 2;

export class SeatingCanvas {
  // base canvas variables
  public mode: "DEBUG" | "PROD" = "DEBUG";
  private ctx: CanvasRenderingContext2D;
  public canvas: HTMLCanvasElement;
  private currMousePosition: Coordinate = { x: 0, y: 0 }; // the current alias mouse position

  // shape and drag variables
  private shapes: Array<Shape> = [
    new Shape("CIRC", {
      size: 100,
      color: "#000000",
    }),
  ];
  private translate: Coordinate = { x: 0, y: 0 };
  private dragStart: Coordinate = { x: 0, y: 0 };
  private isDragging: boolean = false;
  private clickedShape: Shape | null = null; // clicked shape. second action in debug mode
  private editShape: Shape | null = null; // shape to drag. first action -- not used in prod mode

  // scroll and zoom variables
  private targetZoom: number = 1;
  private currentZoom: number = 1;

  constructor(canvasEl: HTMLCanvasElement, mode: "DEBUG" | "PROD") {
    this.ctx = canvasEl.getContext("2d")!;
    this.canvas = canvasEl;
    this.canvas.height = this.canvas.clientHeight;
    this.canvas.width = this.canvas.clientWidth;
    this.mode = mode;

    this.canvas.addEventListener("mousedown", (e) => this.handleMouseDown(e));
    this.canvas.addEventListener("mousemove", (e) => this.handleMouseMove(e));
    this.canvas.addEventListener("mouseup", () => this.handleMouseUp());
    this.canvas.addEventListener("wheel", (e) => this.handleMouseWheel(e));
    this.canvas.addEventListener("dragover", (e) =>
      this.handleShapeDragover(e)
    );
    this.canvas.addEventListener("drop", (e) =>
      this.handleDropShapeFromMenu(e)
    );
    document
      .getElementById("zoom-in")
      ?.addEventListener("click", () => this.handleZoom(true));
    document
      .getElementById("zoom-out")
      ?.addEventListener("click", () => this.handleZoom(false));

    this.render(); // initial render
  }

  /**
   * Transforms a Top-Left coordinate grid point to a Center Point coordinate point
   * @param a The Top-Left coordinate to transform
   * @returns the Center point coordinate
   */
  baseCoordsToAlias(a: Coordinate): Coordinate {
    return {
      x: (a.x - this.canvas.width / 2) / this.currentZoom - this.translate.x,
      y: (a.y - this.canvas.height / 2) / this.currentZoom + this.translate.y,
    };
  }

  /**
   * Converts a Center Point coordinate system to Top-Left
   * @param a The Center point coordinate
   * @returns the Top-Left coordinate
   */
  aliasCoordsToBase(a: Coordinate): Coordinate {
    return {
      x: (a.x + this.translate.x) * this.currentZoom + this.canvas.width / 2,
      y: (a.y - this.translate.y) * this.currentZoom + this.canvas.height / 2,
    };
  }

  /**
   * On mouse down, record the current position as the start of the drag action
   * @param e The mouse event
   */
  handleMouseDown(e: MouseEvent) {
    this.canvas.style.cursor = "move";

    const boundingBox = this.canvas.getBoundingClientRect();
    const posX = e.clientX - boundingBox.left;
    const posY = e.clientY - boundingBox.top;

    if (this.mode === "PROD") {
      this.clickedShape = this.getShapeUnderCursor(
        this.baseCoordsToAlias({ x: posX, y: posY })
      );
    } else {
      // in debug mode
      // on first click, enable edit mode, allow dragging shape
      // on second click, enable clicked mode, opening modal
      if (
        this.editShape &&
        this.getShapeUnderCursor(this.baseCoordsToAlias({ x: posX, y: posY }))
          ?.id === this.editShape.id
      ) {
        this.clickedShape = this.getShapeUnderCursor(
          this.baseCoordsToAlias({ x: posX, y: posY })
        );
      } else {
        // the canvas was clicked
        this.clickedShape = null;
      }

      this.editShape = this.getShapeUnderCursor(
        this.baseCoordsToAlias({ x: posX, y: posY })
      );
      if (this.editShape) this.canvas.style.cursor = "grabbing";
    }

    this.isDragging = true;
    this.dragStart = {
      x: e.clientX,
      y: e.clientY,
    };

    this.render();
  }

  /**
   * On mouse move, record the change in distance
   * @param e The mouse event
   */
  handleMouseMove(e: MouseEvent) {
    if (this.isDragging) {
      const dx = this.dragStart.x - e.clientX;
      const dy = this.dragStart.y - e.clientY;

      if (this.editShape) {
        this.editShape.x -= dx / this.currentZoom;
        this.editShape.y -= dy / this.currentZoom;
      } else {
        this.translate = {
          x: this.translate.x - dx / this.currentZoom,
          y: this.translate.y + dy / this.currentZoom,
        };
      }

      this.dragStart = {
        x: e.clientX,
        y: e.clientY,
      };

      this.render();
    }

    const boundingBox = this.canvas.getBoundingClientRect();
    const posX = e.clientX - boundingBox.left;
    const posY = e.clientY - boundingBox.top;
    this.setCurrMousePosition({ x: posX, y: posY });
    this.setCoordinateLabel();
  }

  /**
   * Handle cleanup when mouse is released
   */
  handleMouseUp() {
    this.isDragging = false;
    this.canvas.style.cursor = "grab";
  }

  /**
   * Detect distance traveled by the mouse wheel and convert it to a zoom factor
   * @param e The mouse wheel event
   */
  handleMouseWheel(e: WheelEvent) {
    e.preventDefault();

    const deltaZoom = e.deltaY * -0.005;
    this.targetZoom = Math.max(MAX_ZOOM_OUT, this.currentZoom + deltaZoom);

    requestAnimationFrame(() => this.animateZoom());
  }

  handleZoom(isZoomIn: boolean) {
    const deltaZoom = (isZoomIn ? -102 : 102) * -0.005;
    this.targetZoom = Math.max(MAX_ZOOM_OUT, this.currentZoom + deltaZoom);

    requestAnimationFrame(() => this.animateZoom());
  }

  /**
   * Gives easings to the zoom animation
   */
  animateZoom() {
    const easingFactor = 0.1;

    this.currentZoom += (this.targetZoom - this.currentZoom) * easingFactor;

    this.render();

    if (Math.abs(this.targetZoom - this.currentZoom) > 0.001) {
      requestAnimationFrame(() => this.animateZoom());
    }
  }

  /**
   *
   * @param pos
   * @returns
   */
  getShapeUnderCursor(pos: Coordinate): Shape | null {
    for (const shape of this.shapes) {
      if (shape.containsPoint(pos)) return shape;
    }
    return null;
  }

  setCurrMousePosition(pos: Coordinate) {
    this.currMousePosition = this.baseCoordsToAlias(pos);
  }

  /**
   * DEBUG ONLY - Shows the current mouse coordinate position and the translation
   * @param coords Current Mouse Coordinates
   */
  setCoordinateLabel() {
    if (document.getElementById("coords"))
      document.getElementById("coords")!.innerText = `Coordinates: (${
        this.currMousePosition.x
      }, ${this.currMousePosition.y}) | Translate: ${JSON.stringify(
        this.translate
      )} | Zoom: ${this.currentZoom}`;
  }

  /**
   * Handles opening and closing a modal to display seat information
   */
  clickedShapeActions() {
    if (this.clickedShape) {
      document.getElementById("info")?.classList.add(styles.open);
    }
  }

  handleDropShapeFromMenu(e: any) {
    e.preventDefault();

    if (e.dataTransfer.getData("shapetype")) {
      const shapeToAdd = new Shape(
        e.dataTransfer.getData("shapetype"),
        {
          size: 150,
          color: "#67e8f9",
        },
        this.currMousePosition.x,
        this.currMousePosition.y
      );

      this.shapes.push(shapeToAdd);

      this.render();
    }
  }

  handleShapeDragover(e: any) {
    e.preventDefault();

    const boundingBox = this.canvas.getBoundingClientRect();
    const posX = e.clientX - boundingBox.left;
    const posY = e.clientY - boundingBox.top;
    this.setCurrMousePosition({ x: posX, y: posY });
  }

  drawRect(s: Shape) {
    this.ctx.fillStyle = s.color;

    this.ctx.fillRect(
      (s.x + this.translate.x) * this.currentZoom -
        (s.size * this.currentZoom) / 2 +
        this.canvas.width / 2,
      (s.y - this.translate.y) * this.currentZoom -
        (s.size * this.currentZoom) / 2 +
        this.canvas.height / 2,
      s.size * this.currentZoom,
      s.size * this.currentZoom
    );

    if (this.clickedShape === s || this.editShape === s) {
      this.ctx.strokeStyle = "red";
      this.ctx.lineWidth = 2;
      this.ctx.strokeRect(
        (s.x + this.translate.x) * this.currentZoom -
          (s.size * this.currentZoom) / 2 +
          this.canvas.width / 2,
        (s.y - this.translate.y) * this.currentZoom -
          (s.size * this.currentZoom) / 2 +
          this.canvas.height / 2,
        s.size * this.currentZoom,
        s.size * this.currentZoom
      );
    }
  }

  drawCircle(s: Shape) {
    this.ctx.fillStyle = s.color;

    this.ctx.beginPath();
    this.ctx.arc(
      (s.x + this.translate.x) * this.currentZoom + this.canvas.width / 2,
      (s.y - this.translate.y) * this.currentZoom + this.canvas.height / 2,
      (this.currentZoom * s.size) / 2,
      0,
      2 * Math.PI
    );
    this.ctx.fill();

    if (this.clickedShape === s || this.editShape === s) {
      this.ctx.strokeStyle = "red";
      this.ctx.lineWidth = 2;
      this.ctx.stroke();
    }
  }

  render() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.clickedShapeActions();

    this.shapes.forEach((shape) => {
      switch (shape.type) {
        case "RECT":
          this.drawRect(shape);
          break;
        case "CIRC":
          this.drawCircle(shape);
          break;
      }
    });
  }
}
