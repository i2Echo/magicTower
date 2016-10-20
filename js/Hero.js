/**
 * Created by PC on 10/14/2016.
 */

/**
 * 英雄设定
 * @class Hero
 * @constructor
 */
function Hero(heroData, imgData) {
  var col = 4, row = 4;
  base(this, LSprite, []);
  this.name = heroData.name;
  this.property = heroData.property;
  this.pack = heroData.pack;

  imgData.setProperties(0, 0, imgData.image.width / col, imgData.image.height / row);
  var list = LGlobal.divideCoordinate(imgData.image.width, imgData.image.height, row, col);

  this.anime = new LAnimation(this, imgData, list);

  //初始设定不移动
  this.move = false;
  //记录一个步长中当前移动次数
  this.moveCnt = 0;
  this.isFight = false;
}
/**
 * 设置英雄块坐标
 * @param x
 * @param y
 */
Hero.prototype.setPosition = function(x, y){
  this.x = (x+offsetX)*STEP;
  this.y = (y+offsetY)*STEP;
};
/**
 * 获取当前块坐标
 * @returns {{x: number, y: number}}
 */
Hero.prototype.getPosition = function(){
  return {x:(this.x/STEP)-offsetX, y:(this.y/STEP)-offsetY};
};

/**
 * @method onmove
 * @for Hero
 * @return {void}
 */
Hero.prototype.onmove = function() {
  //设定每次移动次数
  var mv_cnt = 4;
  //设置移动步长
  var move_length = STEP/mv_cnt;

  switch (this.direction) {
    case UP:
      this.y -= move_length;
      break;
    case DOWN:
      this.y += move_length;
      break;
    case LEFT:
      this.x -= move_length;
      break;
    case RIGHT:
      this.x += move_length;
      break;
  }
  this.anime.onframe();
  this.moveCnt++;
  if (this.moveCnt >= mv_cnt) {
    checkJump(floor);
    this.moveCnt = 0;
    if (this.direction != this.direction_next) {
      this.direction = this.direction_next;
      this.anime.setAction(this.direction);
    }
    if (!isKeyDown || !this.checkRoad()) {
      this.move = false;
    }
  }
};
/**
 * 障碍物判断
 * @method checkRoad
 * @param direction
 * @returns {boolean}
 */
Hero.prototype.checkRoad = function(direction) {
  var tox, toy, current_position;

  if(direction==null)
    direction = this.direction;
  current_position = this.getPosition();
  //移动目的地坐标
  switch (direction){
    case UP:
      tox = current_position.x;
      toy = current_position.y - 1;
      break;
    case DOWN:
      tox = current_position.x;
      toy = current_position.y + 1;
      break;
    case LEFT:
      tox = current_position.x - 1;
      toy = current_position.y;
      break;
    case RIGHT:
      tox = current_position.x + 1;
      toy = current_position.y;
      break;
  }
  //console.log(toy,tox,current_position,direction);
  //如果超过地图范围则不可移动
  if(toy<0 || tox<0 || toy>=mapdata.length || tox>=mapdata[0].length)
    return false;
  //获取墙层目标块的地形id
  var targetTileId = mapdata[toy][tox];
  //如果不为0表示有墙
  if(targetTileId){
    return false;
  }
  //获取怪物层目标块的地形id
  var enemydata = floor.enemy;
  targetTileId = enemydata[toy][tox];
  //如果不为0表示有怪
  if(targetTileId){
    //var isCanFight = false;
    var enemyObj = enemyList[targetTileId - 1];
    var heroATK = this.property.ATK;
    var heroHP = this.property.HP;
    var heroDEF = this.property.DEF;
    var enemyATK = enemyObj.property.ATK;
    var enemyHP = enemyObj.property.HP;
    var enemyDEF = enemyObj.property.DEF;
    if(heroATK>enemyDEF)
      Math.ceil(enemyHP/(heroATK-enemyDEF)) <= Math.ceil(heroHP/(enemyATK-heroDEF))){

      this.fight(tox,toy,enemyObj.property);
    }else{
      console.log("can't beat it");
    }
    return false;
  }
  //获取物品层目标块的地形id
  var itemdata = floor.items;
  targetTileId = itemdata[toy][tox];
  //如果不为0表示有物品
  if(targetTileId){
    this.pickUpItem(tox,toy,targetTileId);
    return false;
  }
  //获取门层目标块的地形id
  var doordata = floor.door;
  targetTileId = doordata[toy][tox];
  //如果不为0表示有门
  if(targetTileId){
    var keyId = doorList[targetTileId-1].keyId;
    var isCanOpen = false;
    if(keyId > 3){
      isCanOpen = true;
    }else if(this.pack[keyId] > 0){
      isCanOpen = true;
    }
    if(isCanOpen)this.openDoor(tox,toy,keyId);

    return false;
  }

  return true;
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
Hero.prototype.fight = function(x,y,enemyProp){
  if(!this.isFight){
    this.isFight = true;
    //战斗数据交互
    this.property.HP -= (enemyProp.ATK - this.property.DEF)*(Math.ceil(enemyProp.HP/(this.property.ATK-enemyProp.DEF))-1);
    //战斗特效
    //战斗结束删除怪物
    this.isFight = false;
    floor.enemy[y][x] = 0;
    updateEnemy();
    console.log("fight");
  }

};
Hero.prototype.pickUpItem = function(x,y,itemId){
  var itemObj = itemList[itemId-1];
  if(itemObj.type){
    //非立即自动生效物品数量加1
    if(this.pack[itemId] == null){
      this.pack[itemId] = 0;
    }
    this.pack[itemId] += 1;
  }else{
    //拾取立即生效物品添加对应属性
    var prop = Object.getOwnPropertyNames(itemObj.func)[0];
    this.property[prop] += itemObj.func[prop];
  }
  floor.items[y][x] = 0;
  updateItems();
  console.log("pick up");
  console.log(floor.hero.property, floor.hero.pack);
};
Hero.prototype.openDoor = function(x,y,keyId){
  if(this.pack[keyId]){
    this.pack[keyId] -= 1;
  }
  floor.door[y][x] = 0;
  updateDoor();
  console.log("open the door");
};

Hero.prototype.onframe = function(){
  if(this.move){
    this.onmove();
  }
};

