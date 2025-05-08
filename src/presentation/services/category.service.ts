import { CategoryModel } from "../../data";
import { CreateCategoryDto, CustomError, UserEntity } from "../../domain";



export class CatagoryService {

    // DI
    constructor() { }

    // Para crear una catagoria ocupamos la data y el usuario
    async createCategory( createCatagoryDto: CreateCategoryDto, user: UserEntity ) {

        const categoryExists = await CategoryModel.findOne({ name: createCatagoryDto.name });

        if ( categoryExists ) throw CustomError.badRequest( 'Category already exists' );

        try {
            
            const category = new CategoryModel({
                ...createCatagoryDto,
                user: user.id
            })

            await category.save();

            return {
                id: category.id,
                name: category.name,
                available: category.available,
            }


        } catch (error) {
            throw CustomError.internalServer(`${ error }`)
        }

    }
}