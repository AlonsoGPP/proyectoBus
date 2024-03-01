import { IChofer } from "./IChofer";
export interface IPasajero{
    _id?:string;
    dni:string;
    nombres:string;
}
export interface IAsiento{
_id?:string;
correlativo:number;
pasajero?:IPasajero;
}

export interface IBus{
_id?:string;
placa:string;
modelo:string;
marca:string;
chofer?:IChofer;
asientos:IAsiento[];
foto?:String;
}