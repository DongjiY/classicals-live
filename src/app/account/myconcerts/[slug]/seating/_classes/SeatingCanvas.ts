import { Shape } from "./Shape";
import styles from "../_styles/SeatingMap.module.css";

export type Coordinate = {
  x: number;
  y: number;
};

const MAX_ZOOM_OUT = 0.3;
const MIN_ZOOM_SHOW_GRID = 2;
const EXTENDED_GRID_SIZE = 5000;
const GRID_SIZE = 20;

export class SeatingCanvas {
  // base canvas variables
  public mode: "DEBUG" | "PROD" = "DEBUG";
  private ctx: CanvasRenderingContext2D;
  public canvas: HTMLCanvasElement;

  // mouse positions
  private currMousePosition: Coordinate = { x: 0, y: 0 }; // the current alias mouse position
  private cachedRightClickPosition: Coordinate = { x: 0, y: 0 }; // alias value

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

    this.initializeEventListeners();

    this.render(); // initial render
  }

  initializeEventListeners() {
    this.canvas.addEventListener("mousedown", (e) => this.handleMouseDown(e));
    this.canvas.addEventListener("mousemove", (e) => this.handleMouseMove(e));
    this.canvas.addEventListener("mouseup", (e) => this.handleMouseUp(e));
    this.canvas.addEventListener("wheel", (e) => this.handleMouseWheel(e));
    this.canvas.addEventListener("dragover", (e) =>
      this.handleShapeDragover(e)
    );
    this.canvas.addEventListener("drop", (e) =>
      this.handleDropShapeFromMenu(e)
    );
    this.canvas.addEventListener("contextmenu", (e) =>
      this.handleOpenContextMenu(e)
    );
    document.querySelectorAll(".zoom-in").forEach((el) => {
      el.addEventListener("click", () => this.handleZoom(true));
    });
    document.querySelectorAll(".zoom-out").forEach((el) => {
      el.addEventListener("click", () => this.handleZoom(false));
    });
    document.getElementById("edit-action")?.addEventListener("click", (e) => {
      this.handleContextMenuActions(e, {
        mousePos: this.cachedRightClickPosition,
        action: "edit",
      });
    });
    document.getElementById("delete-action")?.addEventListener("click", (e) => {
      this.handleContextMenuActions(e, {
        mousePos: this.cachedRightClickPosition,
        action: "delete",
      });
    });
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

  handleOpenContextMenu(e: MouseEvent) {
    e.preventDefault();

    const menu = document.getElementById("customcontextmenu");
    const baseCurrMouse = this.aliasCoordsToBase(this.currMousePosition);
    this.cachedRightClickPosition = this.currMousePosition;

    if (menu) {
      menu.classList.add(styles.contextmenuopen);

      let menuW = menu.offsetWidth! + 4;
      let menuH = menu.offsetHeight! + 4;

      if (this.canvas.height - baseCurrMouse.y < menuH) {
        menu.style.top = this.canvas.height - menuH + "px";
      } else {
        menu.style.top = baseCurrMouse.y + "px";
      }

      if (this.canvas.width - baseCurrMouse.x < menuW) {
        menu.style.left = this.canvas.width - menuW + "px";
      } else {
        menu.style.left = baseCurrMouse.x + "px";
      }
    }
  }

  handleContextMenuActions(e: MouseEvent, data: any) {
    if (data.action === "edit") {
      this.clickedShape = this.getShapeUnderCursor(data.mousePos);
    } else if (data.action === "delete") {
      this.clickedShape = this.getShapeUnderCursor(data.mousePos);
      if (this.clickedShape) {
        const index = this.shapes.indexOf(this.clickedShape);
        console.log(index);
        if (index > -1) {
          this.shapes.splice(index, 1);
        }
      }
      this.clickedShape = null;
    }

    this.render();
  }

  handleCloseContextMenu() {
    document
      .getElementById("customcontextmenu")
      ?.classList.remove(styles.contextmenuopen);
  }

  /**
   * On mouse down, record the current position as the start of the drag action
   * @param e The mouse event
   */
  handleMouseDown(e: MouseEvent) {
    this.handleCloseContextMenu();
    this.canvas.style.cursor = "move";

    const boundingBox = this.canvas.getBoundingClientRect();
    const posX = e.clientX - boundingBox.left;
    const posY = e.clientY - boundingBox.top;

    if (this.mode === "PROD") {
      this.clickedShape = this.getShapeUnderCursor(
        this.baseCoordsToAlias({ x: posX, y: posY })
      );
    } else {
      this.clickedShape = null;
      this.editShape = this.getShapeUnderCursor(
        this.baseCoordsToAlias({ x: posX, y: posY })
      );
      if (this.editShape) this.canvas.style.cursor = "grabbing";
    }

    if (e.button === 0) {
      this.isDragging = true;
      this.dragStart = {
        x: e.clientX,
        y: e.clientY,
      };
    }

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
  handleMouseUp(e: MouseEvent) {
    if (e.button === 0) {
      this.isDragging = false;
      this.canvas.style.cursor = "grab";
    }
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
          size: 100,
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

  drawGrid() {
    this.ctx.beginPath();
    this.ctx.strokeStyle = "#ddd";

    // Vertical gridlines
    for (let x = -EXTENDED_GRID_SIZE; x <= EXTENDED_GRID_SIZE; x += GRID_SIZE) {
      this.ctx.moveTo(
        x * this.currentZoom +
          this.canvas.width / 2 +
          this.translate.x * this.currentZoom,
        0
      );
      this.ctx.lineTo(
        x * this.currentZoom +
          this.canvas.width / 2 +
          this.translate.x * this.currentZoom,
        this.canvas.height
      );
    }

    // Horizontal gridlines
    for (let y = -EXTENDED_GRID_SIZE; y <= EXTENDED_GRID_SIZE; y += GRID_SIZE) {
      this.ctx.moveTo(
        0,
        y * this.currentZoom +
          this.canvas.height / 2 -
          this.translate.y * this.currentZoom
      );
      this.ctx.lineTo(
        this.canvas.width,
        y * this.currentZoom +
          this.canvas.height / 2 -
          this.translate.y * this.currentZoom
      );
    }

    this.ctx.stroke();
  }

  render() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.clickedShapeActions();

    if (this.currentZoom > MIN_ZOOM_SHOW_GRID) this.drawGrid();

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
