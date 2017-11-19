
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

//小图片跨度大小
var STEP = 32;
//主游戏区域宽高
var MAIN_GAME_WIDTH = 13;
var MAIN_GAME_HEIGHT = 13;
// 有效游戏区对于canvas原点(0,0)的偏移
var OFFSET_X = 1;
var OFFSET_Y = 1;
var FIGHT_IMG_INDEX = 27;
var RESOURCES_PATH = './res/';

var imageRes = {
  map: RESOURCES_PATH + 'map.png',
  hero: RESOURCES_PATH + 'hero.png',
  enemy: RESOURCES_PATH + 'enemy.png',
  npc: RESOURCES_PATH + 'npc.png',
  items: RESOURCES_PATH + 'items.png',
  npc: RESOURCES_PATH + 'npc.png',
  big_monster: RESOURCES_PATH + 'big_Monster.png',
}
var _type = 'ogg';
var soundRes = {
  bgm: RESOURCES_PATH + 'bgm.mp3',
  attack: RESOURCES_PATH + 'attack.'+_type,
  open: RESOURCES_PATH + 'open.'+_type,
  pickup: RESOURCES_PATH + 'get.'+_type,
}

var isKeyDown = false;

var big_monster_part_count = 0;
/**
 * 数组变量
 */
//储存资源路径
var loadData = [];
//储存加载后的资源列表信息
var dataList = [];

/**
 * 主程序
 */
function main(){
  LGlobal.setDebug(true);
  //加载js
  loadData.push({type:"js",path:"./js/data.js"});
  loadData.push({type:"js",path:"./js/sound.js"});
  loadData.push({type:"js",path:"./js/Map.js"});
  loadData.push({type:"js",path:"./js/Hero.js"});
  loadData.push({type:"js",path:"./js/Enemy.js"});
  loadData.push({type:"js",path:"./js/Npc.js"});
  loadData.push({type:"js",path:"./js/control.js"});
  loadData.push({type:"js",path:"./js/support.js"});
  //加载图片资源
  loadData.push({name:"map", path: imageRes.map});
  loadData.push({name:"hero", path: imageRes.hero});
  loadData.push({name:"enemy", path: imageRes.enemy});
  loadData.push({name:"npc", path: imageRes.npc});
  loadData.push({name:"items", path: imageRes.items});
  loadData.push({name:"big_monster", path: imageRes.big_monster});
  //加载声音资源
  loadData.push({name:"bgm", path: soundRes.bgm});
  loadData.push({name:"attack", path: soundRes.attack});
  loadData.push({name:"pickup", path: soundRes.pickup});
  loadData.push({name:"open", path: soundRes.open});
  //加载剧本
  loadData.push({type:"js",path:"./js/script.js"});

  loadingLayer = new LoadingSample3();
  addChild(loadingLayer);
  LLoadManage.load(
    loadData,
    function(progress){
      loadingLayer.setProgress(progress);
    },
    function(result){
      dataList = result;
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
  soundInit();
  // bgm.play();
  //添加贞事件，开始游戏循环
  backLayer.addEventListener(LEvent.ENTER_FRAME,onFrame);
  if(!LGlobal.canTouch){
    addKeyboadListener();
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

  enemyLayer = new LSprite();
  charaLayer.addChild(enemyLayer);
  npcLayer = new LSprite();
  charaLayer.addChild(npcLayer);
  playerLayer = new LSprite();
  charaLayer.addChild(playerLayer);
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
  return new LBitmapData(dataList[imgName],position_x*STEP,position_y*STEP,STEP,STEP);
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

/**
 * 
 * @param {*Number} id 
 * @param {*Number} map_x 
 * @param {*Number} map_y 
 */
var _setViewByid = function(id, map_x, map_y) {
  var bitmap, element, position, bigMonsterIsDraw = false;

  element = _getInfoById(id);

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
      
      if(element.isBig){
        if(big_monster_part_count === 8){
          bitmap = new Enemy(element, 1);
          bitmap.x = (map_x+OFFSET_X-2)*STEP;
          bitmap.y = (map_y+OFFSET_Y-2)*STEP;
          enemyLayer.addChild(bitmap);
          big_monster_part_count = 0;
        }else {
          big_monster_part_count++;
        }
      }else{ 
        bitmap = new Enemy(element, 1);
        bitmap.x = (map_x+OFFSET_X)*STEP;
        bitmap.y = (map_y+OFFSET_Y)*STEP;
        enemyLayer.addChild(bitmap);
      }
      break;
    case 'npc':
      bitmap = new Npc(element, 1);
      bitmap.x = (map_x+OFFSET_X)*STEP;
      bitmap.y = (map_y+OFFSET_Y)*STEP;
      npcLayer.addChild(bitmap);
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
function addHero() {
  var heroData = script.hero;

  hero = new Hero(heroData);
  // 显示到相应位置
  hero.x = (heroData.position.x+OFFSET_X)*STEP;
  hero.y = (heroData.position.y+OFFSET_Y)*STEP;

  playerLayer.addChild(hero);
}
function addFightEffect() {
  var bitmap, position;
  
  position = _indexToPosition(FIGHT_IMG_INDEX)
  bitmap = new LBitmap(_bitmapdata('map', position.x, position.y));
  //设置小图片的显示位置
  bitmap.x = hero.x;
  bitmap.y = hero.y;

  effectLayer.addChild(bitmap);
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
function updateNpc() {
  enemyLayer.removeAllChild()

  for(var i=0;i<MAIN_GAME_WIDTH-2;i++){
    for(var j=0;j<MAIN_GAME_WIDTH-2;j++){
      //读取map数组得到id
      id = map[i][j];
      if(_getTypeById(id) === 'npc')
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
 * 帧循环
 * */
function onFrame(){
  if(!bgm.playing){ 
    // bgm.play();
  }
  // if(!pickupSound.playing) pickupSound.play();
  for(var i=0;i<charaLayer.childList.length;i++)
    for(var j=0;j<charaLayer.childList[i].childList.length;j++){
      charaLayer.childList[i].childList[j].onframe();
  }
}