import { compareSync, genSaltSync, hashSync } from "bcryptjs";


export class BcryptAdapter {

    static hashPassword( password: string ): string {
        const salt = genSaltSync();

        return hashSync(password, salt)
    }

    // Metodo para comparar password

    static comparePassword( password: string, hashPassword: string ): boolean {

        return compareSync(password, hashPassword)
    }
}