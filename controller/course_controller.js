import Course from "../models/course_model.js";

export const getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find();
        res.json(courses);
    } catch (e) {
        res.status(500).json({error: e.message});
    }
};

export const getCourseById = async (req, res) => {
    const { id } = req.params;
    try {
        const course = await Course.findById(id);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        res.json(course);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const createCourse = async (req, res) => {
    const course = new Course(req.body);
    try {
        const newCourse = await course.save();
        res.status(201).json(newCourse);
    } catch (e) {
        res.status(400).json({error: e.message});
    }
};

export const updateCourse = async (req, res) => {
    const { id } = req.params;
    try {
        const course = await Course.findByIdAndUpdate(id, req.body, { new: true });
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        res.json(course);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const deleteCourse = async (req, res) => {
    const { id } = req.params;
    try {
        const course = await Course.findByIdAndDelete(id);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        res.json({ message: 'Course deleted successfully' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

