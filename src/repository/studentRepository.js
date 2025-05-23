import {Students as Student} from "../model/students.js";
import {MongoClient} from "mongodb";
const url = ' mongodb://edd:1234@localhost:27017/java59?authSource=admin';
const dbName = 'java59';
const client = new MongoClient(url)
let collection;

export async function connect() {
    // if (!(client.topology && client.topology.isConnected())) {
    //     await client.connect();
    // }
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
// export const findStudent = (id) =>{
//     return students.get(id)
// }
//
// export const deleteStudent = (id) =>{
//     const student = students.get(id);
//     if (student){
//         students.delete(id);
//         return students;
//     }
// }
//
// export const updateStudent = (id, data) =>{
//     const student = students.get(id);
//     if (student){
//         Object.assign(student, data);
//         return student;
//     }
// }
// export const addScore = ({ id, examName, score }) => {
//     console.log("Trying to find student with ID:", id);
//
//     const student = students.get(Number(id));
//
//     if (!student) {
//         console.log("Student not found!");
//         return false;
//     }
//
//     student.scores[examName] = score;
//     console.log("Updated scores:", student.scores);
//
//     return true;
// };
//
// export const searchByName = (name) => {
//     const matchingStudents = [];
//
//     students.forEach((student) => {
//         if (student.name.toLowerCase() === name.toLowerCase()) {
//             matchingStudents.push(student);
//         }
//     });
//
//     return matchingStudents;
// };
// export const countByNames = (namesArray) => {
//     let count = 0;
//
//     students.forEach((student) => {
//         if (namesArray.includes(student.name)) {
//             count++;
//         }
//     });
//
//     return count;
// };
// export const findByMinScore = (exam, minScore) => {
//     const matchingStudents = [];
//
//     students.forEach((student) => {
//         if (student.scores[exam] !== undefined && student.scores[exam] >= minScore) {
//             matchingStudents.push(student);
//         }
//     });
//
//     return matchingStudents;
// };

