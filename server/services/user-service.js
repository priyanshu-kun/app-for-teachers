const UserModel = require("../models/user.model")

class UserService {
    async findUser(filter) {
        return await UserModel.findOne(filter)
    }
    async createUser(user) {
        return await UserModel.create(user)
    }
}

module.exports = new UserService()