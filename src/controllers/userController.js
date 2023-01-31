import { userService } from "../services/userService.js";
import _ from "lodash";

export class UserController {

    async register(req, res) {
        try {
            const {name, email, password } = req.body;
            const newUser = await userService.saveUser({
                name: name,
                email: email,
                password: password
            });
            if (! userService.isValidEmail(email)) throw "Invalid email address!";
            res.status(201).json({userId: newUser.id});
        } catch (error) {
            if (error.name === "SequelizeUniqueConstraintError") {
                res.status(400).json({ error: "name or email are already in use" });
            } else {
                res.status(400).json({ error: error });
            }
        }
    }

    async modifyBalance(req, res) {
        try {
            // Get the path: /deposit or /withdraw and remove the leading slash:
            const action = req.route.path.slice(1);

            const {id, amount, password} = req.body;

            // Check for valid amount:
            if (amount <= 0 || !_.isNumber(amount)) throw "Invalid amount"; 
            
            const user = await userService.getUserById(id);

            // Check for valid user id:
            if (!user) throw "Invalid user id";

            // Check for valid password:
            const passwordMatch = await userService.checkPassword(password, user.password);
            if (passwordMatch) {                
                action === "deposit" ? 
                    await userService.deposit(user, amount) :
                    await userService.withdraw(user, amount);
                res.status(200).json({Balance: user.balance});
            } else {
                throw "Incorrect password!";
            }

        } catch (error) {
            res.status(400).json({ error: error });
        }
    }

}

export const userController = new UserController();