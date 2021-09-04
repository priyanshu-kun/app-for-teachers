const jwt = require("jsonwebtoken")
const refreshModel = require("../models/refresh.model")
const accessTokenSecret = process.env.JWT_ACCESS_TOKEN
const refreshTokenSecret = process.env.JWT_REFRESH_TOKEN

class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload,accessTokenSecret,{
            expiresIn: '1h'
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

}

module.exports = new TokenService()