import { userRepository } from "../repositories/userRepository.js";
import bcrypt from 'bcryptjs';

export class UserService {

    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async getUserById(userId) {
        return await this.userRepository.findUserById(userId);
    }

    async saveUser(user) {
        user.password = await bcrypt.hash(user.password, 10);
        const newUser = await this.userRepository.saveNewUser(user);
        return newUser;
    }

    async deposit(user, amount) {
        user.balance += amount;
        return this.userRepository.updateUser(user);
    }

    async withdraw(user, amount) {
        if (user.balance >= amount) {
            user.balance -= amount;
            return this.userRepository.updateUser(user);
        } else throw "Insufficent funds! Current balance is: " + user.balance;
    }

    async checkPassword(password, hashedPassword) {
        return bcrypt.compare(password, hashedPassword)
    }

    async updateUser(user) {
        return this.userRepository.updateUser(user);
    }


}

export const userService = new UserService(userRepository);