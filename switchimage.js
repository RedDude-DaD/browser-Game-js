// switch for all map images
function switchForImages(maptest, currentROW, currentCOL) {
  switch (maptest[currentROW][currentCOL]) {
    // dirty floor
    case DIRTYFLOOR1:
      cell.src = "tileset/65.png";
      break;
    case DIRTYFLOOR2:
      cell.src = "tileset/66.png";
      break;
    case DIRTYFLOOR3:
      cell.src = "tileset/67.png";
      break;
    case DIRTYFLOOR4:
      cell.src = "tileset/211.png";
      break;
    case DIRTYFLOORRIGHT:
      cell.src = "tileset/244.png";
      break;
    case DIRTYFLOORLEFT:
      cell.src = "tileset/242.png";
      break;
    case DIRTYFLOORTOPRIGHT:
      cell.src = "tileset/212.png";
      break;
    case DIRTYFLOORTOPLEFT:
      cell.src = "tileset/210.png";
      break;

    // top walls
    case TOPWALLMIDDLE:
      cell.src = "tileset/18.png";
      break;
    case TOPWALLCORNERLEFT:
      cell.src = "tileset/19.png";
      break;
    case MIDDLETOPWALL:
      cell.src = "tileset/2.png";
      break;
    case RIGHTTOPWALL:
      cell.src = "tileset/3.png";
      break;
    case LEFTTOPWALL:
      cell.src = "tileset/1.png";
      break;
    case LEFTWALLTOP:
      cell.src = "tileset/51.png";
      break;
    case TOPWALLCORNERRIGTH:
      cell.src = "tileset/17.png";
      break;
    case TOPWALLRIGHT:
      cell.src = "tileset/49.png";
      break;
    case TOPWALLLEFT:
      cell.src = "tileset/83.png";
      break;

    //wall flag
    case WALLFLAGRED:
      cell.src = "tileset/141.png";
      break;
    case WALLFLAGBLUE:
      cell.src = "tileset/143.png";
      break;

    // floor
    case FLOOR:
      cell.src = "tileset/99.png";
      break;
    case crakedfloor:
      cell.src = "tileset/189.png";
      break;

    // gold chest
    case GOLDCHESTCLOSED:
      cell.src = "tileset/368.png";
      break;
    case GOLDCHESTOPENED:
      cell.src = "tileset/goldchestopen.png";
      break;

    // silver chest
    case silverchestclosed:
      cell.src = "tileset/367.png";
      break;
    case silverchestopen:
      cell.src = "tileset/3670.png";
      break;
    // key
    case KEY:
      cell.src = "tileset/key.png";
      break;

    // blue fountain
    case TOPBLUEFOUNTAINLEFT:
      cell.src = "tileset/139.png";
      break;
    case TOPBLUEFOUNTAINRIGHT:
      cell.src = "tileset/140.png";
      break;
    case MIDDLEBLUEFOUNTAINLEFT:
      cell.src = "tileset/173.png";
      break;
    case MIDDLEBLUEFOUNTAINRIGHT:
      cell.src = "tileset/174.png";
      break;
    case BOTTOMBLUEFOUNTAINLEFT:
      cell.src = "tileset/205.png";
      break;
    case BOTTOMBLUEFOUNTAINRIGHT:
      cell.src = "tileset/206.png";
      break;

    //void
    case NOTHING2:
      cell.src = "tileset/22.png";
      break;
    case NOTHING:
      cell.src = "tileset/22.png";
      break;
    case COLISION:
      cell.src = "tileset/22.png";
      break;

    // potion
    case HPPOTION:
      cell.src = "tileset/hppotion.png";
      break;
    case XPPOTION:
      cell.src = "tileset/xppotion.png";
      break;
    // rings
    case HPRING:
      cell.src = "tileset/ringstreangth.png";
      break;
    case DMGRING:
      cell.src = "tileset/demonring.png";
      break;
    case QUICKRING:
      cell.src = "tileset/ringquickness.png";
      break;

    // others

    case NECK:
      cell.src = "tileset/necklace1.png";
      break;
    case TOTEM:
      cell.src = "tileset/totem.png";
      break;
    // red fountain
    case REDFOUNTAINMIDDLE:
      cell.src = "tileset/129.png";
      break;
    case REDFOUNTAINBOTTOM:
      cell.src = "tileset/161.png";
      break;
    case TOPREDFOUNTAIN:
      cell.src = "tileset/97.png";
      break;

    //green goop wall
    case GREENWALLGOOP:
      cell.src = "tileset/36.png";
      break;
    case GROONWALLGOOPBOTTOM:
      cell.src = "tileset/68.png";
      break;
    // half wall dark
    case RIGHTHALFWALL:
      cell.src = "tileset/113.png";
      break;
    case RIGHTWALLTOP:
      cell.src = "tileset/81.png";
      break;
    case WALLLEFTHALF:
      cell.src = "tileset/115.png";
      break;

    //floor droop
    case EDGE:
      cell.src = "tileset/9.png";
      break;
    case EDGE2:
      cell.src = "tileset/41.png";
      break;
    case EDGE3:
      cell.src = "tileset/140.png";
      break;

    // wall pillar

    case MIDDLEPILLARWALL:
      cell.src = "tileset/135.png";
      break;
    case TOPPILLARWALL:
      cell.src = "tileset/103.png";
      break;
    case BOTTOMPILLARWALL:
      cell.src = "tileset/167.png";
      break;

    // wall hole
    case HOLEWALLBOTTOM:
      cell.src = "tileset/4.png";
      break;
    case HOLEWALLMIDDLE:
      cell.src = "tileset/5.png";
      break;
    case WALLHOLEMIDDLESMALL:
      cell.src = "tileset/102.png";
      break;

    // walls
    case backgroundStartPage:
      cell.src = "tileset/33.png";
      break;
    case WALLLEFT:
      cell.src = "tileset/33.png";
      break;
    case WALLMIDDLE:
      cell.src = "tileset/34.png";
      break;
    case WALLRIGHT:
      cell.src = "tileset/35.png";
      break;
    // boxes
    case smallboxbot:
      cell.src = "tileset/230.png";
      break;
      case smallboxtop:
      cell.src = "tileset/198.png";
      break;
      case bigboxbot:
      cell.src = "tileset/231.png";
      break;
      case bigboxtop:
      cell.src = "tileset/199.png";
      break;
    // door
    case opendoortl:
      cell.src = "tileset/60.png";
      break;
    case opendoortr:
      cell.src = "tileset/61.png";
      break;
    case opendoorbl:
      cell.src = "tileset/92.png";
      break;
    case opendoorbr:
      cell.src = "tileset/93.png";
      break;
    case LEFTDOORTOPWALL:
      cell.src = "tileset/55.png";
      break;
    case TOPLEFTDOOR:
      cell.src = "tileset/56.png";
      break;
    case TOPRIGHTDOOR:
      cell.src = "tileset/57.png";
      break;
    case RIGHTDOORTOPWALL:
      cell.src = "tileset/58.png";
      break;
    case LEFTBOTTOMDOOR:
      cell.src = "tileset/88.png";
      break;
    case RIGHTBOTTOMDOOR:
      cell.src = "tileset/89.png";
      break;
    // stairs to go down
    case STAIRS:
      cell.src = "tileset/243.png";
      break;

    // floor discoloration
    case FLOOR1:
      cell.src = "tileset/193.png";
      break;
    case FLOOR2:
      cell.src = "tileset/194.png";
      break;
    case FLOOR3:
      cell.src = "tileset/195.png";
      break;
    case FLOOR4:
      cell.src = "tileset/196.png";
      break;
    case FLOOR5:
      cell.src = "tileset/225.png";
      break;
    case FLOOR6:
      cell.src = "tileset/226.png";
      break;
    case FLOOR7:
      cell.src = "tileset/228.png";
      break;
    case FLOOR8:
      cell.src = "tileset/227.png";
      break;
    case FLOOR9:
      cell.src = "tileset/257.png";
      break;
    case FLOOR10:
      cell.src = "tileset/258.png";
      break;
    case FLOOR11:
      cell.src = "tileset/259.png";
      break;
    case FLOOR12:
      cell.src = "tileset/260.png";
      break;

    //pillar
    case PILLARMIDDLE:
      cell.src = "tileset/398.png";
      break;
    case PILLARBOTTOM:
      cell.src = "tileset/430.png";
      break;
    case TOPPILLAR:
      cell.src = "tileset/366.png";
      break;

    //skull
    case SKULL:
      cell.src = "tileset/98.png";
      break;
  }
}
