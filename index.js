const express = require("express")


const app = express()

app.use(express.json())


app.listen(8000, () => {
    console.log("8000번 포트에서 웹 서버 실행")
})
