
# markdown语法学习

[Toc]

## 斜体和粗体 {#id}

```markdown
    *斜体*
    **粗体**
    ***斜体加粗***
    ~~删除线~~
    ==高亮==
```
+ *斜体*
+ **粗体**
+ ***斜体加粗***
+ ~~删除线~~
+ ==高亮==
## 引用
```markdown
    > 这是个引用
    >> 这个第二个引用
    引用可以嵌套
```
>这是一个引用
>>这第二个引用

## 分隔线
```markdown
    三个以上的 - 或者 * 或者 _
    ---
    ****
    _______
```
+ ----
+ ****
+ ________
## 图片
```markdown
    ![alt](src 'title') --> 参数和img标签一样
```
![这是一张图片](../../image/clock.png '表盘')
## 超链接
```markdown
    [name](url 'title')
    或者你也可以直接写html
    <a href="https://baidu.com" target="_target">百度</a>

    参考链接
    这个是[百度][1],这个是[必应][2].(下面要空一行)

    [1]:https://baidu.com
    [2]:https://cn.bing.com
```
+ [百度](https://baidu.com '百度')
+ [必应](https://cn.bing.com)
+ <a href="https://baidu.com" target="_target">百度</a>
+ 这个是[百度][1],这个是[必应][2].  

 [1]:https://baidu.com
 [2]:https://cn.bing.com
## 锚点
```markdown
    ## xxx {#index}

    跳转到[xxx](#index)
```
+ 跳转到[斜体和粗体](#id)
## 列表
### 无序列表
```markdown
    使用 *,+,-表示无序列表
```
### 有序列表
```markdown
    使用 数字. 表示有序列表
```
1. 这是一
2. 这是二
3. 这是三
## 代码块
```markdown
    1. 使用 
            ``` 
                代码块 
            ```
    2. 使用 `单行代码`
```
## 表格
```markdown
    xxx|xxx|xxx
    -|-|-
    xxx|xxx|xxx
```
姓名|年龄|性别
-|-|-
小明|18|男
小红|19|未知


