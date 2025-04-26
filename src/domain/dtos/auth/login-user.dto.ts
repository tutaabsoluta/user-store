import { regularExps } from "../../../config";



export class LoginUserDto {
    private constructor(

        public readonly email: string,
        public readonly password: string,

    ) {}

    static getUser( object: { [key: string]: any }): [ string?, LoginUserDto? ] {
        const { email, password } = object;

        if ( !email ) return ['Missing email', undefined];

        if ( !password ) return ['Missing password', undefined];

        if ( !regularExps.email.test( email ) ) return ['Invalid email', undefined];

        if ( password.length < 6 ) return ['Password too short', undefined];

        return [undefined, new LoginUserDto( email, password )];
    }
}