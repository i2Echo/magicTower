/**
 * Created by PC on 10/12/2016.
 */

/**
 * 初始化库件
 */
LInit(50, "magicTower", 416, 416, main);

/**
 * 层变量
 */
//进度条层
var loadingLayer;
//底层
var backLayer;
//地图层
var mapLayer;
//人物层
var charaLayer;
//效果层
var effectLayer;
//对话层
var talkLayer;
//控制层
var ctrlLayer;
/**
 * 对象变量
 */
//英雄
var hero;
//NPC
var npc;
//怪物
var enemy;
/**
 * 常量
 */
var DOWN = 0;
var LEFT = 1;
var RIGHT = 2;
var UP = 3;

var STEP = 32;
var mainGameWidth = 11;
var mainGameHight = 11;
var offsetX = 1;
var offsetY = 1;
/**
 * 数组变量
 */
//储存图片路径
var imgData = [];
//储存加载后的图片列表信息
var imgList = [];
var imageArray;

var floor;
/**
 * 主程序
 */
function main(){

  //
  imgData.push({type:"js",path:"./js/Map.js"});
  imgData.push({type:"js",path:"./js/script.js"});
  imgData.push({type:"js",path:"./js/Hero.js"});
  imgData.push({type:"js",path:"./js/Enemy.js"});
  //添加图片路径
  imgData.push({name:"map", path:"./images/map.png"});
  imgData.push({name:"hero", path:"./images/hero.png"});
  imgData.push({name:"slime", path:"./images/slime.png"});

  loadingLayer = new LoadingSample3();
  addChild(loadingLayer);
  LLoadManage.load(
    imgData,
    function(progress){
      loadingLayer.setProgress(progress);
    },
    function(result){
      imgList =result;
      removeChild(loadingLayer);
      loadingLayer = null;
      gameInit();
    }
  );
}
/**
 * 游戏初始化
 */
var gameInit = function(event){
  //游戏层初始化
  layerInit();
  //地图图片初始化
  mapInit();
  floor = script.floor01;
  scriptInit(floor);

  //添加贞事件，开始游戏循环
  backLayer.addEventListener(LEvent.ENTER_FRAME,onFrame);
};

/**
 * 游戏层显示初始化
 */
function layerInit(){
  //游戏底层添加
  backLayer = new LSprite();
  addChild(backLayer);
  addBackground();
  //地图层添加
  mapLayer = new LSprite();
  backLayer.addChild(mapLayer);
  //人物层添加
  charaLayer = new LSprite();
  backLayer.addChild(charaLayer);
  //效果层添加
  effectLayer = new LSprite();
  backLayer.addChild(effectLayer);
  //对话层添加
  talkLayer = new LSprite();
  backLayer.addChild(talkLayer);
  //控制层添加
  ctrlLayer = new LSprite();
  backLayer.addChild(ctrlLayer);
}

var mapInit = function(){
  var bitmapdata;
  if(imageArray == null){
    //地图图片数据
    bitmapdata = new LBitmapData(imgList["map"]);
    //将地图图片拆分，得到拆分后的各个小图片的坐标数组
    imageArray = LGlobal.divideCoordinate(bitmapdata.image.width,bitmapdata.image.height,4,2);
  }
};

var addBackground = function(){
  var i,j,indexX,indexY;
  var bitmapdata,bitmap;

  backLayer.removeAllChild();
  //在地图层上，画出13*13的小图片
  for(i=0;i<13;i++)
    for(j=0;j<13;j++){
      if(i==0||j==0||i==12||j==12){
        indexY = 1;
        indexX = 1;
      }else{
        indexY = 1;
        indexX = 0;
      }
      //得到小图片
      bitmapdata = new LBitmapData(imgList["map"],indexX*STEP,indexY*STEP,STEP,STEP);
      bitmap = new LBitmap(bitmapdata);
      //设置小图片的显示位置
      bitmap.x = j*STEP;
      bitmap.y = i*STEP;
      //将小图片显示到地图层
      backLayer.addChild(bitmap);
    }
};

var addMap = function(){
  var i,j,index,indexX,indexY;
  var bitmapdata,bitmap;

  mapLayer.removeAllChild();
  //在地图层上，画出11*11的小图片
  for(i=0;i<11;i++){
    for(j=0;j<11;j++){
      //从地图数组中得到相应位置的图片坐标
      index = map[i][j];
      //小图片的竖坐标
      indexY = Math.floor(index /2);
      //小图片的横坐标
      indexX = index - indexY*2;
      //得到小图片
      bitmapdata = new LBitmapData(imgList["map"],indexX*STEP,indexY*STEP,STEP,STEP);
      bitmap = new LBitmap(bitmapdata);
      //设置小图片的显示位置
      bitmap.x = (j+offsetX)*STEP;
      bitmap.y = (i+offsetY)*STEP;
      //将小图片显示到地图层
      mapLayer.addChild(bitmap);
    }
  }
};
/**
 * 添加英雄
 */
function addHero(){
  var heroData = floor.hero;

  var bitmapdata = new LBitmapData(imgList[heroData.img]);
  hero = new Hero(heroData.property,bitmapdata);

  hero.x = (heroData.position.x+offsetX)*STEP;
  hero.y = (heroData.position.y+offsetY)*STEP;

  //charaLayer.addChild(hero);
}
/**
 * 添加怪物
 */
function addEnemy(){
  var enemyList = floor.enemy;
  var enemyObj;
  for(var i=0; i<enemyList.length; i++){
    enemyObj = enemyList[i];
    var bitmapdata = new LBitmapData(imgList[enemyObj.img]);
    enemy = new Enemy(bitmapdata,enemyObj.index,1);

  enemy.x = (enemyObj.x+offsetX)*STEP;
  enemy.y = (enemyObj.y+offsetY)*STEP;

  charaLayer.addChild(enemy);
  }
}
/**
 * 帧循环
 * */
function onFrame(){
  for(var i=0;i<charaLayer.childList.length;i++){
    charaLayer.childList[i].onframe();
  }
}