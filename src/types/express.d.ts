import type { NextFunction as ExpressNextFunction, Request as ExpressRequest, Response as ExpressResponse } from "express";
import type { ValidationChain } from 'express-validator';

export type Request = ExpressRequest &
{
    /* Custom properties for the request object */
};

export type Response = ExpressResponse &
{
    /* Custom properties for the response object */
};

export type NextFunction = ExpressNextFunction;

export type RequestHandler = (req: Request, res: Response, next: NextFunction) => Promise<void | Response>;


export type Middleware = RequestHandler;

export type MiddlewareHandler = (middleware: Middleware) => RequestHandler;

export type Controller = RequestHandler;

export type ControllerHandler = (controller: Controller) => RequestHandler;

export type Validator = RequestHandler;

export type ValidationHandler = (validations: ValidationChain[]) => RequestHandler;