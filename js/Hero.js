/**
 * Created by PC on 10/14/2016.
 */

/**
 * 英雄设定
 */
function Hero(heroData,imgData){
  var col= 4,row=4;
  base(this,LSprite,[]);
  this.property = heroData.property;

  imgData.setProperties(0,0,imgData.image.width/col,imgData.image.height/row);
  var list = LGlobal.divideCoordinate(imgData.image.width,imgData.image.height,row,col);

  this.anime = new LAnimation(this,imgData,list);
}
