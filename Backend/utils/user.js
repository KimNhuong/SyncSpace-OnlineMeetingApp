const bcrypt = require('bcrypt');
const saltRounds = 10;

async function hashPassword(plainPassword) {
    const salt = await bcrypt.genSalt(saltRounds);
    return await bcrypt.hash(plainPassword, salt);
}

module.exports = hashPassword;