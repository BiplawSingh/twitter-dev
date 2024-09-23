import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT;
const SECRET_KEY = process.env.SECRET_KEY;
const URI = process.env.URI;

export { PORT, SECRET_KEY, URI };
