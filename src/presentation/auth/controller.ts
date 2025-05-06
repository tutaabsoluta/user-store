// El controlador se encarga de dar la respuesta al cliente
// Tendremos una clase que nos permitira hacer inyeccion de dependencias y los handlers
// El controlador no se deberia de encargar de creacion, validacion, etc, solamente es el controlador de la ruta, eso lo dene hacer un servicio.

import { Request, Response } from "express";
import { CustomError, LoginUserDto, RegisterUserDto } from "../../domain/";
import { AuthService } from "../services/auth.service";

export class AuthController {

    // DI
    constructor(
        public readonly authService: AuthService,
    ) {}

    private handleError = ( error: any, res: Response ) => {

        if ( error instanceof CustomError ) {
            return res.status( error.statusCode ).json({ error: error.message })
        } 

        console.log(`${error}`)
        return res.status(500).json({ error: 'Internal server error' })
    }

    // Register user method
    registerUser = ( req: Request, res: Response ) => {

        const [ error, registerDto ] = RegisterUserDto.create(req.body)

        if ( error ) return res.status(400).json({error})

        this.authService.registerUser( registerDto! )
            .then( ( user ) => res.json( user ) )
            .catch( ( error ) => this.handleError( error, res ) )

    }

    // Login user method
    loginUser = ( req: Request, res: Response ) => {
        const [ error, loginDto ] = LoginUserDto.getUser(req.body)
        if ( error ) return res.status(400).json({error})

        this.authService.loginUser(loginDto!)
            .then((user) => res.status(200).json( user ) )
            .catch((error) => this.handleError( error, res ))
    }

    // Validate email method
    validateEmail = ( req: Request, res: Response ) => {
        const { token } = req.params;


        this.authService.validateEmail( token )
            .then(() => res.json('Email was validated succesfully!') )
            .catch((error) => this.handleError( error, res ))

    }
}

