const jimp = require('jimp')
const path = require("path");
const userDto = require('../dtos/user-dto');
const userService = require('../services/user-service');

class ActivateController {
    async activate(req, res) {
        const {userType,name, avatar} = req.body;
        // console.log("before: ",req.body)
        if (!userType || !name || !avatar) {
            return res.status(400).json({ message: "All fields are required" })
        }
        // console.log(req.body)

        const buffer = Buffer.from(avatar.replace(/^data:image\/(png|jpeg|jpg|gif);base64,/, ""), "base64")
        // create image path
        const imagePath = `${Date.now()}.${Math.round(Math.random() * 1e9)}.png`
        // console.log("kaboom2")

        try {
            const jimpRes = await jimp.read(buffer)
            jimpRes.resize(150, jimp.AUTO).write(path.resolve(__dirname, `../storage/${imagePath}`))

        }
        catch (e) {
            console.log(e)
            return res.status(500).json({ message: "could not process the image" })
        }
        const userId = req.user._id

        try {
            // update user
            const user = await userService.findUser({ _id: userId })
            if (!user) {
                return req.status(404).json({ message: "user not found" })
            }
            user.activated = true;
            user.name = name
            user.userType = userType
            user.avatar = `/storage/${imagePath}`
            user.save()
            res.json({ user: new userDto(user),auth: true })

        }
        catch (e) {
            res.status(500).json({ message: "something bad happened" })
        }
    }
}

module.exports = new ActivateController()