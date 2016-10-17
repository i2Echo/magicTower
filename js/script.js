/**
 * Created by PC on 10/14/2016.
 */
var itemsInfo = [
  {id:1, name:"yellowKey", img:"items"}
  ,{id:2, name:"blueKey",img:"items"}
  ,{id:3, name:"redKey", img:"items"}
  ,{id:4, name:"magicKey", img:"items"}
  ,{id:5, name:"redHP", img:"items"}
  ,{id:6, name:"blueHP", img:"items"}
  ,{id:7, name:"ruby", img:"items"}
  ,{id:8, name:"sapphire", img:"items"}
  ,{id:9, name:"ironSword", img:"items"}
  ,{id:10, name:"ironShield", img:"items"}
];
var enemyInfo = [
  {id:1, name:"greenSlime", img:"slime", imgIndex:0}
  ,{id:2, name:"redSlime", img:"slime", imgIndex:1}
  ,{id:3, name:"redKey"}
  ,{id:4, name:"magicKey"}
  ,{id:5, name:"redHP"}
  ,{id:6, name:"blueHP"}
  ,{id:7, name:"ruby"}
  ,{id:8, name:"sapphire"}
  ,{id:9, name:"ironSword"}
  ,{id:10, name:"ironShield"}
];
var script = {
  floor01: {
    map: [
      [12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
      [0, 0, 0, 4, 0, 1, 0, 0, 0, 1, 0],
      [0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0],
      [1, 4, 1, 1, 0, 1, 1, 1, 4, 1, 0],
      [0, 0, 0, 1, 0, 4, 0, 0, 0, 1, 0],
      [0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 0],
      [1, 4, 1, 1, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 1, 4, 1, 1, 1, 4, 1],
      [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
      [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0]
    ],
    mapdata: [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
      [0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0],
      [0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0],
      [1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0],
      [0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0],
      [0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 0],
      [1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 1, 0, 1, 1, 1, 0, 1],
      [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
      [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0]
    ],
    hero: {
      name: "勇士",
      property: {},
      img: "hero",
      x: 5,
      y: 10
    },
    enemy: [
      [0, 0, 1, 2, 1, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1]
    ],
    items: [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [5, 0, 0, 0, 0, 0, 7, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 8, 5, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [5, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0],
      [5, 0, 1, 0, 0, 0, 0, 0, 0, 6, 0]
    ],
    jump: [
      {name: "up", at: {x: 0, y: 0}, to: "floor02", targetAt: {x: 5, y: 9}}
    ]
  }
  /**
   ,floor02:{
    map:[
      [12,0,0,0,0,0,0,0,0,0,0],
      [1,1,1,1,1,1,1,1,1,1,0],
      [0,0,0,4,0,1,0,0,0,1,0],
      [0,0,0,1,0,1,0,0,0,1,0],
      [1,4,1,1,0,1,1,1,4,1,0],
      [0,0,0,1,0,4,0,0,0,1,0],
      [0,0,0,1,0,1,1,1,1,1,0],
      [1,4,1,1,0,0,0,0,0,0,0],
      [0,0,0,1,1,4,1,1,1,4,1],
      [0,0,0,1,0,0,0,1,0,0,0],
      [0,0,0,1,0,13,0,1,0,0,0]
    ],
    mapdata:[
      [0,0,0,0,0,0,0,0,0,0,0],
      [1,1,1,1,1,1,1,1,1,1,0],
      [0,0,0,0,0,1,0,0,0,1,0],
      [0,0,0,1,0,1,0,0,0,1,0],
      [1,0,1,1,0,1,1,1,0,1,0],
      [0,0,0,1,0,0,0,0,0,1,0],
      [0,0,0,1,0,1,1,1,1,1,0],
      [1,0,1,1,0,0,0,0,0,0,0],
      [0,0,0,1,1,0,1,1,1,0,1],
      [0,0,0,1,0,0,0,1,0,0,0],
      [0,0,0,1,0,0,0,1,0,0,0]
    ],
    hero:{
      name:"勇士",
      property:{},
      img:"hero",
      x:5,
      y:9
    },
    enemy:[
      {name:"greenSlime",img:"slime",rowIndex:1,
        locations:[
          {x:2,y:0},{x:4,y:0}
        ]
      }
      ,{name:"redSlime",img:"slime",rowIndex:0,
        locations:[
          {x:3,y:0}
        ]}
    ],
    jump:[
      {name:"up",at:{x:0,y:0},to:"floor03",targetAt:{x:5,y:9}},
      {name:"down",at:{x:5,y:10},to:"floor01",targetAt:{x:1,y:0}}
    ]
  }*/
};

//根据脚本，初始化游戏画面
function scriptInit(floor) {

  //地图层初始化
  mapLayer.removeAllChild();
  itemLayer.removeAllChild();
  //人物层初始化
  charaLayer.removeAllChild();
  //效果层初始化
  effectLayer.removeAllChild();
  //对话层初始化
  talkLayer.removeAllChild();

  //地图数据获取
  map = floor.map;
  mapdata = floor.mapdata;

  //添加地图
  addMap();

  addEnemy();
  addItems();
  addHero();
}
/**
 * 楼层跳转
 */
function checkJump(current_floor){
  var jumpfloor = current_floor.jump;
  var position = hero.getPosition();
  for(var i=0;i<jumpfloor.length;i++){
    if(position.x == jumpfloor[i].at.x && position.y == jumpfloor[i].at.y){
      //获取该楼层脚本数据
      floor = script[jumpfloor[i].to];
      floor.hero.x = jumpfloor[i].targetAt.x;
      floor.hero.y = jumpfloor[i].targetAt.y;
      //开始跳转
      scriptInit(floor);
      return;
    }
  }
}