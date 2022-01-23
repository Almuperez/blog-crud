import { create } from "domain";
import { FastifyPluginAsync, FastifyRequest, FastifyReply } from "fastify";
import { request } from "http";
import { Planta } from "../models/Planta";
import { Utilidad } from "../models/Utilidad";

type MyRequest = FastifyRequest<{
  Body: { title: string; description: string; utilidad_id: string };
}>;

const add = async (request: FastifyRequest, reply: FastifyReply) => {
    const utilidades = await Utilidad.find().lean()
    console.log("🚀 ~ file: list.router.ts ~ line 13 ~ add ~ utilidades", utilidades)

    const data = { title: "Añade la planta que más te guste", utilidades };
    reply.view("views/add", data);
}

// const addFlores = () => {


//   reply.view("views/addFlores", data)
// }

const add_planta = async (request: MyRequest, reply: FastifyReply) => {
    const { title, description, utilidad_id } = request.body;
    console.log("🚀 ~ file: list.router.ts ~ line 21 ~ constadd_planta= ~ request.body", request.body)
    
    const planta  = await Planta.create({
      title: title,   
      body: description,
      utilidad: utilidad_id,
    })

   const plantaGuardada = await planta.save()
   console.log(`Created item ${plantaGuardada.title} with objectid ${plantaGuardada._id}`)
   reply.redirect("/");
}


export const list_router: FastifyPluginAsync = async (app) => {
    app.post("/add_planta", add_planta);
    app.get("/add", add);
}