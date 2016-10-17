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
  this.property = heroData.property;

  imgData.setProperties(0, 0, imgData.image.width / col, imgData.image.height / row);
  var list = LGlobal.divideCoordinate(imgData.image.width, imgData.image.height, row, col);

  this.anime = new LAnimation(this, imgData, list);

  //初始设定不移动
  this.move = false;
  //记录一个步长中当前移动次数
  this.moveCnt = 0;

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
  console.log(toy,tox,current_position,direction);
  //如果超过地图范围则不可移动
  if(toy<0 || tox<0 || toy>=mapdata.length || tox>=mapdata[0].length)
    return false;
  //如果为障碍物则不可移动
  if(mapdata[toy][tox] == 1)return false;

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

    console.log(this.checkRoad(direction));
    if(!this.checkRoad(direction))return;

    this.move = true;
    this.moveCnt = 0;
  }else if(direction != this.direction){
    this.direction_next = direction;
  }
};
Hero.prototype.onframe = function(){
  if(this.move){
    this.onmove();
  }

};

