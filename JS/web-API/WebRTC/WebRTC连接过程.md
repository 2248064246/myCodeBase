# WebRTC 连接过程

## 提议(offer), 应答(answer), 信号通道

提议和应答是一种 `SDP`格式的字符串

信号通道用来传递 SDP

> webRTC 需要某种服务器来交换两端信息

## 会话描述

WebRTC 连接上的端点配置称为 `会话描述`. 该描述包括关于要发送的媒体类型, 格式, 使用的传输协议, 端点地址以及其他描述此端点的信息.

`会话描述协议`(就是 SDP)用来交换和存储该信息; (此协议具体详情 [RFC 2327](https://datatracker.ietf.org/doc/html/rfc2327))

以下是交换提议和应答所必须的基本步骤

> 这个只是 A 端到 B 端的视频流传输(不是两端互通, 要想 B 端到 A 端, 需要 B 给 A 发 offer, 然后 A 回复)

1. 呼叫着通过 `navigator.mediaDevices.getUserMedia()`捕捉本地媒体
2. 呼叫着创建一个`RTCPeerConnection`并调用`RTCPeerConnection.addTrack()`
3. 呼叫着调用`RTCPeerConnection.createOffer()` 来创建一个提议(offer)(需要通过 ICE 获取绘画描述信息)
4. 呼叫者调用 `RTCPeerConnection.setLocalDescription` 将提议设置为本地描述
5. 呼叫着请求(STUN/TURN)服务器创建 ice 候选
6. 呼叫者通过信令服务器将提议(offer)传递至接收者
7. 接收者收到了提议并调用`RTCPeerConnection.setRemoteDescription()`将其记录为远程描述
8. 接受者做一些操作: 捕获本地媒体, 然后通过 `RTCPeerConnection.addTrack()` 添加到连接中
9. 接收者通过 `RTCPeerConnection.createAnswer()` 创建一个应答(需要通过 ICE 获取绘画描述信息)
10. 接受者调用 `RTCPeerConnection.setLocalDescription()` 将应答设置为本地描述. 此时, 接收者已经知道了连接双方的配置
11. 接收者通过信令服务器将应答传递到呼叫者
12. 呼叫者接受应答
13. 呼叫者调用`RTCPeerConnection.setRemoteDescription()` 将应答设置为远程描述. 这样, 呼叫者也知道了连接双方的配置了
