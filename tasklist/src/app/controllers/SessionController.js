import jwt from 'jsonwebtoken';
import User from '../models/User';
import authConfig from '../../config/auth';

class SessionController {
    async store(req, res) {
        const { email, password } = req.body;

        // Verificar se esse email existe
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ error: 'Usuário não existe.' });
        }

        // Verificar se a senha existe
        if (!(await user.checkPassword(password))) {
            return res.status(401).json({ error: 'Senha incorreta.' });
        }

        const { id, name } = user;

        res.json({
            user: {
                id,
                name,
                email,
            },
            token: jwt.sign({ id }, authConfig.secret, {
                expiresIn: authConfig.expiresIn,
            }),
        });
    }
}

export default new SessionController();
