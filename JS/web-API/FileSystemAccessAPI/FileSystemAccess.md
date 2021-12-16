# 文件系统访问接口

> 此系列功能只在安全上下文中可用

此 API 允许与用户本地设备或用户可访问的网络文件系统上的文件进行交互。此 API 的核心功能包括读取文件、写入或保存文件以及访问目录结构。

接口

- `FileSystemHandle`
  - 文件系统处理接口是一个表示条目的对象。多个句柄可以表示同一个条目。在大多数情况下，您不是直接使用，而是使用它的子接口 FileSystemFileEntry 和 FileSystemDirectoryEntry。
- `FileSystemFileHandle`
  - 提供文件系统条目的句柄。
- `FileSystemDirectoryHandle`
  - 提供文件系统目录的句柄。
- `FileSystemWritableFileStream`
  - 是一个 WritableStream 对象，具有其他方便的方法，该方法对磁盘上的单个文件进行操作。

## 说明

这些句柄表示用户系统上的文件或目录。必须首先通过向用户显示文件或目录选取器来访问它们。允许这样做的方法是 window.showOpenFilePicker 和 window.showDirectoryPicker。调用这些文件后，文件选取器将自行显示，用户选择文件或目录。成功执行此操作后，将返回句柄。您还可以通过 HTML Drag and Drop API 的 DataTransferItem.getAsFileSystemHandle（）方法访问文件句柄。

> 这个 API 需要用户的明确操作才开启用(类似 全屏 API)

## showOpenFilePicker 和 showDirectoryPicker

**showOpenFilePicker**
参数

- obj
  - multiple 是否多选
  - excludeAcceptAllOption 是否排除选择所有的选项
  - type: Array 允许选择的文件类型
    - obj
      - description 文件描述
      - accept: Object
        - 键设置为 MIME 类型
        - 值为文件扩展名组成的对象

返回一个数组(A Array of FileSystemFileHandle objects.)

[MDN MIME TYPE](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types)

```js
fileHandleAry = await window.showOpenFilePicker({
  types: [
    {
      description: 'Images',
      accept: {
        // 这里如果设置 image/* 则后面的数组会失效
        // 想要后面数组起效果, 则 image/ 后面随意写
        'image/x': ['.png', '.gif', '.jpeg', '.jpg'],
      },
    },
  ],
  excludeAcceptAllOption: true,
  multiple: true,
});
```

**showDirectoryPicker**
相比较之下目录选取就很简单

```js
dirHandle = await window.showDirectoryPicker();
```

## FileSystemFileHandle & FileSystemDirectoryHandle

**FileSystemFileHandle**

showOpenFilePicker 返回的是 FileSystemFileHandle

方法

- getFile()
  - 返回一个 Promise，该 Promise 解析为一个 File 对象，该 File 对象表示由句柄表示的条目在磁盘上的状态。
- createWritable()
  - 返回一个 Promise，它解析为一个新创建的可用于写入文件的 FileSystemWritableFileStream 对象。

读取文件

```js
fileHandle.getFile().then((file) => {
  // 这个和 input 标签获取的file一样
  // console.log(file);
  let reader = new FileReader(); // 使用fileReader 读取file内容
  reader.onload = function () {
    console.log(reader.result);
  };
  reader.readAsText(file, 'utf-8');
});
```

写入数据 (完整的数据写入请查看 FileSystemWritableFileStream 文档)
```js
async function writeFile(fileHandle, contents) {
  // Create a FileSystemWritableFileStream to write to.
  const writable = await fileHandle.createWritable();

  // Write the contents of the file to the stream.
  await writable.write(contents);

  // Close the file and write the contents to disk.
  await writable.close();
}
```

**FileSystemDirectoryHandle**

方法
+ keys() 返回一个异步迭代器, 值是文件/文件夹名称
+ values() 返回一个异步迭代器, 值是一个对象, {name:文件名称, kind: 文件类型(directory, file)}
+ entries() 返回一个异步迭代器, 只是一个数组`[key, value]`
+ getFileHandle()
+ getDirectoryHandle()
+ resolve() 
  + 返回一个包含从父句柄到指定子条目的目录名的数组，子条目的名称作为最后一个数组项。
  + 不懂
+ removeEntry()
  + 如果目录句柄包含称为指定名称的文件或目录，则尝试删除条目。