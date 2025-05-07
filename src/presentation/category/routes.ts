import { Router } from 'express';
import { CategoryController } from './controller';


export class CategoryRoutes {


  static get routes(): Router {

    // Router instance
    const router = Router();

    const controller = new CategoryController()
    
    // Category routes
    router.get('/', controller.getCategories );
    router.post('/', controller.createCategory );

    // Return the instance with the routes
    return router;
  }
  
}

