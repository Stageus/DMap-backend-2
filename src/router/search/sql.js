const nicknameSearchSql = `
SELECT 
    idx, nickname, img_url 
FROM 
    account.list
WHERE 
    nickname LIKE $1
ORDER BY 
    account.list.idx DESC
LIMIT
    20
OFFSET
    ($2 - 1) * 20;
`;
const searchPointSearchSql = `
SELECT 
    tracking.list.idx AS idx,
    tracking.list.user_idx AS user_idx,
    account.list.img_url AS img_url,
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
    AND tracking.list.user_idx = $1
WHERE 
    tracking.list.searchpoint LIKE $2
AND
    sharing = true
ORDER BY 
    tracking.list.idx DESC
LIMIT
    20
OFFSET
    ($3 - 1) * 20;
`;

module.exports = { nicknameSearchSql, searchPointSearchSql };
