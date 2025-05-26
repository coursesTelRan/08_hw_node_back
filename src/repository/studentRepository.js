import dotenv from "dotenv";
dotenv.config();
import {MongoClient} from "mongodb";
const client = new MongoClient(process.env.MONGODB_URI);
const dbName = 'java59';
let collection;

export async function connect() {
    if (!client.topology?.isConnected()) {
        await client.connect();
    }
    await client.connect();
    const db = client.db(dbName);
    collection = db.collection('college');
}


export const addStudent = async ({id, name, password}) => {
    await connect();
    const existing = await collection.findOne({_id: id});
    if (existing) {
        return false;
    }
    await collection.insertOne({_id: id, name, password: password, scores:{}});
    return true;
}
//
export const findStudent = async (id) =>{
    await connect();
    return await collection.findOne({_id: id});
}
//
export const deleteStudent = async (id) =>{
    await connect();
    return  await collection.findOneAndDelete({_id: id});

}
//
export const updateStudent = async (id, data) =>{
    await connect();
    return await collection.findOneAndUpdate(
        {_id: id},
        {$set: data},
        {returnDocument:'after'}
    )

}
export const addScore = async ({ id, examName, score }) => {
    await connect();
    return await collection.findOneAndUpdate(
        {_id: id},
        {$set: {[`scores.${exam}`]: score}},
    )
};
//
export const searchByName = async (name) => {
    await connect();
    return await collection.find({name: {$regex: `^${name}$`, $options: 'i'}}).toArray();
}

export const countByNames = async (names) => {
    await connect();
    return await collection.countDocuments({ name: { $regex: `^${names}$`, $options: 'i' } });
};
export const findByMinScore = async (exam, minScore) => {
    await connect()
    return await collection.find({
        [`scores.${exam}`]: { $exists: true, $gte: minScore }
    }).sort({ [`scores.${exam}`]: 1 }).toArray();
};

