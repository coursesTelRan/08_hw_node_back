import * as service from '../service/studentRepositoryService.js'
import {scoreSchema, studentSchema, updateStudentSchema} from "../validator/studentValidator.js";

export const addStudent = async (req, res) => {
    const { success, error } = await service.addStudent(req.body);
    if (error) return res.status(400).json({ error });
    res.sendStatus(success ? 201 : 409);
};
//
export const findStudent = async (req, res) => {
    const student = await service.findStudent(+req.params.id);
    if(student){
        student.password = undefined;
        res.json(student);
    }else{
        res.status(404).send();
    }

}
//
export const updateStudent = async (req, res) => {
    //TODO
    const { student, error } = await service.updateStudent(+req.params.id, req.body);
    if (error) return res.status(400).json({ error });
    if (!student) return res.sendStatus(404);
    student.scores = undefined;
    res.json(student);
}
//
export const deleteStudent = async (req, res) => {
    //TODO
    const student = await service.deleteStudent(+req.params.id);
    if(student){
        student.password = undefined;
        res.json();
    }else{
        res.status(404).send();
    }
}
//
export const addScore = async (req, res) => {
    const { success, error } = await service.addScore(+req.params.id, req.body.examName, +req.body.score);
    if (error) return res.status(400).json({ error });
    res.sendStatus(success ? 201 : 409);
};
//
//
export const findByName = async (req, res) => {
   //TODO
    const students = (await service.searchByName(req.params.name))
        .map(student => {
            student.password = undefined;
            return student
        });
    res.json(students);
}
//
export const countByNames = async (req, res) => {
    //TODO
    const names = Array.isArray(req.query.names) ? req.query.names : [req.query.names];
    const count = await service.countByNames(names);
    res.json({ count });
}

export const findByMinScore = async (req, res) => {
    //TODO
    const students = await service.findByMinScore(req.params.exam, +req.params.minScore);
    res.json(students);
}

