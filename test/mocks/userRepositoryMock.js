
export class UserRepositoryMock {

    users = [
        {
            id: 1,
            name: "Yoad",
            email: "yoad@email.com",
            password: "$2a$10$gJqV2BWpT//kT9fh9H5IvOliZGpY8ERzEBj0MYqgdvUSPuSRnyFHW",
            balance: 3000
        },
        {
            id: 2,
            name: "Ruth",
            email: "ruth@email.com",
            password: "$2a$10$gJqV2BWpT//kT9fh9H5IvOliZGpY8ERzEBj0MYqgdvUSPuSRnyFHW",
            balance: 2000
        },
        {
            id: 3,
            name: "Eden",
            email: "eden@email.com",
            password: "$2a$10$gJqV2BWpT//kT9fh9H5IvOliZGpY8ERzEBj0MYqgdvUSPuSRnyFHW",
            balance: 1000
        },
    ];

    findUserById(id) {
        return this.users.find(user => user.id === id);
    }

    saveNewUser(user) {
        const newId = Math.round(Math.random() * 1000);
        user.id = newId;
        this.users.push(user)
        return this.users.find(user => user.id === newId);
    }

    updateUser(user) {
        let userToFind = this.users.find(u => u.id === user.id);
        userToFind = user;
        return userToFind;
    }

}

export const userRepositoryMock = new UserRepositoryMock();
