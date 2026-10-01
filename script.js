let stage = document.querySelector("#stage");
//Add a keyboard listener
window.addEventListener("keydown", keydownHandler, false);
let SIZE = 64;
let activeMap;

//player hp
let maxHP = 30;
let HP = 30;
let hpText = document.getElementById("hp");

// player xp
let maxEXP = 20;
let EXP = 0;
let xpText = document.getElementById("exp");
let playerLevel = 1;

// for leveling up stats
let playerPoints = 0;

// for end game
let monsterKills = 0;
let bossKills = 0;
let endgamePoints = 0;

//game chat
let output = document.getElementById("gameChat");
let gameMessage;

//stages
let backgroundStage = document.getElementById("main-menu-background");
let floorStage = document.getElementById("floor");
let wallStage = document.getElementById("walls");
let entitiesStage = document.getElementById("entities");
let colisionStage = document.getElementById("colision");
let fogStage = document.getElementById("fog");
let UIStage = document.getElementById("playerUI");
let itemsStage = document.getElementById("items");

// direction look 0 = right 1 = left
let directionLook = 0;

//The arrow key codes
let UP = 87;
let DOWN = 83;
let RIGHT = 68;
let LEFT = 65;
let INTERACT = 70;
let WAIT = 32;
let POTION = 88;
let DROP = 81;
let STATS = 72;

// player position
let playerX;
let playerY;

// current map
let currentMAP = 0;
let currentMapEnt;
let currentMapCol;
let curremtMapFlr;
let currentMapWal;
let currentMapItm;
let ROWS;
let COLUMNS;

// backpack
let ring1item = document.getElementById("ring1");
let ring2item = document.getElementById("ring2");
let necklace1item = document.getElementById("necklace1");
let potion1item = document.getElementById("potion1");
let item1 = document.getElementById("item1");
let item2 = document.getElementById("item2");
let item3 = document.getElementById("item3");
let item4 = document.getElementById("item4");
let item5 = document.getElementById("item5");
let item6 = document.getElementById("item6");
let item7 = document.getElementById("item7");
let item8 = document.getElementById("item8");

// creating the map
let cell;
// moving the map
let mapTop;
let mapBottom;
let mapLeft;
let mapRigth;
// delay for damage numbers
let test = 2000;

// chanse monster
let testmonster;
let currentChaseMonster = [];
let monsterViewY = 5;
let monsterViewX = 7;
let monsterStartPointY = 2;
let monsterStartPointX = 3;

// third map chest puzzle
let silverchestactive = 0;

// boss monster parts
let toprigthX;
let botleftX;
let botrigthX;
let toprigthY;
let botleftY;
let botrigthY;
let toprightimg;
let botleftimg;
let botrightimg;

// find monster map 1
let monsterHP = 10;
let bigMonster = [];

// monster random attack
let monsterAttack;
let monsterDamage;

//increase for more dodge against monster
let dodgeVariable = 9;

// monster damage done to player
let mathMonsterNumber = 5;
let shield = 0;

//back pack array
let backpack = [];

// xp potion
let turnsXPpot = 0;
let xppotionactive = 0;

//interact /attack
let playerDamage;
let playerNumberDamage = 5;
let hppotInteract = 0;

// open door
let openeddoor = 0;

// attaking monster by moving monster dead
let randomEXP;
let maxEXPnumber = 3;
let delayInMilliseconds = 430; //1 second

// not grabng more items
let fullbackpack = 0;

//  acive items
let totemActive = 0;
let dmgringActive = 0;
let hpringActive = 0;
let dodgeringActive = 0;
let viewneckActive = 0;
let hpring2active = 0;
let dmgring2active = 0;
let dodgering2active = 0;

// luck for mobs dropping items
let luck = 10;

//player stats
let onoff = 0;
// stat health
let heartLevelNumber = 0;
// stat attack
let attackLevelNumber = 0;
// stat luck
let luckLevelNumber = 0;
// stat shield
let shieldLevelNumber = 0;
// wait space bar
let waitTurnVal = 0;

// main page background
let backgroundCurrent = 0;

// music
let audio = new Audio("game_music.mp3");
audio.volume = 0.1;
let musicLength = 204600;

// -------------------------------------------------------------------- FIND ------------------------------------------------------------//
// player gps at begining
function playerGPS() {
  // rows and collumns for each map
  if (currentMAP == 1) {
    ROWS = map1Entities.length;
    COLUMNS = map1Entities[0].length;
  }
  if (currentMAP == 2) {
    ROWS = map2entites.length;
    COLUMNS = map2entites[0].length;
  }
  if (currentMAP == 3) {
    ROWS = map3entities.length;
    COLUMNS = map3entities[0].length;
  }
  if (currentMAP == 4) {
    ROWS = map4entities.length;
    COLUMNS = map4entities[0].length;
  }
  // finding player
  for (var row = 0; row < ROWS; row++) {
    for (var column = 0; column < COLUMNS; column++) {
      if (currentMAP == 1) {
        if (map1Entities[row][column] === PLAYER) {
          playerY = row;
          playerX = column;
        }
      }
      if (currentMAP == 2) {
        if (map2entites[row][column] === PLAYER) {
          playerY = row;
          playerX = column;
        }
      }
      if (currentMAP == 3) {
        if (map3entities[row][column] === PLAYER) {
          playerY = row;
          playerX = column;
        }
      }
      if (currentMAP == 4) {
        if (map4entities[row][column] === PLAYER) {
          playerY = row;
          playerX = column;
        }
      }
    }
  }
}

// a gps for momsters and diferences between a boss and regular.
// monsters gains more health gradualy through the levels.
function findMonster1() {
  if (currentMAP == 1) {
    currentMapEnt = map1Entities;
  }
  if (currentMAP == 2) {
    currentMapEnt = map2entites;
    monsterHP = 20;
  }
  if (currentMAP == 3) {
    currentMapEnt = map3entities;
    monsterHP = 25;
  }
  if (currentMAP == 4) {
    currentMapEnt = map4entities;
    monsterHP = 30;
    bigMonster = [];
  }
  for (let i = 0; i < ROWS; i++) {
    for (let j = 0; j < COLUMNS; j++) {
      if (currentMapEnt[i][j] !== PLAYER && currentMapEnt[i][j] !== 0) {
        let currentMonster = currentMapEnt[i][j];
        let monsterRow = j;
        let monsterCol = i;
        // big monster 2 map
        if (currentMonster == 361) {
          monsters.push([
            currentMonster,
            monsterRow,
            monsterCol,
            monsterHP + 40,
            0,
            1,
          ]);
        }
        // big monster 4 map
        if (currentMonster == 363) {
          monsters.push([
            currentMonster,
            monsterRow,
            monsterCol,
            monsterHP + 50,
            0,
            1,
          ]);
        }

        // big monster parts 2
        if (
          currentMonster == 362 ||
          currentMonster == 393 ||
          currentMonster == 394
        ) {
          bigMonster.push([
            currentMonster,
            monsterRow,
            monsterCol,
            monsterHP + 40,
            0,
            1,
          ]);
        }
        // big monster parts4
        if (
          currentMonster == 364 ||
          currentMonster == 395 ||
          currentMonster == 396
        ) {
          bigMonster.push([
            currentMonster,
            monsterRow,
            monsterCol,
            monsterHP + 50,
            0,
            1,
          ]);
        }

        if (
          currentMonster !== 361 &&
          currentMonster !== 362 &&
          currentMonster !== 393 &&
          currentMonster !== 394 &&
          currentMonster !== 363 &&
          currentMonster !== 364 &&
          currentMonster !== 395 &&
          currentMonster !== 396
        ) {
          monsters.push([
            currentMonster,
            monsterRow,
            monsterCol,
            monsterHP,
            0,
            0,
          ]);
        }
      }
    }
  }

  if (currentMAP == 2) {
    toprigthX = bigMonster[0][1];
    botleftX = bigMonster[1][1];
    botrigthX = bigMonster[2][1];
    toprigthY = bigMonster[0][2];
    botleftY = bigMonster[1][2];
    botrigthY = bigMonster[2][2];
    toprightimg = bigMonster[0][0];
    botleftimg = bigMonster[1][0];
    botrightimg = bigMonster[2][0];
  }
  if (currentMAP == 4) {
    toprigthX = bigMonster[0][1];
    botleftX = bigMonster[1][1];
    botrigthX = bigMonster[2][1];
    toprigthY = bigMonster[0][2];
    botleftY = bigMonster[1][2];
    botrigthY = bigMonster[2][2];
    toprightimg = bigMonster[0][0];
    botleftimg = bigMonster[1][0];
    botrightimg = bigMonster[2][0];
  }
}

//Keys i press
function keydownHandler(event) {
  // key presses action
  switch (event.keyCode) {
    case UP:
      moveUp();
      break;
    case DOWN:
      moveDown();
      break;
    case LEFT:
      moveLeft();
      break;
    case RIGHT:
      moveRight();
      break;
    case INTERACT:
      interact();
      break;
    case WAIT:
      waitTurn();
      break;
    case POTION:
      heal();
      break;
    case DROP:
      drop();
      break;
    case STATS:
      playerStats();
      break;
  }
}
// -----------------------------------------------------------------  MAPS -----------------------------------------------------------------------//
// map movement with player
function map1Move(direction, sign) {
  // top : value +/- 64  px
  if (direction == "top" && sign == "+") {
    mapTop = mapTop + 64;
  }
  if (direction == "top" && sign == "-") {
    mapTop = mapTop - 64;
  }
  if (direction == "left" && sign == "+") {
    mapLeft = mapLeft + 64;
  }
  if (direction == "left" && sign == "-") {
    mapLeft = mapLeft - 64;
  }
  floorStage.style = "top:" + mapTop + "px; left: " + mapLeft + "px";
  wallStage.style = "top:" + mapTop + "px; left: " + mapLeft + "px";
  colisionStage.style = "top:" + mapTop + "px; left: " + mapLeft + "px";
  entitiesStage.style = "top:" + mapTop + "px; left: " + mapLeft + "px";
  itemsStage.style = "top:" + mapTop + "px; left: " + mapLeft + "px";
}

// this render is for the map only it activates only when you pass a level
function render() {
  let ROWS;
  let COLUMNS;
  //main menu backround
  if (currentMAP == 0) {
    ROWS = mapBegining.length;
    COLUMNS = mapBegining[0].length;
  }
  //first level length row col
  if (currentMAP == 1) {
    document.getElementById("backpackUI").style = "display: block;";
    ROWS = map1Floor.length;
    COLUMNS = map1Floor[0].length;
    playerGPS();

    //find monster
    findMonster1();

    // first map ajustment for player view
    floorStage.style = "top: 128px; left: 384px";
    wallStage.style = "top: 128px; left: 384px";
    colisionStage.style = "top: 128px; left: 384px";
    entitiesStage.style = "top: 128px; left: 384px";
    itemsStage.style = "top: 128px; left: 384px";
    mapTop = 128;
    mapLeft = 384;
    currentMapEnt = map1Entities;
    currentMapCol = map1Colisions;
    curremtMapFlr = map1Floor;
    currentMapWal = map1Walls;
    currentMapItm = map1Items;
  }
  // map 2
  if (currentMAP == 2) {
    floorStage.innerHTML = "";
    wallStage.innerHTML = "";
    colisionStage.innerHTML = "";
    entitiesStage.innerHTML = "";
    itemsStage.innerHTML = "";
    currentMapEnt = map2entites;
    currentMapCol = map2colisions;
    curremtMapFlr = map2floor;
    currentMapWal = map2walls;
    currentMapItm = map2items;

    ROWS = map2floor.length;
    COLUMNS = map2floor[0].length;

    // second map ajustment for player view
    floorStage.style = "top: -576px; left: 320px";
    wallStage.style = "top: -576px; left: 320px";
    colisionStage.style = "top: -576px; left: 320px";
    entitiesStage.style = "top: -576px; left: 320px";
    itemsStage.style = "top: -576px; left: 320px";
    mapTop = -576;
    mapLeft = 320;
    playerGPS();
    monsters = [];
    //find monster
    findMonster1();
  }
  // map 3
  if (currentMAP == 3) {
    floorStage.innerHTML = "";
    wallStage.innerHTML = "";
    colisionStage.innerHTML = "";
    entitiesStage.innerHTML = "";
    itemsStage.innerHTML = "";
    currentMapEnt = map3entities;
    currentMapCol = map3colisions;
    curremtMapFlr = map3floor;
    currentMapWal = map3walls;
    currentMapItm = map3items;

    ROWS = map3floor.length;
    COLUMNS = map3floor[0].length;

    // third map ajustment for player view
    floorStage.style = "top: -960px; left: -1216px;";
    wallStage.style = "top: -960px; left: -1216px;";
    colisionStage.style = "top: -960px; left: -1216px;";
    entitiesStage.style = "top: -960px; left: -1216px;";
    itemsStage.style = "top: -960px; left: -1216px;";
    mapTop = -960;
    mapLeft = -1216;
    playerGPS();
    //find monster
    monsters = [];
    findMonster1();
  }
  // map 4
  if (currentMAP == 4) {
    floorStage.innerHTML = "";
    wallStage.innerHTML = "";
    colisionStage.innerHTML = "";
    entitiesStage.innerHTML = "";
    itemsStage.innerHTML = "";
    currentMapEnt = map4entities;
    currentMapCol = map4colisions;
    curremtMapFlr = map4floor;
    currentMapWal = map4walls;
    currentMapItm = map4items;

    ROWS = map4floor.length;
    COLUMNS = map4floor[0].length;

    // fourth map ajustment for player view
    floorStage.style = "top: -2112px; left: -448px;";
    wallStage.style = "top: -2112px; left: -448px;";
    colisionStage.style = "top: -2112px; left: -448px;";
    entitiesStage.style = "top: -2112px; left: -448px;";
    itemsStage.style = "top: -2112px; left: -448px;";
    mapTop = -2112;
    mapLeft = -448;
    playerGPS();
    //find monster
    monsters = [];
    findMonster1();
  }

  // display on screen current map

  for (let row = 0; row < ROWS; row++) {
    for (let column = 0; column < COLUMNS; column++) {
      // main page background
      if (currentMAP == 0) {
        cell = document.createElement("img");
        cell.setAttribute("class", "cell");
        backgroundStage.appendChild(cell);
        switchForImages(mapBegining, row, column);
      }
      // map 1 floor
      if (currentMAP == 1) {
        cell = document.createElement("img");
        cell.setAttribute("class", "cell");
        floorStage.appendChild(cell);
        switchForImages(map1Floor, row, column);
      }
      // map 2 floor
      if (currentMAP == 2) {
        cell = document.createElement("img");
        cell.setAttribute("class", "cell");
        floorStage.appendChild(cell);
        switchForImages(map2floor, row, column);
      }
      // map 3 floor
      if (currentMAP == 3) {
        cell = document.createElement("img");
        cell.setAttribute("class", "cell");
        floorStage.appendChild(cell);
        switchForImages(map3floor, row, column);
      }
      // map 4 floor
      if (currentMAP == 4) {
        cell = document.createElement("img");
        cell.setAttribute("class", "cell");
        floorStage.appendChild(cell);
        switchForImages(map4floor, row, column);
      }

      //position
      cell.style.top = row * SIZE + "px";
      cell.style.left = column * SIZE + "px";
    }
  }

  for (let row = 0; row < ROWS; row++) {
    for (let column = 0; column < COLUMNS; column++) {
      // map 1 walls
      if (currentMAP == 1) {
        cell = document.createElement("img");
        cell.setAttribute("class", "cell");
        wallStage.appendChild(cell);
        switchForImages(map1Walls, row, column);
      }
      // map 2 walls
      if (currentMAP == 2) {
        cell = document.createElement("img");
        cell.setAttribute("class", "cell");
        wallStage.appendChild(cell);
        switchForImages(map2walls, row, column);
      }
      // map 3 walls
      if (currentMAP == 3) {
        cell = document.createElement("img");
        cell.setAttribute("class", "cell");
        wallStage.appendChild(cell);
        switchForImages(map3walls, row, column);
      }
      // map 4 walls
      if (currentMAP == 4) {
        cell = document.createElement("img");
        cell.setAttribute("class", "cell");
        wallStage.appendChild(cell);
        switchForImages(map4walls, row, column);
      }
      //position
      cell.style.top = row * SIZE + "px";
      cell.style.left = column * SIZE + "px";
    }
  }

  for (let row = 0; row < ROWS; row++) {
    for (let column = 0; column < COLUMNS; column++) {
      // map 1 colision
      if (currentMAP == 1) {
        cell = document.createElement("img");
        cell.setAttribute("class", "cell");
        colisionStage.appendChild(cell);
        switchForImages(map1Colisions, row, column);
      }
      // map 2 colision
      if (currentMAP == 2) {
        cell = document.createElement("img");
        cell.setAttribute("class", "cell");
        colisionStage.appendChild(cell);
        switchForImages(map2colisions, row, column);
      }
      // map 3 colision
      if (currentMAP == 3) {
        cell = document.createElement("img");
        cell.setAttribute("class", "cell");
        colisionStage.appendChild(cell);
        switchForImages(map3colisions, row, column);
      }
      // map 4 colision
      if (currentMAP == 4) {
        cell = document.createElement("img");
        cell.setAttribute("class", "cell");
        colisionStage.appendChild(cell);
        switchForImages(map4colisions, row, column);
      }

      //position
      cell.style.top = row * SIZE + "px";
      cell.style.left = column * SIZE + "px";
    }
  }

  renderEntities();
  renderItems();
}

// render (colision) items?
function renderItems() {
  let ROWS;
  let COLUMNS;
  if (currentMAP == 1) {
    ROWS = map1Items.length;
    COLUMNS = map1Items[0].length;
  }
  if (currentMAP == 2) {
    ROWS = map2items.length;
    COLUMNS = map2items[0].length;
  }
  if (currentMAP == 3) {
    ROWS = map3items.length;
    COLUMNS = map3items[0].length;
  }
  if (currentMAP == 4) {
    ROWS = map4items.length;
    COLUMNS = map4items[0].length;
  }

  //Clear the stage of img tag cells from the previous turn
  if (itemsStage.hasChildNodes()) {
    for (var i = 0; i < ROWS * COLUMNS; i++) {
      itemsStage.removeChild(itemsStage.firstChild);
    }
  }

  for (let row = 0; row < ROWS; row++) {
    for (let column = 0; column < COLUMNS; column++) {
      // map 1 itesm
      if (currentMAP == 1) {
        cell = document.createElement("img");
        cell.setAttribute("class", "cell");
        itemsStage.appendChild(cell);
        switchForImages(map1Items, row, column);
      }
      // map 2 items
      if (currentMAP == 2) {
        cell = document.createElement("img");
        cell.setAttribute("class", "cell");
        itemsStage.appendChild(cell);
        switchForImages(map2items, row, column);
      }
      // map 3 items
      if (currentMAP == 3) {
        cell = document.createElement("img");
        cell.setAttribute("class", "cell");
        itemsStage.appendChild(cell);
        switchForImages(map3items, row, column);
      }
      // map 4 items
      if (currentMAP == 4) {
        cell = document.createElement("img");
        cell.setAttribute("class", "cell");
        itemsStage.appendChild(cell);
        switchForImages(map4items, row, column);
      }

      //position
      cell.style.top = row * SIZE + "px";
      cell.style.left = column * SIZE + "px";
    }
  }
}

// render the fog
function fogScreen() {
  let ROWS = fog.length;
  let COLUMNS = fog[0].length;
  for (let row = 0; row < ROWS; row++) {
    for (let column = 0; column < COLUMNS; column++) {
      cell = document.createElement("img");
      cell.setAttribute("class", "cell");
      document.getElementById("fog").appendChild(cell);
      switch (fog[row][column]) {
        case fog95:
          cell.src = "tileset/black.png";
          cell.style = "opacity: 100%;";
          break;
        case fog75:
          cell.src = "tileset/black.png";
          cell.style = "opacity: 95%;";
          break;
        case fog50:
          cell.src = "tileset/black.png";
          cell.style = "opacity: 85%;";
          break;
        case fog35:
          cell.src = "tileset/black.png";
          cell.style = "opacity: 70%;";
          break;
        case fog15:
          cell.src = "tileset/black.png";
          cell.style = "opacity: 45%;";
          break;
        case fog0:
          cell.src = "tileset/black.png";
          cell.style = "opacity: 0%;";
          break;
      }
      //position
      cell.style.top = row * SIZE + "px";
      cell.style.left = column * SIZE + "px";
    }
  }
}

// render the player and monsters most times when you do an action and checks if spetial events happen
function renderEntities() {
  let ROWS;
  let COLUMNS;
  //first level length row col
  if (currentMAP == 1) {
    ROWS = map1Floor.length;
    COLUMNS = map1Floor[0].length;
    // ui show
    UIStage.style = "display: block;";
  }
  // map 2
  if (currentMAP == 2) {
    ROWS = map2floor.length;
    COLUMNS = map2floor[0].length;
    // ui show
    UIStage.style = "display: block;";
  }
  // map 3
  if (currentMAP == 3) {
    ROWS = map3floor.length;
    COLUMNS = map3floor[0].length;
    // ui show
    UIStage.style = "display: block;";
  }
  // map 4
  if (currentMAP == 4) {
    ROWS = map4floor.length;
    COLUMNS = map4floor[0].length;
    // ui show
    UIStage.style = "display: block;";
  }

  //Clear the stage of img tag cells from the previous turn
  if (entitiesStage.hasChildNodes()) {
    for (var i = 0; i < ROWS * COLUMNS; i++) {
      entitiesStage.removeChild(entitiesStage.firstChild);
    }
  }

  for (let row = 0; row < ROWS; row++) {
    for (let column = 0; column < COLUMNS; column++) {
      // map 1 entities
      if (currentMAP == 1) {
        cell = document.createElement("img");
        cell.setAttribute("class", "cell");
        entitiesStage.appendChild(cell);
        switchForEntities(map1Entities, row, column);
      }
      // map 2 entitles
      if (currentMAP == 2) {
        cell = document.createElement("img");
        cell.setAttribute("class", "cell");
        entitiesStage.appendChild(cell);
        switchForEntities(map2entites, row, column);
      }
      // map 3 entitles
      if (currentMAP == 3) {
        cell = document.createElement("img");
        cell.setAttribute("class", "cell");
        entitiesStage.appendChild(cell);
        switchForEntities(map3entities, row, column);
      }
      // map 4 entitles
      if (currentMAP == 4) {
        cell = document.createElement("img");
        cell.setAttribute("class", "cell");
        entitiesStage.appendChild(cell);
        switchForEntities(map4entities, row, column);
      }
      //position
      cell.style.top = row * SIZE + "px";
      cell.style.left = column * SIZE + "px";
    }
  }

  // check if a monster is cheasing if I am close enough
  chaseMonster();

  // if i am close to a  monster it attacks me
  if (playerX !== undefined && playerY !== undefined) {
    attackFromMonster();
  }

  // check if player is dead
  if (HP <= 0) {
    endGame();
  }

  // check if xp potion is active or has run out
  if (xppotionactive == 1) {
    turnsXPpot++;
    if (turnsXPpot >= 25) {
      gameMessage += "The potion ran out.";
      xppotionactive = 0;
      maxEXPnumber = maxEXPnumber / 3;
    }
  }

  // check silver chest
  if (currentMAP == 3) {
    silverChest();
  }

  // check if level up (xp)
  checkXP();

  // shows hp
  hpText.innerHTML = "Hp: " + HP + "/" + maxHP;
  // shows exp
  xpText.innerHTML = "Lvl " + playerLevel + " xp: "; //+ EXP + "/" + maxEXP;
  // game message shows
  if (waitTurnVal == 1) {
    gameMessage += "You wait.";
    waitTurnVal = 0;
  }

  output.innerHTML = gameMessage;
  gameMessage = "";
}

// render moster id they move
function renderMonster() {
  let ROWS;
  let COLUMNS;
  //first level length row col
  if (currentMAP == 1) {
    ROWS = map1Floor.length;
    COLUMNS = map1Floor[0].length;
    // ui show
    UIStage.style = "display: block;";
  }
  // map 2
  if (currentMAP == 2) {
    ROWS = map2floor.length;
    COLUMNS = map2floor[0].length;
    // ui show
    UIStage.style = "display: block;";
  }
  // map 3
  if (currentMAP == 3) {
    ROWS = map3floor.length;
    COLUMNS = map3floor[0].length;
    // ui show
    UIStage.style = "display: block;";
  }
  // map 4
  if (currentMAP == 4) {
    ROWS = map4floor.length;
    COLUMNS = map4floor[0].length;
    // ui show
    UIStage.style = "display: block;";
  }

  //Clear the stage of img tag cells from the previous turn
  if (entitiesStage.hasChildNodes()) {
    for (var i = 0; i < ROWS * COLUMNS; i++) {
      entitiesStage.removeChild(entitiesStage.firstChild);
    }
  }

  for (let row = 0; row < ROWS; row++) {
    for (let column = 0; column < COLUMNS; column++) {
      // map 1 entities
      if (currentMAP == 1) {
        cell = document.createElement("img");
        cell.setAttribute("class", "cell");
        entitiesStage.appendChild(cell);
        switchForEntities(map1Entities, row, column);
      }
      // map 2 entities
      if (currentMAP == 2) {
        cell = document.createElement("img");
        cell.setAttribute("class", "cell");
        entitiesStage.appendChild(cell);
        switchForEntities(map2entites, row, column);
      }
      // map 3 entities
      if (currentMAP == 3) {
        cell = document.createElement("img");
        cell.setAttribute("class", "cell");
        entitiesStage.appendChild(cell);
        switchForEntities(map3entities, row, column);
      }
      // map 4 entities
      if (currentMAP == 4) {
        cell = document.createElement("img");
        cell.setAttribute("class", "cell");
        entitiesStage.appendChild(cell);
        switchForEntities(map4entities, row, column);
      }

      //position
      cell.style.top = row * SIZE + "px";
      cell.style.left = column * SIZE + "px";
    }
  }
}

// -------------------------------------------------------------------------- MONSTERS ---------------------------------------------------------------//
// when player gets too close to a monster it puts the monter position from monsters
// array in a different array and that monster start to chase the player meaning it will
// find the nearest move avalible and move that way.
function chaseMonster() {
  let monsterAreaY;
  let monsterAreaX;
  // each monster in monsters array
  for (let MON = 0; MON < monsters.length; MON++) {
    monsterAreaY = monsters[MON][2] - monsterStartPointY;
    monsterAreaX = monsters[MON][1] - monsterStartPointX;
    //find player in monster area.
    // monster view and area are for the necklace items
    for (let i = monsterAreaY; i < monsterAreaY + monsterViewY; i++) {
      for (let j = monsterAreaX; j < monsterAreaX + monsterViewX; j++) {
        if (currentMapEnt[i][j] == PLAYER) {
          testmonster = MON;
          if (currentChaseMonster.indexOf(MON) == -1) {
            currentChaseMonster.push(MON);
          }
          monsters[MON][4] = 1;
        }
      }
    }
  }

  // monsters that are in distance
  for (
    let chasingMonster = 0;
    chasingMonster < currentChaseMonster.length;
    chasingMonster++
  ) {
    let monsterNUM = currentChaseMonster[chasingMonster];
    let moveset = [];
    let differenceY;
    let differenceX;
    // player on the left
    if (monsters[monsterNUM][1] > playerX) {
      moveset.push("left");
      differenceX = monsters[monsterNUM][1] - playerX;
    }
    // player vertical same
    if (monsters[monsterNUM][1] == playerX) {
      moveset.push("vertical");
      differenceX = monsters[monsterNUM][1] - playerX;
    }
    //playter on the right
    if (monsters[monsterNUM][1] < playerX) {
      moveset.push("right");
      differenceX = monsters[monsterNUM][1] - playerX;
    }
    // player on the top
    if (monsters[monsterNUM][2] > playerY) {
      moveset.push("top");
      differenceY = monsters[monsterNUM][2] - playerY;
    }
    // player horizontal same
    if (monsters[monsterNUM][2] == playerY) {
      moveset.push("horizontal");
      differenceY = monsters[monsterNUM][2] - playerY;
    }
    //player on the bottom
    if (monsters[monsterNUM][2] < playerY) {
      moveset.push("bottom");
      differenceY = monsters[monsterNUM][2] - playerY;
    }
    // part that looks where player is, and moves the monster
    // all possble ways to can move or where the player is and monster.
    // takes the moves for the moveset array and depending on what they
    // are it waoves a certain way and clears the moveset array.
    if (moveset[0] == "left" && moveset[1] == "top") {
      if (differenceX > differenceY) {
        //monster should move left
        moveLEFTMonster(monsterNUM);
      } else {
        //monster should move up
        moveUPMonster(monsterNUM);
      }
    }

    if (moveset[0] == "left" && moveset[1] == "bottom") {
      if (differenceX + differenceY > 0) {
        //monster should move left
        moveLEFTMonster(monsterNUM);
      } else {
        //monster should move down
        moveDOWNMonster(monsterNUM);
      }
    }

    if (moveset[0] == "right" && moveset[1] == "top") {
      if (differenceX + differenceY < 0) {
        //"monster should move right
        moveRIGHTMonster(monsterNUM);
      } else {
        //"monster should move up
        moveUPMonster(monsterNUM);
      }
    }

    if (moveset[0] == "right" && moveset[1] == "bottom") {
      if (differenceX < differenceY) {
        //"monster should move right
        moveRIGHTMonster(monsterNUM);
      } else {
        //"monster should move down
        moveDOWNMonster(monsterNUM);
      }
    }

    if (moveset[0] == "vertical") {
      if (differenceY > 0) {
        //"monster should move top
        moveUPMonster(monsterNUM);
      } else {
        //"monster should move down
        moveDOWNMonster(monsterNUM);
      }
    }
    if (moveset[1] == "horizontal") {
      if (differenceX > 0) {
        //"monster should move left
        moveLEFTMonster(monsterNUM);
      } else {
        //"monster should move right
        moveRIGHTMonster(monsterNUM);
      }
    }
    moveset = [];
  }
}

// monster near player attack player
function monsterRandomAttack() {
  // attack 0 1 2 3 4 5 6
  // dodge 7
  monsterAttack = Math.floor(Math.random() * dodgeVariable);
  if (monsterAttack <= 6) {
    //attack
    monsterDamage =
      Math.floor(Math.random() * mathMonsterNumber) + playerLevel - shield;
    if (monsterDamage < 0) monsterDamage = 0;
    HpBar(monsterDamage);
    HP = HP - monsterDamage;
    // saves the player for dying and removes the totem
    if (totemActive == 1 && HP < 1) {
      HP = 1;
      necklace1item.className = "tableimg nothing";
      necklace1item.src = "tileset/22.png";
      gameMessage += "The totem has been used. <br>";
      totemActive = 0;
      HpBar(0);
    }
    gameMessage += "The monster did: " + monsterDamage + " damage. ";
  }
  if (monsterAttack >= 8) {
    // dodge
    gameMessage += "You dodge. ";
  }
}

// monster attack when player is close
function attackFromMonster() {
  if (
    currentMapEnt[playerY][playerX - 1] !== 0 ||
    currentMapEnt[playerY][playerX + 1] !== 0 ||
    currentMapEnt[playerY - 1][playerX] !== 0 ||
    currentMapEnt[playerY + 1][playerX] !== 0 ||
    currentMapEnt[playerY + 1][playerX + 1] !== 0 ||
    currentMapEnt[playerY + 1][playerX - 1] !== 0 ||
    currentMapEnt[playerY - 1][playerX - 1] !== 0 ||
    currentMapEnt[playerY - 1][playerX + 1] !== 0
  ) {
    monsterRandomAttack();
  }
}

// switch for entities player and monster splites
function switchForEntities(maptest, currentROW, currentCOL) {
  switch (maptest[currentROW][currentCOL]) {
    case NOTHING:
      cell.src = "tileset/22.png";
      break;
    // player;
    case PLAYER:
      if (directionLook == 0) {
        cell.src = "tileset/261.png";
      } else if (directionLook == 1) {
        cell.src = "tileset/261-reversed.png";
      } else if (directionLook == 2) {
        cell.src = "tileset/261-up.png";
      } else {
        cell.src = "tileset/261-down.png";
      }
      break;
    // monsters
    case MONSTERGREENDUDELIL:
      cell.src = "tileset/421.png";
      break;
    case MONSTERLILORC:
      cell.src = "tileset/321.png";
      break;
    case MONSTERCRYLIL:
      cell.src = "tileset/289.png";
      break;
    case MONSTERDEMONLIL:
      cell.src = "tileset/353.png";
      break;
    case monsterNew1:
      cell.src = "tileset/354.png";
      break;
    case monsterNew2:
      cell.src = "tileset/291.png";
      break;
    case monsterNew3:
      cell.src = "tileset/292.png";
      break;
    case monsterNew4:
      cell.src = "tileset/323.png";
      break;
    case monsterNew5:
      cell.src = "tileset/356.png";
      break;
    case boss1topleft:
      cell.src = "tileset/361.png";
      break;
    case boss1topright:
      cell.src = "tileset/362.png";
      break;
    case boss1botleft:
      cell.src = "tileset/393.png";
      break;
    case boss1botright:
      cell.src = "tileset/394.png";
      break;
    case fireSpirit:
      cell.src = "tileset/419.png";
      break;
    case waterSpirit:
      cell.src = "tileset/418.png";
      break;
    case windSpirit:
      cell.src = "tileset/420.png";
      break;
    case groundSpirit:
      cell.src = "tileset/417.png";
      break;
    case muk:
      cell.src = "tileset/422.png";
      break;
    case boss2tl:
      cell.src = "tileset/363.png";
      break;
    case boss2tr:
      cell.src = "tileset/364.png";
      break;
    case boss2bl:
      cell.src = "tileset/395.png";
      break;
    case boss2br:
      cell.src = "tileset/396.png";
      break;
    case bigfireSpirit:
      cell.src = "tileset/387.png";
      break;
    case bigwaterSpirit:
      cell.src = "tileset/386.png";
      break;
    case bigwindSpirit:
      cell.src = "tileset/388.png";
      break;
    case biggroundSpirit:
      cell.src = "tileset/385.png";
      break;
    case bigmuk:
      cell.src = "tileset/390.png";
      break;
  }
}

// end kill final boss, map 4
function finalbossKill() {
  // boxes eliminate
  currentMapItm[13][16] = 0;
  currentMapItm[13][19] = 0;
  currentMapItm[13][17] = 0;
  currentMapItm[13][18] = 0;
  currentMapItm[14][16] = 0;
  currentMapItm[14][17] = 0;
  currentMapItm[14][18] = 0;
  currentMapItm[14][19] = 0;
  // colisions eliminate
  currentMapCol[13][16] = 0;
  currentMapCol[13][19] = 0;
  currentMapCol[13][18] = 0;
  currentMapCol[13][17] = 0;
  currentMapCol[14][19] = 0;
  currentMapCol[14][18] = 0;
  currentMapCol[14][17] = 0;
  currentMapCol[14][16] = 0;
  endgamePoints += 1000;
  renderItems();
}

// ---------------------------------------------------------------------- HEAL and POTIONS ------------------------------------------------------------//
// potions hp and xp
function heal() {
  let classname = potion1item.className;
  // no  potions
  if (classname.indexOf("nothing") !== -1) {
    output.innerHTML = "You have no potions ";
  }
  // hp potion
  if (classname.indexOf("hppotion") == -1) {
    if (backpack.indexOf("hppotion") !== -1) {
      output.innerHTML = "You have no health potions equiped";
    }
  } else {
    HpBarHeal(20);
    output.innerHTML = "You use a potion heal 20 hp";
    potion1item.src = "tileset/22.png";
    potion1item.className = "tableimg nothing";
  }
  // xp potion
  if (classname.indexOf("xppotion") == -1) {
    if (backpack.indexOf("xppotion") !== -1) {
      output.innerHTML = "You have no xp potions equiped";
    }
  } else {
    if (xppotionactive == 0) {
      // add function for having mobs drop more ex
      increaseXP();
      output.innerHTML = "You use a potion to increase xp";
      potion1item.src = "tileset/22.png";
      potion1item.className = "tableimg nothing";
    } else {
      output.innerHTML = "You have this effect applied";
    }
  }
}

// used xp potion
function increaseXP() {
  endgamePoints -= 30;
  xppotionactive = 1;
  maxEXPnumber = maxEXPnumber * 3;
}

// funciton for hp bar css
function HpBar(damage) {
  let hpRemain = ((HP - damage) * 150) / maxHP;
  document.getElementById("health-bar-green").style =
    "width: " + hpRemain + "px;";
}

// heal an amount of health
function HpBarHeal(heal) {
  let hpRemain = ((HP + heal) * 150) / maxHP;
  if (hpRemain > 150) {
    hpRemain = 150;
  }
  document.getElementById("health-bar-green").style =
    "width: " + hpRemain + "px;";
  HP += 20;
  endgamePoints -= 30;
  if (HP > maxHP) {
    HP = maxHP;
  }
  renderEntities();
}

// function for xp bar
function XpBar(xpMonster) {
  let xpGain = +(xpMonster * 150) / maxEXP;
  document.getElementById("xp-bar-yellow").style = "width: " + xpGain + "px;";
}

// check for level up xp
function checkXP() {
  if (EXP >= maxEXP) {
    endgamePoints += 100;
    EXP = EXP - maxEXP;
    maxEXP += 12;
    maxHP = maxHP + 5;
    playerLevel++;
    gameMessage = "You level up!";
    // playerNumberDamage = playerNumberDamage + 1
    HP = maxHP;
    HpBar(0);
    XpBar(EXP);
    playerPoints++;
  }
}

// ---------------------------------------------------------------------- ATTACKNG AND MOVING ------------------------------------------------------//
// monster movement up down left right
function moveUPMonster(mon) {
  let monsterlocX = monsters[mon][1];
  let monsterlocY = monsters[mon][2];
  let monsterNumber = monsters[mon][0];
  let bigmonster = monsters[mon][5];

  if (bigmonster == 0) {
    if (
      currentMapEnt[monsterlocY - 1][monsterlocX] == 0 &&
      currentMapCol[monsterlocY - 1][monsterlocX] == 0
    ) {
      currentMapEnt[monsterlocY][monsterlocX] = 0;
      monsterlocY--;
      monsters[mon][2] = monsterlocY;
      currentMapEnt[monsterlocY][monsterlocX] = monsterNumber;
      renderMonster();
    } else {
      //can't move monster
    }
  } else {
    if (
      currentMapEnt[monsterlocY - 1][monsterlocX] == 0 &&
      currentMapCol[monsterlocY - 1][monsterlocX] == 0 &&
      currentMapEnt[monsterlocY - 1][monsterlocX + 1] == 0 &&
      currentMapCol[monsterlocY - 1][monsterlocX + 1] == 0
    ) {
      currentMapEnt[monsterlocY][monsterlocX] = 0;
      currentMapEnt[toprigthY][toprigthX] = 0;
      currentMapEnt[botleftY][botleftX] = 0;
      currentMapEnt[botrigthY][botrigthX] = 0;
      monsterlocY--;
      toprigthY--;
      botleftY--;
      botrigthY--;
      monsters[mon][2] = monsterlocY;
      bigMonster[0][2] = toprigthY;
      bigMonster[1][2] = botleftY;
      bigMonster[2][2] = botrigthY;
      currentMapEnt[monsterlocY][monsterlocX] = monsterNumber;
      currentMapEnt[toprigthY][toprigthX] = toprightimg;
      currentMapEnt[botleftY][botleftX] = botleftimg;
      currentMapEnt[botrigthY][botrigthX] = botrightimg;
      renderMonster();
    } else {
      //"can't move monster"
    }
  }
}
function moveDOWNMonster(mon) {
  let monsterlocX = monsters[mon][1];
  let monsterlocY = monsters[mon][2];
  let monsterNumber = monsters[mon][0];
  let bigmonster = monsters[mon][5];

  if (bigmonster == 0) {
    if (
      currentMapEnt[monsterlocY + 1][monsterlocX] == 0 &&
      currentMapCol[monsterlocY + 1][monsterlocX] == 0
    ) {
      currentMapEnt[monsterlocY][monsterlocX] = 0;
      monsterlocY++;
      monsters[mon][2] = monsterlocY;
      currentMapEnt[monsterlocY][monsterlocX] = monsterNumber;
      renderMonster();
    } else {
      //"can't move monster"
    }
  } else {
    if (
      currentMapEnt[monsterlocY + 2][monsterlocX] == 0 &&
      currentMapCol[monsterlocY + 2][monsterlocX] == 0 &&
      currentMapEnt[monsterlocY + 2][monsterlocX + 1] == 0 &&
      currentMapCol[monsterlocY + 2][monsterlocX + 1] == 0
    ) {
      currentMapEnt[monsterlocY][monsterlocX] = 0;
      currentMapEnt[toprigthY][toprigthX] = 0;
      currentMapEnt[botleftY][botleftX] = 0;
      currentMapEnt[botrigthY][botrigthX] = 0;
      monsterlocY++;
      toprigthY++;
      botleftY++;
      botrigthY++;
      monsters[mon][2] = monsterlocY;
      bigMonster[0][2] = toprigthY;
      bigMonster[1][2] = botleftY;
      bigMonster[2][2] = botrigthY;
      currentMapEnt[monsterlocY][monsterlocX] = monsterNumber;
      currentMapEnt[toprigthY][toprigthX] = toprightimg;
      currentMapEnt[botleftY][botleftX] = botleftimg;
      currentMapEnt[botrigthY][botrigthX] = botrightimg;
      renderMonster();
    } else {
      //"can't move monster
    }
  }
}
function moveLEFTMonster(mon) {
  let monsterlocX = monsters[mon][1];
  let monsterlocY = monsters[mon][2];
  let monsterNumber = monsters[mon][0];
  let bigmonster = monsters[mon][5];

  if (bigmonster == 0) {
    if (
      currentMapEnt[monsterlocY][monsterlocX - 1] == 0 &&
      currentMapCol[monsterlocY][monsterlocX - 1] == 0
    ) {
      currentMapEnt[monsterlocY][monsterlocX] = 0;
      monsterlocX--;
      monsters[mon][1] = monsterlocX;
      currentMapEnt[monsterlocY][monsterlocX] = monsterNumber;
      renderMonster();
    } else {
      //"can't move monster"
    }
  } else {
    if (
      currentMapEnt[monsterlocY][monsterlocX - 1] == 0 &&
      currentMapCol[monsterlocY][monsterlocX - 1] == 0 &&
      currentMapEnt[monsterlocY + 1][monsterlocX - 1] == 0 &&
      currentMapCol[monsterlocY + 1][monsterlocX - 1] == 0
    ) {
      currentMapEnt[monsterlocY][monsterlocX] = 0;
      currentMapEnt[toprigthY][toprigthX] = 0;
      currentMapEnt[botleftY][botleftX] = 0;
      currentMapEnt[botrigthY][botrigthX] = 0;
      monsterlocX--;
      toprigthX--;
      botleftX--;
      botrigthX--;
      monsters[mon][1] = monsterlocX;
      bigMonster[0][1] = toprigthX;
      bigMonster[1][1] = botleftX;
      bigMonster[2][1] = botrigthX;
      currentMapEnt[monsterlocY][monsterlocX] = monsterNumber;
      currentMapEnt[toprigthY][toprigthX] = toprightimg;
      currentMapEnt[botleftY][botleftX] = botleftimg;
      currentMapEnt[botrigthY][botrigthX] = botrightimg;
      renderMonster();
    } else {
      //"can't move monster"
    }
  }
}
function moveRIGHTMonster(mon) {
  let monsterlocX = monsters[mon][1];
  let monsterlocY = monsters[mon][2];
  let monsterNumber = monsters[mon][0];
  let bigmonster = monsters[mon][5];

  if (bigmonster == 0) {
    if (
      currentMapEnt[monsterlocY][monsterlocX + 1] == 0 &&
      currentMapCol[monsterlocY][monsterlocX + 1] == 0
    ) {
      currentMapEnt[monsterlocY][monsterlocX] = 0;
      monsterlocX++;
      monsters[mon][1] = monsterlocX;
      currentMapEnt[monsterlocY][monsterlocX] = monsterNumber;
      renderMonster();
    } else {
      //can't move monster"
    }
  } else {
    if (
      currentMapEnt[monsterlocY][monsterlocX + 2] == 0 &&
      currentMapCol[monsterlocY][monsterlocX + 2] == 0 &&
      currentMapEnt[monsterlocY + 1][monsterlocX + 2] == 0 &&
      currentMapCol[monsterlocY + 1][monsterlocX + 2] == 0
    ) {
      currentMapEnt[monsterlocY][monsterlocX] = 0;
      currentMapEnt[toprigthY][toprigthX] = 0;
      currentMapEnt[botleftY][botleftX] = 0;
      currentMapEnt[botrigthY][botrigthX] = 0;
      monsterlocX++;
      toprigthX++;
      botleftX++;
      botrigthX++;
      monsters[mon][1] = monsterlocX;
      bigMonster[0][1] = toprigthX;
      bigMonster[1][1] = botleftX;
      bigMonster[2][1] = botrigthX;
      currentMapEnt[monsterlocY][monsterlocX] = monsterNumber;
      currentMapEnt[toprigthY][toprigthX] = toprightimg;
      currentMapEnt[botleftY][botleftX] = botleftimg;
      currentMapEnt[botrigthY][botrigthX] = botrightimg;

      renderMonster();
    } else {
      //"can't move monster"
    }
  }
}

// player movement
function moveUp() {
  // direction for player image
  directionLook = 2;
  if (currentMapEnt[playerY - 1][playerX] !== 0) {
    attackUP();
  } else {
    if (
      currentMapCol[playerY - 1][playerX] == 0 ||
      currentMapCol[playerY - 1][playerX] == 366
    ) {
      currentMapEnt[playerY][playerX] = 0;
      playerY--;
      currentMapEnt[playerY][playerX] = PLAYER;
      map1Move("top", "+");
    }
  }
  renderEntities();
}

function moveDown() {
  directionLook = 3;
  if (currentMapEnt[playerY + 1][playerX] !== 0) {
    attackDOWN();
  } else {
    if (
      currentMapCol[playerY + 1][playerX] == 0 ||
      currentMapCol[playerY + 1][playerX] == 366
    ) {
      currentMapEnt[playerY][playerX] = 0;
      playerY++;
      currentMapEnt[playerY][playerX] = PLAYER;
      map1Move("top", "-");
    }
  }
  renderEntities();
}
function moveLeft() {
  directionLook = 1;
  if (currentMapEnt[playerY][playerX - 1] !== 0) {
    attackLEFT();
  } else {
    if (
      currentMapCol[playerY][playerX - 1] == 0 ||
      currentMapCol[playerY][playerX - 1] == 366
    ) {
      currentMapEnt[playerY][playerX] = 0;
      playerX--;
      currentMapEnt[playerY][playerX] = PLAYER;
      map1Move("left", "+");
    }
  }
  renderEntities();
}
function moveRight() {
  directionLook = 0;
  if (currentMapEnt[playerY][playerX + 1] !== 0) {
    attackRIGHT();
  } else {
    if (
      currentMapCol[playerY][playerX + 1] == 0 ||
      currentMapCol[playerY][playerX + 1] == 366
    ) {
      currentMapEnt[playerY][playerX] = 0;
      playerX++;
      currentMapEnt[playerY][playerX] = PLAYER;
      map1Move("left", "-");
    }
  }
  renderEntities();
}

// movement attack when i move into a monster it attacks the moster
function attackUP() {
  // monster pos
  let monsterX = playerX;
  let monsterY = playerY - 1;
  playerDamage = Math.floor(Math.random() * playerNumberDamage) + 3;
  attackMove(monsterY, monsterX);
}

function attackDOWN() {
  // monster pos
  let monsterX = playerX;
  let monsterY = playerY + 1;
  playerDamage = Math.floor(Math.random() * playerNumberDamage) + 3;
  attackMove(monsterY, monsterX);
}

function attackLEFT() {
  // monster pos
  let monsterX = playerX - 1;
  let monsterY = playerY;
  playerDamage = Math.floor(Math.random() * playerNumberDamage) + 3;
  attackMove(monsterY, monsterX);
}

function attackRIGHT() {
  // monster pos
  let monsterX = playerX + 1;
  let monsterY = playerY;
  playerDamage = Math.floor(Math.random() * playerNumberDamage) + 3;

  attackMove(monsterY, monsterX);
}

// attaking monster by moving, monster dead
function attackMove(monsterY, monsterX) {
  for (let i = 0; i < monsters.length; i++) {
    if (monsters[i][1] == monsterX && monsters[i][2] == monsterY) {
      // checks if its a normal monter or boss
      if (monsters[i][5] == 0) {
        // remove health form only one monster
        monsters[i][3] = monsters[i][3] - playerDamage;
      } else {
        // remove health from all monster parts.
        monsters[i][3] = monsters[i][3] - playerDamage;
        bigMonster[0][3] = bigMonster[0][3] - playerDamage;
        bigMonster[1][3] = bigMonster[1][3] - playerDamage;
        bigMonster[2][3] = bigMonster[2][3] - playerDamage;
      }
      // damage number on screen
      document.getElementById("showDamageNumber").innerHTML = playerDamage;
      setTimeout(function () {
        document.getElementById("showDamageNumber").innerHTML = "";
      }, delayInMilliseconds);
      // monster die
      if (monsters[i][3] <= 0) {
        // normal monsters
        if (monsters[i][5] == 0) {
          endgamePoints += 150;
          monsterKills++;
          randomEXP = Math.floor(Math.random() * maxEXPnumber) + 4;
          EXP += randomEXP;
          currentMapEnt[monsterY][monsterX] = 0;
          monsters.splice(i, 1);
          itemDrop(monsterY, monsterX, "monster");
          currentChaseMonster = [];
          // funciton xp bar
          XpBar(EXP);
        } else {
          // boss
          endgamePoints += 1000;
          bossKills++;
          randomEXP = Math.floor(Math.random() * maxEXPnumber) + 40;
          EXP += randomEXP;
          currentMapEnt[monsterY][monsterX] = 0;
          currentMapEnt[toprigthY][toprigthX] = 0;
          currentMapEnt[botleftY][botleftX] = 0;
          currentMapEnt[botrigthY][botrigthX] = 0;
          bigMonster = [];
          monsters.splice(i, 1);
          itemDrop(monsterY, monsterX, "boss");
          currentChaseMonster = [];
          XpBar(EXP);
          if (currentMAP == 4) {
            finalbossKill();
          }
        }
      }
    }
  }
  // if i attacked a boss part instead of main part (top left)
  for (let i = 0; i < bigMonster.length; i++) {
    if (bigMonster[i][1] == monsterX && bigMonster[i][2] == monsterY) {
      // damage number
      document.getElementById("showDamageNumber").innerHTML = playerDamage;
      setTimeout(function () {
        document.getElementById("showDamageNumber").innerHTML = "";
      }, delayInMilliseconds);

      let boss;
      let bossY;
      let bossX;
      for (let i = 0; i < monsters.length; i++) {
        if (monsters[i][5] == 1) {
          boss = i;
          bossY = monsters[boss][2];
          bossX = monsters[boss][1];
        }
      }
      monsters[boss][3] = monsters[boss][3] - playerDamage;
      bigMonster[0][3] = bigMonster[0][3] - playerDamage;
      bigMonster[1][3] = bigMonster[1][3] - playerDamage;
      bigMonster[2][3] = bigMonster[2][3] - playerDamage;
      if (monsters[boss][3] <= 0) {
        endgamePoints += 1000;
        bossKills++;
        randomEXP = Math.floor(Math.random() * maxEXPnumber) + 40;
        EXP += randomEXP;
        currentMapEnt[bossY][bossX] = 0;
        currentMapEnt[toprigthY][toprigthX] = 0;
        currentMapEnt[botleftY][botleftX] = 0;
        currentMapEnt[botrigthY][botrigthX] = 0;
        bigMonster = [];
        monsters.splice(boss, 1);
        itemDrop(monsterY, monsterX, "boss");
        currentChaseMonster = [];
        XpBar(EXP);
        if (currentMAP == 4) {
          finalbossKill();
        }
      }
    }
  }
}

//------------------------------------------------------------------------------ ITEMS ---------------------------------------------------------------------------//

//interact attack monsters nearby more then one grab items and go down a level
function interact() {
  let playerAreaY = playerY - 1;
  let playerAreaX = playerX - 1;

  //find in player area.
  for (let i = playerAreaY; i < playerAreaY + 3; i++) {
    for (let j = playerAreaX; j < playerAreaX + 3; j++) {
      //monster
      if (currentMapEnt[i][j] !== PLAYER && currentMapEnt[i][j] !== 0) {
        playerDamage = Math.floor(Math.random() * playerNumberDamage) + 3;
        attackMove(i, j);
        renderEntities();
      }
      // grab hp potion in player area.
      if (currentMapItm[i][j] == 1337) {
        backpack.push("hppotion");
        backpackitem("hppotion", i, j);
        renderItems();
        renderEntities();
      }
      // gram potionxp in player area
      if (currentMapItm[i][j] == 1557) {
        backpack.push("xppotion");
        backpackitem("xppotion", i, j);
        renderItems();
        renderEntities();
      }
      // grab dmg ring
      if (currentMapItm[i][j] == 1007) {
        backpack.push("dmgring");
        backpackitem("dmgring", i, j);
        renderItems();
        renderEntities();
      }
      // grab dodge ring
      if (currentMapItm[i][j] == 1117) {
        backpack.push("dodgering");
        backpackitem("dodgering", i, j);
        renderItems();
        renderEntities();
      }
      // grab hp ring
      if (currentMapItm[i][j] == 997) {
        backpack.push("hpring");
        backpackitem("hpring", i, j);
        renderItems();
        renderEntities();
      }
      // grab view necklace
      if (currentMapItm[i][j] == 1227) {
        backpackitem("viewneck", i, j);
        renderItems();
        renderEntities();
      }
      // grab totem
      if (currentMapItm[i][j] == 1447) {
        backpackitem("totem", i, j);
        renderItems();
        renderEntities();
      }
      // open chest
      if (currentMapItm[i][j] == 368) {
        endgamePoints += 200;
        itemDrop(i, j, "chest");
        currentMapItm[i][j] = 10000;
        renderItems();
        renderEntities();
      }
      // next level
      if (curremtMapFlr[i][j] == 243) {
        endgamePoints += 500;
        if (currentMAP !== 4) {
          currentMAP++;
          maxEXPnumber += 7;
          loadingScreen();
          // loading screen
          render();
        } else {
          endGame();
        }
      }
      // key
      if (currentMapItm[i][j] == 9999) {
        endgamePoints += 300;
        backpackitem("key", i, j);
        renderItems();
        renderEntities();
      }
      // door open if i have key
      if (currentMapItm[i][j] == 88 || currentMapItm[i][j] == 89) {
        opendoor();
        renderItems();
      }
      // siver chest
      if (currentMapItm[i][j] == 367) {
        gameMessage += "You can't open the chest this way.";
        renderEntities();
      }
    }
  }
}

// Puts item in empty equip slot first then in backpack
function backpackitem(item, i, j) {
  let classnamepotion = potion1item.className;
  let classnameneck = necklace1item.className;
  let classnamering1 = ring1item.className;
  let classnamering2 = ring2item.className;
  let I = i;
  let J = j;
  let itemSrc;
  let itemClass;
  // save the item i gram or remove
  if (item == "hppotion") {
    itemSrc = "tileset/hppotion.png";
    itemClass = "tableimg hppotion";
  }
  if (item == "xppotion") {
    itemSrc = "tileset/xppotion.png";
    itemClass = "tableimg xppotion";
  }
  if (item == "totem") {
    itemSrc = "tileset/totem.png";
    itemClass = "tableimg totem";
  }
  if (item == "viewneck") {
    itemSrc = "tileset/necklace1.png";
    itemClass = "tableimg viewneck";
  }
  if (item == "dmgring") {
    itemSrc = "tileset/demonring.png";
    itemClass = "tableimg dmgring";
  }
  if (item == "hpring") {
    itemSrc = "tileset/ringstreangth.png";
    itemClass = "tableimg hpring";
  }
  if (item == "dodgering") {
    itemSrc = "tileset/ringquickness.png";
    itemClass = "tableimg dodgering";
  }
  if (item == "key") {
    itemSrc = "tileset/key.png";
    itemClass = "tableimg key";
  }
  // potions
  if (item == "hppotion" || item == "xppotion") {
    if (classnamepotion.indexOf("nothing") !== -1) {
      potion1item.src = itemSrc;
      potion1item.className = itemClass;
      currentMapItm[I][J] = 0;
    } else {
      putItemBackpack(itemSrc, itemClass, I, J);
    }
  }
  // totem and necklace
  if (item == "totem" || item == "viewneck") {
    if (classnameneck.indexOf("nothing") !== -1) {
      necklace1item.src = itemSrc;
      necklace1item.className = itemClass;
      currentMapItm[I][J] = 0;
    } else {
      putItemBackpack(itemSrc, itemClass, I, J);
    }
  }
  //rings
  if (item == "dmgring" || item == "dodgering" || item == "hpring") {
    if (classnamering1.indexOf("nothing") !== -1) {
      ring1item.src = itemSrc;
      ring1item.className = itemClass;
      currentMapItm[I][J] = 0;
    } else if (classnamering2.indexOf("nothing") !== -1) {
      ring2item.src = itemSrc;
      ring2item.className = itemClass;
      currentMapItm[I][J] = 0;
    } else {
      putItemBackpack(itemSrc, itemClass, I, J);
    }
  }
  // key level 3
  if (item == "key") {
    putItemBackpack(itemSrc, itemClass, I, J);
  }
  avtiveItems();
}
// puts item in backpack
function putItemBackpack(itemSrc, itemClass, I, J) {
  fullbackpack = 0;
  for (let i = 1; i < 9; i++) {
    let itemname = "item" + i;
    let classname = document.getElementById(itemname).className;
    if (classname.indexOf("nothing") !== -1) {
      document.getElementById(itemname).src = itemSrc;
      document.getElementById(itemname).className = itemClass;
      currentMapItm[I][J] = 0;
      fullbackpack = 1;
      break;
    }
  }
  deactivateItems(itemClass);
  avtiveItems();
  if (fullbackpack == 0) {
    gameMessage += "You have too many items.";
    console.log("toomanyitems");
    renderEntities();
  }
}

// backpack unequip item
function unequipItem(slot) {
  let slotClass = document.getElementById(slot).className;
  //console.log("unequip", slotClass);
  for (let i = 1; i < 9; i++) {
    let itemname = "item" + i;
    let classname = document.getElementById(itemname).className;
    if (classname.indexOf("nothing") !== -1) {
      document.getElementById(itemname).src = document.getElementById(slot).src;
      document.getElementById(itemname).className =
        document.getElementById(slot).className;
      document.getElementById(slot).src = "tileset/22.png";
      document.getElementById(slot).className = "tableimg nothing";
      break;
    }
  }
  deactivateItems(slotClass);
  avtiveItems();
  HpBar(0);
}

// backpack equip item
function equipItem(slot) {
  let slotClass = document.getElementById(slot).className;
  //console.log("equip", slotClass);
  let potion1itemClass = potion1item.className;
  let necklace1itemClass = necklace1item.className;
  let ring1itemClass = ring1item.className;
  let ring2itemClass = ring2item.className;
  // potions
  if (
    slotClass.indexOf("hppotion") !== -1 ||
    slotClass.indexOf("xppotion") !== -1
  ) {
    if (potion1itemClass.indexOf("nothing") == -1) {
      document.getElementById(slot).className = potion1item.className;
      document.getElementById(slot).src = potion1item.src;
      if (slotClass.indexOf("hppotion") !== -1) {
        potion1item.className = "tableimg hppotion";
        potion1item.src = "tileset/hppotion.png";
      } else {
        potion1item.className = "tableimg xppotion";
        potion1item.src = "tileset/xppotion.png";
      }
    } else {
      // no item in slot
      potion1item.className = document.getElementById(slot).className;
      potion1item.src = document.getElementById(slot).src;
      document.getElementById(slot).className = "tableimg nothing";
      document.getElementById(slot).src = "tileset/22.png";
    }
  }
  // neck pieces
  if (
    slotClass.indexOf("totem") !== -1 ||
    slotClass.indexOf("viewneck") !== -1
  ) {
    if (necklace1itemClass.indexOf("nothing") == -1) {
      document.getElementById(slot).className = necklace1item.className;
      document.getElementById(slot).src = necklace1item.src;
      if (slotClass.indexOf("totem") !== -1) {
        necklace1item.className = "tableimg totem";
        necklace1item.src = "tileset/totem.png";
        deactivateItems("viewneck");
      } else {
        necklace1item.className = "tableimg viewneck";
        necklace1item.src = "tileset/necklace1.png";
        deactivateItems("totem");
      }
    } else {
      // no item in slot
      necklace1item.className = document.getElementById(slot).className;
      necklace1item.src = document.getElementById(slot).src;
      document.getElementById(slot).className = "tableimg nothing";
      document.getElementById(slot).src = "tileset/22.png";
    }
  }

  // rings
  if (
    slotClass.indexOf("dmgring") !== -1 ||
    slotClass.indexOf("hpring") !== -1 ||
    slotClass.indexOf("dodgering") !== -1
  ) {
    if (ring1itemClass.indexOf("nothing") == -1) {
      if (ring2itemClass.indexOf("nothing") == -1) {
        //console.log("there is an item in second slot");
        document.getElementById(slot).className = ring2itemClass;
        document.getElementById(slot).src = ring2item.src;
        if (ring2itemClass.indexOf("hpring") !== -1) {
          deactivateItems("hpring");
        }
        if (ring2itemClass.indexOf("dmgring") !== -1) {
          deactivateItems("dmgring");
        }
        if (ring2itemClass.indexOf("dodgering") !== -1) {
          deactivateItems("dodgering");
        }
        ringSort(2, slotClass);
      } else {
        ringSort(2, slotClass);
        document.getElementById(slot).className = "tableimg nothing";
        document.getElementById(slot).src = "tileset/22.png";
      }
    } else {
      ringSort(1, slotClass);
      document.getElementById(slot).className = "tableimg nothing";
      document.getElementById(slot).src = "tileset/22.png";
    }
  }
  avtiveItems();
}

// funtion ring know which ring for what image to use
function ringSort(ring, slotClass) {
  if (ring == 1) {
    if (slotClass.indexOf("dmgring") !== -1) {
      ring1item.className = "tableimg dmgring";
      ring1item.src = "tileset/demonring.png";
    }
    if (slotClass.indexOf("hpring") !== -1) {
      ring1item.className = "tableimg hpring";
      ring1item.src = "tileset/ringstreangth.png";
    }
    if (slotClass.indexOf("dodgering") !== -1) {
      ring1item.className = "tableimg dodgering";
      ring1item.src = "tileset/ringquickness.png";
    }
  } else {
    if (slotClass.indexOf("dmgring") !== -1) {
      ring2item.className = "tableimg dmgring";
      ring2item.src = "tileset/demonring.png";
    }
    if (slotClass.indexOf("hpring") !== -1) {
      ring2item.className = "tableimg hpring";
      ring2item.src = "tileset/ringstreangth.png";
    }
    if (slotClass.indexOf("dodgering") !== -1) {
      ring2item.className = "tableimg dodgering";
      ring2item.src = "tileset/ringquickness.png";
    }
  }
}

// rings and necklace
function avtiveItems() {
  totemActive = 0;
  ring1Class = ring1item.className;
  ring2Class = ring2item.className;
  necklace1Class = necklace1item.className;

  if (ring1Class.indexOf("nothing") == -1) {
    ringEffects(1);
  }
  if (ring2Class.indexOf("nothing") == -1) {
    ringEffects(2);
  }
  if (necklace1Class.indexOf("nothing") == -1) {
    if (necklace1Class.indexOf("totem") !== -1) {
      neckEffects("totem");
    }
    if (necklace1Class.indexOf("viewneck") !== -1) {
      neckEffects("viewneck");
    }
  }
  HpBar(0);
  renderEntities();
}

// neck effects
function neckEffects(neck) {
  if (neck == "totem") {
    totemActive = 1;
  }
  if (neck == "viewneck") {
    if (viewneckActive == 0) {
      monsterViewY = 3;
      monsterViewX = 5;
      monsterStartPointY = 1;
      monsterStartPointX = 2;
      viewneckActive = 1;
    }
  }
}

// function for ring effects
function ringEffects(ring) {
  if (ring == 1) {
    if (ring1Class.indexOf("dmgring") !== -1) {
      if (dmgringActive == 0) {
        dmgringActive = 1;
        playerNumberDamage += 3;
        maxHP -= 5;
        if (HP > maxHP) {
          HP = maxHP;
        }
      }
      if (
        ring1item.className.indexOf("dmgring") !== -1 &&
        ring2item.className.indexOf("dmgring") !== -1 &&
        dmgring2active == 0
      ) {
        dmgring2active = 1;
        playerNumberDamage += 3;
        maxHP -= 5;
        if (HP > maxHP) {
          HP = maxHP;
        }
      }
    }
    if (ring1Class.indexOf("hpring") !== -1) {
      if (hpringActive == 0) {
        maxHP += 15;
        hpringActive = 1;
      }
      if (
        ring1item.className.indexOf("hpring") !== -1 &&
        ring2item.className.indexOf("hpring") !== -1 &&
        hpring2active == 0
      ) {
        maxHP += 15;
        hpring2active = 1;
      }
    }
    if (ring1Class.indexOf("dodgering") !== -1) {
      dodgeVariable += 2;
      if (
        ring1item.className.indexOf("dodgering") !== -1 &&
        ring2item.className.indexOf("dodgering") !== -1 &&
        dodgering2active == 0
      ) {
        dodgeVariable += 1;
        dodgering2active = 1;
      }
    }
  } else {
    if (ring2Class.indexOf("dmgring") !== -1) {
      if (dmgringActive == 0) {
        dmgringActive = 1;
        playerNumberDamage += 3;
        maxHP -= 5;
        if (HP > maxHP) {
          HP = maxHP;
        }
      }
    }
    if (ring2Class.indexOf("hpring") !== -1) {
      if (hpringActive == 0) {
        maxHP += 15;
        hpringActive = 1;
      }
    }
    if (ring2Class.indexOf("dodgering") !== -1) {
      dodgeVariable += 1;
    }
  }
}

// deactivate item
function deactivateItems(slotClass) {
  if (slotClass.indexOf("dmgring") !== -1) {
    if (dmgringActive == 1) {
      dmgringActive = 0;
      maxHP += 5;
      playerNumberDamage -= 3;
      console.log("remove dmg ring");
    }
    if (
      (ring1item.className.indexOf("dmgring") !== -1 &&
        ring2item.className.indexOf("dmgring") == -1) ||
      (ring1item.className.indexOf("dmgring") == -1 &&
        ring2item.className.indexOf("dmgring") !== -1 &&
        dmgring2active == 1)
    ) {
      maxHP += 5;
      playerNumberDamage -= 3;
      dmgring2active = 0;
      console.log("remove dmg ring");
    }
  }
  if (slotClass.indexOf("hpring") !== -1) {
    if (hpringActive == 1) {
      hpringActive = 0;
      maxHP -= 15;
      if (HP > maxHP) {
        HP = maxHP;
      }
      console.log("remove hp ring");
    }
    if (
      (ring1item.className.indexOf("hpring") !== -1 &&
        ring2item.className.indexOf("hpring") == -1) ||
      (ring1item.className.indexOf("hpring") == -1 &&
        ring2item.className.indexOf("hpring") !== -1 &&
        hpring2active == 1)
    ) {
      maxHP -= 15;
      if (HP > maxHP) {
        HP = maxHP;
      }
      console.log("remove hp ring");
      hpring2active = 0;
    }
  }
  if (slotClass.indexOf("dodgering") !== -1) {
    if (dodgeringActive == 1) {
      dodgeringActive = 0;
      dodgeVariable -= 1;
      console.log("remove dodge ring");
    }
    if (
      (ring1item.className.indexOf("dodgering") !== -1 &&
        ring2item.className.indexOf("dodgering") == -1) ||
      (ring1item.className.indexOf("dodgering") == -1 &&
        ring2item.className.indexOf("dodgering") !== -1 &&
        dodgering2active == 1)
    ) {
      dodgeVariable -= 1;
      dodgering2active = 0;
      console.log("remove dodge ring");
    }
  }
  if (slotClass.indexOf("totem") !== -1) {
    if (totemActive == 1) {
      totemActive = 0;
    }
  }
  if (slotClass.indexOf("viewneck") !== -1) {
    if (viewneckActive == 1) {
      viewneckActive = 0;
      monsterViewY = 5;
      monsterViewX = 7;
      monsterStartPointY = 2;
      monsterStartPointX = 3;
    }
  }
  HpBar(0);
}

// random item drop chest monster boss
function itemDrop(x, y, dropper) {
  if (dropper == "monster") {
    let chanseItem = Math.floor(Math.random() * luck);
    if (chanseItem == 0) {
      let randomItem = Math.floor(Math.random() * 9);
      // hp potion
      if (randomItem == 0 && randomItem == 7) {
        currentMapItm[x][y] = 1337;
      }
      // xp potion
      if (randomItem == 1 && randomItem == 8) {
        currentMapItm[x][y] = 1557;
      }
      // dmg ring
      if (randomItem == 2) {
        currentMapItm[x][y] = 1007;
      }
      // dodge ring
      if (randomItem == 3) {
        currentMapItm[x][y] = 1117;
      }
      // hp ring
      if (randomItem == 4) {
        currentMapItm[x][y] = 997;
      }
      // totem
      if (randomItem == 5) {
        currentMapItm[x][y] = 1447;
      }
      // view necklace
      if (randomItem == 6) {
        currentMapItm[x][y] = 1227;
      }
    }
  }
  if (dropper == "chest") {
    let randomItem = Math.floor(Math.random() * 7);
    // dmg ring
    if (randomItem == 0) {
      currentMapItm[x + 1][y - 1] = 1007;
    }
    // dodge ring
    if (randomItem == 1) {
      currentMapItm[x + 1][y - 1] = 1117;
    }
    // hp ring
    if (randomItem == 2) {
      currentMapItm[x + 1][y - 1] = 997;
    }
    // totem
    if (randomItem == 3) {
      currentMapItm[x + 1][y - 1] = 1447;
    }
    // view necklace
    if (randomItem == 4) {
      currentMapItm[x + 1][y - 1] = 1227;
    }
    if (randomItem == 5) {
      currentMapItm[x + 1][y - 1] = 1337;
    }
    if (randomItem == 6) {
      currentMapItm[x + 1][y - 1] = 1557;
    }
  }
  if (dropper == "boss") {
    let randomItem = Math.floor(Math.random() * 4);
    // dodge ring
    if (randomItem == 0) {
      currentMapItm[x][y] = 1117;
    }
    // hp ring
    if (randomItem == 1) {
      currentMapItm[x][y] = 997;
    }
    // totem
    if (randomItem == 2) {
      currentMapItm[x][y] = 1447;
    }
    // view necklace
    if (randomItem == 3) {
      currentMapItm[x][y] = 1227;
    }
    // potion
    currentMapItm[x][y + 1] = 1337;
    // dmg ring
    currentMapItm[x + 1][y] = 1007;
  }
  renderItems();
}

// drop item from 1st slot in inventory
function drop() {
  let firstItem = document.getElementById("item1").className;
  let imageIQ;
  if (firstItem.indexOf("hppotion") !== -1) {
    imageIQ = 1337;
  }
  if (firstItem.indexOf("xppotion") !== -1) {
    imageIQ = 1557;
  }
  if (firstItem.indexOf("dmgring") !== -1) {
    imageIQ = 1007;
  }
  if (firstItem.indexOf("dodgering") !== -1) {
    imageIQ = 1117;
  }
  if (firstItem.indexOf("totem") !== -1) {
    imageIQ = 1447;
  }
  if (firstItem.indexOf("hpring") !== -1) {
    imageIQ = 997;
  }
  if (firstItem.indexOf("viewneck") !== -1) {
    imageIQ = 1227;
  }
  if (firstItem.indexOf("key") !== -1) {
    imageIQ = 9999;
  }
  if (firstItem.indexOf("nothing") == -1) {
    if (currentMapItm[playerY][playerX] == 0) {
      currentMapItm[playerY][playerX] = imageIQ;
      document.getElementById("item1").src = "tileset/22.png";
      document.getElementById("item1").className = "tableimg nothing";
      renderItems();
      renderEntities();
    } else {
      output.innerHTML = "There's an item on the ground.";
    }
  } else {
    output.innerHTML = "You don't have an item in the throw slot.";
  }
}

//--------------------------------------------------------------------  PLAYER STATS ---------------------------------------------------------------------------//
// player stats show
function playerStats() {
  if (onoff == 0) {
    document.getElementById("playerStats").style = "display: block";
    onoff = 1;
    document.getElementById("playerPoints").innerHTML =
      "Player Points: " + playerPoints;
  } else {
    document.getElementById("playerStats").style = "display: none";
    onoff = 0;
  }
  colorStat();
}

// look at points in stat menu if  can afford stat
function colorStat() {
  document.getElementById("playerPoints").innerHTML =
    "Player Points: " + playerPoints;
  for (let i = 1; i < 6; i++) {
    let heart = "heart" + i;
    let attack = "attack" + i;
    let shield = "shield" + i;
    let luck = "luck" + i;
    if (i <= playerPoints) {
      document.getElementById(heart).style = "background-color: #e9d81c";
      document.getElementById(attack).style = "background-color: #e9d81c";
      document.getElementById(shield).style = "background-color: #e9d81c";
      document.getElementById(luck).style = "background-color: #e9d81c";
    } else {
      document.getElementById(heart).style =
        "background-color:rgb(177, 112, 0)";
      document.getElementById(attack).style =
        "background-color:rgb(177, 112, 0)";
      document.getElementById(shield).style =
        "background-color:rgb(177, 112, 0)";
      document.getElementById(luck).style = "background-color:rgb(177, 112, 0)";
    }

    if (document.getElementById(heart).className.indexOf("used") !== -1) {
      document.getElementById(heart).style = "background-color: green";
      document.getElementById(heart).onclick = "";
    }
    if (document.getElementById(attack).className.indexOf("used") !== -1) {
      document.getElementById(attack).style = "background-color: green";
      document.getElementById(attack).onclick = "";
    }
    if (document.getElementById(shield).className.indexOf("used") !== -1) {
      document.getElementById(shield).style = "background-color: green";
      document.getElementById(shield).onclick = "";
    }
    if (document.getElementById(luck).className.indexOf("used") !== -1) {
      document.getElementById(luck).style = "background-color: green";
      document.getElementById(luck).onclick = "";
    }
  }
}
function healthStat(number) {
  if (playerPoints >= number) {
    for (let i = 1; i <= number; i++) {
      let heart = "heart" + i;
      if (
        playerPoints >= number &&
        document.getElementById(heart).className.indexOf("used") == -1
      ) {
        heartLevelNumber++;
        endgamePoints += 50;
        maxHP = maxHP + 10;
        document.getElementById(heart).className = "statButton used";
        playerPoints = playerPoints - i;
      } else {
        output.innerHTML = "You don't have enough points.";
      }
    }
    document.getElementById("heartLevel").innerHTML =
      "Level: " + heartLevelNumber;
    HpBar(0);
    renderEntities();
    colorStat();
  } else {
    output.innerHTML = "You don't have enough points.";
  }
}
function attackStat(number) {
  if (playerPoints >= number) {
    for (let i = 1; i <= number; i++) {
      let attack = "attack" + i;
      if (
        playerPoints >= number &&
        document.getElementById(attack).className.indexOf("used") == -1
      ) {
        attackLevelNumber++;
        endgamePoints += 50;
        playerNumberDamage += 2;
        document.getElementById(attack).className = "statButton used";
        playerPoints = playerPoints - i;
      } else {
        output.innerHTML = "You don't have enough points.";
      }
    }
    document.getElementById("attackLevel").innerHTML =
      "Level: " + attackLevelNumber;
    renderEntities();
    colorStat();
  } else {
    output.innerHTML = "You don't have enough points.";
  }
}
function shieldStat(number) {
  if (playerPoints >= number) {
    for (let i = 1; i <= number; i++) {
      let shieldId = "shield" + i;
      if (
        playerPoints >= number &&
        document.getElementById(shieldId).className.indexOf("used") == -1
      ) {
        shieldLevelNumber++;
        endgamePoints += 50;
        shield++;
        document.getElementById(shieldId).className = "statButton used";
        playerPoints = playerPoints - i;
      } else {
        output.innerHTML = "You don't have enough points.";
      }
    }
    document.getElementById("shieldLevel").innerHTML =
      "Level: " + shieldLevelNumber;
    renderEntities();
    colorStat();
  } else {
    output.innerHTML = "You don't have enough points.";
  }
}
function luckStat(number) {
  if (playerPoints >= number) {
    for (let i = 1; i <= number; i++) {
      let luckId = "luck" + i;
      if (
        playerPoints >= number &&
        document.getElementById(luckId).className.indexOf("used") == -1
      ) {
        luckLevelNumber++;
        endgamePoints += 50;
        luck--;
        document.getElementById(luckId).className = "statButton used";
        playerPoints = playerPoints - i;
      } else {
        output.innerHTML = "You don't have enough points.";
      }
    }
    document.getElementById("luckLevel").innerHTML =
      "Level: " + luckLevelNumber;
    renderEntities();
    colorStat();
  } else {
    output.innerHTML = "You don't have enough points.";
  }
}

//----------------------------------------------------------------------- OTHER -----------------------------------------------------------------------------------//

// play music
function playAudio() {
  audio.play();
  setTimeout(function () {
    playAudio();
  }, test);
}

function waitTurn() {
  waitTurnVal = 1;
  renderEntities();
}

// open door level 3 if have key in inventory
function opendoor() {
  for (let i = 1; i < 9; i++) {
    let itemname = "item" + i;
    let classname = document.getElementById(itemname).className;
    if (classname.indexOf("key") !== -1) {
      document.getElementById(itemname).src = "tileset/22.png";
      document.getElementById(itemname).className = "tableimg nothing";
      currentMapItm[19][19] = 93;
      currentMapItm[19][18] = 92;
      currentMapItm[18][19] = 61;
      currentMapItm[18][18] = 60;
      currentMapCol[19][19] = 0;
      currentMapCol[19][18] = 0;
      openeddoor = 1;
      break;
    }
  }
  if (openeddoor == 0) {
    gameMessage += "You may need a key.";
  }
  renderItems();
  renderEntities();
}

// it plays when HP below 0 or when i win.
function endGame() {
  document.getElementById("backpackUI").style = "display: none;";
  document.getElementById("endGame").style = "display: block;";
  window.removeEventListener("keydown", keydownHandler, false);
  endgamePoints += playerPoints * 100;
  if (HP <= 0) {
    document.getElementById("endgameTitle").innerHTML = "You Died!";
  } else {
    document.getElementById("endgameTitle").innerHTML = "You Won!";
  }
  document.getElementById("endgameMonsterKills").innerHTML =
    "Monster kills: " + monsterKills;
  document.getElementById("endgameBossKills").innerHTML =
    "Boss kills: " + bossKills;
  document.getElementById("LastMap").innerHTML = "Map Reached: " + currentMAP;
  document.getElementById("AtkStat").innerHTML =
    "Attack Stat: " + attackLevelNumber;
  document.getElementById("HPStat").innerHTML =
    "Health Stat: " + heartLevelNumber;
  document.getElementById("ArmourStat").innerHTML =
    "Armour Stat: " + shieldLevelNumber;
  document.getElementById("LuckStat").innerHTML =
    "Luck Stat: " + luckLevelNumber;
  document.getElementById("endgamePoints").innerHTML =
    "Points: " + endgamePoints;
}

// the button when end game s played
function endGameRestart() {
  location.reload();
}

// check if the chest has to be opened and drops key
function silverChest() {
  if (silverchestactive == 0) {
    if (currentMapItm[7][26] !== 0 && currentMapItm[5][29] !== 0) {
      currentMapItm[9][30] = 3670;
      currentMapItm[8][29] = 9999;
      renderItems();
      silverchestactive = 1;
    }
  }
}

// changeing the main page
function mainPageChange() {
  document.getElementById("main-menu").style = "display: none;";
  document.getElementById("main-menu-background").style = "display: none;";
  currentMAP = 1;
  render();
}
// loadng screen when going deeper
function loadingScreen() {
  document.getElementById("backpackUI").style = "display: none;";
  document.getElementById("loadingScreen").style = "display: block;";
  setTimeout(function () {
    document.getElementById("loadingScreen").style = "display: none;";
    document.getElementById("backpackUI").style = "display: block;";
  }, test);
}

//animation for beggining page
function myMoveBackground() {
  if (backgroundCurrent == 0) {
    let id = null;
    const elem = document.getElementById("main-menu-background");
    let pos = 0;
    clearInterval(id);
    // how fast the screen moves 0 fast 1000 slow
    id = setInterval(frame, 40);
    function frame() {
      //distance it travels
      if (pos >= 63) {
        clearInterval(id);
        myMoveBackground();
      } else {
        for (let i = 0; i < 3; i++) {
          pos++;
          elem.style = "bottom:" + pos + "px";
        }
      }
    }
  } else {
    mainPageChange();
  }
}
myMoveBackground();

// button start at begining
function mainPage() {
  backgroundCurrent = 1;
  playAudio();
}

fogScreen();
render();
