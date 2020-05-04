import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import * as express from 'express';
import { Express } from 'express';
import * as mongoose from 'mongoose';
import { ENVIRONMENT } from './environments/environment';
import { RecipeSchema } from './models';
import { loginRoute, recipesRoute } from './routes';

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
	origin: ENVIRONMENT.frontendUrl,
	credentials: true
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({
	limit: '150mb'
}));

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
