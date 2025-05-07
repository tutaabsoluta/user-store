import { Router } from 'express';
import { AuthRoutes } from './auth/routes';


export class AppRoutes {


  static get routes(): Router {

    // Router instance
    const router = Router();
    
    // Auth routes
    router.use('/api/auth', AuthRoutes.routes);
    // router.use('/api/categories', CategoryRoutes.routes);


    // Return the instance with the routes
    return router;
  }
  
}

