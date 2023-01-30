import { userService } from "../services/userService.js";

export class UserController {

    constructor(userService) {
        this.userService = userService;
    }

    async register(req, res) {
        try {
            const {name, email, password } = req.body;
            const newUser = await userService.saveUser({
                name: name,
                email: email,
                password: password
            });
            res.status(200).json({userId: newUser.id});
        } catch (error) {
            if (error.name === "SequelizeUniqueConstraintError") {
                res.status(400).json({ error: "name or email are already taken" });
            } else {
                res.status(500).json({ error: error });
            }
        }
    }


}

export const userController = new UserController(userService);