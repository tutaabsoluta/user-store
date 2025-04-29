import { BcryptAdapter, envs, JwtAdapter } from "../../config";
import { UserModel } from "../../data";
import { CustomError, LoginUserDto, RegisterUserDto, UserEntity } from "../../domain";
import { EmailService } from "./email.service";

// El controlador delega al servicio la creacion de un usuario

export class AuthService {

    // Podemos recibir una funcion o inyectar el servicio de email
    constructor(
        private emailService: EmailService,
    ) { }

    public async registerUser(registerUserDto: RegisterUserDto) {

        const existUser = await UserModel.findOne({ email: registerUserDto.email });

        if (existUser) throw CustomError.badRequest('Email already exists');

        try {

            const user = new UserModel(registerUserDto);

            // encriptar password
            user.password = BcryptAdapter.hashPassword(registerUserDto.password);

            // Guardar usuario con contrasena hasheada
            await user.save();

            // JWT para mantener autenticacion de usuario
            const token = await JwtAdapter.generateToken({ id: user.id });
            if (!token) throw CustomError.internalServer('Error creating JWT')

            // email de confirmacion
            await this.sendEmailValidationLink( user.email );

            const { password, ...userEntity } = UserEntity.fromObject(user);

            return {
                user: userEntity,
                token: token,
            }

        } catch (error) {
            throw CustomError.internalServer(`${error}`)
        }
    }

    public async loginUser(loginUserDto: LoginUserDto) {

        const user = await UserModel.findOne({ email: loginUserDto.email });
        if (!user) throw CustomError.notFound('User doesnt exist');


        const isValidPassword = BcryptAdapter.comparePassword(loginUserDto.password, user.password);

        const { password, ...userEntity } = UserEntity.fromObject(user);


        if (!isValidPassword) throw CustomError.badRequest('Invalid Password');

        const token = await JwtAdapter.generateToken({ id: user.id });
        if (!token) throw CustomError.internalServer('Error creating JWT')

        return {
            user: userEntity,
            token: token,
        }
    }

    private sendEmailValidationLink = async ( email: string ) => {


        const token = await JwtAdapter.generateToken({ email });

        if ( !token ) throw CustomError.internalServer('Error getting token');

        const link = `${ envs.WEBSERVICE_URL }api/auth/validate-email/${ token }`

        const html = `
        <h1>Validate your email</h1>
        <p>Click the following link to validate your email</p>
        <a href=${link}>Validate your email: ${email}</a>
        `
        const options = {
            to: email,
            subject: `Validate your email`,
            htmlBody: html,
        }

        const isSent = await this.emailService.sendEmail( options );

        if ( !isSent ) throw CustomError.internalServer('Error sending error');

        return true;

    }

    public validateEmail = async ( token: string ) => {

        const payload = await JwtAdapter.validateToken(token);
        if ( !payload ) throw CustomError.badRequest('Invalid token');

        const { email } = payload as { email: string };

        if ( !email ) throw CustomError.internalServer('Email not in token');

        const user = await UserModel.findOne({ email });
        if ( !user ) throw CustomError.internalServer('Email doesnt exist');

        user.emailValidated = true;

        await user.save();

        return true;

    }
}