class Graph
{
    constructor()
    {
        this.vertexes = [];
        this.result = [];
        this.finishVertex = null;
        this.direction = 'left';
        this.success = false;
    }
     
    getVertex(vertex_label) {
      for (let i = 0; i < this.vertexes.length; i++) {
        if (this.vertexes[i].label == vertex_label) {
          return this.vertexes[i];
        }
      }
      return false;
    }
     
    addVertex(vertex) {
      this.vertexes.push(vertex);
    }
    
    delVertex(vertex) {
      for (let i = 0; i < this.vertexes.length; i++) {
        this.delEdge(this.vertexes[i], vertex);
      }
      for (let i = 0; i < this.vertexes.length; i++) {
        if (this.vertexes[i].label == vertex.label) {
          this.vertexes.splice(i, 1);
          break;
        }
      }
    }
     
    addEdge(vertex1, vertex2) {
      vertex1.adjs.push(vertex2);
    }
    
    delEdge(vertex1, vertex2) {
      for (let i = 0; i < vertex1.adjs.length; i++) {
        if (vertex1.adjs[i].label == vertex2.label) {
          vertex1.adjs.splice(i, 1);
          break;
        }
      }
    }
    
    edgeExists(vertex1, vertex2) {
      for (let i = 0; i < vertex1.adjs.length; i++) {
        if (vertex1.adjs[i].label == vertex2.label) {
          return true;
        }
      }
      return false;
    } 
     
    DFSUtil(startVertex) {
        startVertex.visited = true;
        this.result.push(startVertex.label);
        if (startVertex.label == this.finishVertex.label) {
          this.success = true; 
          return;
        }
   
        if (this.direction == 'left') {
          for (let i = 0; i < startVertex.adjs.length; i++) {
            if (!startVertex.adjs[i].visited) {
                startVertex.adjs[i].mainParent = startVertex;
                this.DFSUtil(startVertex.adjs[i]);
                if (this.success == true || startVertex.adjs[i].label == this.finishVertex.label) {
                    break;
                }  
            }
          }
        }
        else {
          for (let i = startVertex.adjs.length - 1; i >= 0; i--) {
            if (!startVertex.adjs[i].visited) {
                startVertex.adjs[i].mainParent = startVertex;
                this.DFSUtil(startVertex.adjs[i]);
                if (this.success == true || startVertex.adjs[i].label == this.finishVertex.label) {
                    break;
                }  
            }
          }
        }
    }
    
    BFS(startVertex) {
      startVertex.visited = true;
      this.result.push(startVertex.label);
      
      let queue = [];
      queue.push(startVertex); 
      
      if (this.direction == 'left') {
        while (queue.length != 0) {
          let currentVertex = queue.shift();
          for (let i = 0; i < currentVertex.adjs.length; i++) {
             if (currentVertex.adjs[i].visited == false) {  
               currentVertex.adjs[i].visited = true;
               currentVertex.adjs[i].mainParent = currentVertex;
               this.result.push(currentVertex.adjs[i].label);
               if (currentVertex.adjs[i].label == this.finishVertex.label)
               {
                 return;  
               }
               queue.push(currentVertex.adjs[i]);
             }
          }
        }
      }
      else if (this.direction == 'right') {
        while (queue.length != 0) {
          let currentVertex = queue.shift();
          for (let i = currentVertex.adjs.length - 1; i >= 0; i--) {
             if (currentVertex.adjs[i].visited == false) {
               currentVertex.adjs[i].mainParent = currentVertex;
               currentVertex.adjs[i].visited = true;
               this.result.push(currentVertex.adjs[i].label);
               if (currentVertex.adjs[i].label == this.finishVertex.label)
               {
                 return;  
               }
               queue.push(currentVertex.adjs[i]);
             }
          }
        }
      }
    }
     
    startSearch(startVertex, finishVertex, method, direction = 'left') {
        this.result = [];
        this.finishVertex = finishVertex;
        this.success = false;
        this.direction = direction;
        
        for (let i = 0; i < this.vertexes.length; i++) {
          this.vertexes[i].visited = false;
          this.vertexes.mainParent = null;
        }
        
        if (method == 'dfs') {
          this.DFSUtil(startVertex);
        }
        else if (method == 'bfs') {
          this.BFS(startVertex);
        }
    }
}

class Vertex
{
    constructor(label) 
    {
        this.label = label;
        this.visited = false;
        this.adjs = [];
        this.mainParent = null;
    }
}
