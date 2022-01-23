import mongoose, { Document, Schema } from "mongoose";
import { Utilidad } from "./Utilidad";

export interface Planta extends Document {
    // Creamos un nuevo interface que extienda de documentos (el tipo por defecto de mongoose)
    title: String;
    body: String;
    utilidad: Utilidad ["_id"];
}

const schema = new Schema({
    // Creamos un nuevo esquema
    title: String,
    body: String ,
    utilidad: { type:Schema.Types.ObjectId, ref:"Utilidad" }
});

export const Planta = mongoose.model<Planta>("Planta", schema)