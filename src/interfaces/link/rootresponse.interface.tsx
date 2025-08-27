import { IApiLinks } from "./apilinks.interface";

export interface IRootResponse {
    _links: IApiLinks | boolean
}