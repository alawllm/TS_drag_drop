// Drag & Drop interfaces

export interface Draggable {
  // two event listeners
  dragStartHandler(event: DragEvent): void;
  dragEndHandler(event: DragEvent): void;
}

export interface DragTarget {
  // signals that the element is a valid drop target
  dragOverHandler(event: DragEvent): void;
  // handle the drop
  dropHandler(event: DragEvent): void;
  dragLeaveHandler(event: DragEvent): void;
}
