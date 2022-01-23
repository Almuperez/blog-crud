import { FastifyPluginAsync, FastifyRequest, FastifyReply } from "fastify";
import mongoose from "mongoose";
import { DB_URL } from "../config";
import { Planta } from "../models/Planta";
import { Utilidad } from "../models/Utilidad";

const home = async (request: FastifyRequest, reply: FastifyReply) => {
  await mongoose
    .connect(DB_URL)
    .then(() => console.log(`Connected to ${DB_URL}`));

  //el find encuentra las plantas y el lean lo hace array, cada vez que añado un objeto se mete en ese array
  const plantasBBDD = await Planta.find().lean();

  console.log("We have Plantas", plantasBBDD);

  const utilidadesIds = plantasBBDD.map((unaPlanta) => unaPlanta.utilidad);

  // array de ids de utilidades
  //$in operacion de moongose para decirle que busque dentro de la bbdd los que coinciden con esos ids.
  //siempre que llamo a la bbdd sin then o cath tengo que hacer un await, en try parasaria lo mismo.
  const utilidadBaseDeDatos = await Utilidad.find({
    _id: { $in: utilidadesIds },
  }).lean();



  const plantas = plantasBBDD.map((unaPlanta) => {
    //unaPlanta tiene utilidad: que es _id de utilidadesBBDD

    const utilidadDePlanta = utilidadBaseDeDatos.find((utilidad) => {
        //dos objetos no se pueden comparar, por lo que lo transformo en string para que se puedan comparar.

        // buscame la utilidad de mi planta y haz match con el id de la utilidad.
        if (unaPlanta.utilidad.toString() === utilidad._id.toString()) {
          return utilidad;
        }
      })

    return {
      ...unaPlanta,
      utilidad: utilidadDePlanta?.name,
    };
  });

 
  const data = { title: "Tipo de planta", plantas };
  reply.view("views/home", data);
};

export const main_router: FastifyPluginAsync = async (app) => {
  app.get("/", home);
};
