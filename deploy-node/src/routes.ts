import { Router } from "express";
import { SchoolController } from "./controllers/school/school-controller";
import { StudentController } from "./controllers/student/student-controller";

const router = Router()

router.get('/school', SchoolController.showAll)
router.post('/school', SchoolController.create)
router.get('/school/:id', SchoolController.showOne)
router.put('/school/:id', SchoolController.update)
router.delete('/school/:id', SchoolController.delete)

router.get('/student', StudentController.showAll)
router.post('/student', StudentController.create)
router.get('/student/:id', StudentController.showOne)
router.put('/student/:id', StudentController.update)
router.delete('/student/:id', StudentController.delete)


export { router }