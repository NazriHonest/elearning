import express from "express";
import { createCourse, deleteCourse, getAllCourses, getCourseById, updateCourse } from "../controller/course_controller.js";

const router = express.Router();

router.route('/').get(getAllCourses).post(createCourse);
router.route('/:id').get(getCourseById).put(updateCourse).delete(deleteCourse);

export default router;