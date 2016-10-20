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
//门层
var doorLayer;
//物品层
var itemLayer;
//人物层(包含英雄，怪物，NPC)
var charaLayer;
//玩家层
var playerLayer;
//怪物层
var enemyLayer;
//NPC层
var npcLayer;
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

var isKeyDown = false;

/**
 * 数组变量
 */
//储存图片路径
var imgData = [];
//储存加载后的图片列表信息
var imgList = [];
var imageArray;
//楼层
var floor;
var enemyList;
var itemList;
var doorList;
/**
 * 主程序
 */
function main(){
  LGlobal.setDebug(true);
  //
  imgData.push({type:"js",path:"./js/Map.js"});
  imgData.push({type:"js",path:"./js/script.js"});
  imgData.push({type:"js",path:"./js/Hero.js"});
  imgData.push({type:"js",path:"./js/Enemy.js"});
  //添加图片路径
  imgData.push({name:"map", path:"./images/map.png"});
  imgData.push({name:"hero", path:"./images/hero.png"});
  imgData.push({name:"slime", path:"./images/slime.png"});
  imgData.push({name:"items", path:"./images/items.png"});

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
  enemyList = enemyInfo;
  itemList = itemsInfo;
  doorList = doorInfo;
  scriptInit(floor);

  //添加贞事件，开始游戏循环
  backLayer.addEventListener(LEvent.ENTER_FRAME,onFrame);
  if(!LGlobal.canTouch){
    //电脑的时候，添加键盘事件 【上 下 左 右 空格】
    LEvent.addEventListener(LGlobal.window,LKeyboardEvent.KEY_DOWN,onkeydown);
    LEvent.addEventListener(LGlobal.window,LKeyboardEvent.KEY_UP,onkeyup);
  }

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
  doorLayer = new LSprite();
  backLayer.addChild(doorLayer);
  //物品层添加
  itemLayer = new LSprite();
  backLayer.addChild(itemLayer);
  //人物层添加
  charaLayer = new LSprite();
  backLayer.addChild(charaLayer);
  playerLayer = new LSprite();
  charaLayer.addChild(playerLayer);
  enemyLayer = new LSprite();
  charaLayer.addChild(enemyLayer);
  npcLayer = new LSprite();
  charaLayer.addChild(npcLayer);
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
    imageArray = LGlobal.divideCoordinate(bitmapdata.image.width,bitmapdata.image.height,4,4);
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
        indexY = 0;
        indexX = 3;
      }else{
        indexY = 0;
        indexX = 2;
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
/**
 *
 */
function addMap(){
  var i,j,index,indexX,indexY;
  var bitmapdata,bitmap;

  mapLayer.removeAllChild();
  //在地图层上，画出11*11的小图片
  for(i=0;i<11;i++){
    for(j=0;j<11;j++){
      //从地图数组中得到相应位置的图片坐标
      index = map[i][j];
      if(index!=0){
        //小图片的竖坐标
        indexY = Math.floor(index/4);
        //小图片的横坐标
        indexX = index - indexY*4;
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
  }
};
/**
 * 添加英雄
 */
function addHero(){
  var heroData = floor.hero;

  var bitmapdata = new LBitmapData(imgList[heroData.img]);
  hero = new Hero(heroData, bitmapdata);

  hero.x = (heroData.x+offsetX)*STEP;
  hero.y = (heroData.y+offsetY)*STEP;

  playerLayer.addChild(hero);
}
/**
 * 添加怪物
 */
function addEnemy(){
  var enemyArray = floor.enemy;
  var enemyId, enemyObj;
  for(var i=0; i<enemyArray.length; i++){
    for(var j=0; j<enemyArray[i].length; j++){
      enemyId = enemyArray[i][j];
      if(enemyId!=0){
        enemyObj = enemyList[enemyId-1];
        var bitmapdata = new LBitmapData(imgList[enemyObj.img]);
        var enemy = new Enemy(enemyObj, bitmapdata, 1);

        enemy.x = (j+offsetX)*STEP;
        enemy.y = (i+offsetY)*STEP;

        enemyLayer.addChild(enemy);
      }
    }
  }
}

function updateEnemy(){
  enemyLayer.removeAllChild();
  addEnemy();
}

function addItems(){
  var itemArray = floor.items;
  var itemId, itemObj, indexX, indexY;
  for(var i=0; i<itemArray.length; i++){
    for(var j=0; j<itemArray[i].length; j++){
      itemId = itemArray[i][j];
      if(itemId!=0){
        itemObj = itemList[itemId-1];
        indexY = Math.floor((itemId-1)/4);
        indexX = (itemId-1) - indexY*4;
        var bitmapdata = new LBitmapData(imgList[itemObj.img],STEP*indexX,STEP*indexY,STEP,STEP);
        var bitmap = new LBitmap(bitmapdata);

        bitmap.x = (j+offsetX)*STEP;
        bitmap.y = (i+offsetY)*STEP;

        itemLayer.addChild(bitmap);
      }
    }
  }
}
function updateItems(){
  itemLayer.removeAllChild();
  addItems();
}

function addDoor(){
  var doorArray = floor.door;
  var doorId, doorObj, indexX, indexY;
  for(var i=0; i<doorArray.length; i++){
    for(var j=0; j<doorArray[i].length; j++){
      doorId = doorArray[i][j];
      if(doorId!=0){
        for(var k=0; k<doorList.length; k++)
          if(doorList[k].id == doorId)doorObj = doorList[k];
        indexY = Math.floor(doorObj.imgIndex/4);
        indexX = doorObj.imgIndex - indexY*4;
        var bitmapdata = new LBitmapData(imgList[doorObj.img],STEP*indexX,STEP*indexY,STEP,STEP);
        var bitmap = new LBitmap(bitmapdata);

        bitmap.x = (j+offsetX)*STEP;
        bitmap.y = (i+offsetY)*STEP;

        doorLayer.addChild(bitmap);
      }
    }
  }
}
function updateDoor(){
  doorLayer.removeAllChild();
  addDoor();
}
/**
 *
 * @param event
 */
function onkeydown(event){
  if(event.keyCode == 37){//left
    hero.changeDir(LEFT);
  }else if(event.keyCode == 38){//up
    hero.changeDir(UP);
  }else if(event.keyCode == 39){//right
    hero.changeDir(RIGHT);
  }else if(event.keyCode == 40){//down
    hero.changeDir(DOWN);
  }
  isKeyDown = true;
}
function onkeyup(event){
  isKeyDown = false;
}
/**
 * 帧循环
 * */
function onFrame(){
  for(var i=0;i<charaLayer.childList.length;i++)
    for(var j=0;j<charaLayer.childList[i].childList.length;j++){
      charaLayer.childList[i].childList[j].onframe();
  }
}