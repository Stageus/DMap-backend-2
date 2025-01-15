const express = require("express")
const cors = require('cors');
const app = express()

require("dotenv").config()

app.use(cors());
app.use(express.json())

// =============== 라우터 =============

const accountRouter = require("./src/router/account/router")
app.use("/account", accountRouter)

const trackingRouter = require("./src/router/tracking/router")
app.use("/tracking", trackingRouter)


const snsRouter = require("./src/router/sns/router")
app.use("/sns", snsRouter)

const searchRouter = require("./src/router/search/router")
app.use("/search", searchRouter)


// ============== 공통 에러 핸들러 ===========

app.use((err,req,res,next) => {
    console.error(err.stack)

    res.status(err.status || 500).send({
        "message" : err.message
    })
})


app.use((req,res,next) => {
    res.status(404).send({
        "message" : "연결 실패"
    })
})

// ===========================================

app.listen(8000, () => {
    console.log("8000번 포트에서 웹 서버 실행")
})
