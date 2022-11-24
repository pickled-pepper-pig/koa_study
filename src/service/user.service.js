const User = require("../model/user.model");

class UserService {
  async createUser(user_name, password) {
    // todo: 写入数据库
    console.log(user_name, password)
    const res = await User.create({
      user_name,
      password,
    });

    return res.dataValues;
  }
}

module.exports = new UserService();
