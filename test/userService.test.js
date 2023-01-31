import {UserService} from "../src/services/userService.js"
import {userRepositoryMock} from "./mocks/userRepositoryMock.js";

const userService = new UserService(userRepositoryMock);

describe("Fetching existing users", () => {
    test("Should fetch Yoad", async () => {
        const user = await userService.getUserById(1);
        expect(user.name).toBe("Yoad");
    })
    test("Should fetch Yoad", async () => {
        const user = await userService.getUserById(2);
        expect(user.name).toBe("Ruth");
    })
    test("Should return undefined", async () => {
        const user = await userService.getUserById(1000);
        expect(user?.name).toBe(undefined);
    })
})