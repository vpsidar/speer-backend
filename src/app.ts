import express,{Request,Response} from 'express'
import cors from 'cors';
import AuthenticationController from './api/controllers/AuthenticationController';
const PORT = 8080
export default class App {
    private express = express();
    protected registerControllers(): App {
        this.express.get('/',(req:Request,res:Response) => {
            res.status(200).json({'message': 'Hello from speer backend service'});
        })
        this.express.use('/auth',this.makeAuthenticationController().registerRoute());
        return this;
    }
    async startExpressServer() {
        this.express.use(cors());
        this.express.use(express.json());
        this.express.use(express.urlencoded({extended:true}));

        try {
            //db connect here
        } catch (error) {
            console.log('Error from initial startup');
        }
        this.registerControllers();
        this.express.listen(PORT,() => {
            console.log(`app listening on port ${PORT}`)
        })
    }
    private makeAuthenticationController () {
        return new AuthenticationController();
    }
}