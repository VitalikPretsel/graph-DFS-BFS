class Cell {
  constructor(label, x=-1, y=-1) {
    this.x = x == -1 ? random(width) : x;
    this.y = y == -1 ? random(height) : y;
    this.label = label;
    this.status = 'unvisited';
    
    this.flags = {
      hover : false,
      dragging : false,
    };
    
    this.radius = 15;
  }
  
  render() {
    this.render_circle();
    this.render_text();
  }
  
  render_text() {
    noStroke();
    fill(0);
    textSize(15);
    text(this.label, this.x - (textWidth(this.label) / 2), this.y + ((textAscent() + textDescent()) / 4));
  }
  
  render_circle() {
    stroke(0);
    strokeWeight(2);
    if (this.status == 'visited') {
      fill(80, 200, 80);
    }
    else if (this.status == 'solution') {
      fill(255, 211, 0);
    }
    else {
      fill(255);
    }
    if (this.flags.hover) {
      strokeWeight(3);
    }
    if (this.flags.dragging) {
      fill(100, 255, 255);
    }
    
    ellipse(this.x, this.y, this.radius*2, this.radius*2);
  }
  
  isInside(x, y) {
    const d = dist(this.x, this.y, x, y);
    return d <= this.radius;
  }
  
}
