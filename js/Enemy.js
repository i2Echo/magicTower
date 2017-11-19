
/**
 * 怪物
 */

function Enemy(enemyData,speed){
  // enemy图片的怪物数宽高 4*40
  var img_col = 4;
  var img_row = 40;
  // bigmonster图片怪物数宽高 4*4

  base(this,LSprite,[]);
  
  this.property = JSON.parse(JSON.stringify(enemyData.property));
  this.speed = speed === null ? 3 : speed;
  this.speedIndex = 0;
  this.partCount = 0;
  this.isBig = enemyData.isBig;
  if(this.isBig) img_row = 4;
  var imgData = new LBitmapData(dataList[enemyData.img]);
  var width = imgData.image.width;
  var height = imgData.image.height;
  var list = LGlobal.divideCoordinate(width, height, img_row, img_col);

  this.anime = new LAnimation(this,imgData,list);
  this.anime.setAction(enemyData.imgIndex);
}

Enemy.prototype.onframe = function(){
  if(this.speedIndex++ < this.speed)
    return;
  this.speedIndex = 0;

  //人物动画播放
  this.anime.onframe();
};