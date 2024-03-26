import mongoose from "mongoose";
import Section from "./section_model.js";

const courseSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    sections: [Section.schema],
    price: {
        type: Number,
        required: true,
    },
    instructor: {
        type: String,
        required: true,
    },
    isEnrolled: {
        type: Boolean,
        default: false,
    },
    reviews: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

const Course = mongoose.model('courses', courseSchema);
export default Course;
