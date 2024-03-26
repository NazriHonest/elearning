import Users from "../models/user_model.js";

//GET ALL USERS
export const getUsers = async (req, res) => {
    try {
        const users = await Users.find();
        res.status(200).json(users);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
}

//FIND USER BY ID
export const getUserById = async (req, res) => {
    try {
        const user = await Users.findById(req.params.id);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: e.message });
    }
}

//GENERATE OTP FUNCTION
const generateOTP = () => {
    // Implement your desired OTP generation logic here
    // Example: Generate a random 6-digit string
    let otp = '';
    for (let i = 0; i < 6; i++) {
      otp += Math.floor(Math.random() * 10).toString();
    }
    return otp;
  };

//SENT OTP EMAIL FUNCTION
const sendOTPEmail = async (email, otp) => {
    const nodemailer = require('nodemailer');
  
    const transporter = nodemailer.createTransport({
      // Configure your email service credentials here
      host: 'smtp.example.com',
      port: 587,
      secure: false, // Adjust based on your email service
      auth: {
        user: 'youremail@example.com',
        pass: 'yourpassword',
      },
    });

    const mailOptions = {
        from: '"Your App Name" <youremail@example.com>',
        to: email,
        subject: 'Your OTP for Registration/Login',
        text: `Your one-time password (OTP) is: ${otp}`,
      };
    
      try {
        await transporter.sendMail(mailOptions);
        console.log(`OTP sent to ${email}`);
      } catch (error) {
        console.error(`Error sending OTP email: ${error}`);
      }
};



//LOGIN
export const login = async (req, res) => {
    try {
        const { email, password} = req.body;
        const user = await Users.findOne({ email });
        if(user){
            if(user.password == password){
                // Check if OTP is valid and not expired (optional)
                // if (user.otp !== otp) {
                //     return res.status(401).json({ message: 'Invalid OTP' });
                //   }
              
                  // Clear OTP after successful verification
                //   user.otp = '';
                //   user.otpExpires = null; // If using expiration
                //   await user.save();


                // Generate JWT on successful login
                //const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: '1h' });
                //res.status(200).json({ message: 'Login successful', token });
                res.status(200).json(user);
            }else{
                res.status(400).json({ message: 'wrong password!' });
            }
        }else{
            res.status(400).json({ massage: "user not found!!" });
        }
    } catch (e) {
        res.status(500).json({ error: e.massage });
    }
}

//CREATE OR REGISTER USER
export const createUser = async (req, res) => {
    try {
        const { name, email, password, phone, address } = req.body;
        const isUserExists = await Users.findOne({ email });
        if(isUserExists){
            res.status(400).json({message: 'User already exists!'});
        }else{
            const otp = generateOTP();
            const user = await Users.create({
                name,
                email,
                password,
                phone,
                address,
                //otp  - variable
            });
            //await sendOTPEmail(email, otp);
            res.status(201).json(user);
        }
    } catch (e) {
        res.status(500).json({ error: e.message });
    }

}

//UPDATE USER
export const updateUser = async (req, res) => {
    try {
        const { name, email, password, phone, address } = req.body;
        const user = await Users.findById(req.params.id);
        if(user){
            user.name = name;
            user.email = email;
            user.password = password;
            user.phone = phone;
            user.address = address;
        }
        const updatedUser = await user.save();
        res.status(200).json(updatedUser);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
}

//DELETE USER
export const deleteUser = async (req, res) => {
    try {
        const user = await Users.findByIdAndDelete(req.params.id);
        if(user){
            res.status(200).json({ message: 'User is deleted!!!'});
        }
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
}