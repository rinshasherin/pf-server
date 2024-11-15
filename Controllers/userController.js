// const { json } = require("express")

const users = require('../Models/userModel')
const jwt = require('jsonwebtoken')

exports.userRegister = async (req, res) => {                // req,res are variables
    // console.log(req.body)
    try {
        const { email, username, password } = req.body
        if (!email || !username || !password) {
            res.status(406).json("Invalid Data!!")
        }
        else {
            const newUser = new users({ email, username, password, profile: "", linkedin: "", github: "" })
            await newUser.save()
            res.status(200).json(newUser)
        }
    }
    catch (err) {
        console.log(err)
        res.status(400).json(err)
    }
}


exports.userLogin = async (rqst, rspns) => {
    // console.log(rqst.body)
    try {
        const { email, password } = rqst.body
        const existing = await users.findOne({ email, password })             // here , means AND operation
        if (existing) {
            console.log(existing)
            const token = jwt.sign({ userId: existing._id }, process.env.SECRET_KEY)          // 2 arguments : userID is payload(payload means a piece of data about user), and the otherone is secret_key which is need to be available globally so it is defined in .env and we can access ith with process.env
            rspns.status(200).json({ token, username: existing.username, github: existing.github, linkedin: existing.linkedin, profile: existing.profile })            // 2 arguments : 1 is token, 
        }
        else {
            rspns.status(406).json("Invalid Email or Password")
        }
    }
    catch (err) {
        console.log(err)
        res.status(400).json(err)
    }
}


exports.userProfile = async (req, res) => {
    try {
        const userId = req.payload
        if (req.file) {
            var profile = req.file.filename
            var { username, github, linkedin } = req.body
        }
        else {
            var { profile, username, github, linkedin } = req.body
        }

        const result=await users.findByIdAndUpdate(userId,{username,github,linkedin,profile})
        res.status(200).json("Updated!!")
    }
    catch (err) {
        console.log(err)
        res.status(400).json(err)
    }
}