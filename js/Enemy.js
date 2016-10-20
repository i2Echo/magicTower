/**
 * Created by PC on 10/14/2016.
 */

/**
 * 怪物
 */
function Enemy(enemyData,imgData,speed){
  var col= 4,row=4;
  base(this,LSprite,[]);
  this.property = JSON.parse(JSON.stringify(enemyData.property));
  this.speed = speed==null?3:speed;
  this.speedIndex = 0;

  imgData.setProperties(0,0,imgData.image.width/col,imgData.image.height/row);
  var list = LGlobal.divideCoordinate(imgData.image.width,imgData.image.height,row,col);

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