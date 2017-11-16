
var DOWN = 0;
var LEFT = 1;
var RIGHT = 2;
var UP = 3;

function addKeyboadListener(){
  //添加键盘事件 【上 下 左 右】
  LEvent.addEventListener(LGlobal.window,LKeyboardEvent.KEY_DOWN,onkeydown);
  LEvent.addEventListener(LGlobal.window,LKeyboardEvent.KEY_UP,onkeyup);

}
function removeKeyboadListener(){
  LEvent.addEventListener(LGlobal.window,LKeyboardEvent.KEY_DOWN);
  LEvent.addEventListener(LGlobal.window,LKeyboardEvent.KEY_UP);
}

/**
 *
 * @param event
 */
function onkeydown(event){
  if(event.keyCode == 37){//left
    hero.changeDir(LEFT);
  }else if(event.keyCode == 38){//up
    hero.changeDir(UP);
  }else if(event.keyCode == 39){//right
    hero.changeDir(RIGHT);
  }else if(event.keyCode == 40){//down
    hero.changeDir(DOWN);
  }
  isKeyDown = true;
}
function onkeyup(event){
  isKeyDown = false;
}
