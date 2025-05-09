import { CategoryModel } from "../../data";
import { CreateCategoryDto, CustomError, UserEntity } from "../../domain";



export class CatagoryService {

    // DI
    constructor() { }

    // Para crear una catagoria ocupamos la data y el usuario
    async createCategory(createCategoryDto: CreateCategoryDto, user: UserEntity) {

        const categoryExists = await CategoryModel.findOne({ name: createCategoryDto.name });

        if (categoryExists) throw CustomError.badRequest('Category already exists');

        try {

            const category = new CategoryModel({
                ...createCategoryDto,
                user: user.id
            })

            await category.save();

            return {
                id: category.id,
                name: category.name,
                available: category.available,
            }


        } catch (error) {
            throw CustomError.internalServer(`${error}`)
        }
    }

    async getCategories() {


        try {

            const categories = await CategoryModel.find();

            return categories.map( category => ({
                id: category.id,
                name: category.name,
                available: category.available,
            }) )


        } catch (error) {
            throw CustomError.internalServer('Internal server error')
        }

        //return [ categorias con id, name i available ]
    }
}