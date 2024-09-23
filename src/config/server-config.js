import { PORT } from './config.js';
import bcrypt from "bcrypt";

const SALT = bcrypt.genSaltSync(9);

export { PORT, SALT };
