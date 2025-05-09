import { Request, Response } from "express"
import { CreateCategoryDto, CustomError } from "../../domain"
import { CatagoryService } from "../services/category.service"



export class CategoryController {

    constructor( 
        private readonly categoryService: CatagoryService
    ) {}


    private handleError = (error: any, res: Response) => {

        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ error: error.message })
        }

        console.log(`${error}`)
        return res.status(500).json({ error: 'Internal server error' })
    }

    createCategory = ( req: Request, res: Response ) => {

        const [ error, createCatagoryDto ] =  CreateCategoryDto.create( req.body );
        if ( error ) res.status(400).json(error);

        this.categoryService.createCategory( createCatagoryDto!, req.body.user )
            .then( ( category ) => res.status(201).json( category ) )
            .catch( (error) => this.handleError( error, res ) )

    }

    getCategories = async ( req: Request, res: Response ) => {

        this.categoryService.getCategories()
            .then(( categories ) => res.status(200).json( categories ) )
            .catch(( error ) => this.handleError( error, res ))
    }
}