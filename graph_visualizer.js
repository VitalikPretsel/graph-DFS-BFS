class GraphVisualizer {
  constructor()
  {
    this.cells = [];
    this.connections = [];
    
    this.dx = 0;
    this.dy = 0;
    this.dragged_cell;
  }
  
  getCell(cell_label) {
    for (let i = 0; i < this.cells.length; i++) {
      if (this.cells[i].label == cell_label) {
        return this.cells[i];
      }
    }
    return false;
  }
  
  removeCell(cell) {
    for (let i = 0; i < this.cells.length; i++) {
      this.removeConnection(this.cells[i], cell);
      this.removeConnection(cell, this.cells[i]);
    }
    for (let i = 0; i < this.cells.length; i++) {
      if (this.cells[i].label == cell.label) {
        this.cells.splice(i, 1);
        break;
      }
    }
  }
  
  removeConnection(cell1, cell2) {
    for (let i = 0; i < this.connections.length; i++) {
      if (this.connections[i].cell1.label == cell1.label &&
        this.connections[i].cell2.label == cell2.label) {
        this.connections.splice(i, 1);
        break;
      }
    }
  }
  
  GraphDraw() {
    this.connections.forEach(conn => {
      if (conn.isInside(mouseX, mouseY)) {
        conn.flags.hover = true;
      }
      else {
        conn.flags.hover = false;
      }
      conn.render();
    });
  
    this.cells.forEach (cell => {
      if (cell.isInside(mouseX, mouseY)) {
        cell.flags.hover = true;
      }
      else {
        cell.flags.hover = false;
      }
    
      cell.render();
    });
  }
  
  GraphMousePressed() {
    for (let i = 0; i < this.cells.length; i++) {
      var cell = this.cells[i];
      if (cell.flags.hover) {
        cell.flags.dragging = true;
        this.dragged_cell = cell;
        break;
      }
    }
  
    if (!this.dragged_cell) {
      return;
    }
    this.dx = mouseX - this.dragged_cell.x;
    this.dy = mouseY - this.dragged_cell.y;
  }

  GraphMouseDragged() {
    if (!this.dragged_cell) {
      return;
    }
  
    this.dragged_cell.x = mouseX - this.dx;
    this.dragged_cell.y = mouseY - this.dy;
  }

  GraphMouseReleased() {
    if (!this.dragged_cell) {
      return;
    }
    
    this.dragged_cell.flags.dragging = false;
    this.dragged_cell = undefined;
  }   
}
