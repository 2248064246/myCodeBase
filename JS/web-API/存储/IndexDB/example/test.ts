interface testData {
  ssn: string;
  name: string;
  age: number;
  email: string;
}

let data: Array<testData> = [
  {
    ssn: '1111',
    name: 'Tom',
    age: 18,
    email: 'sss@qq.com',
  },
  {
    ssn: '2222',
    name: 'Joy',
    age: 19,
    email: 'xxxx@qq.com',
  },
];

import indexDB from '../indexDB函数式封装';
/* 打开或新增一个对象存储 */
/* 新增时 keyPath 是必须的 */
indexDB('test-db', 'user', 'ssn').then((handle) => {
  // handle.get('1111').then((res: testData) => {
  //   console.log(res);
  // });
  // handle.get('666666').then((res: testData) => {
  //   console.log(res);
  // });
  // handle.get('6666898').then((res: testData) => {
  //   console.log(res);
  // });

  // handle.getAll().then((res: Array<testData>) => {
  //   console.log(res);
  // });

  // handle.clear().then((res) => {
  //   console.log(res);
  // });

  handle.count().then((res) => {
    console.log(res);
  });

  // handle
  // .add({
  //   ssn: '666666',
  //   age: 128,
  //   email: 'qqdx222x@gmail.com',
  //   name: 'Bin3',
  // } as testData)
  // .then((res: any) => {
  //   console.log(res);
  // });

  setTimeout(() => {
    handle.get<testData>('3333').then((res) => {
      console.log(res);
      handle.close();
    });

    setTimeout(() => {
      handle
        .add({
          ssn: '666689888',
          age: 128,
          email: 'qqdx558886x@gmail.com',
          name: 'Bin3',
        } as testData)
        .then((res: any) => {
          console.log(res);
        });
    }, 3000);
  }, 3000);

  // handle.add({
  //   ssn: '555',
  //   age: 18,
  //   email: 'qq@gmail.com',
  //   name: 'Bin'
  // } as testData)
});
indexDB('test-db', 'user', 'ssn').then((handle) => {
  // handle.get('1111').then((res: testData) => {
  //   console.log(res);
  // });
  // handle.get('666666').then((res: testData) => {
  //   console.log(res);
  // });
  // handle.get('6666898').then((res: testData) => {
  //   console.log(res);
  // });

  handle.getAll<testData>().then((res) => {
    console.log('all', res);
  });

  // handle.clear().then((res) => {
  //   console.log(res);
  // });

  // handle.count().then((res) => {
  //   console.log(res);
  // });

  // handle
  // .add({
  //   ssn: '666666',
  //   age: 128,
  //   email: 'qqdx222x@gmail.com',
  //   name: 'Bin3',
  // } as testData)
  // .then((res: any) => {
  //   console.log(res);
  // });

  setTimeout(() => {
    handle.get<testData>('3333').then((res) => {
      console.log(res);
      // handle.close();
    });

    setTimeout(() => {
      handle
        .add({
          ssn: '666689888',
          age: 128,
          email: 'qqdx558886x@gmail.com',
          name: 'Bin3',
        } as testData)
        .then((res: any) => {
          console.log(res);
        });
    }, 3000);
  }, 3000);

  // handle.add({
  //   ssn: '555',
  //   age: 18,
  //   email: 'qq@gmail.com',
  //   name: 'Bin'
  // } as testData)
});

export {};
