import mongoose from "mongoose";

export async function connect() {
    try {
        await mongoose.connect(process.env.MONGO_URL!); // The ! tells TypeScript that you're confident MONGO_URL is not undefined or null (non-null assertion).

        const connection = mongoose.connection; //retrieves MongoDB connection object

        connection.on('connected', ()=>{
            console.log('MongoDB connected succesfully');
            
        }) //this event is triggered when the connection to MongoDB is successfully established.

        connection.on('error', (err)=> {
            console.log('MongoDB connection error. Please make sure MongoDB is running.' + err);
            process.exit(); //forcefully exits the app if a connection error occurs
        }) //This event is triggered if there's an error connecting to MongoDB.


    }

    catch(error) {
        console.log('Something goes wrong!');
        console.log(error);
    }
}