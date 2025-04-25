import { BcryptAdapter } from "../../config";
import { UserModel } from "../../data";
import { CustomError, RegisterUserDto, UserEntity } from "../../domain";

// El controlador delega al servicio la creacion de un usuario

export class AuthService {


    constructor() {}

    public async registerUser( registerUserDto: RegisterUserDto ) {

        const existUser = await UserModel.findOne({ email: registerUserDto.email });

        if ( existUser ) throw CustomError.badRequest('Email already exists');

        try {

            const user = new UserModel( registerUserDto );
            
            // encriptar password
            user.password = BcryptAdapter.hashPassword( registerUserDto.password );
            
            // Guardar usuario con contrasena hasheada
            await user.save();
            // JWT para mantener autenticacion de usuario

            // email de confirmacion
            const { password, ...userEntity } = UserEntity.fromObject(user);
            return { 
                user: userEntity,
                token: 'abc',
             }

        } catch (error) {
            throw CustomError.internalServer(`${ error }`)
        }
    }
}