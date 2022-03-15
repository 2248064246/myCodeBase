# 父子组件的生命周期钩子执行顺序

## 挂在过程

1. 父组件 beforeCreated
2. 父组件 created
3. 父组件 beforeMount
4. 子组件 beforeCreated
5. 子组件 created
6. 子组件 beforeMount
7. 子组件 mounted
8. 父组件 mounted

## 销毁过程

9.  父组件 beforeDestroy
10. 子组件 beforeDestroy
11. 子组件 destroy
12. 父组件 destroy
