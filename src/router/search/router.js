const router = require("express").Router();
const trycatchWrapper = require("../../module/trycatchWrapper");
const { searchNicknameLogic, searchPointLogic } = require("./service");

router.get(
  "/nickname",
  trycatchWrapper(async (req, res, next) => {
    const { text } = req.body;

    const list = await searchNicknameLogic(text);

    res.status(200).send({
      rows: list,
    });
  })
);

router.get(
  "/searchpoint",
  trycatchWrapper(async (req, res, next) => {
    const { text } = req.body;

    const list = await searchPointLogic(text);

    res.status(200).send({
      rows: list,
    });
  })
);

module.exports = router;
