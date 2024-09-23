import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config();

const PORT = process.env.PORT;
const SALT = bcrypt.genSaltSync(9);

export { PORT, SALT };
