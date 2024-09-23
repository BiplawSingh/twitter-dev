import mongoose from 'mongoose';
import { URI } from './config.js';

export const connect = async () => {
    try {
        await mongoose.connect(URI);
        console.log("Connected successfully to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
};
