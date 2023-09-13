const { v4: uuid4 } = require('uuid')

class User{
    constructor({ id, name, email, password }) {
        this.id = id ?? uuid4();
        this.name = name
        this.email = email
        this.password = password
    }
}

module.exports = User;