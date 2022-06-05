import lookup from "./lookup";
import renderTemplate from "./renderTemplate";
/**
 * 处理数组，结合renderTemplate实现递归
 * 参数时token不是tokens 是一个简单的数组 ['#', 'arr', Array[n]]
 * 
 * 递归调用renderTemplate函数，调用次数由data决定
 * 比如data是这样的
 * {
      students: [{
          name: '小红',
          hobbies: ['羽毛球', '跆拳道']
        },
        {
          name: '小明',
          hobbies: ['足球']
        },
        {
          name: '小王',
          hobbies: ['魔术', '学习', '游戏']
        }
      ]
    }
 * parseArray()函数要递归调用renderTemplate函数3次，数组的长度=3  
 */
export default function parseArray(token, data) {
  // console.log(token, data);
  // 得到data中这个数组需要使用的部分
  let newData = lookup(data, token[1]);
  // console.log(newData);
  // 结果字符串
  let resultStr = '';
  // 遍历newData
  // for (let i = 0; i < newData.length; i++){
  //   resultStr += renderTemplate(token[2], {
  //     // 展开newData[i] 并加入 点 数组
  //     ...newData[i],
  //     '.': newData[i]
  //   })
  // }
  for (let item of newData) {
    resultStr += renderTemplate(token[2], {
      // 展开newData[i] 并加入 点 数组
      ...item,
      '.': item
    })
  }
  return resultStr;
}
