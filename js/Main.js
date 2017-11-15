var log = function(){
  console.log.apply(console, arguments);
}
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

//小图片跨度大小
var STEP = 32;
//主游戏区域宽高
var MAIN_GAME_WIDTH = 13;
var MAIN_GAME_HEIGHT = 13;
// 有效游戏区对于canvas原点(0,0)的偏移
var OFFSET_X = 1;
var OFFSET_Y = 1;

var RESOURCES_PATH = './res/';

var resourcesUrl = {
  map: RESOURCES_PATH + 'map.png',
  hero: RESOURCES_PATH + 'hero.png',
  enemy: RESOURCES_PATH + 'enemy.png',
  items: RESOURCES_PATH + 'items.png',
  npc: RESOURCES_PATH + 'npc.png',
}

var isKeyDown = false;

/**
 * 数组变量
 */
//储存资源路径
var resData = [];
//储存加载后的图片列表信息
var imgList = [];

/**
 * 主程序
 */
function main(){
  LGlobal.setDebug(true);
  //
  resData.push({type:"js",path:"./js/support.js"});
  resData.push({type:"js",path:"./js/Map.js"});
  resData.push({type:"js",path:"./js/Hero.js"});
  resData.push({type:"js",path:"./js/Enemy.js"});

  //加载资源
  resData.push({name:"map", path: resourcesUrl.map});
  resData.push({name:"hero", path: resourcesUrl.hero});
  resData.push({name:"enemy", path: resourcesUrl.enemy});
  resData.push({name:"items", path: resourcesUrl.items});

  //加载剧本
  resData.push({type:"js",path:"./js/script.js"});

  loadingLayer = new LoadingSample3();
  addChild(loadingLayer);
  LLoadManage.load(
    resData,
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

  layerInit();

  scriptInit();

  //添加贞事件，开始游戏循环
  backLayer.addEventListener(LEvent.ENTER_FRAME,onFrame);
  if(!LGlobal.canTouch){
    //电脑的时候，添加键盘事件 【上 下 左 右】
    LEvent.addEventListener(LGlobal.window,LKeyboardEvent.KEY_DOWN,onkeydown);
    LEvent.addEventListener(LGlobal.window,LKeyboardEvent.KEY_UP,onkeyup);
  }

};
/**
 * 游戏层显示初始化
 */
function layerInit(){
  //背景层添加
  backLayer = new LSprite();
  addChild(backLayer);
  addBackground();
  //地图层添加
  mapLayer = new LSprite();
  backLayer.addChild(mapLayer);
  //门层
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

/**
 * 图片分割成bitmapdata
 * @param {*String} imgName 
 * @param {*Number} position_x 
 * @param {*Number} position_y 
 */
var _bitmapdata = function(imgName, position_x, position_y){
  return new LBitmapData(imgList[imgName],position_x*STEP,position_y*STEP,STEP,STEP);
}
/**
 * 根据ID返回相应对象
 * @param {*Number} id 
 */
var _findInfoById = function(id) {
  for (var i=0; i<elementsInfo.length; i++){
    if(id === elementsInfo[i].id) {
      return elementsInfo[i];
    }
  }
}
/**
 * 图片索引转换成坐标
 * @param {*Number} index 
 */
var _indexToPosition = function(index){
  var x, y;
  x = index%4;
  y = Math.floor(index/4);

  return {x, y};
}
var _getTypeById = function(id){
  // 10以内为地图地形
  if(id < 10) return 'map';
  // 11~20 为门
  if(id >= 10 && id <= 20) return 'door';
  // 21~100 为物品
  if(id > 20 && id <= 100) return 'item';
  // 100+ 为怪物
  if(id > 100) return 'enemy';
}
/**
 * 
 * @param {*Number} id 
 * @param {*Number} map_x 
 * @param {*Number} map_y 
 */
var _setViewByid = function(id, map_x, map_y) {
  var bitmap, element, position;

  element = _findInfoById(id);

  position = _indexToPosition(element.imgIndex)
  bitmap = new LBitmap(_bitmapdata(element.img, position.x, position.y));
  //设置小图片的显示位置
  bitmap.x = (map_x+OFFSET_X)*STEP;
  bitmap.y = (map_y+OFFSET_Y)*STEP;

  //将小图片显示到各层
  switch (_getTypeById(id)){
    case 'map':
      mapLayer.addChild(bitmap);
      break;
    case 'door':
      doorLayer.addChild(bitmap);
      break;
    case 'item':
      itemLayer.addChild(bitmap);
      break;
    case 'enemy':
      bitmap = new Enemy(element, 1);
      bitmap.x = (map_x+OFFSET_X)*STEP;
      bitmap.y = (map_y+OFFSET_Y)*STEP;
      enemyLayer.addChild(bitmap);
      break;
  }
}

var addBackground = function(){
  var i,j,x,y,bitmap;

  backLayer.removeAllChild();
  //在背景层上，画出13*13的主游戏区
  for(i=0;i<MAIN_GAME_HEIGHT;i++)
    for(j=0;j<MAIN_GAME_WIDTH;j++){
      if(i==0||j==0||i==MAIN_GAME_HEIGHT-1||j==MAIN_GAME_WIDTH-1){
        y = 0;
        x = 2;
      }else{
        y = 0;
        x = 0;
      }
      //得到小图片
      bitmap = new LBitmap(_bitmapdata("map", x, y));
      //设置小图片的显示位置
      bitmap.x = j*STEP;
      bitmap.y = i*STEP;
      //将小图片显示到背景层
      backLayer.addChild(bitmap);
    }
};
/**
 * 添加地图元素(包括物品和怪)
 */
function addElement(){

  mapLayer.removeAllChild();
  //在地图层上，画出11*11的有效游戏区
  for(var i=0;i<MAIN_GAME_WIDTH-2;i++){
    for(var j=0;j<MAIN_GAME_WIDTH-2;j++){
      //读取map数组得到id
      id = map[i][j];
      if(id === 0) continue;
      _setViewByid(id, j, i);
    }
  }
};
/**
 * 添加勇士
 */
function addHero(){
  var heroData = script.hero;

  hero = new Hero(heroData);
  // 显示到相应位置
  hero.x = (heroData.position.x+OFFSET_X)*STEP;
  hero.y = (heroData.position.y+OFFSET_Y)*STEP;

  playerLayer.addChild(hero);
}

function updateEnemy() {
  enemyLayer.removeAllChild()

  for(var i=0;i<MAIN_GAME_WIDTH-2;i++){
    for(var j=0;j<MAIN_GAME_WIDTH-2;j++){
      //读取map数组得到id
      id = map[i][j];
      if(_getTypeById(id) === 'enemy')
        _setViewByid(id, j, i);
    }
  }
}
function updateItem() {
  itemLayer.removeAllChild()

  for(var i=0;i<MAIN_GAME_WIDTH-2;i++){
    for(var j=0;j<MAIN_GAME_WIDTH-2;j++){
      //读取map数组得到id
      id = map[i][j];
      if(_getTypeById(id) === 'item')
        _setViewByid(id, j, i);
    }
  }
}
function updateDoor() {
  doorLayer.removeAllChild()

  for(var i=0;i<MAIN_GAME_WIDTH-2;i++){
    for(var j=0;j<MAIN_GAME_WIDTH-2;j++){
      //读取map数组得到id
      id = map[i][j];
      if(_getTypeById(id) === 'door')
        _setViewByid(id, j, i);
    }
  }
}
function updateMap() {
  mapLayer.removeAllChild()

  for(var i=0;i<MAIN_GAME_WIDTH-2;i++){
    for(var j=0;j<MAIN_GAME_WIDTH-2;j++){
      //读取map数组得到id
      id = map[i][j];
      if(_getTypeById(id) === 'map')
        _setViewByid(id, j, i);
    }
  }
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