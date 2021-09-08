
# Record 

是一个高级类型

```ts
Record<K,T> // T 是一个类型数组, K是一个其他类型
// 结果将会返回一个新类型: {K: T}
```

```ts
interface EmployeeType {
    id: number
    fullname: string
    role: string
}
 
let employees: Record<number, EmployeeType> = {
    0: { id: 1, fullname: "John Doe", role: "Designer" },
    1: { id: 2, fullname: "Ibrahima Fall", role: "Developer" },
    2: { id: 3, fullname: "Sara Duckson", role: "Developer" },
}
```