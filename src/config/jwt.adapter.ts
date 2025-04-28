import jwt from 'jsonwebtoken'
import { Secret, SignOptions } from 'jsonwebtoken';
import { envs } from './envs';

const JWT_SEED = envs.JWT_SEED;


export class JwtAdapter {

    // Si no necesito DI podemos trabajar con metodos static

    static async generateToken(payload: any, duration: SignOptions['expiresIn'] = '2h') {
        const token = jwt.sign(payload, JWT_SEED as Secret, { expiresIn: duration });
        return token;
    }

    static validateToken( token: string ) {

        throw new Error('Not implemented yet')
    }
}