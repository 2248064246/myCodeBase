/*
 * @Author: huangyingli
 * @Date: 2022-02-05 18:46:39
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-02-05 23:58:00
 * @Description:
 */

let userDB = {};

function addUser(name, clientDataJSON, attestationObject) {
  if (userExists(name)) {
    return 'existed';
  }
  userDB[name] = {
    name,
    clientDataJSON,
    attestationObject,
  };
}

function getUser(name) {
  if (userExists(name)) {
    return userDB[name];
  } else {
    return false;
  }
}

function userExists(name) {
  return name in userDB;
}

module.exports = {
  addUser,
  userExists,
  getUser
};
