import { ObjectId } from "mongoose";

export interface Education {
    userId?: string | ObjectId;
    email?:string
    education:{
        _id?:string | ObjectId;
        nameOfinstitue?: string;
        course?: string;
        startYear?: string;
        endYear?: string;
    }
}