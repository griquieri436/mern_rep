const jwt = require("../utils/jwt");

function asureAuth(req, res, next) {
  //next permite que al finalizar la funcion puede continuar con la siguiente
  if (!req.headers.authorization) {
    return res
      .status(403)
      .send({ msg: "La peticion no tiene la cabecera de autenticación" });
  }

  //SE OBTIENE DATOS DEL TOKEN
  const token = req.headers.authorization.replace("Bearer ", "");

  //VALIDACIÓN DEL TOKEN
  try {
    const payload = jwt.decoded(token);
    //COMPROBANDO LA VALIDACIÓN DEL TOKEN
    const { exp } = payload;
    const currentData = new Date().getTime();

    //SI EXPIRA EL TOKEN
    if (exp <= currentData) {
      return res.status(400).send({ msg: "El token ha expirado" });
    }

    //SI NO EXPIRA EL TOKEN, INGRESA
    req.user = payload;
    next();
  } catch (error) {
    return res.status(400).send({ msg: "Token invalido" });
  }
}

module.exports = {
  asureAuth,
};