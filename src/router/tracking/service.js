const client = require("../../database/postgreSQL")
const customError = require("../../util/customError")
const {createTrackingImgSQL,getMySharingTrackingImgSQL,getMyNotSharingTrackingImgSQL,getUserTrackingImgSQL,deleteTrackingImgSQL,getTrackingLineSQL,putTrackingImageSQL,toSharingImgSQL,toNotSharingImgSQL} = require("./sql")
const {convertMultiLine,convertCenterPoint,convertFromMultiLine,convertPointToLatLng} = require("../../util/util")


// ===================================== 서비스 ===================================

// 트래킹 이미지 생성
const createTrackingImg = async (req,res,next) => {
    const user_idx = req.decoded.idx;
    
    const {line,searchpoint,center,zoom,heading,sharing,color,thickness,background} = req.body

    const multiLine = convertMultiLine(line)
    const point = convertCenterPoint(center)

    try{
        await client.query(createTrackingImgSQL, [user_idx,multiLine,searchpoint,point,zoom,heading,sharing,color,thickness,background])
        res.status(200).send({})
    } catch(e){
        next(e)
    }
}


// 나의 트래킹 이미지 가져오기
const getMyTrackingImg = async (req,res,next) => {
    const {page,category} = req.query
    const user_idx = req.decoded.idx;

    try {
        if (category !== "1" && category !== "0") throw customError(400, `category 양식 오류`);
    } catch (e) {
        next(e);
    }

    let sql;

    if(category == 1) sql = getMySharingTrackingImgSQL
    else if (category == 0) sql = getMyNotSharingTrackingImgSQL
    
    try{
        const result = await client.query(sql, [user_idx,page])

        result.rows.forEach(obj => {
            obj.line = convertFromMultiLine(obj.line)
            obj.center = convertPointToLatLng(obj.center)
        });
        res.status(200).send({ tracking_image : result.rows })
    } catch(e){
        next(e)
    }
}

// 다른 사용자 전체 트래킹 이미지 가져오기
const getUserTrackingImg = async (req,res,next) => {
    const {user_idx} = req.params
    const my_idx = req.decoded ? req.decoded.idx : null;
    const {page} = req.query

    try{
        const result = await client.query(getUserTrackingImgSQL, [user_idx,my_idx,page])

        result.rows.forEach(obj => {
            obj.line = convertFromMultiLine(obj.line)
            obj.center = convertPointToLatLng(obj.center)
        });
        res.status(200).send({ tracking_image : result.rows })
    }catch(e){
        next(e)
    }
}

// 나의 트래킹 이미지 삭제
const deleteTrackingImg = async (req,res,next) => {
    const user_idx = req.decoded.idx;
    const {idxList} = req.body

    try{
        await client.query(deleteTrackingImgSQL,[user_idx,idxList])
        res.status(200).send({})
    }catch(e){
        next(e)
    }
}


// 트래킹 라인 가져오기
const getTrackingLine = async (req,res,next) => {
    const user_idx = req.decoded.idx;
    const {tracking_idx} = req.params

    try{
        const result = await client.query(getTrackingLineSQL, [user_idx,tracking_idx])
        result.rows.forEach(obj => {
            obj.line = convertFromMultiLine(obj.line)
            obj.center = convertPointToLatLng(obj.center)
        });
        res.status(200).send({ message : result.rows })
    }catch(e){
        next(e)
    }
}


// 트래킹 이미지 수정
const putTrackingImage = async (req,res,next) => {
    const {tracking_idx} = req.params
    const user_idx = req.decoded.idx;
    const {center,zoom,heading,sharing,color,thickness,background} = req.body
    const point = convertCenterPoint(center)

    try{
        await client.query(putTrackingImageSQL, [point,zoom,heading,sharing,color,thickness,background,user_idx,tracking_idx])
        res.status(200).send({})
    }catch(e){
        next(e)
    }
}

// 트래킹 이미지 공유 상태 변경
const putToSharingTrackingImg = async (req,res,next) => {
    const user_idx = req.decoded.idx;
    const {idxList} = req.body

    try{
        await client.query(toSharingImgSQL,[user_idx,idxList])
        res.status(200).send({})
    }catch(e){
        next(e)
    }
}

// 트래킹 비이미지 공유 상태로로 변경
const putToNotSharingTrackingImg = async (req,res,next) => {
    const user_idx = req.decoded.idx;
    const {idxList} = req.body

    try{
        await client.query(toNotSharingImgSQL,[user_idx,idxList])
        res.status(200).send({})
    }catch(e){
        next(e)
    }
}

module.exports = {createTrackingImg,getMyTrackingImg,getUserTrackingImg,deleteTrackingImg,getTrackingLine,putTrackingImage,putToSharingTrackingImg,putToNotSharingTrackingImg}
