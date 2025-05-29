import * as repo from '../repository/studentRepository.js'
import {studentSchema} from "../validator/studentValidator.js";


export const addStudent = async ({id, name, password}) => {
    const { error } = studentSchema.validate({ id, name, password });
    if (error) return { success: false, error: error.details[0].message };

    const existing = await repo.findStudentById(id);
    if (existing) return { success: false };

    await repo.createStudent({ _id: id, name, password });
    return { success: true };
}
//
export const findStudent = async (id) =>{
    return await repo.findStudentById(id);
}
//
export const deleteStudent = async (id) =>{
    return  await repo.deleteStudentById(id)
}
//
export const updateStudent = async (id, data) =>{
    const { error } = updateStudentSchema.validate(data);
    if (error) return { student: null, error: error.details[0].message };

    const student = await repo.updateStudent(id, data);
    return { student, error: null };
}
export const addScore = async ({ id, exam, score }) => {
    const { error } = scoreSchema.validate({ examName: exam, score });
    if (error) return { success: false, error: error.details[0].message };

    const result = await repo.updateStudentScore(id, exam, score);
    return { success: result, error: null };
};

export const searchByName = async (name) => {
    return await repo.findStudentsByName(name);
}

export const countByNames = async (names) => {
    return await repo.countStudentsByName(names)
};
export const findByMinScore = async (exam, minScore) => {
    return await repo.findStudentByMinScore(exam, minScore);
};

