// 所有元素的信息 
var elementsInfo = [
  {id:0, name:"road", img:"map", imgIndex:0}
  ,{id:1, name:"wall", img:"map", imgIndex:1}
  ,{id:2, name:"purpleWall", img:"map", imgIndex:2}
  ,{id:3, name:"starWall", img:"map", imgIndex:4}
  ,{id:4, name:"magma", img:"map", imgIndex:5}
  ,{id:5, name:"upStairs", img:"map", imgIndex:25}
  ,{id:6, name:"downStairs", img:"map", imgIndex:24}
  //门
  ,{id:10, name:"yellowDoor", img:"map", imgIndex:8, keyId: 21}
  ,{id:11, name:"blueDoor", img:"map", imgIndex:9, keyId: 22}
  ,{id:12, name:"redDoor", img:"map", imgIndex:10, keyId: 23}
  ,{id:13, name:"greenDoor", img:"map", imgIndex:11}
  ,{id:14, name:"ironDoor", img:"map", imgIndex:26}


// 物品信息 编号为 20+
//type为捡起物品后生效类型 => 
// 0：立即自动生效； 1：手动生效，消耗性； 2:条件触发自动生效，消耗性;
// 3：手动生效，可用3次； 4:条件触发自动生效，永久性 5：手动生效，永久性
  ,{id:21, name:"Yellow Key", img:"items", imgIndex: 0, type:2, zh_name: "黄钥匙"
    }
  ,{id:22, name:"Blue Key", img:"items", imgIndex: 1, type:2, zh_name: "蓝钥匙"
    }
  ,{id:23, name:"Red Key", img:"items", imgIndex: 2, type:2, zh_name: "红钥匙"
    }
  ,{id:24, name:"Magic Key", img:"items", imgIndex: 3, type:1, zh_name: "魔法钥匙"
    ,func:{openType: 10}}
  ,{id:25, name:"Red Elixir", img:"items", imgIndex: 4, type:0, zh_name: "红药水"
    ,func:{HP:50}}
  ,{id:26, name:"Blue Elixir", img:"items", imgIndex: 5, type:0, zh_name: "蓝药水"
    ,func:{HP:200}}
  ,{id:27, name:"Red Crystal", img:"items", imgIndex: 6, type:0, zh_name: "红水晶"
    ,func:{ATK:1}}
  ,{id:28, name:"Blue Crystal", img:"items", imgIndex: 7, type:0, zh_name: "蓝水晶"
    ,func:{DEF:1}}

  ,{id:29, name:"Iron Sword", img:"items", imgIndex: 8, type:0, zh_name: "铁剑"
    ,func:{ATK:10}}
  ,{id:30, name:"Iron Shield", img:"items", imgIndex: 9, type:0, zh_name: "铁盾"
    ,func:{DEF:10}}
  ,{id:31, name:"Silver Sword", img:"items", imgIndex: 10, type:0, zh_name: "银剑"
    ,func:{ATK:30}}
  ,{id:32, name:"Silver Shield", img:"items", imgIndex: 11, type:0, zh_name: "银盾"
    ,func:{DEF:30}}
  ,{id:33, name:"Sword of Knight", img:"items", imgIndex: 12, type:0, zh_name: "骑士剑"
    ,func:{ATK:50}}
  ,{id:34, name:"Shield of Knight", img:"items", imgIndex: 13, type:0, zh_name: "骑士盾"
    ,func:{DEF:50}}
  ,{id:35, name:"Holy Sword", img:"items", imgIndex: 14, type:0, zh_name: "圣剑"
    ,func:{ATK:80}}
  ,{id:36, name:"Holy Shield", img:"items", imgIndex: 15, type:0, zh_name: "圣盾"
    ,func:{DEF:80}}
  ,{id:37, name:"Sacred Sword", img:"items", imgIndex: 16, type:0, zh_name: "神圣剑"
    ,func:{ATK:100}}
  ,{id:38, name:"Sacred Shield", img:"items", imgIndex: 17, type:0, zh_name: "神圣盾"
    ,func:{DEF:100}}

  ,{id:39, name:"Orb of Hero", img:"items", imgIndex: 18, type:5, zh_name: "怪物图鉴"
    ,func:{}}
  ,{id:40, name:"Orb of Wisdom", img:"items", imgIndex: 19, type:5, zh_name: "记事本"
    ,func:{}}
  ,{id:41, name:"Orb of Fiying", img:"items", imgIndex: 20, type:5, zh_name: "飞行器"
    ,func:{}}
  ,{id:42, name:"Magic Mattock", img:"items", imgIndex: 21, type:1, zh_name: "魔法镐"
    ,func:{}}
  ,{id:43, name:"Super Maigc Mattock", img:"items", imgIndex: 22, type:1, zh_name: "地震卷轴"
    ,func:{}}
  ,{id:44, name:"Snow Crystal", img:"items", imgIndex: 23, type:5, zh_name: "冰冻水晶"
    ,func:{}}
  ,{id:45, name:"Bomb", img:"items", imgIndex: 24, type:1, zh_name: "炸弹"
    ,func:{}}
  ,{id:46, name:"Holy Elixir", img:"items", imgIndex: 25, type:1, zh_name: "圣水"
    ,func:{}}
  ,{id:47, name:"Luck Gold", img:"items", imgIndex: 26, type:4, zh_name: "幸运金币"
    ,func:{}}
  ,{id:48, name:"Cross", img:"items", imgIndex: 27, type:4, zh_name: "十字架"
    ,func:{}}
  ,{id:49, name:"Up Floor", img:"items", imgIndex: 28, type:1, zh_name: "上楼器"
    ,func:{}}
  ,{id:50, name:"Down Floor", img:"items", imgIndex: 29, type:1, zh_name: "下楼器"
    ,func:{}}
  ,{id:51, name:"Space Staff", img:"items", imgIndex: 30, type:3, zh_name: "飞羽"
    ,func:{}}
  ,{id:52, name:"Dragon Slayer", img:"items", imgIndex: 31, type:4, zh_name: "屠龙匕首"
    ,func:{}}

  //npc 为80+


  //怪物编号为100+
  ,{id:101, name:"Green Slime", img:"enemy", imgIndex:0, zh_name: "绿史莱姆"
    ,property:{HP: 35, ATK: 18, DEF: 1, gold: 1}}
  ,{id:102, name:"Red Slime", img:"enemy", imgIndex:1, zh_name: "红史莱姆"
    ,property:{HP: 45, ATK: 20, DEF: 2, gold: 2}}
  ,{id:103, name:"Bat", img:"enemy", imgIndex:4, zh_name: "小蝙蝠"
    ,property:{HP: 35, ATK: 38, DEF: 3, gold: 3}}
  ,{id:104, name:"Priest", img:"enemy", imgIndex:8, zh_name: "初级法师"
    ,property:{HP: 60, ATK: 32, DEF: 8, gold: 5}}
  ,{id:105, name:"Skeleton C", img:"enemy", imgIndex:12, zh_name: "骷髅人"
    ,property:{HP: 50, ATK: 42, DEF: 6, gold: 6}}
  ,{id:106, name:"skeleton_B", img:"enemy", imgIndex:13, zh_name: "骷髅战士"
    ,property:{HP: 55, ATK: 52, DEF: 12, gold: 8}}
  ,{id:107, name:"Gate-keeper C", img:"enemy", imgIndex:20, zh_name: "初级卫兵"
    ,property:{HP: 50, ATK: 48, DEF: 22, gold: 12}}  
  ,{id:108, name:"Skeleton A", img:"enemy", imgIndex:14, zh_name: "骷髅队长"
    ,property:{HP: 100, ATK: 65, DEF: 15, gold: 30}}

  ,{id:109, name:"Big Slime", img:"enemy", imgIndex:2, zh_name: "大史莱姆"
    ,property:{HP: 130, ATK: 60, DEF: 3, gold: 8}}
  ,{id:110, name:"Big Bat", img:"enemy", imgIndex:5, zh_name: "大蝙蝠"
    ,property:{HP: 60, ATK: 100, DEF: 8, gold: 12}}
  ,{id:111, name:"Superion Priest", img:"enemy", imgIndex:9, zh_name: "高级法师"
    ,property:{HP: 100, ATK: 95, DEF: 30, gold: 18}}
  ,{id:112, name:"Zombie", img:"enemy", imgIndex:16, zh_name: "僵尸兽人"
    ,property:{HP: 260, ATK: 85, DEF: 5, gold: 22}}
  ,{id:113, name:"Zombie Knight", img:"enemy", imgIndex:17, zh_name: "兽人武士"
    ,property:{HP: 320, ATK: 120, DEF: 15, gold: 30}}
  ,{id:114, name:"Rock", img:"enemy", imgIndex:18, zh_name: "石头人"
    ,property:{HP: 20, ATK: 100, DEF: 68, gold: 28}}
  ,{id:115, name:"Giant Octopus", img:"big_monster", imgIndex:1, zh_name: "大乌贼", isBig: true, reward: 42
    ,property:{HP: 1200, ATK: 180, DEF: 20, gold: 100}}
  ,{id:116, name:"Vampire", img:"enemy", imgIndex:7, zh_name: "吸血鬼"
    ,property:{HP: 444, ATK: 199, DEF: 66, gold: 144}}

  ,{id:117, name:"Great Magic Master", img:"enemy", imgIndex:30, zh_name: "大法师"
    ,property:{HP: 4500, ATK: 560, DEF: 310, gold: 1000}}
  ,{id:118, name:"Ghost Soldier", img:"enemy", imgIndex:15, zh_name: "鬼战士"
    ,property:{HP: 220, ATK: 180, DEF: 30, gold: 35}}
  ,{id:119, name:"Soldier", img:"enemy", imgIndex:24, zh_name: "战士"
    ,property:{HP: 210, ATK: 200, DEF: 65, gold: 45}}
  ,{id:120, name:"Slime Man", img:"enemy", imgIndex:19, zh_name: "史莱姆人"
    ,property:{HP: 320, ATK: 140, DEF: 20, gold: 30}}
  ,{id:121, name:"Gate-keeper B", img:"enemy", imgIndex:21, zh_name: "中级卫兵"
    ,property:{HP: 100, ATK: 180, DEF: 110, gold: 50}}
  ,{id:122, name:"Swordsman", img:"enemy", imgIndex:23, zh_name: "双手剑士"
    ,property:{HP: 100, ATK: 680, DEF: 50, gold: 55}}
  ,{id:123, name:"Dreadful Dragon", img:"big_monster", imgIndex:0, zh_name: "魔龙", isBig: true
    ,property:{HP: 1500, ATK: 600, DEF: 250, gold: 800}}
  ,{id:124, name:"Knight", img:"enemy", imgIndex:26, zh_name: "骑士"
    ,property:{HP: 160, ATK: 230, DEF: 105, gold: 65}}
  ,{id:125, name:"Golden Knight", img:"enemy", imgIndex:25, zh_name: "金甲骑士"
    ,property:{HP: 120, ATK: 150, DEF: 50, gold: 100}}

  ,{id:126, name:"Magician B", img:"enemy", imgIndex:10, zh_name: "初级巫师"
    ,property:{HP: 220, ATK: 370, DEF: 110, gold: 80}}
  ,{id:127, name:"Magician A", img:"enemy", imgIndex:11, zh_name: "高级巫师"
    ,property:{HP: 200, ATK: 380, DEF: 130, gold: 90}}
  ,{id:128, name:"King Slime", img:"enemy", imgIndex:3, zh_name: "史莱姆王"
    ,property:{HP: 360, ATK: 310, DEF: 20, gold: 40}}
  ,{id:129, name:"Vampire Bat", img:"enemy", imgIndex:6, zh_name: "吸血蝙蝠"
    ,property:{HP: 200, ATK: 390, DEF: 90, gold: 50}}
  ,{id:130, name:"Dark Knight", img:"enemy", imgIndex:27, zh_name: "黑暗骑士"
    ,property:{HP: 180, ATK: 430, DEF: 210, gold: 120}}
  ,{id:131, name:"Magic Sergeant", img:"enemy", imgIndex:29, zh_name: "魔法警卫"
    ,property:{HP: 230, ATK: 450, DEF: 100, gold: 100}}
  ,{id:132, name:"Gate-keeper A", img:"enemy", imgIndex:22, zh_name: "高级卫兵"
    ,property:{HP: 180, ATK: 460, DEF: 360, gold: 200}}
];

/**
 * 根据ID返回相应对象
 * @param {*Number} id 
 */
var _getInfoById = function(id) {
  for (var i=0; i<elementsInfo.length; i++){
    if(id === elementsInfo[i].id) {
      return elementsInfo[i];
    }
  }
}

var _getTypeById = function(id){
  // 10以内为地图地形
  if(id < 10) return 'map';
  // 11~20 为门
  if(id >= 10 && id <= 20) return 'door';
  // 21~100 为物品
  if(id > 20 && id <= 100) return 'item';
  // 100+ 为怪物
  if(id > 100) return 'enemy';
}
