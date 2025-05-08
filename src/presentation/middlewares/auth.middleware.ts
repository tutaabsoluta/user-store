import { NextFunction, Request, Response } from "express";
import { JwtAdapter } from "../../config";
import { UserModel } from "../../data";
import { UserEntity } from "../../domain";




// Para crear una categoria ocupamos un usuario y el id estaba en el Token
// Enviamos el Token en los Headers de nuestras peticiones
export class AuthMiddleware {

    static async validateJwt( req: Request, res: Response, next: NextFunction ) {

        const authorization = req.header('Authorization');

        if ( !authorization ) return res.status(401).json({ error: 'No token provided' });
        if ( !authorization.startsWith('Bearer ') ) return res.status(401).json({ error: 'Invalid Bearer token' });

        // Revisar que tengamos contenido en la segunda parte del string
        const token = authorization.split(' ').at(1) || '';

        try {

            const payload = await JwtAdapter.validateToken<{ id: string }>( token );
            if ( !payload ) return res.status(401).json({ error: 'Invalid token' })

            const user = await UserModel.findById( payload.id );

            if ( !user ) return res.status(401).json({ error: 'Invalid token - user' });

            req.body.user = UserEntity.fromObject(user);

            next();


        } catch (error) {

            console.log(error);
            res.status(500).json({ error: 'Internal Server Error' })

        }
    }
}