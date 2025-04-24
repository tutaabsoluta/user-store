import mongoose from "mongoose";


interface ConnectionOptions {
    mongoUrl: string;
    dbName: string;
}

export class MongoDatabase {

    static async connect ( options: ConnectionOptions ) {

        const { dbName, mongoUrl } = options;

        try {
            
            await mongoose.connect( mongoUrl, {
                dbName: dbName,
            } )

            console.log('MongoDB Connected succesfully')
            return true;

        } catch (error) {
            console.log('Mongo connection error')
            throw error;
        }
    }

}