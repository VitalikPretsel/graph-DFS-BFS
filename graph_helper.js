class GraphHelper {
  constructor(graph, visualizer, menu) {
    this.graph = graph;
    this.visualizer = visualizer;
    this.menu = menu;
  }

  AddEdge() {
    let vertex_label_1 = this.menu.addEdgeMenu[0].value();
    let vertex_label_2 = this.menu.addEdgeMenu[1].value();
    let is_directed = this.menu.addEdgeMenu[3].value() == "directed";
    
    if (vertex_label_1 == '' && vertex_label_2 == '') {
      return;
    }
    
    let vertex1 = this.graph.getVertex(vertex_label_1);
    let vertex2 = this.graph.getVertex(vertex_label_2);
    
    let cell1 = this.visualizer.getCell(vertex_label_1);
    let cell2 = this.visualizer.getCell(vertex_label_2);
    
    if (!vertex1)
    {
      vertex1 = new Vertex(this.menu.addEdgeMenu[0].value());
      this.graph.addVertex(vertex1);
      cell1 = new Cell(this.menu.addEdgeMenu[0].value());
      this.visualizer.cells.push(cell1);
    }
    if (!vertex2)
    {
      vertex2 = new Vertex(this.menu.addEdgeMenu[1].value());
      this.graph.addVertex(vertex2);
      cell2 = new Cell(this.menu.addEdgeMenu[1].value());
      this.visualizer.cells.push(cell2);
    }
    
    if (!this.graph.edgeExists(vertex1, vertex2)) {
      this.graph.addEdge(vertex1, vertex2);
      this.visualizer.connections.push(new Connection(cell1, cell2, true));
    } 
    if (!is_directed) {
      if (!this.graph.edgeExists(vertex2, vertex1)) {
        this.graph.addEdge(vertex2, vertex1);
        this.visualizer.connections.push(new Connection(cell2, cell1, true));
      }
    }
    
    this.WriteAdj();
  }
  
  DelEdge() {
    let vertex_label_1 = this.menu.removeEdgeMenu[0].value();
    let vertex_label_2 = this.menu.removeEdgeMenu[1].value();
    let is_directed = this.menu.removeEdgeMenu[3].value() == "directed";
      
    if (vertex_label_1 == '' && vertex_label_2 == '') {
      return;
    }
    
    let vertex1 = this.graph.getVertex(vertex_label_1);
    let vertex2 = this.graph.getVertex(vertex_label_2);
    
    let cell1 = this.visualizer.getCell(vertex_label_1);
    let cell2 = this.visualizer.getCell(vertex_label_2);
    
    if (!vertex1 || !vertex2)
    {
      return;
    }
    
    if (this.graph.edgeExists(vertex1, vertex2)) {
      this.graph.delEdge(vertex1, vertex2);
      this.visualizer.removeConnection(cell1, cell2);
    } 
    
    if (!is_directed) {
      if (this.graph.edgeExists(vertex2, vertex1)) {
        this.graph.delEdge(vertex2, vertex1);
        this.visualizer.removeConnection(cell2, cell1);
      }
    }
    
    this.WriteAdj();
  }
  
  DelVertex() {
    let vertex_label = this.menu.removeVertexMenu[0].value();
    
    if (vertex_label == '') {
      return;
    }
    
    let vertex = this.graph.getVertex(vertex_label);
    
    let cell = this.visualizer.getCell(vertex_label);
    
    if (!vertex)
    {
      return;
    }
    
    this.graph.delVertex(vertex);
    this.visualizer.removeCell(cell);
      
    this.WriteAdj();
  }
  
  WriteAdj() {
    let str = '';
    for (let i = 0; i < this.graph.vertexes.length; i++) {
      str += this.graph.vertexes[i].label + ': ';
      for (let j = 0; j < this.graph.vertexes[i].adjs.length; j++) {
        str += this.graph.vertexes[i].adjs[j].label + ', ';
      }
      str = str.slice(0, -1);
      str += '\n';
    }
    this.menu.edgesTextArea.value(str);
  }
  
  AutoGenerateGraph() {
    let n = this.menu.autoGenerateMenu[0].value();
    if (n == '') {
      return;
    }
    
    let i = 0;
    this.AutoGenerateUtil(null, null, i, n, 2, 20, 20);
    this.WriteAdj();
  }
  
  AutoGenerateUtil(parentVertex, parentCell, i, n, b, x, y) {
    let vertex = new Vertex(i);
    this.graph.addVertex(vertex);
    let cell = new Cell(i, x, y);
    this.visualizer.cells.push(cell);
    
    if (parentVertex) {
      this.graph.addEdge(parentVertex, vertex);
      this.graph.addEdge(vertex, parentVertex);
      this.visualizer.connections.push(new Connection(parentCell, cell, true));
      this.visualizer.connections.push(new Connection(cell, parentCell, true));
    }
    
    
    let lvl = Math.floor(Math.log(n) / Math.log(b)) - Math.floor(Math.log(b * i + b) / Math.log(b));
    console.log(' ' + i + ' ' + lvl);
    for (let j = 1; j <= b; j++)
    {
      let i_ = b * i + j;
      if (i_ < n) {
        this.AutoGenerateUtil(vertex, cell, i_, n, b, x + (j - 1) * ((lvl + (b - 2)) * (lvl) + 1) * 50, y + 60);
      }
    }
  }

  
  async Start() {
    if (this.menu.startMenu[0].value() == '' && this.menu.startMenu[1].value() == '') {
      return;
    }
    
    this.menu.resultTextArea.value('');
    this.menu.solutionTextArea.value('');
    
    for (let i = 0; i < this.visualizer.cells.length; i++) {
      this.visualizer.cells[i].status = 'unvisited';
    }
    
    let startVertex = this.graph.getVertex(this.menu.startMenu[0].value());
    let finishVertex = this.graph.getVertex(this.menu.startMenu[1].value());
    
    if (startVertex && finishVertex) {
      this.graph.startSearch(startVertex, finishVertex, this.menu.startMenu[4].value(), this.menu.startMenu[3].value());
    }
    
    let str = '';
    for (let i = 0; i < this.graph.result.length; i++) {
      str += this.graph.result[i] + ',';
      this.menu.resultTextArea.value(str);
      let cell = this.visualizer.getCell(this.graph.result[i]);
      cell.status = 'visited';
      await delay(700);
    }
    
    str = str.slice(0, -1);
    this.menu.resultTextArea.value(str);
    
    str = '';
    let currentVertex = finishVertex;
    while (currentVertex != null) {
      let cell = this.visualizer.getCell(currentVertex.label);
      if (cell.status == 'solution')
      {
        break;
      }
      str = currentVertex.label + '->' + str;
      this.menu.solutionTextArea.value(str);
      cell.status = 'solution';
      await delay(700);
      currentVertex = currentVertex.mainParent;
    }
    
    str = str.slice(0, -2);
    this.menu.solutionTextArea.value(str);
  }
}

const delay = ms => new Promise(res => setTimeout(res, ms));
