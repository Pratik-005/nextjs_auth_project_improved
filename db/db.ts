import mongoose from "mongoose";

export async function connectToDB() {
    try {
        await mongoose.connect(process.env.MONGO_URL!);
        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log('connected to db');
        });

        connection.on('error', (e) => {
            console.log('db connection error', e);
        });


    } catch (error) {
        console.log('ERROR CONNECTING TO DATABASE :: ', error);
    }
}