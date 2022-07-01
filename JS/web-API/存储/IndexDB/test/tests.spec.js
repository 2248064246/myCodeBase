/*
 * @Author: huangyingli
 * @Date: 2022-06-30 22:16:08
 * @LastEditors: huangyingli
 * @LastEditTime: 2022-07-01 15:38:17
 * @Description:
 */
describe('indexDB 方法库测试', function () {
  it('创建一个名为test-db的数据库和一个名为user的表', function () {
    return IndexDB('test-db', 'user', 'ssn', [
      {
        name: 'email',
        keyPath: 'email',
        unique: true,
      },
    ]).then((handle) => {
      expect(handle.dbName).to.equal('test-db');
      expect(handle.storeName).to.equal('user');
    });
  });

  it('打开test-db中的user表', function () {
    return IndexDB('test-db', 'user').then((handle) => {
      expect(handle.dbName).to.equal('test-db');
      expect(handle.storeName).to.equal('user');
    });
  });

  it('清空表', function () {
    return IndexDB('test-db', 'user').then((handle) => {
      handle.clear();
      handle.count().then((n) => {
        expect(n).to.equal(0);
      });
    });
  });

  it('向user表中写入2新条数据', function () {
    let data = [
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
    return IndexDB('test-db', 'user').then((handle) => {
      data.forEach((v) => {
        handle.add(v);
      });

      return handle.count().then((n) => {
        expect(n).to.equal(2);
      });
    });
  });

  it('向user表中写入keyPath重复的数据, 报key存在错误', function () {
    return IndexDB('test-db', 'user').then((handle) => {
      return handle
        .add({
          ssn: '1111',
          name: 'Tom',
          age: 18,
          email: 'sss@qq.com',
        })
        .catch((err) => {
          expect(err.toString()).to.contain(
            'Key already exists in the object store'
          );
        });
    });
  });

  it('向user表中写入index重复数据, 报唯一性不满足错误', function () {
    return IndexDB('test-db', 'user').then((handle) => {
      return handle
        .add({
          ssn: '111122',
          name: 'Tom',
          age: 18,
          email: 'sss@qq.com',
        })
        .catch((err) => {
          expect(err.toString()).to.contain(
            'at least one key does not satisfy the uniqueness requirements'
          );
        });
    });
  });

  it('通过keyPath获取对应数据', function () {
    return IndexDB('test-db', 'user').then((handle) => {
      return handle.get('2222').then((res) => {
        expect(res.ssn).to.equal('2222');
      });
    });
  });

  it('通过index获取对应数据', function () {
    return IndexDB('test-db', 'user').then((handle) => {
      return handle.index('email', 'xxxx@qq.com').then((res) => {
        expect(res.email).to.equal('xxxx@qq.com');
      });
    });
  });

  it('修改ssn为1111的数据', function () {
    return IndexDB('test-db', 'user').then((handle) => {
      return handle
        .put(
          {
            ssn: '1111',
            name: 'Tom',
            age: 189,
            email: 'sss@qq.com',
          },
          '1111'
        )
        .then((res) => {
          expect(res).to.equal('1111');
        });
    });
  });

  it('获取搜索数据', function () {
    return IndexDB('test-db', 'user').then((handle) => {
      return handle.getAll().then((res) => {
        expect(res.length).to.equal(2);
      });
    });
  });

  it('删除数据', function () {
    return IndexDB('test-db', 'user').then((handle) => {
      return handle.delete('2222').then((res) => {
        console.log(res);
      });
    });
  });
});
