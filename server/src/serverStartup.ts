import Koa from 'koa'
import json from 'koa-json'
import { mainAllowedMethods, mainRoutes } from './api/routes/mainRouter'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import bodyParser from 'koa-bodyparser'
import { DotEnvManager } from './base/envVariableManager/dotEnvManager'
import { apiLogging } from './api/middleware/shared/api-logging'
import { errorHandler } from './api/middleware/shared/error_handler'

//load dotenv file
dotenv.config()

//Connect to MongoDB
const mongoDBConnectString = DotEnvManager.getEnvVariable(
    'DB_CONNECTION_STRING'
)
mongoose.connect(mongoDBConnectString, { dbName: 'media-server' })

//API
const app = new Koa()

//Middleware
app.use(errorHandler)
app.use(json())
app.use(bodyParser())
app.use(apiLogging)

//Routes
app.use(mainRoutes).use(mainAllowedMethods)

//Start Server
app.listen('3001')
