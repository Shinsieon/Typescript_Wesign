import express from "express";
import { Controller } from "./common/interfaces/controller.interface";
declare class App {
    private app;
    constructor(controllers: Controller[]);
    listen(): void;
    getServer(): express.Application;
    private initializeMiddlewares;
    private initializeErrorHandling;
    private initializeControllers;
}
export default App;
