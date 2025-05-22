import {Students as Student} from "../model/students.js";
const students = new Map();

export const addStudent = ({id, name, password}) => {
    if (students.has(id)) {
        return false;
    }
    students.set(id, new Student(id, name, password));
    return true;
}

export const findStudent = (id) =>{
    return students.get(id)
}

export const deleteStudent = (id) =>{
    const student = students.get(id);
    if (student){
        students.delete(id);
        return students;
    }
}

export const updateStudent = (id, data) =>{
    const student = students.get(id);
    if (student){
        Object.assign(student, data);
        return student;
    }
}
export const addScore = ({ id, examName, score }) => {
    console.log("Trying to find student with ID:", id);

    const student = students.get(Number(id));

    if (!student) {
        console.log("Student not found!");
        return false;
    }

    student.scores[examName] = score;
    console.log("Updated scores:", student.scores);

    return true;
};

export const searchByName = (name) => {
    const matchingStudents = [];

    students.forEach((student) => {
        if (student.name.toLowerCase() === name.toLowerCase()) {
            matchingStudents.push(student);
        }
    });

    return matchingStudents;
};
export const countByNames = (namesArray) => {
    let count = 0;

    students.forEach((student) => {
        if (namesArray.includes(student.name)) {
            count++;
        }
    });

    return count;
};
export const findByMinScore = (exam, minScore) => {
    const matchingStudents = [];

    students.forEach((student) => {
        if (student.scores[exam] !== undefined && student.scores[exam] >= minScore) {
            matchingStudents.push(student);
        }
    });

    return matchingStudents;
};

