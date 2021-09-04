const crypto = require("crypto")

const smsSID = process.env.SMS_SID
const smsAuthToken = process.env.SMS_AUTH_TOKEN
const fromNumber = process.env.SMS_FROM_NUMBER
const twilio = require("twilio")(smsSID,smsAuthToken,{
    lazyLoading: true
})
const hashService = require("../services/hash-service")


class OTPService {
    async generateOTP() {
        return crypto.randomInt(1000,9999)
    }
    async sendBySMS(phone,otp) {
        return await twilio.messages.create({
            to: phone,
            from: fromNumber,
            body: `After submiting this OTP you will become the part of our family ${otp}`
        })
    }
    async verifyOTP(hashedOtp,data) {

        let computedHash = await hashService.hashOtp(data)
        console.log(computedHash,hashedOtp)

        return computedHash === hashedOtp
    }

}

module.exports = new OTPService()