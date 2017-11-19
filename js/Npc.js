/**
 * NPC
 */
function Npc(npcData,speed){
  // npc图片的npc数宽高 4*40
  var img_col = 4;
  var img_row = 8;

  base(this,LSprite,[]);
  
  //this.property = JSON.parse(JSON.stringify(npcData.property));
  this.speed = speed === null ? 3 : speed;
  this.speedIndex = 0;

  var imgData = new LBitmapData(dataList[npcData.img]);
  var width = imgData.image.width;
  var height = imgData.image.height;
  var list = LGlobal.divideCoordinate(width, height, img_row, img_col);

  this.anime = new LAnimation(this,imgData,list);
  this.anime.setAction(npcData.imgIndex);
}

Npc.prototype.onframe = function(){
  if(this.speedIndex++ < this.speed)
    return;
  this.speedIndex = 0;

  //人物动画播放
  this.anime.onframe();
};