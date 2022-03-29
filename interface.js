class MenuInterface {
  constructor()
  {
    this.addEdgeMenu = [];
    this.removeEdgeMenu = [];
    this.removeVertexMenu = [];
    this.autoGenerateMenu = [];
    this.clearMenu = [];
    this.startMenu = [];

    let addEdgeMenuLabels = ['First vertex', 'Second vertex', 'Add edge'];
    CreateMenuGroupRow2(this.addEdgeMenu, addEdgeMenuLabels, 10);
    let radioDir = createRadio();
    radioDir.option('directed', 'directed');
    radioDir.option('undirected', 'undirected');
    radioDir.selected('directed');
    radioDir.position(width + 10, 10);
    this.addEdgeMenu.push(radioDir);

    let removeEdgeMenuLabels = ['', '', 'Del edge'];
    CreateMenuGroupRow2(this.removeEdgeMenu, removeEdgeMenuLabels, 40);
    this.removeEdgeMenu.push(radioDir);

    let removeVertexMenuLabels = ['Remove vertex', 'Remove'];
    CreateMenuGroupRow1(this.removeVertexMenu, removeVertexMenuLabels, 85);

    let autoGenerateMenuLabels = ['Vertex amount', 'Generate'];
    CreateMenuGroupRow1(this.autoGenerateMenu, autoGenerateMenuLabels, 130);

    this.clearMenu[0] = createButton('Clear'); 
    this.clearMenu[0].position(width + 10, 200);
    this.clearMenu[0].style('width', '260px');

    let menuEdgesText = createElement('h6', "Adjecency list");
    menuEdgesText.position(width + 10, 210);
    this.edgesTextArea = createElement('textarea');  
    this.edgesTextArea.attribute("rows", "5");
    this.edgesTextArea.attribute("disabled", "disabled");
    this.edgesTextArea.style('width', '260px');
    this.edgesTextArea.position(width + 10, 250);


    let startMenuLabels = ['Start vertex', 'Finish vertex', 'Start'];
    CreateMenuGroupRow2(this.startMenu, startMenuLabels, 380);

    let radioDirection = createRadio();
    radioDirection.option('left direction', 'left');
    radioDirection.option('right direction', 'right');
    radioDirection.selected('left');
    radioDirection.position(width + 10, 380);
    this.startMenu.push(radioDirection);

    let radioMethod = createRadio();
    radioMethod.option('DFS', 'dfs');
    radioMethod.option('BFS', 'bfs');
    radioMethod.selected('dfs');
    radioMethod.position(width + 10, 350);
    this.startMenu.push(radioMethod);


    let menuResultText = createElement('h6', "Passed vertexes");
    menuResultText.position(width + 10, 440);
    this.resultTextArea = createElement('textarea');  
    this.resultTextArea.attribute("rows", "3");
    this.resultTextArea.attribute("disabled", "disabled");
    this.resultTextArea.style('width', '260px');
    this.resultTextArea.position(width + 10, 480);

    let menuSolutionText = createElement('h6', "Found path");
    menuSolutionText.position(width + 10, 510);
    this.solutionTextArea = createElement('textarea');  
    this.solutionTextArea.attribute("rows", "3");
    this.solutionTextArea.attribute("disabled", "disabled");
    this.solutionTextArea.style('width', '260px');
    this.solutionTextArea.position(width + 10, 550);
  }
}

function CreateMenuGroupRow2(menuGroup, labels, row_Ypos) {
  menuGroup[0] = createInput(); 
  menuGroup[1] = createInput();
  menuGroup[2] = createButton(labels[2]);

  for (let i = 0; i < menuGroup.length; i++) {
    menuGroup[i].position(width + 10 + 90 * i, row_Ypos + 40);
    menuGroup[i].style('width', '80px');
  }

  let menuTextGroup = [];

  for (let i = 0; i < 2; i++) {
    menuTextGroup[i] = createElement('h6', labels[i]);
    menuTextGroup[i].position(width + 10 + 90 * i, row_Ypos);
  }
}

function CreateMenuGroupRow1(menuGroup, labels, row_Ypos) {
  menuGroup[0] = createInput(); 
  menuGroup[1] = createButton(labels[1]);

  menuGroup[0].position(width + 10, row_Ypos + 40);
  menuGroup[0].style('width', '170px');
  menuGroup[1].position(width + 190, row_Ypos + 40);
  menuGroup[1].style('width', '80px');

  let menuText = createElement('h6', labels[0]);
  menuText.position(width + 10, row_Ypos);
}
