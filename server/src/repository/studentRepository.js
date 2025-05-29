import Student from "../model/students.js";

export async function createStudent(student) {
    return await Student.create(student);
}
export async function findStudentById(id){
    return await Student.findById(id);
}
export async function deleteStudentById(id){
    return Student.findByIdAndDelete(id);
}

export async function updateStudent(id, data){
    return Student.findByIdAndUpdate(id, data, {new: true});
}

export async function updateStudentScore(id, exam, score){
    return Student.findByIdAndUpdate(id, {[`score.${exam}`]: score}, {new: true});
}
export async function findStudentsByName(name){
    return Student.find({name: new RegExp(`^${name}$`, "i")});
}

export async function countStudentsByName(names){
    const regexConditions = names.map(name =>({
        name: new RegExp(`^${name}$`, "i")
    }));
    return Student.countDocuments({$or: regexConditions});
}

export async function findStudentByMinScore(exam, minScore){
    return Student.find({[`scores.${exam}`]:{$gte: minScore}});
}
