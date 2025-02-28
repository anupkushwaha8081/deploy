const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const getDataUri = require("../config/datauri");
const cloudinary = require("../config/cloudinary")
const File = require("../models/User")
const { isFileTypeSupported, uploadFileToCloudinary } = require('../utility/utils');

exports.register = async (req, res) => {
    try {
        const { fullName, email, phoneNumber, password, role } = req.body;
        // console.log(fullName, email, phoneNumber, password, role)

        if (!fullName || !email || !phoneNumber || !role) {
            return res.status(400).json({
                message: "something is missing",
                success: false,
            });
        }
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: "User already exist with the email",
            });
        }

        const file =req.files.profile;
        const supportedTypes = ["jpg", "jpeg", "png"];
        const filetype = file.name.split(".")[1].toLowerCase();
        console.log("File type:", filetype);
        if(!isFileTypeSupported(filetype, supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: "File format not supported.",
            });
        }

        // console.log("Uploading to Cloudinary...");
        const cloudResponse = await uploadFileToCloudinary(file, "anup8081");


        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({
            fullName,
            email,
            phoneNumber,
            password: hashedPassword,
            role,
            profile: {
                // profilePhoto: profilePhotoUrl,
                profilePhoto: cloudResponse.secure_url,
            },
        });
        return res.status(201).json({
            message: "Account creted successfully.",
            success: true,
        });
    } catch (error) {
        console.log(error);
    }
};




//correct code is this 
exports.login = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        console.log({ email, password, role })

        if (!email || !password || !role) {
            return res.status(400).json({
                success: false,
                message: "Please provide all fields.",
            });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Incorrect email.",
            });
        }

        const isPasswordMatched = await bcrypt.compare(password, user.password);
        if (!isPasswordMatched) {
            return res.status(400).json({
                success: false,
                message: "Incorrect password.",
            });
        }

        if (role !== user.role) {
            return res.status(400).json({
                success: false,
                message: "Account with this role does not exist.",
            });
        }

        // Debug SECRET_KEY
        // console.log("SECRET_KEY:", process.env.SECRET_KEY);

        const tokenData = { userId: user._id };
        const token = jwt.sign(tokenData, process.env.SECRET_KEY, {
            expiresIn: '1d'
        });
        // console.log(token)

        // user = {
        //     _id: user.id,
        //     fullName: user.fullName,
        //     email: user.email,
        //     phoneNumber: user.phoneNumber,
        //     role: user.role,
        //     profile: user.profile,
        // };

        return res.status(200).cookie("token", token, {
            maxAge: 24 * 60 * 60 * 1000, // 1 day
            httpsOnly: true,
            sameSite: 'strict',
        }).json({
            success: true,
            message: `Welcome back, ${user.fullName}!`,
            user,
        });
    } catch (error) {
        console.error("Error in login function:", error);
        res.status(500).json({
            success: false,
            message: "An internal server error occurred.",
        });
    }
};



//logout
exports.logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0, }).json({
            success: true,
            message: " you are logged out"
        })
    } catch (error) {
        console.log(" error from logout")
        console.error(error);
    }
}





exports.profileUpdate = async (req, res) => {
    try {
        const { fullName, email, phoneNumber, bio, skills } = req.body;
        console.log(req.files);

        const file1 =req.files.resume;
        let cloudResponse,cloudResponse2  = null;
        if (!file1) {
            console.log("No resume file uploaded");
        }else{
        console.log("Uploading to Cloudinary...");
        cloudResponse = await uploadFileToCloudinary(file1, "anup2005");
        }
        const file2 = await req.files.profilePhoto;
        if (file2) {
            console.log("Uploading to Cloudinary2...");
            cloudResponse2 = await uploadFileToCloudinary(file2, "anup8081");
        }
        

        let skillsArray = [];
        if (skills) {
            skillsArray = Array.isArray(skills) ? skills : skills.split(",").map(skill => skill.trim());
        }
        // console.log(skillsArray)

        // Get user ID from request (ensure this is set by your auth middleware)
        const userId = req.user?.id || req._id;
        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "User ID not found in request",
            });
        }

        // Find the user by ID
        let user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found by this ID",
            });
        }

        // Update user details
        if (fullName) user.fullName = fullName;
        if (email) user.email = email;
        if (phoneNumber) user.phoneNumber = phoneNumber;
        if (bio) user.profile.bio = bio;
        if (skillsArray.length > 0) user.profile.skills = skillsArray;
        if (cloudResponse && cloudResponse.secure_url) {
            user.profile.resume = cloudResponse.secure_url;
            user.profile.resumeOriginalName = file1.name || "Resume";
        } else {
            console.log("Cloudinary upload failed, resume not saved");
        }



        if (cloudResponse2 && cloudResponse2.secure_url) {
            user.profile.profilePhoto = cloudResponse2.secure_url;
        } else {
            console.log("Cloudinary upload failed, profilephoto not saved");
        }

        // console.log("Saving user:", user);
        // Save the updated user
        await user.save();

        // Structuring response to ensure all profile fields are present
        // const updatedUser = {
        //     _id: user._id,
        //     fullName: user.fullName,
        //     email: user.email,
        //     phoneNumber: user.phoneNumber,
        //     role: user.role,
        //     profile: {
        //         bio: user.profile.bio || "",
        //         skills: user.profile.skills || [],
        //         // resume: cloudResponse1.secure_url || "",
        //         // resumeOriginalName: user.profile.resumeOriginalName || "",
        //         // profilePhoto: user.profile.profilePhoto || "",
        //     },
        // };

        return res.status(200).json({
            success: true,
            // user: updatedUser,
            message: "Profile updated successfully",
        });

    } catch (error) {
        console.log("Error from update:", error);
        res.status(500).json({
            success: false,
            message: error.message || "Internal server error"
        });
    }
};



// "fullName":"Anup12 Kushwaha",
// "email":"anupk6123312247@gmail.com",
// "phoneNumber":"808112554811",
// "password":"2005",
// "role":"Recruiter",
// "profile":"123"
// }
