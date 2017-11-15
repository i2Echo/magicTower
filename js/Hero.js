
/**
 * 英雄设定
 * @class Hero
 * @constructor
 */
function Hero(heroData, imgData) {

  var IMG_COL = 4;
  var IMG_ROW = 4;

  var self = this;
  base(self, LSprite, []);
  self.name = heroData.name;
  //这里对象需要浅复制
  self.property = heroData.property;
  self.pack = heroData.pack;
  self.position = heroData.position;

  var imgData = new LBitmapData(imgList[heroData.img]);
  imgData.setProperties(0, 0, imgData.image.width / IMG_COL, imgData.image.height / IMG_ROW);
  var list = LGlobal.divideCoordinate(imgData.image.width, imgData.image.height, IMG_ROW, IMG_COL);

  self.anime = new LAnimation(self, imgData, list);

  //初始设定不移动
  self.move = false;
  //记录移动一格中当前移动次数
  self.moveCnt = 0;
  //是否在战斗
  self.isFight = false;
}
/**
 * 设置英雄坐标
 * @param x
 * @param y
 */
Hero.prototype.setPosition = function(floor, x, y){
  this.position.atFloor = floor;
  this.position.x = x;
  this.position.y = y;
};
/**
 * 获取当前坐标
 * @returns {{x: number, y: number}}
 */
Hero.prototype.getPosition = function(){
  return this.position;
};

/**
 * @method onmove
 * @for Hero
 * @return {void}
 */
Hero.prototype.onmove = function(){
  var self = this;
  //设定每格移动次数
  var mv_cnt = 4;
  //设置移动步长
  var move_length = STEP/mv_cnt;
  self.moveCnt++;
  var aStep = self.moveCnt >= mv_cnt ? 1 : 0;
  switch (self.direction) {
    case UP:
      self.y -= move_length;
      self.position.y -= aStep;
      break;
    case DOWN:
      self.y += move_length;
      self.position.y += aStep;
      break;
    case LEFT:
      self.x -= move_length;
      self.position.x -= aStep;
      break;
    case RIGHT:
      self.x += move_length;
      self.position.x += aStep;
      break;
  }
  self.anime.onframe();
  
  if (self.moveCnt >= mv_cnt) { //一格移动完成
    checkJump();
    self.moveCnt = 0;
    if (self.direction != self.direction_next) {
      self.direction = self.direction_next;
      self.anime.setAction(self.direction);
    }
    if (!isKeyDown || !self.checkRoad(self.direction)) {
      self.move = false;
    }
  }
};
/**
 * 障碍物判断
 * @method checkRoad
 * @param direction
 * @returns {boolean}
 */
Hero.prototype.checkRoad = function(direction){
  var to_x, to_y, current_position;

  if(direction==null)
    direction = this.direction;
  current_position = this.getPosition();
  //移动目的地坐标
  switch (direction){
    case UP:
      to_x = current_position.x;
      to_y = current_position.y - 1;
      break;
    case DOWN:
      to_x = current_position.x;
      to_y = current_position.y + 1;
      break;
    case LEFT:
      to_x = current_position.x - 1;
      to_y = current_position.y;
      break;
    case RIGHT:
      to_x = current_position.x + 1;
      to_y = current_position.y;
      break;
  }
  //如果超过地图范围则不可移动
  if(to_y<0 || to_x<0 || to_y>=MAIN_GAME_HEIGHT-2 || to_x>=MAIN_GAME_WIDTH-2)
    return false;
  //获取目标块的地形id
  var targetTileId = map[to_y][to_x];
  //如果不为0或者上下楼梯（4,5）表示有障碍物
  if(targetTileId === 0 || targetTileId === 4 || targetTileId === 5)
    return true;
  else {
    // 遇到怪物
    if(_getTypeById(targetTileId) === 'enemy'){

      var enemy = _findInfoById(targetTileId);
      if(_isCanFight(this, enemy))this.fight(to_x,to_y,enemy);
      return false;
    }
    //遇到物品
    if(_getTypeById(targetTileId) === 'item'){

      var item = _findInfoById(targetTileId);
      this.pickUpItem(to_x,to_y,item);
      return false;
    }
    //遇到门
    if(_getTypeById(targetTileId) === 'door'){
      
      var door = _findInfoById(targetTileId);
      var keyForDoor = _findInfoById(door.keyId);
      if(_isCanOpen(this, keyForDoor)) this.openDoor(to_x,to_y,keyForDoor);
      return false;
    }
  }
};
/**
 *
 * @param direction
 */
Hero.prototype.changeDir = function(direction){
  if(!this.move){
    this.direction = direction;
    this.direction_next = direction;

    this.anime.setAction(direction, mode=0);
    this.anime.onframe();

    if(!this.checkRoad(direction))return;

    this.move = true;
    this.moveCnt = 0;
  }else if(direction != this.direction){
    this.direction_next = direction;
  }
};

Hero.prototype.fight = function(x,y,enemy){

  if(!this.isFight){
    this.isFight = true;
    //战斗数据交互
    var enemyProp = enemy.property;
    if(enemyProp.HP > 0){
      enemyProp.HP -= this.property.ATK-enemyProp.DEF;
      enemyProp.HP = enemyProp.HP<0 ? 0 : enemyProp.HP;
      log(enemyProp);
    }
    while(enemyProp.HP > 0){
      //战斗特效
      this.property.HP -= enemyProp.ATK - this.property.DEF;
      enemyProp.HP -= this.property.ATK-enemyProp.DEF;
      enemyProp.HP = enemyProp.HP<0 ? 0 : enemyProp.HP;
      log(hero.property);
      log(enemyProp);
    }
    //战斗结算 获得金币，触发剧情等
    this.property.gold += enemyProp.gold;
    log(hero.property);
    //战斗结束删除怪物
    this.isFight = false;
    map[y][x] = 0;
    updateEnemy();
    log("Beat the "+enemy.name+", got "+enemyProp.gold+" gold");
  }
};

Hero.prototype.pickUpItem = function(x,y,item){

  var msg = "";
  if(item.type){
    //非立即自动生效物品数量加1
    if(this.pack[item.name] == null){
      this.pack[item.name] = 0;
    }
    this.pack[item.name] += 1;
  }else{
    //拾取立即生效物品添加对应属性
    var prop = Object.getOwnPropertyNames(item.func)[0];
    this.property[prop] += item.func[prop]*floor.domain;
    msg = ", And hero's "+prop+" add "+item.func[prop]*floor.domain;
  }
  map[y][x] = 0;
  updateItem();
  log("Got a "+ item.name+msg);
  log(hero.property, hero.pack);
};
Hero.prototype.openDoor = function(x,y,key){

  this.pack[key.name]-= 1;
  map[y][x] = 0;
  updateDoor();
  log("open the door");
  log(hero.pack);
};

Hero.prototype.onframe = function(){
  if(this.move){
    this.onmove();
  }
};

var _isCanFight = function(hero, enemy) {
  var heroATK = hero.property.ATK;
  var heroHP = hero.property.HP;
  var heroDEF = hero.property.DEF;
  var enemyATK = enemy.property.ATK;
  var enemyHP = enemy.property.HP;
  var enemyDEF = enemy.property.DEF;
  log(enemy.name,enemy.property);
  if(heroDEF >= enemyATK){
    return true;
  }else if( heroATK>enemyDEF && Math.ceil(enemyHP/(heroATK-enemyDEF)) <= Math.ceil(heroHP/(enemyATK-heroDEF)) ){
    return true;
  }else {
    return false;
    log("Can't beat it");
  }
}

var _isCanOpen = function(hero, key) {

  // 检测普通钥匙开门
  if(hero.pack[key.name] > 0) return true;
  else {
    log("Can't open, you need a "+key.name);
    return false;
  }
  // 条件门暂未处理
}
