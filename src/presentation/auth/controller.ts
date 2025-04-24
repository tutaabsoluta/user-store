// El controlador se encarga de dar la respuesta al cliente
// Tendremos una clase que nos permitira hacer inyeccion de dependencias y los handlers

import { Request, Response } from "express";

export class AuthController {

    // DI
    constructor() 
    {}

    registerUser = ( req: Request, res: Response ) => {
        res.json('registerUser');
    }

    loginUser = ( req: Request, res: Response ) => {
        res.json('loginUser');
    }

    validateEmail = ( req: Request, res: Response ) => {
        res.json('validateEmail');
    }

}

