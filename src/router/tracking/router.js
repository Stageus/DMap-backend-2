const router = require("express").Router()
const jwt = require("jsonwebtoken");

const {createTrackingImg,getMyTrackingImg,getUserTrackingImg,deleteTrackingImg,getTrackingLine,putTrackingImage,putToSharingTrackingImg,putToNotSharingTrackingImg} = require("./service")
const {regColor,searchPoint} = require("../../constant/regx")
const {checkLogin,optionalLogin} = require("../../middleware/checkLogin")
const {checkRegInput,checkIdx,checkZoom,checkHeading,checkSharing,checkThickness,checkBackground,checkLine,checkCenter,checkIdxList,checkPage} = require("../../middleware/checkInput")
const {checkData,checkTrackingIdxData,checkSetData} = require("../../middleware/checkData")


// 트래킹 이미지 생성
router.post("/",
    checkLogin,
    checkIdx("idx"),
    checkRegInput(searchPoint, "searchpoint"),
    checkLine("line"),
    checkCenter("center"),
    checkZoom("zoom"),
    checkHeading("heading"),
    checkSharing("sharing"),
    checkRegInput(regColor, "color"),
    checkThickness("thickness"),
    checkBackground("background"),
    checkData("account.list","idx"),
    createTrackingImg
)

// 트래킹 라인 가져오기
router.get("/:tracking_idx",
    checkLogin,
    checkIdx("idx"),
    checkTrackingIdxData(),
    getTrackingLine
)

// 나의 트래킹 이미지 가져오기
router.get("/account/:user_idx", async (req,res,next) => {
    const { authorization } = req.headers
    const { user_idx } = req.params
    if (authorization) {
        try {

        req.decoded = jwt.verify(authorization, process.env.ACCESS_TOKEN_SECRET);

        } catch (e) {
            if (e.name === "TokenExpiredError") {
                e.status = 401;
                e.message = "만료된 access token 입니다.";
            } else if (e.name === "JsonWebTokenError") {
                e.status = 403;
                e.message = "잘못된 access token 입니다.";
            }
            return next(e);
        }
        const my_idx = req.decoded.idx;
        if(my_idx != user_idx){
            await checkPage()
            await checkData("account.list", "user_idx")
            return getUserTrackingImg(req, res, next);
        } else if (my_idx == user_idx){
            await checkIdx("idx")
            await checkPage()
            await checkData("account.list","idx")
            return getMyTrackingImg(req,res,next);
        }
    } else {
        await checkPage()
        await checkData("account.list","user_idx")
        return getUserTrackingImg(req,res,next)
    }
    }   
)

// // 다른 사용자의 전체 트래킹 이미지 가져오기
// router.get("/account/:user_idx",
//     optionalLogin,
//     checkIdx("page"),
//     checkData("account.list","user_idx"),
//     getUserTrackingImg
// )

// 나의 트래킹 이미지 삭제
router.delete("/",
    checkLogin,
    checkIdxList("idxList"),
    checkSetData("idxList"),
    checkData("account.list","idx"),
    deleteTrackingImg
)

// 트래킹 이미지 공유 상태로 변경
router.put("/tosharing",
    checkLogin,
    checkSetData("idxList"),
    checkData("account.list","idx"),
    putToSharingTrackingImg
)

// 트래킹 이미지 비공유 상태로 변경
router.put("/toNotSharing",
    checkLogin,
    checkSetData("idxList"),
    checkData("account.list","idx"),
    putToNotSharingTrackingImg
)

// 트래킹 이미지 수정
router.put("/:tracking_idx",
    checkLogin,
    checkCenter("center"),
    checkZoom("zoom"),
    checkHeading("heading"),
    checkSharing("sharing"),
    checkRegInput(regColor, "color"),
    checkThickness("thickness"),
    checkBackground("background"),
    checkTrackingIdxData(),
    putTrackingImage
)


module.exports = router 
