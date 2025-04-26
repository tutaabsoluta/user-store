


export class LoginUserDto {
    private constructor(

        public readonly email: string,
        public readonly password: string,

    ) {}

    static getUser( object: { [key: string]: any }): [ string?, LoginUserDto? ] {
        const { email, password } = object;

        if ( !email ) return ['Missing email', undefined];

        if ( !password ) return ['Missing password', undefined];

        return [undefined, new LoginUserDto( email, password )];
    }
}