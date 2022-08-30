# 关闭画中画功能

1. 使用 video 元素的 `disablepictureinpicture` 属性
2. 通过在返回的document文档中加入`Feature-Policy: picture-in-picture none` 请求头

以上两个方法都需要注意浏览器兼容性(在较新的chromium内核中都支持)



