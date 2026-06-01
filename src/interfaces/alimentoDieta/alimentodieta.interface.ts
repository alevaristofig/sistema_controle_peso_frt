import { IAlimento } from "../alimento/alimento.interface";
import { IDieta } from "../dieta/dieta.interface";

export interface IAlimentoDieta {  
    id: number,
    dieta: IDieta,
    alimento: IAlimento,
}