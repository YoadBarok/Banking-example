import {UserService} from "../src/services/userService.js"
import {userRepositoryMock} from "./mocks/userRepositoryMock.js";

const userService = new UserService(userRepositoryMock);

describe("Fetching existing users", () => {
    test("Should fetch Yoad", async () => {
        const user = await userService.getUserById(1);
        expect(user.name).toBe("Yoad");
    })
    test("Should fetch Ruth", async () => {
        const user = await userService.getUserById(2);
        expect(user.name).toBe("Ruth");
    })
    test("Should return undefined", async () => {
        const user = await userService.getUserById(1000);
        expect(user?.name).toBe(undefined);
    })
})

describe("Checking for valid email addresses", () => {
    test("Should return true", () => {
        expect(userService.isValidEmail("yoad@email.com")).toBe(true);
    })
    test("Should return false", () => {
        expect(userService.isValidEmail("yoad.email.com")).toBe(false);
    })
    test("Should return false", () => {
        expect(userService.isValidEmail("yoad@email-com")).toBe(false);
    })
})

describe("Comparing passwords to hashed passwords", () => {
    test("Should return true", async () => {
        expect(await userService.comparePasswords("abcd1234", "$2a$10$42kASpTE30GaxOgy/jPZheeEgRpPDkn1flNSvbZ1V1hvv/80nY63K")).toBe(true);
    })
    test("Should return false", async () => {
        expect(await userService.comparePasswords("aabcd1234", "$2a$10$42kASpTE30GaxOgy/jPZheeEgRpPDkn1flNSvbZ1V1hvv/80nY63K")).toBe(false);
    })
})

describe("Adding new users", () => {
    test("Should increase userService.userRepository.users.length by 1, and the last user in the users array is Joe", async () => {
        const usersLength = userService.userRepository.users.length;
        await userService.saveUser({
            name: "Joe",
            email: "joe@email.com",
            password: "123456abc"
        })
        expect(userService.userRepository.users.length).toBe(usersLength + 1);
        const lastUser = userService.userRepository.users[userService.userRepository.users.length - 1];
        expect(lastUser.name).toBe("Joe")
    })
})

describe("Testing deposit and withdrawal", () => {
    test("Should return 4000 after deposit of 1000", async () => {
        const user = await userService.getUserById(1);
        await userService.deposit(user, 1000);
        expect(user.balance).toBe(4000)
    })
    
    test("Should return 3000 after withdrawal of 1000", async () => {
        const user = await userService.getUserById(1);
        await userService.withdraw(user, 1000);
        expect(user.balance).toBe(3000)
    })
    
    test("Should return error: Insufficent funds! Current balance is: user.balance", async () => {
        const user = await userService.getUserById(1);
        await expect(userService.withdraw(user, 10000)).rejects.toBe("Insufficent funds! Current balance is: " + user.balance);       
    })
})