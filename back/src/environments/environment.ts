import { IEnvironment } from "../models/environment";
import { PROD_ENV } from "./environment.prod";
import { DEV_ENV } from "./environment.dev";

export const ENVIRONMENT = getEnvironment();

function getEnvironment(): IEnvironment {
	const parameters = new Set<string>(process.argv);
	return parameters.has('--prod') ? PROD_ENV : DEV_ENV;
}