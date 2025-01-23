const router = require("express").Router();
const trycatchWrapper = require("../../module/trycatchWrapper");
const { searchNicknameLogic, searchPointLogic } = require("./service");
const { optionalLogin } = require("./../../middleware/checkLogin");

router.get(
  "/nickname",
  trycatchWrapper(async (req, res, next) => {
    const { page } = req.query;
    const { text } = req.query;

    const list = await searchNicknameLogic(text, page);

    res.status(200).send({
      rows: list,
    });
  })
);

router.get(
  "/searchpoint",
  optionalLogin,
  trycatchWrapper(async (req, res, next) => {
    const { page } = req.query;
    const { text } = req.query;
    const userIdx = req.decoded ? req.decoded.idx : null;

    const list = await searchPointLogic(userIdx, text, page);

    res.status(200).send({
      rows: list,
    });
  })
);

module.exports = router;
