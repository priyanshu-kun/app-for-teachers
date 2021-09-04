require("dotenv").config()

const express  = require("express")
const app = express()
const cors = require("cors")
const DBConnect = require("./DB/database")
const cookieParser = require("cookie-parser")
DBConnect()

app.use(cookieParser())
app.use(express.json({limit: '8mb'}))
app.use(express.urlencoded({ extended: false }))
app.use(cors({
    credentials: true,
    origin: ['http://localhost:3000'],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204
}))
app.use('/storage',express.static("storage"))



app.get("/",(req,res) => {
    res.send("kaBOOM")
})

app.use("/api",require("./routes/routes"))

const port = process.env.PORT || 5500
app.listen(port,() => {
    console.log("App is alive on http://localhost:5500")
})