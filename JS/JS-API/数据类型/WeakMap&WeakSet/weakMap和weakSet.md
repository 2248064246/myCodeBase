
# weakMap 和 weakSet

> 这里的 weak 值的是键 (弱键引用)

常规映射对自己的键值保持着强引用, 即使对它们的所有其他引用都不存在了, 任然可以通过映射访问这些键.


## weakMap

相对而言, `weakMap 保持着对它们键值的 '弱'引用, 因此无法通过WeakMap访问这些键`. 

**也就是说: WeakMap的存在并不妨碍它们的键值被回收**

+ WeakMap 的键必须是对象, 原始值不受垃圾回收控制, 不能作为键
+ WeakMap 不可迭代, 无法访问键
+ WeakMap 没有size属性, 因为弱映射的大小可能随着对象被当做垃圾回收

## WeakSet

基本同 WeakSet
