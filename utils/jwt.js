const jwt = require('jsonwebtoken');
const {JWT_SECRET_KEY}= require('../constants');

// Función para que caduque la sesión
function createAccessToken (user){
    const expToken = new Date();
    expToken.setHours(expToken.getHours() + 3);

    // objetos que van dentro del Token 
    const payload = {
        token_type: 'access', //tipo token
        user_id: user._id, //user id
        iat: Date.now(), //Fecha de creación de token
        exp: expToken.getTime(), //Expiración de token
    };

    return jwt.sign(payload, JWT_SECRET_KEY);

}

function createRefreshToken (user){
    const expToken = new Date();
    expToken.setMonth(expToken.getMonth() + 1);

    // objetos que van dentro del Token 
    const payload = {
        token_type: 'refresh', //tipo token
        user_id: user._id, //user id
        iat: Date.now(), //Fecha de creación de token
        exp: expToken.getTime(), //Expiración de token
    };

    return jwt.sign(payload, JWT_SECRET_KEY);

}

function decoded(token){
    return jwt.decode(token, JWT_SECRET_KEY, true);
}

module.exports = {
    createAccessToken,
    createRefreshToken,
    decoded
}