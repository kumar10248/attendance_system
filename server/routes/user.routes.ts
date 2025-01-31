import express, { Router } from 'express';
import { LoginUser, RegisterUser} from '../controller/user.controller.js';
import { validateUserInput } from '../middleware/validateUser.js';

const router: Router = express.Router();

router.post('/register', validateUserInput, RegisterUser);
router.post('/login', validateUserInput,LoginUser);


export default router;