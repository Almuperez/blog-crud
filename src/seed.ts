// const mongoose = require('mongoose');
import mongoose from "mongoose";
import { parseIsolatedEntityName } from "typescript";
import { DB_URL } from "./config";
import { Utilidad } from "./models/Utilidad";
import { Planta } from "./models/Planta";

//no entiendo la difenrecia entre esto y el seed de infredientes

(async () => {
  //espera que esta promesa se resuelva
  await mongoose.connect(DB_URL).then(() => {
    console.log(`Connected to ${DB_URL}`);
  });

  try {
    await Utilidad.collection.drop()
     await Planta.collection.drop();
  } catch (error) {
    console.log("Nada que vaciar de la base de datos");
  }

  const utilidad = await Utilidad.create({
      name: "plantas medicinales"
  });

  await Utilidad.create({
    name: "plantas alimenticias"
});

  const planta = await Planta.create({
      title: "mis plantas",
      body: "mis plantas son muy bonitas",
      utilidad: utilidad._id,
  })

  await mongoose.disconnect().then(() => console.log("bye")); // desconectar tras guardar la información
})();
