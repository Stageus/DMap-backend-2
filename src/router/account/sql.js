// 체크 sql문 ---------------------------------
const checkNicknameSql = "SELECT * FROM account.list WHERE nickname=$1;";

// 회원가입 sql문 --------------------------------
const postAccountGoogleSql =
  "INSERT INTO account.list (google_user_id, nickname) VALUES ($1, $2);";
const postAccountKakaoSql =
  "INSERT INTO account.list (kakao_user_id, nickname) VALUES ($1, $2);";
const postAccountNaverSql =
  "INSERT INTO account.list (naver_user_id, nickname) VALUES ($1, $2);";

// 리프레쉬토큰 관련 sql문 -------------------------------------------
const getRefreshTokenSql =
  "SELECT idx, expires_at FROM account.list WHERE refresh_token = $1;";
const putRefreshTokenSql =
  "UPDATE account.list SET refresh_token=$1, expires_at=$2 WHERE idx=$3;";

// 회원 정보 가져오기 sql문 ------------------------------------------
const getAccountSql = `
SELECT
  account.list.idx,
  account.list.nickname,
  account.list.img_url,
  COUNT(CASE WHEN tracking.list.sharing = true THEN 1 END) AS share_tracking_length,
  COUNT(tracking.list.idx) AS total_tracking_length
FROM
  account.list
LEFT JOIN
  tracking.list
ON
  account.list.idx = tracking.list.user_idx
WHERE
  account.list.idx = $1
GROUP BY
  account.list.idx, account.list.nickname, account.list.img_url;
`;
const getUserIdxGoogleSql =
  "SELECT idx FROM account.list WHERE google_user_id=$1;";
const getUserIdxKakaoSql =
  "SELECT idx FROM account.list WHERE kakao_user_id=$1;";
const getUserIdxNaverSql =
  "SELECT idx FROM account.list WHERE naver_user_id=$1;";

const getUserImageSql = `
SELECT
  img_url
FROM
  account.list
WHERE
  idx=$1
  `;

// 회원 정보 변경 sql문 -------------------------------------------
const putNicknameSql = "UPDATE account.list SET nickname=$1 WHERE idx=$2;";
const putImageSql = "UPDATE account.list SET img_url=$1 WHERE idx=$2;";

// 회원 탈퇴 sql문 -------------------------------------------------
const deleteAccountSql = "DELETE FROM account.list WHERE idx=$1;";

module.exports = {
  checkNicknameSql,

  postAccountGoogleSql,
  postAccountKakaoSql,
  postAccountNaverSql,

  getAccountSql,
  getUserIdxGoogleSql,
  getUserIdxKakaoSql,
  getUserIdxNaverSql,

  getUserImageSql,

  getRefreshTokenSql,
  putRefreshTokenSql,

  putNicknameSql,
  putImageSql,

  deleteAccountSql,
};
