// El controlador se encarga de dar la respuesta al cliente
// Tendremos una clase que nos permitira hacer inyeccion de dependencias y los handlers
// El controlador no se deberia de encargar de creacion, validacion, etc, solamente es el controlador de la ruta, eso lo dene hacer un servicio.

import { Request, Response } from "express";
import { CustomError, RegisterUserDto } from "../../domain/";
import { AuthService } from "../services/auth.service";

export class AuthController {

    // DI
    constructor(
        public readonly authService: AuthService,
    ) {}

    registerUser = ( req: Request, res: Response ) => {

        const [ error, registerDto ] = RegisterUserDto.create(req.body)

        if ( error ) return res.status(400).json({error})

        this.authService.registerUser( registerDto! )
            .then( ( user ) => res.json( user ) )
            .catch(( error ) => CustomError.badRequest(error))

    }

    loginUser = ( req: Request, res: Response ) => {
        res.json('loginUser');
    }

    validateEmail = ( req: Request, res: Response ) => {
        res.json('validateEmail');
    }

}

