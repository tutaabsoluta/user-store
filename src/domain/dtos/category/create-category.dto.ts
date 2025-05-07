import { CustomError } from "../../errors/custom.error";



export class CreateCategoryDto {

    private constructor(
        public readonly name: string,
        public readonly available: boolean,
    ) {}

    static create( object: { [key: string]: any } ): [ string?, CreateCategoryDto? ] {



        const { name, available = false } = object;
        let availableBoolean = available;

        if ( !name ) return [ 'Missing name', undefined ];

        // Parse available to boolean
        if ( typeof available !== 'boolean' ) {
            availableBoolean = ( available === 'true' )
        } else {
            console.log('Available must be a boolean')
        }

        return [ undefined, new CreateCategoryDto( name, availableBoolean ) ]
    }
}