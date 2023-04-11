import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PasswordNotMatchError, UserNotFoundError } from './Errors.js';
import { getJWTSecret, getUserByUsername } from "./database/connection.js";

async function login(username, password) {
    try {
        const result = await getUserByUsername(username);
        if(result.length > 0) {
            const userEntry = result[0];
            const password_match = await bcrypt.compare(password,userEntry.password_hash);
            if (password_match) {
                const jwt_secret = await getJWTSecret();
                const jwt_token = jwt.sign({ username: userEntry.username }, jwt_secret, { expiresIn: '30s' });
                const userData = {
                    id: userEntry.id,
                    username: userEntry.username,
                    token: jwt_token
                };
                return userData;
            } else {
                throw new PasswordNotMatchError('Password Incorrect!')
            }
        } else {
            throw new UserNotFoundError('No Such User!');
        }
        // const hash = bcrypt.hash(password,saltRounds);
    } catch (error) {
        throw error;
    }
}

export default login;