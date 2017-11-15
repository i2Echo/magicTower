
// 所有元素的信息 
var elementsInfo = [
  {id:0, name:"road", img:"map", imgIndex:0}
  ,{id:1, name:"wall", img:"map", imgIndex:1}
  ,{id:2, name:"purpleWall", img:"map", imgIndex:2}
  ,{id:3, name:"starWall", img:"map", imgIndex:4}
  ,{id:4, name:"magma", img:"map", imgIndex:5}
  ,{id:5, name:"upStairs", img:"map", imgIndex:25}
  ,{id:6, name:"downStairs", img:"map", imgIndex:24}
  //门
  ,{id:10, name:"yellowDoor", img:"map", imgIndex:8, keyId: 21}
  ,{id:11, name:"blueDoor", img:"map", imgIndex:9, keyId: 22}
  ,{id:12, name:"redDoor", img:"map", imgIndex:10, keyId: 23}
  ,{id:13, name:"greenDoor", img:"map", imgIndex:11}
  ,{id:14, name:"ironDoor", img:"map", imgIndex:12}


// 物品信息 编号为 20+
//type为物品生效类型 => 0:立即自动生效；1:条件触发自动生效; 2:手动生效
  ,{id:21, name:"yellowKey", img:"items", imgIndex: 0, type:1}
  ,{id:22, name:"blueKey",img:"items", imgIndex: 1, type:1}
  ,{id:23, name:"redKey", img:"items", imgIndex: 2, type:1}
  ,{id:24, name:"magicKey", img:"items", imgIndex: 3, type:1}
  ,{id:25, name:"redHp", img:"items", imgIndex: 4, type:0, func:{HP:50}}
  ,{id:26, name:"blueHp", img:"items", imgIndex: 5, type:0, func:{HP:200}}
  ,{id:27, name:"redGem", img:"items", imgIndex: 6, type:0, func:{ATK:1}}
  ,{id:28, name:"blueGem", img:"items", imgIndex: 7, type:0, func:{DEF:1}}
  ,{id:29, name:"ironSword", img:"items", imgIndex: 8, type:0, func:{ATK:10}}
  ,{id:30, name:"ironShield", img:"items", imgIndex: 9, type:0, func:{DEF:10}}

  //怪物编号为100+
  ,{id:101, name:"greenSlime", img:"enemy", imgIndex:0
    ,property:{HP: 35, ATK: 18, DEF: 1, gold: 1}}
  ,{id:102, name:"redSlime", img:"enemy", imgIndex:1
    ,property:{HP: 45, ATK: 20, DEF: 2, gold: 2}}
  ,{id:103, name:"priest", img:"enemy", imgIndex:8
    ,property:{HP: 60, ATK: 32, DEF: 8, gold: 3}}
  ,{id:104, name:"bat", img:"enemy", imgIndex:4
    ,property:{HP: 35, ATK: 38, DEF: 3, gold: 3}}
  ,{id:105, name:"skeleton_C", img:"enemy", imgIndex:12
    ,property:{HP: 50, ATK: 42, DEF: 6, gold: 6}}

  ,{id:106, name:"bigSlime", img:"enemy", imgIndex:3
    ,property:{HP: 130, ATK: 60, DEF: 3, gold: 8}}
  ,{id:107, name:"skeleton_B", img:"enemy", imgIndex:1
    ,property:{HP: 55, ATK: 52, DEF: 12, gold: 8}}
  ,{id:108, name:"bat", img:"enemy", imgIndex:1
    ,property:{HP: 35, ATK: 38, DEF: 3, gold: 3}}
  ,{id:109, name:"skeleton_C", img:"enemy", imgIndex:1
    ,property:{HP: 50, ATK: 42, DEF: 6, gold: 6}}
  ,{id:110, name:"redSlime", img:"enemy", imgIndex:1
    ,property:{HP: 45, ATK: 20, DEF: 2, gold: 2}}

  ,{id:111, name:"priest", img:"enemy", imgIndex:1
    ,property:{HP: 60, ATK: 32, DEF: 8, gold: 3}}
  ,{id:112, name:"bat", img:"enemy", imgIndex:1
    ,property:{HP: 35, ATK: 38, DEF: 3, gold: 3}}
  ,{id:113, name:"skeleton_C", img:"enemy", imgIndex:1
    ,property:{HP: 50, ATK: 42, DEF: 6, gold: 6}}
  ,{id:114, name:"redSlime", img:"enemy", imgIndex:1
    ,property:{HP: 45, ATK: 20, DEF: 2, gold: 2}}
  ,{id:115, name:"priest", img:"enemy", imgIndex:1
    ,property:{HP: 60, ATK: 32, DEF: 8, gold: 3}}
  ,{id:116, name:"bat", img:"enemy", imgIndex:1
    ,property:{HP: 35, ATK: 38, DEF: 3, gold: 3}}
  ,{id:117, name:"skeleton_C", img:"enemy", imgIndex:1
    ,property:{HP: 50, ATK: 42, DEF: 6, gold: 6}}
];

// RPG剧本
var script = {
  hero: {
    name: "勇士",
    img: "hero",
    property:{
      HP: 1000,
      ATK: 10,
      DEF: 10,
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
      [5, 0, 101, 102, 101, 0, 0, 0, 0, 0, 0],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
      [0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0],
      [0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0],
      [1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0],
      [0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0],
      [0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 0],
      [1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 1, 10, 1, 1, 1, 0, 1],
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
      ,{name: "down", at: {x: 0, y: 0}, to: "floor02", targetAt: {x: 1, y: 0}}
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