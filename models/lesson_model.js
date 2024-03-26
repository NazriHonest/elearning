import mongoose from "mongoose";

const lessonSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
});

const Lesson = mongoose.model('Lesson', lessonSchema);

export default Lesson;