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

    // Metodo que extrae el Payload del JWT o un error si no existe
    static validateToken<T>(token: string): Promise<T | null> {

        return new Promise((resolve) => {
            jwt.verify(token, JWT_SEED, ( error, decoded ) => {
                if ( error ) return resolve(null);
                resolve( decoded as T ); // Decodificamos lo que esta en el Token
            })
        });
    }
}