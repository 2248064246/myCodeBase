
# Web SQL
Web SQL 是在浏览器上模拟数据库，可以使用 JS 来操作 SQL 完成对数据的读写。

Web SQL 数据库 API 并不是 HTML5 规范的一部分，但是它是一个独立的规范，引入了一组使用 SQL 操作客户端数据库的 APIs。

它可以在现在浏览器中工作(chrome edge)

> 注意: webSQL 目前并不是 W3C 的标准规范, 它诞生于2010年, 但是由于各种原因W3C并没有采用此规范, 而是转而研究 webStorage 和 IndexDB.

> 目前它在 chromium 内核的浏览器中基本都是支持的, firefox中并不支持. 所以请不要使用它

> https://www.w3.org/TR/webdatabase/

## 核心方法

+ `openDatabase(dbName, version, description, dbSize, createCallback)`
  + 这个方法使用现有的数据库或者新建的数据库创建一个数据库对象。
  + createCallback 会在创建数据库后被调用
+ `transaction`
  + 这个方法让我们能够控制一个事务，以及基于这种情况执行提交或者回滚
+ `executeSql`
  + 这个方法用于执行实际的 SQL 查询。