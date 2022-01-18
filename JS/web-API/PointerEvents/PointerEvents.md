# 指针事件

这是对目前日益增多的指针设备而设置的(例如: 鼠标, 触控板, 多点触控屏)

指针事件能够实现对这些设备的指针事件监听

这是对 MouseEvents 的扩展

| Event              | On Event Handler     | Description                                                                                                                                                                                                                             |
| ------------------ | -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| pointerover        | onpointerover        | 当定点设备进入某个元素的命中检测 范围时触发。                                                                                                                                                                                           |
| pointerenter       | onpointerenter       | 当定点设备进入某个元素或其子元素的命中检测范围时，或做为某一类不支悬停（hover）状态的设备所触发的 poinerdown 事件的后续事件时所触发。(详情可见 pointerdown 事件类型).                                                                   |
| pointerdown        | onpointerdown        | 当某指针得以激活时触发。                                                                                                                                                                                                                |
| pointermove        | onpointermove        | 当某指针改变其坐标时触发。                                                                                                                                                                                                              |
| pointerup          | onpointerup          | 当某指针不再活跃时触发。                                                                                                                                                                                                                |
| pointercancel      | onpointercancel      | 当浏览器认为某指针不会再生成新的后续事件时触发（例如某设备不再活跃）                                                                                                                                                                    |
| pointerout         | onpointerout         | 可能由若干原因触发该事件，包括：定位设备移出了某命中检测的边界；不支持悬浮状态的设备发生 pointerup 事件（见 pointerup 事件）； 作为 pointercancel event 事件的后续事件（见 pointercancel 事件）；当数位板检测到数位笔离开了悬浮区域时。 |
| pointerleave       | onpointerleave       | 当定点设备移出某元素的命中检测边界时触发。对于笔形设备来说，当数位板检测到笔移出了悬浮范围时触发。                                                                                                                                      |
| gotpointercapture  | ongotpointercapture  | 当某元素接受到一个指针捕捉时触发。                                                                                                                                                                                                      |
| lostpointercapture | onlostpointercapture | 当针对某个指针的指针捕捉得到释放时触发。                                                                                                                                                                                                |

## 指针捕获

> 这个拖拽中可能会用到

+ HTMLElement.setPointerCapture(pointerId)
+ HTMLElement.releasePointerCapture(pointerId)