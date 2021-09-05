const otpService = require("../services/otp-service")
const hashService = require("../services/hash-service")
const userService = require("../services/user-service")
const tokenService = require("../services/token-service")
const UserDto = require("../dtos/user-dto")

class AuthController {
    async sendOtp(req, res) {
        const { phone } = req.body;
        if (!phone) {
            res.status(400).json({ message: 'Phone field is requried!' })
        }

        // generate OTP 
        const otp = await otpService.generateOTP()

        // hash otp
        const ttl = 1000 * 60 * 3 // after 2 min otp will expire
        const expire = Date.now() + ttl
        const data = `${phone}.${otp}.${expire}`
        const hash = await hashService.hashOtp(data)

        // send otp
        try {
            // await otpService.sendBySMS(phone,otp)
            return res.json({
                hash: `${hash}.${expire}`,
                otp,
                phone
            })
        }
        catch (e) {
            return res.status(500).json({ message: "message sending failed" })
        }
    }
    async verifyOtp(req, res) {
        const { otp, hash, phone } = req.body;
        if (!otp || !hash || !phone) {
            return res.status(400).json({ message: "All fields are required!" })
        }
        const [hashedOtp, expires] = hash.split(".")
        if (Date.now() > +expires) {
            return res.status(400).json({ message: "OTP expired" })
        }
        const data = `${phone}.${otp}.${expires}`

        const isValid = otpService.verifyOTP(hashedOtp, data)

        if (!isValid) {
            return res.status(400).json({ message: "invalid OTP" })
        }

        let user;

        try {
            user = await userService.findUser({ phone })
            if (!user) {
                user = await userService.createUser({ phone })
            }
        }
        catch (err) {
            return res.status(500).json({
                message: "DB error"
            })
        }

        // generate jwt token
        const { accessToken, refreshToken } = tokenService.generateTokens({
            _id: user._id,
            activated: false
        })

        await tokenService.storeRefreshToken(refreshToken, user._id)

        // create a cookie
        res.cookie('refreshToken', refreshToken, {
            maxAge: 1000 * 60 * 60 * 24 * 30,
            httpOnly: true
        })

        res.cookie('accessToken', accessToken, {
            maxAge: 1000 * 60 * 60 * 24 * 30,
            httpOnly: true
        })

        const userDto = new UserDto(user);

        res.json({ user: userDto, auth: true })

    }

    async refresh(req, res) {
      // get refresh token from cookie
      const { refreshToken: refreshTokenFromCookie } = req.cookies;
      // check if token is valid
      let userData;
      try {
          userData = await tokenService.verifyRefreshToken(
              refreshTokenFromCookie
          );
      } catch (err) {
          return res.status(401).json({ message: 'Invalid Token' });
      }
      // Check if token is in db
      try {
          const token = await tokenService.findRefreshToken(
              userData._id,
              refreshTokenFromCookie
          );
          if (!token) {
              return res.status(401).json({ message: 'Invalid token' });
          }
      } catch (err) {
          return res.status(500).json({ message: 'Internal error' });
      }
      // check if valid user
      const user = await userService.findUser({ _id: userData._id });
      if (!user) {
          return res.status(404).json({ message: 'No user' });
      }
      // Generate new tokens
      const { refreshToken, accessToken } = tokenService.generateTokens({
          _id: userData._id,
      });

      // Update refresh token
      try {
          await tokenService.updateRefreshToken(userData._id, refreshToken);
      } catch (err) {
          return res.status(500).json({ message: 'Internal error' });
      }
      // put in cookie
      res.cookie('refreshToken', refreshToken, {
          maxAge: 1000 * 60 * 60 * 24 * 30,
          httpOnly: true,
      });

      res.cookie('accessToken', accessToken, {
          maxAge: 1000 * 60 * 60 * 24 * 30,
          httpOnly: true,
      });
      // response
      const userDto = new UserDto(user);
      res.json({ user: userDto, auth: true });
    }
}

module.exports = new AuthController()