/*
 * @Author: ys4225/黄迎李
 * @Date: 2021-06-27 19:00:03
 * @LastEditors: huangyingli
 * @LastEditTime: 2022-10-31 16:09:08
 * @Description: 
 */

interface Alarm {
  alert():void
}


class Door {

}

class carDoor extends Door implements Alarm {
  alert() {
    console.log('使用 alarm 接口')
  }
}
