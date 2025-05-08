import { Request, Response } from "express"
import { CreateCategoryDto, CustomError } from "../../domain"



export class CategoryController {

    constructor() 
    {}


    private handleError = (error: any, res: Response) => {

        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ error: error.message })
        }

        console.log(`${error}`)
        return res.status(500).json({ error: 'Internal server error' })
    }

    createCategory = async ( req: Request, res: Response ) => {

        const [ error, createCatagoryDto ] =  CreateCategoryDto.create( req.body );

        if ( error ) res.status(400).json(error)
    }

    getCategories = async ( req: Request, res: Response ) => {

        res.json('Get categories')
    }
}