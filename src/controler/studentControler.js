import * as repo from '../repository/studentRepository.js'
import {searchByName} from "../repository/studentRepository.js";

export const addStudent = async (req, res) => {
    const success = await repo.addStudent(req.body);
    if(success){
         res.status(204).send();
    }else{
         res.status(409).json(success);
    }
}
//
export const findStudent = async (req, res) => {
    const student = await repo.findStudent(+req.params.id);
    if(student){
        const tmp = {...student};
        delete tmp.password;
        res.json(tmp);
    }else{
        res.status(404).send();
    }

}
//
export const updateStudent = async (req, res) => {
    //TODO
    const student = await repo.updateStudent(+req.params.id, req.body);
    if(student){
        delete student.scores;
        res.json(student);
    } else{
        res.status(404).send();
    }
}
//
export const deleteStudent = async (req, res) => {
    //TODO
    const student = await repo.deleteStudent(+req.params.id);
    if(student){
        delete student.password;
        res.json();
    }else{
        res.status(404).send();
    }
}
//
export const addScore = async (req, res) => {
    const success = await repo.addScore(+req.params.id, req.body.examName, +req.body.score);
    if (success) {
        res.status(204).send();
    } else {
        res.status(404).send();
    }
};
//
//
export const findByName = async (req, res) => {
   //TODO
    const students = (await repo.searchByName(req.params.name))
        .map(student => {
            delete student.password;
            return student
        });
    res.json(students);
}
//
export const countByNames = async (req, res) => {
    //TODO
    const names = req.query.names;
    const count = await repo.countByNames(names);
    res.json({ count });
}

export const findByMinScore = async (req, res) => {
    //TODO
    const students = await repo.findByMinScore(req.params.exam, +req.params.minScore);
    res.json(students);
}

