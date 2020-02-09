import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as cors from 'cors'
import { Express } from 'express';
import * as mongoose from 'mongoose';
import { RecipeSchema } from './models';
import { recipesRoute } from './routes';

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

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const routes: ((app: Express) => void)[] = [
	recipesRoute
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
