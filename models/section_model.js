import mongoose from "mongoose";
import Lesson from "./lesson_model.js";

const sectionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    lessons: [Lesson.schema],
});

const Section = mongoose.model('Section', sectionSchema);
export default Section;