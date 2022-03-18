1. 在离开的组件内调用 beforeRouterLeave
2. 调用全局 beforeEach
3. 在重用的组件内调用 beforeRouterUpdate
4. 调用路由独享守卫 beforeEnter
5. 调用全局 beforeResolve
6. 调用全局 afterEach
7. 调用组件的 created
8. 调用 组件内 beforeRouterUpdate 中的 next() 回调
9. 调用 mounted
