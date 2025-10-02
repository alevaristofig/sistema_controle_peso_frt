import { IDieta } from "../dieta/dieta.interface";
import { IPage } from "../page.interface";

export interface IDietaResponse {
    _embedded: {
        dietaModelList: IDieta[]
    },
    _links: any,
    page: IPage,
}