const client = require("./../../database/postgreSQL");
const { convertFromMultiLine } = require("../../util/util");

const { nicknameSearchSql, searchPointSearchSql } = require("./sql");

const searchNicknameLogic = async (text, page) => {
  const result = await client.query(nicknameSearchSql, [`%${text}%`, page]);
  return result.rows;
};

const searchPointLogic = async (userIdx, text, page) => {
  const result = await client.query(searchPointSearchSql, [
    userIdx,
    `%${text}%`,
    page,
  ]);
  result.rows.forEach((obj) => {
    obj.line = convertFromMultiLine(obj.line);
    obj.center = {
      lat: obj.latitude,
      lot: obj.longitude,
    };
    delete obj.latitude;
    delete obj.longitude;
  });
  return result.rows;
};

module.exports = { searchNicknameLogic, searchPointLogic };
