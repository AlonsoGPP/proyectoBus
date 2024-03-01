import { IBus } from "./IBus";

export interface IItinerario{
    _id?:string,
    fecha:Date,
    buses:IBus[],
    createdAt:Date
}