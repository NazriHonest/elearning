import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    },
    // otp: {
    //     type: String,
    //     default: '',
    // },
    // otpExpires: {
    //     type: Date,
    //     default: null,
    // },
    phone: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    my_courses: [],
    wishlist: []
    
});


const Users = mongoose.model("users", userSchema);

export default Users;
