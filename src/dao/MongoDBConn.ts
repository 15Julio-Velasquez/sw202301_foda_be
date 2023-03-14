/* eslint-disable @typescript-eslint/no-explicit-any */
import { IDBConnection  } from "./IDBConnection";
import { MongoClient } from 'mongodb';
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017';
const mongoDBName = process.env.MONGO_DB_NAME || 'SW202301';

export class MongoDBConn implements IDBConnection {
    static connection:MongoClient = null;
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    private constructor(){}
    getConnection(): Promise<any> {
        throw new Error("Method not implemented.");
    }
    public static getConnection(){
        if(!this.connection){
            MongoClient.connect(mongoURI).then(
                (conn)=>{
                    this.connection = conn;
                    return conn.db(mongoDBName);
                }
            );
        }
        return this.connection.db(mongoDBName);
    }
}