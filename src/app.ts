import fastify from "fastify";
import { appRoutes } from "./http/routes";
import { ZodError } from "zod";
import { env } from "./env";

export const app = fastify();

app.register(appRoutes)


//colocar underline ( _ ) nos parametros nao usados dentro do handler
app.setErrorHandler((error, _, reply) => {
    if(error instanceof ZodError){
        return reply.status(400).send({message: 'validation error', issues: error.format()})
    }
    if(env.NODE_ENV !== 'production'){
        console.error(error)
    } else{
        //todo here we should log to an exeternal tool like datadog/newrelic/sentry
    }

    return reply.status(500).send({message: 'Internal Server Error'})
})
