const nicknameSearchSql =
  "SELECT idx, nickname, img_url FROM account.list WHERE nickname LIKE $1;";
const searchPointSearchSql = `
SELECT 
    tracking.list.idx AS tracking_idx,
    tracking.list.user_idx AS user_idx,
    account.list.img_url AS image,
    tracking.list.searchpoint,
    ST_AsText(tracking.list.line) AS line,
    ST_X(tracking.list.center::geometry) AS longitude,
    ST_Y(tracking.list.center::geometry) AS latitude,
    tracking.list.zoom,
    tracking.list.heading,
    tracking.list.sharing,
    tracking.list.likecount,
    tracking.list.color,
    tracking.list.thickness,
    tracking.list.background,
    tracking.list.createtime,
    tracking.list.updatetime,
    account.list.nickname,
    (CASE
        WHEN tracking.like.user_idx IS NOT NULL THEN true
        ELSE false
    END) AS liked_by_user
FROM 
    tracking.list
INNER JOIN
    account.list
ON
    tracking.list.user_idx = account.list.idx
LEFT JOIN
    tracking.like
ON
    tracking.list.idx = tracking.like.tracking_idx
WHERE 
    tracking.list.searchpoint LIKE $1
ORDER BY 
    tracking.list.idx DESC;
`;

module.exports = { nicknameSearchSql, searchPointSearchSql };
