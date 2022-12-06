# @import

用于从其他样式表中导入样式规则

- 可以指定媒体查询条件, 可以条件符合才导入

  ```css
  @import url('landscape.css') screen and (orientation: landscape);
  ```

- 可以指定导入到对应的 `layer`层

  ```css
  @import url(links.css) layer(default);
  ```
