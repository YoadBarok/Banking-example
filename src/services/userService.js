import { userRepository } from "../repositories/userRepository.js";
import bcrypt from 'bcryptjs';

export class UserService {

    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async getUserById(userId) {
        return this.userRepository.findUserById(userId);
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

    async comparePasswords(password, hashedPassword) {
        return bcrypt.compare(password, hashedPassword)
    }

    // Checks for a valid email address.
    isValidEmail(email) {
        return /^[A-Za-z0-9._+\-\']+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}$/.test(email);
    }

    // Checks if the given password contains at least 1 of each: Uppercase letter, Lowercase letter, Digit and Special character, and the length is between 8-16
    isValidPassword(password) {
        return /^(?=.*\p{Ll})(?=.*\p{Lu})(?=.*[\d|@#$!%*?&])[\p{L}\d@#$!%*?&]{8,16}$/gmu.test(password);
    }


}

export const userService = new UserService(userRepository);