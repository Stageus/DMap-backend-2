
// hex color 값 검증 
const regColor = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;

const searchPoint = /^[\s\S]{1,50}$/

const regLike = /^like$/;
const regRecent = /^recent$/;
const regDefault = /^default$/;

module.exports = {regColor,searchPoint,regLike,regRecent,regDefault}

