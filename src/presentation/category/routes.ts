import { Router } from 'express';
import { CategoryController } from './controller';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { CatagoryService } from '../services/category.service';


export class CategoryRoutes {


  static get routes(): Router {

    // Router instance
    const router = Router();

    const categoryService = new CatagoryService()

    const controller = new CategoryController( categoryService )
    
    // Category routes
    router.get('/', controller.getCategories );
    router.post('/', [ AuthMiddleware.validateJwt ],controller.createCategory );

    // Return the instance with the routes
    return router;
  }
  
}

// Podemos mandar como segundo argumento el middleware o un arreglo de middlewares
// [ AuthMiddleware.validateJwt ]: valida que la ruta tenga el JWT