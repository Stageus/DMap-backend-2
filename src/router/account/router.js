const router = require("express").Router();
const { checkLogin } = require("./../../middleware/checkLogin");
const trycatchWrapper = require("../../module/trycatchWrapper");
const { checkIdx, checkNickname } = require("./../../middleware/checkInput");
const checkDuplicate = require("./../../middleware/checkDuplicate");
const jwt = require("jsonwebtoken");

const { checkNicknameSql } = require("./sql");
const {
  getNaverLoginPage,
  naverLoginLogic,

  getKakaoLoginPage,
  kakaoLoginLogic,

  getUserIdxLogic,

  getAccountInf,

  setAccessToken,
  setRefreshToken,
  isValidRefreshToken,
  postRefreshTokenLogic,
  deleteRefreshTokenLogic,

  getNickname,
  getNicknameLogic,

  postAccountLogic,

  putNicknameLogic,

  deleteAccountLogic,

  uploadS3,
  putImageLogic,
} = require("./service");

// 네이버 로그인
router.get(
  "/login/url/naver",
  trycatchWrapper((req, res, next) => {
    res.status(200).send({ url: getNaverLoginPage() });
  })
);

// 카카오 로그인
router.get(
  "/login/url/kakao",
  trycatchWrapper((req, res, next) => {
    res.status(200).send({ url: getKakaoLoginPage() });
  })
);

router.get(
  "/login/token",
  trycatchWrapper(async (req, res, next) => {
    const { code, state, platform } = req.query;
    let accessToken;
    let refreshToken;
    let platformId;
    let userIdx;

    if (platform == "NAVER") {
      platformId = await naverLoginLogic(code, state);
    } else if (platform == "KAKAO") {
      platformId = await kakaoLoginLogic(code, state);
    } else {
      res.status(400).send({
        message: "잘못된 platform입니다.",
      });
      return;
    }

    userIdx = await getUserIdxLogic(platform, platformId);

    if (userIdx) {
      accessToken = setAccessToken(userIdx);
      refreshToken = setRefreshToken(userIdx);
    } else {
      const nickName = await getNickname(); //회원가입 과정
      await postAccountLogic(platform, platformId, nickName);
      userIdx = await getUserIdxLogic(platform, platformId);

      accessToken = setAccessToken(userIdx);
      refreshToken = setRefreshToken(userIdx);
    }

    await postRefreshTokenLogic(refreshToken, userIdx);

    res.status(200).send({
      access_token: accessToken,
      refresh_token: refreshToken,
    });
  })
);

// 로그아웃 하기
router.delete(
  "/logout",
  checkLogin,
  trycatchWrapper(async (req, res, next) => {
    const { idx } = req.decoded;
    await deleteRefreshTokenLogic(idx);

    res.status(200).send();
  })
);

// 계정 정보 가져오기
router.get(
  "/me",
  checkLogin,
  trycatchWrapper(async (req, res, next) => {
    const { idx } = req.decoded;

    const {
      accountIdx,
      nickName,
      imgUrl,
      shareTrackingLength,
      totalTrackingLength,
    } = await getAccountInf(idx);

    res.status(200).send({
      idx: accountIdx,
      nickname: nickName,
      image_url: imgUrl,
      isMine: true,
      share_tracking_length: shareTrackingLength,
      total_tracking_length: totalTrackingLength,
    });
  })
);

router.get(
  "/info/:idx",
  checkIdx("idx"),
  trycatchWrapper(async (req, res, next) => {
    const userIdx = req.params.idx;
    const { authorization } = req.headers;
    let isMine = false;

    if (authorization) {
      const { idx } = jwt.verify(
        authorization,
        process.env.ACCESS_TOKEN_SECRET
      );
      if (userIdx == idx) isMine = true;
    }

    const {
      accountIdx,
      nickName,
      imgUrl,
      shareTrackingLength,
      totalTrackingLength,
    } = await getAccountInf(userIdx);

    res.status(200).send({
      idx: accountIdx,
      nickname: nickName,
      image_url: imgUrl,
      isMine: isMine,
      share_tracking_length: shareTrackingLength,
      total_tracking_length: totalTrackingLength,
    });
  })
);

// 회원탈퇴
router.delete(
  "/user",
  checkLogin,
  trycatchWrapper(async (req, res, next) => {
    const { idx } = req.decoded;

    await deleteAccountLogic(idx);
    res.status(200).send({ message: "회원 탈퇴 성공" });
  })
);

// 닉네임
router.get(
  "/nickname",
  trycatchWrapper(async (req, res, next) => {
    const list = await getNicknameLogic(10);
    res.status(200).send({ nickname: list });
  })
);

router.put(
  "/nickname",
  checkLogin,
  checkNickname("nickname"),
  checkDuplicate(checkNicknameSql, "중복된 닉네임입니다.", ["nickname"]),
  trycatchWrapper(async (req, res, next) => {
    const { idx } = req.decoded;
    const { nickname } = req.body;

    const result = await putNicknameLogic(nickname, idx);

    res.status(200).send({ message: "닉네임 변경 성공" });
  })
);

// 이미지 관련
router.put(
  "/image",
  checkLogin,
  uploadS3.single("image"),
  trycatchWrapper(async (req, res, next) => {
    const { idx } = req.decoded;

    if (!req.file) throw customError(404, "이미지 파일이 존재하지 않습니다.");
    await putImageLogic(req.file.location, idx);

    res.status(200).send({ message: "이미지 수정 성공" });
  })
);

// 토큰 관련
router.get(
  "/accesstoken",
  trycatchWrapper(async (req, res, next) => {
    const { authorization } = req.headers;
    const userIdx = await isValidRefreshToken(authorization);
    const accessToken = setAccessToken(userIdx);
    res.status(200).send({ accesstoken: accessToken });
  })
);

module.exports = router;
