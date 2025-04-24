


export class CustomError extends Error {

    private constructor(

        public readonly statusCode: number,
        public readonly message: string
    ) {
        super(message) // Llamamos el constructor padre, enviandole el msg
    }

    static badRequest( message: string) {
        return new CustomError( 400, message )
    };

    static unauthorized( message: string) {
        return new CustomError( 401, message )
    };

    static forbidden( message: string) {
        return new CustomError( 403, message )
    };

    static notFound( message: string) {
        return new CustomError( 404, message )
    };

    static internalServer( message: string) {
        return new CustomError( 500, message )
    };
    

}
// Para estar evitando crear instancias para cada status code, hacemos factory constructor o metodos factory que regresen instancias previamente creadas
// Evitamos el throw new CustomError(404, 'Recurso no encontrado');
// Private constructor para que solo creemos las instancias de CustomError con los metodos estaticos
