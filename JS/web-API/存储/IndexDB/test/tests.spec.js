/*
 * @Author: huangyingli
 * @Date: 2022-06-30 22:16:08
 * @LastEditors: huangyingli
 * @LastEditTime: 2022-07-01 00:50:54
 * @Description:
 */
describe('indexDB 方法库测试', function () {
  it('创建一个名为test-db的数据库和一个名为user的表', function () {
    return IndexDB('test-db', 'user', 'ssn').then((handle) => {
      expect(handle.dbName).to.equal('test-db');
      expect(handle.storeName).to.equal('user');
    });
  });

  // it('')
});
 