const client = require("./../../database/postgreSQL");
const {
  convertMultiLine,
  convertCenterPoint,
  convertFromMultiLine,
} = require("../../util/util");

const { nicknameSearchSql, searchPointSearchSql } = require("./sql");

const searchNicknameLogic = async (text) => {
  const result = await client.query(nicknameSearchSql, [`%${text}%`]);
  return result.rows;
};

const searchPointLogic = async (text) => {
  const result = await client.query(searchPointSearchSql, [`%${text}%`]);
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
