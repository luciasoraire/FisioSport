const jwt = require('jsonwebtoken');

// Middleware para verificar el token
const verifyToken = (req, res, next) => {
    
  const token = req.headers.authorization;
  
  if (!token) {
    return res.status(401).json({ mensaje: 'Token no proporcionado' });
  }

  const tokenParts = token.split(' ');

  if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
    return res.status(401).json({ mensaje: 'Formato de token inválido' });
  }

  const tokenValue = tokenParts[1];

  try {
    const decoded = jwt.verify(tokenValue, process.env.JWT_SECRET);
    req.body.email = decoded.userId
    next();
  } catch (error) {
    return res.status(401).json({ mensaje: 'Token inválido' });
  }
};

module.exports = verifyToken
