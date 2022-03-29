class Connection {
  constructor(cell1, cell2, directed = false) {
    this.cell1 = cell1;
    this.cell2 = cell2;
    this.directed = directed;
    
    this.flags = {
      hover : false,
      dragging : false,
    };
  }
  
  render() {
    this.render_line();
  }
  
  render_line() {
    stroke(0);
    strokeWeight(2);
    if (this.flags.hover) {
      stroke(200, 0, 0);
      strokeWeight(3);
    }
    if (this.flags.dragging) {
      fill(100, 255, 255);
    }
    
    if (this.directed) {
      drawArrow(this.cell1.x, this.cell1.y, this.cell2.x, this.cell2.y);
    }
    else {
      line(this.cell1.x, this.cell1.y, this.cell2.x, this.cell2.y);
    }
  }
  
  isInside(x, y) {
    const d1 = dist(this.cell1.x, this.cell1.y, x, y);
    const d2 = dist(this.cell2.x, this.cell2.y, x, y);
    
    if (d1 <= this.cell1.radius || d2 <= this.cell2.radius) return false;
    
    const length = dist(this.cell1.x, this.cell1.y, this.cell2.x, this.cell2.y);
    
    const cond1 = (d1 + d2)-0.5 <= length;
    const cond2 = (d1 + d2)+0.5 >= length;
    
    return cond1 && cond2;
  } 
}

function drawArrow(x1, y1, x2, y2) {
    line(x1, y1, x2, y2);
    push();
    let offset = 10;
    let angle = atan2(y1 - y2, x1 - x2); 
    translate(x2, y2); 
    rotate(angle - HALF_PI);
    triangle(-offset*0.5, 2.5*offset, offset*0.5, 2.5*offset, 0, 1.5*offset);
    pop();
}
