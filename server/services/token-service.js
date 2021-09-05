const jwt = require("jsonwebtoken")
const refreshModel = require("../models/refresh.model")
const accessTokenSecret = process.env.JWT_ACCESS_TOKEN
const refreshTokenSecret = process.env.JWT_REFRESH_TOKEN

class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload,accessTokenSecret,{
            expiresIn: '30d'
        })
        const refreshToken = jwt.sign(payload,refreshTokenSecret,{
            expiresIn: '1y'
        })
        return {
            accessToken,
            refreshToken
        }
    }
    async storeRefreshToken(token,userId) {
        try {
            await refreshModel.create({
                token,
                userId
            })
        }
        catch(e) {
            console.log(e.message)
        }
    }
    async verifyAccesstoken(token) {
        return jwt.verify(token,accessTokenSecret)
    }
    async verifyRefreshToken(token) {
        return jwt.verify(token,refreshTokenSecret)
    }
    async findRefreshToken(userId,refreshToken) {
        return  await refreshModel.findOne({userId: userId,token: refreshToken})
    }
    async updateRefreshToken(userId,refreshToken) {
        return await refreshModel.updateOne({userId},{token: refreshToken})
    }

}

module.exports = new TokenService()