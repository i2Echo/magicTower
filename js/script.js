

// RPG剧本
var script = {
  hero: {
    name: "勇士",
    img: "hero",
    property:{
      HP: 10000,
      ATK: 110,
      DEF: 110,
      gold: 0
    },
    pack:{
      yellowKey: 0,
      blueKey: 0,
      redKey: 0
    },
    position: {
      atFloor: 'floor01',
      x: 5,
      y: 10
    }
  },
  floor01: {
    domain: 1,
    map: [
      [5, 0, 101, 102, 101, 102, 103, 0, 0, 0, 0],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
      [0, 1, 0, 0, 0, 1, 115, 115, 115, 1, 0],
      [0, 1, 0, 1, 0, 1, 115, 115, 115, 1, 0],
      [1, 1, 1, 1, 0, 1, 115, 115, 115, 1, 0],
      [0, 0, 0, 1, 0, 10, 0, 0, 0, 1, 0],
      [0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 0],
      [1, 0, 1, 1, 0, 0, 0, 103, 104, 0, 0],
      [0, 0, 0, 1, 1, 0, 1, 1, 1, 0, 1],
      [0, 0, 0, 1, 21, 0, 0, 1, 0, 0, 0],
      [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0]
    ],
    jump: [
      {name: "up", at: {x: 0, y: 0}, to: "floor02", targetAt: {x: 0, y: 1}}
    ]
  },
  floor02: {
    domain: 1,
    map: [
      [6, 0, 11, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
      [0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0],
      [0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0],
      [0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0],
      [0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0],
      [0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0],
      [0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
      [0, 1, 0, 1, 1, 10, 1, 1, 1, 0, 1],
      [0, 1, 0, 1, 21, 0, 0, 1, 0, 0, 0],
      [5, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0]
    ],
    jump: [
      {name: "up", at: {x: 0, y: 10}, to: "floor03", targetAt: {x: 1, y: 10}}
      ,{name: "down", at: {x: 0, y: 0}, to: "floor01", targetAt: {x: 1, y: 0}}
    ]
  }
};

/**
 * //根据脚本，初始化游戏画面
 * @param floor
 */
function scriptInit() {

  //地图层初始化
  mapLayer.removeAllChild();

  doorLayer.removeAllChild();
  itemLayer.removeAllChild();
  //人物层初始化
  npcLayer.removeAllChild();
  enemyLayer.removeAllChild();
  playerLayer.removeAllChild();
  //效果层初始化
  effectLayer.removeAllChild();
  //对话层初始化
  talkLayer.removeAllChild();

  // 获取楼层
  var floor = script.hero.position.atFloor
  //地图数据获取
  map = script[floor].map;

  //添加地图元素
  addElement();
  addHero();
}

/**
 * // 楼层跳转
 * @param current_floor
 */
function checkJump(){

  var position = hero.getPosition();
  var jump = script[position.atFloor].jump;

  for(var i=0;i<jump.length;i++){
    if(position.x == jump[i].at.x && position.y == jump[i].at.y){

      //设置跳转楼层的位置
      hero.setPosition(jump[i].to, jump[i].targetAt.x, jump[i].targetAt.y);
      //开始跳转
      scriptInit();
      return;
    }
  }
}