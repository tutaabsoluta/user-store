import { BcryptAdapter, JwtAdapter } from "../../config";
import { UserModel } from "../../data";
import { CustomError, LoginUserDto, RegisterUserDto, UserEntity } from "../../domain";

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

    public async loginUser( loginUserDto: LoginUserDto ) {

        const user = await UserModel.findOne( {email: loginUserDto.email} );
        if ( !user ) throw CustomError.notFound('User doesnt exist');

            
            const isValidPassword = BcryptAdapter.comparePassword( loginUserDto.password , user.password);

            const { password, ...userEntity } = UserEntity.fromObject(user);


            if ( !isValidPassword ) throw CustomError.badRequest('Invalid Password');

            const token = await JwtAdapter.generateToken({ id: user.id });
            if ( !token ) throw CustomError.internalServer('Error creating JWT')
            
            return {
                user: userEntity,
                token: token,
            }
            
    }
}