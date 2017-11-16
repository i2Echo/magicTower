
/**
 * 怪物
 */


function Enemy(enemyData,speed){
  // 怪物图片的怪物数宽高
  var IMG_COL = 4;
  var IMG_ROW = 40;

  base(this,LSprite,[]);
  
  this.property = JSON.parse(JSON.stringify(enemyData.property));
  this.speed = speed === null ? 3 : speed;
  this.speedIndex = 0;

  var imgData = new LBitmapData(dataList[enemyData.img]);
  var width = imgData.image.width;
  var height = imgData.image.height;
  imgData.setProperties(0, 0, 32, 32);
  var list = LGlobal.divideCoordinate(width, height, IMG_ROW, IMG_COL);

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