import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as cors from 'cors'
import { Express } from 'express';
import * as mongoose from 'mongoose';
import { RecipeSchema } from './models';
import { recipesRoute, loginRoute } from './routes';
import { environment } from './environments/environment';
import * as cookieParser from 'cookie-parser';

const app: Express = (express as any)();
const port = process.env.port || 3000;
const databaseIP = 'localhost';
const databasePort = 27017;
const databaseName = 'curry-chronicles';
const connectionString = `mongodb://${databaseIP}:${databasePort}/${databaseName}`;


(<any>mongoose).Promise = global.Promise;
mongoose
	.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
	.catch(error => {
		console.error(error);
	});

app.use(cookieParser());

app.use(cors({
	origin: environment.frontendUrl,
	credentials: true
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const routes: ((app: Express) => void)[] = [
	recipesRoute,
	loginRoute
];

// Register the schemas
const _ = {
	recipes: RecipeSchema
};

routes.forEach(route => route(app));

app.listen(port);

app.use((request, result) => {
	result.status(404).send({ url: request.originalUrl + ' not found' })
});

console.log('Curry-Chronicles is ready to roll on port: ' + port);
