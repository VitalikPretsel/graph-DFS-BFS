var menu_interface;
var graph;
var graph_visualizer;
var graph_helper;

function setup() {
  createCanvas(950, 600);
  
  menu_interface = new MenuInterface();
  
  InitAll();
}

function InitAll() {
  graph = new Graph();
  graph_visualizer = new GraphVisualizer();
  graph_helper = new GraphHelper(graph, graph_visualizer, menu_interface);  
  
  menu_interface.edgesTextArea.value('');
  menu_interface.resultTextArea.value('');
  menu_interface.solutionTextArea.value('');
  
  menu_interface.addEdgeMenu[2].mousePressed(GraphHelperAddEdge);
  menu_interface.removeEdgeMenu[2].mousePressed(GraphHelperDelEdge);
  menu_interface.removeVertexMenu[1].mousePressed(GraphHelperDelVertex);
  menu_interface.autoGenerateMenu[1].mousePressed(GraphHelperAutoGenerate);
  menu_interface.startMenu[2].mousePressed(GraphHelperStart);
  menu_interface.clearMenu[0].mousePressed(InitAll);
}

function GraphHelperAddEdge() {
  graph_helper.AddEdge();
}

function GraphHelperDelEdge() {
  graph_helper.DelEdge();
}

function GraphHelperDelVertex() {
  graph_helper.DelVertex();
}

function GraphHelperAutoGenerate() {
  graph_helper.AutoGenerateGraph();
}

function GraphHelperStart() {
  graph_helper.Start();
}

function draw() {
  background(200);
  graph_visualizer.GraphDraw();
}

function mousePressed() {
  graph_visualizer.GraphMousePressed();
}

function mouseDragged() {
  graph_visualizer.GraphMouseDragged();
}

function mouseReleased() {
  graph_visualizer.GraphMouseReleased();
}
