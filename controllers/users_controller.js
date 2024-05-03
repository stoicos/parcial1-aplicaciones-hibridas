import User from "../models/users_model.js"
import bcrypt from "bcrypt"

async function getUsers() {
    let users = await User.find({status:true});
    return users;
}

async function getUserByName(req) {
    let user = await User.findOne({ name: { $regex: req.params.name, $options: 'i' } });
    return user
}

async function createUser(body) {
   let user = new User({
        name: body.name,
        password: bcrypt.hashSync(body.password, 10),
        email: body.email,
        avatar: body.avatar,
        status: true
   })
   return await user.save();
}

async function updateUser(id, body) {
    let updatedUser = await User.findByIdAndUpdate(id, {
        $set: {
            name: body.name,
            password: bcrypt.hashSync(body.password, 10),
            email: body.email,
            avatar: body.avatar,
        }
    }, { new: true })
    return updatedUser
}

async function deactivateUser(id) {
    let deactivatedUser = await User.findByIdAndUpdate(id, {
        $set: {
            status: false
        }
    }, { new: true })
    return deactivatedUser
}

export { getUsers, createUser, updateUser, deactivateUser, getUserByName}