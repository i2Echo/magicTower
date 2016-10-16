/**
 * Created by PC on 10/14/2016.
 */
var script = {
  floor01:{
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
      [0,0,0,1,0,0,0,1,0,0,0]
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
      y:10
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
  addHero();
}
/**
 * 楼层跳转
 */
function checkJump(){

}