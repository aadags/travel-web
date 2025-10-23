
export default class GenericError {

    field: string;
    message: string;

    constructor (f: string, m: string){
        this.field = f
        this.message = m
    }
}
