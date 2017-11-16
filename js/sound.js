
var bgm;
var openSound;
var pickupSound;
var attackSound;

function soundInit(){
  bgm = new LSound();
  openSound = new LSound();
  pickupSound = new LSound();
  attackSound = new LSound();

  bgm.load(dataList['bgm']);
  openSound.load(dataList['open']);
  pickupSound.load(dataList['pickup']);
  attackSound.load(dataList['attack']);
}

