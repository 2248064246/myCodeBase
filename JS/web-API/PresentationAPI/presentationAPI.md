# PresentationAPI

演示 API, 用于将 web 内容投屏到其他屏幕

> 此 API 只在 chromium 内核此有用, firefox 浏览器不支持

## 控制端

```js
/* 要演示的页面 */
var presUrls = ['./presentation.html'];

/* 创建连接对象, 用于连接演示页面 */
var request = new PresentationRequest(presUrls);

/* 获取演示功能是否可用, 浏览器是否支持演示功能 */
request
  .getAvailability()
  .then(function (availability) {
    /* 返回值只有两个属性, {value, onchange} */
    /* value: Boolean, 表示演示功能是否可用 */
    /* handleAvailabilityChange 方法用于处理不同状态, 例如按钮的显示, 禁用等 */
    handleAvailabilityChange(availability.value);
    availability.onchange = function () {
      handleAvailabilityChange(this.value);
    };
  })
  .catch(function () {
    /* 如果该功能浏览器不支持, 可以在这里做更多的事情 */
    handleAvailabilityChange(true);
  });

/* 按钮按下, 开始演示 */
element.onclick = function () {
  /* 开始连接请求 */
  request
    .start()
    /* 连接情况将会传递给 setConnection 方法 */
    .then(setConnection);
};

var connection; // 连接对象

function setConnection(newConnection) {
  // 如果已有连接, 且不是当前连接, 则关闭之前连接
  if (
    connection &&
    connection != newConnection &&
    connection.state != 'closed'
  ) {
    connection.onclosed = undefined;
    connection.close();
  }

  // 设置新的连接
  connection = newConnection;
  /* 记录连接id, 可以用于重连 */
  localStorage['presId'] = connection.id;

  /* 显示控制UI */
  function showConnectedUI() {
    // Allow the user to disconnect from or terminate the presentation
    stopBtn.style.display = 'inline';
    disconnectBtn.style.display = 'inline';
    reconnectBtn.style.display = 'none';
  }

  function showDisconnectedUI() {
    disconnectBtn.style.display = 'none';
    stopBtn.style.display = 'none';
    reconnectBtn.style.display = localStorage['presId'] ? 'inline' : 'none';
  }

  // Monitor the connection state
  connection.onconnect = (_) => {
    console.log('已连接', connection);
    showConnectedUI();

    // 可以用于接收显示端发送过来的消息
    connection.onmessage = (message) => {
      console.log(`Received message: ${message.data}`);
    };

    // 向显示端发送消息
    connection.send('Say hello');
  };

  /* 这个是关闭事件, 后续可以重连 */
  connection.onclose = (_) => {
    connection = null;
    showDisconnectedUI();
  };

  /* 这个是终止事件(即完全终止连接) */
  connection.onterminate = (_) => {
    // Remove presId from localStorage if exists
    delete localStorage['presId'];
    connection = null;
    showDisconnectedUI();
  };
}

/* 重连 */
var reconnect = function () {
  // read presId from localStorage if exists
  var presId = localStorage['presId'];
  // presId is mandatory when reconnecting to a presentation.
  if (!!presId) {
    request
      .reconnect(presId)
      // The new connection to the presentation will be passed to
      // setConnection on success.
      .then(setConnection);
    // No connection found for presUrl and presId, or an error occurred.
  }
};
```

## 演示端

```js
var addConnection = function (connection) {
  connection.onmessage = function (message) {
    connection.send('hello');
  };
};

/* 接收端获取连接器, 接收端receiver返回的是 PresentationReceiver */
/* 控制端的 receiver 是null */
/* 通常通过 navigation.presentation 来获取 Presentation 对象 */
/* 即 Presentation.receiver == navigator.presentation.receiver */
navigator.presentation.receiver.connectionList.then(function (list) {
  /* connectionList 返回的是Promise, 里面存储了当前页面与控制器的连接 */

  /* 返回控制器集合 */
  list.connections.map(function (connection) {
    addConnection(connection);
  });

  /* 当有新的连接可用时, 会被触发 */
  /* 不理解?? 一个演示器能够有多个控制端??? */
  list.onconnectionavailable = function (evt) {
    addConnection(evt.connection);
  };
});
```
