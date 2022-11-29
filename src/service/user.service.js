const User = require("../model/user.model");
class UserService {
  // 插入用户数据
  async createUser(user_name, password) {
    // todo: 写入数据库
    const res = await User.create({
      user_name,
      password,
    });

    return res.dataValues;
  }

  // 查询用户
  async getUserInfo({ id, user_name, is_admin, password }) {
    const whereOpt = {};

    id && Object.assign(whereOpt, { id });
    user_name && Object.assign(whereOpt, { user_name });
    password && Object.assign(whereOpt, { password });
    is_admin && Object.assign(whereOpt, { is_admin });

    const res = await User.findOne({
      attributes: ["id", "user_name", "is_admin", "password"],
      where: whereOpt,
    });
    return res ? res.dataValues : null;
  }

  async updateById({ id, user_name, is_admin, password }) {
    const whereOpt = { id };
    const newUser = {};

    user_name && Object.assign(newUser, { user_name });
    password && Object.assign(newUser, { password });
    is_admin && Object.assign(newUser, { is_admin });

    const res = await User.update(newUser, {
      where: whereOpt,
    });
    return res[0] > 0 ? true : false;
  }
}

module.exports = new UserService();
