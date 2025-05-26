let collection;
export function init(db) {
    collection = db.collection("college");
}


export const addStudent = async ({id, name, password}) => {
    const existing = await collection.findOne({_id: id});
    if (existing) {
        return false;
    }
    await collection.insertOne({_id: id, name, password: password, scores:{}});
    return true;
}
//
export const findStudent = async (id) =>{
    return await collection.findOne({_id: id});
}
//
export const deleteStudent = async (id) =>{
    return  await collection.findOneAndDelete({_id: id});
}
//
export const updateStudent = async (id, data) =>{
    return await collection.findOneAndUpdate(
        {_id: id},
        {$set: data},
        {returnDocument:'after'}
    )

}
export const addScore = async ({ id, examName, score }) => {
    return await collection.findOneAndUpdate(
        {_id: id},
        {$set: {[`scores.${exam}`]: score}},
    )
};
export const searchByName = async (name) => {
    return await collection.find({name: {$regex: `^${name}$`, $options: 'i'}}).toArray();
}

export const countByNames = async (names) => {
    return await collection.countDocuments({ name: { $regex: `^${names}$`, $options: 'i' } });
};
export const findByMinScore = async (exam, minScore) => {
    return await collection.find({
        [`scores.${exam}`]: { $exists: true, $gte: minScore }
    }).sort({ [`scores.${exam}`]: 1 }).toArray();
};

