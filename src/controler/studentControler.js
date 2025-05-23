import * as repo from '../repository/studentRepository.js'

export const addStudent = (req, res) => {
    const success = repo.addStudent(req.body);
    if(success){
         res.status(204).send();
    }else{
         res.status(409).json(success);
    }
    return;
}
//
// export const findStudent = (req, res) => {
//     const student = repo.findStudent(+req.params.id);
//     if(student){
//         const tmp = {...student};
//         delete tmp.password;
//         res.json(tmp);
//     }else{
//         res.status(404).send();
//     }
//
// }
//
// export const updateStudent = (req, res) => {
//     //TODO
//     const student = repo.updateStudent(+req.params.id, req.body);
//     if(student){
//         const tmp = {...student};
//         delete tmp.scores;
//         res.json(tmp);
//     } else{
//         res.status(404).send();
//     }
// }
//
// export const deleteStudent = (req, res) => {
//     //TODO
//     const student = repo.deleteStudent(+req.params.id);
//     if(student){
//         delete student.password;
//         res.json();
//     }else{
//         res.status(404).send();
//     }
// }
//
// export const addScore = (req, res) => {
//     const { id } = req.params;
//     const { examName, score } = req.body;
//     const success = repo.addScore({ id: Number(id), examName, score });
//     if (success) {
//         return res.status(200).json({ message: "Score added successfully" });
//     } else {
//         return res.status(404).json({ error: "Student not found" });
//     }
// };
//
//
// export const findByName = (req, res) => {
//    //TODO
//
//     const { name } = req.params;
//         console.log("Searching for:", name);
//
//         if (!name) {
//             return res.status(400).json({ error: "Missing name parameter" });
//         }
//
//         const students = repo.searchByName(name);
//         if (students.length > 0) {
//             return res.json(students);
//         } else {
//             return res.status(404).json({ error: "No students found" });
//         }
// }
//
// export const countByName = (req, res) => {
//     //TODO
//     const { names } = req.query;
//     if (!names) {
//         return res.status(400).json({ error: "Missing names parameter" });
//     }
//     const namesArray = Array.isArray(names) ? names : [names];
//     const count = repo.countByNames(namesArray);
//     return res.json({ count });
//
// }
//
// export const findByMinScore = (req, res) => {
//     //TODO
//     const { exam, minScore } = req.params;
//
//     if (!exam || !minScore) {
//         return res.status(400).json({ error: "Missing required parameters" });
//     }
//
//
//     const students = repo.findByMinScore(exam, Number(minScore));
//     if (students.length > 0) {
//         return res.json(students);
//     } else {
//         return res.status(404).json({ error: "No students found" });
//     }
//
// }
//
