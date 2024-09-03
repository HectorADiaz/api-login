const jwt = require('jsonwebtoken');

let verifyToken = (req, res, next) => {
    let token = req.get('Authorization') || req.get('token');

    if (!token) {
        return res.status(403).json({
            mensaje: 'No token provided.'
        });
    }

    // Si el token viene con el prefijo 'Bearer', quítalo
    if (token.startsWith('Bearer ')) {
        token = token.slice(7, token.length).trimLeft();
    }

    jwt.verify(token, 'secret', (err, decoded) => {
        if (err) {
            return res.status(401).json({
                mensaje: 'Error de token',
                err
            });
        }

        req.username = decoded.data.username;
        req.roleId = decoded.data.role;
        next();
    });
};

module.exports = verifyToken;
