import User from "../models/User.js";

export class UserRepository {

    async findUserById(id) {
        return User.findByPk(id)
    }

    async saveNewUser(user) {
        const userToSave = new User(user);
        return userToSave.save();
    }

    async updateUser(user) {
        return user.save();
    }

}

export const userRepository = new UserRepository();