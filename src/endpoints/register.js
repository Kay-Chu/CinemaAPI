import bcrypt from 'bcrypt';
const saltRounds = 12;

async function register(username, password) {
    try {
        const hash = bcrypt.hash(password,saltRounds);
        return hash;
    } catch (error) {
        throw error;
    }
}

export default register;