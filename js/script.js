/**
 * Created by PC on 10/14/2016.
 */
var script = {
  floor01:{
    map:[
      [6,0,0,0,0,0,0,0,0,0,0],
      [1,1,1,1,1,1,1,1,1,1,0],
      [0,0,0,0,0,1,0,0,0,1,0],
      [0,0,0,1,0,1,0,0,0,1,0],
      [1,0,1,1,0,1,1,1,0,1,0],
      [0,0,0,1,0,0,0,0,0,1,0],
      [0,0,0,1,0,1,1,1,1,1,0],
      [1,0,1,1,0,0,0,0,0,0,0],
      [0,0,0,1,1,0,1,1,1,0,1],
      [0,0,0,1,0,0,0,1,0,0,0],
      [0,0,0,1,0,0,0,1,0,0,0],
      [1,1,1,1,1,1,1,1,1,1,1]
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
      [0,0,0,1,0,0,0,1,0,0,0],
      [1,1,1,1,1,1,1,1,1,1,1]
    ],
    hero:{
      name:"勇士",
      property:{},
      img:"hero",
      position:{x:5,y:10}
    },
    enemy:[
      {name:"greenSlime",img:"slime",index:0,x:2,y:0},
      {name:"redSlime",img:"slime",index:1,x:3,y:0},
      {name:"greenSlime",img:"slime",index:0,x:4,y:0}
    ],
    jump:{
      up:{at:{x:0,y:0},to:"floor02"},
      down:null
    }
  }
};

//根据脚本，初始化游戏画面
function scriptInit(floor){
  //地图位置初始化
  mapLayer.x = 0;
  mapLayer.y = 0;
  charaLayer.x = 0;
  charaLayer.y = 0;

  //地图层初始化
  mapLayer.removeAllChild();
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
  addHero();
}