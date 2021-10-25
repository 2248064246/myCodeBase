

# DOM继承关系
```js
                      | Document -> HTMLDocument
                      | CharacterData     
EventTarget -> Node ->| Element  -> HTMLElement -> | HTMLHeadElement
                      | Attr                       | HTMLTitleElement
                                                   | HTMLBodyElement     
```