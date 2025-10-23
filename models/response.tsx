
export default class Response {

    code?: number;
    status?: boolean;
    message?: string;
    data?: any

    constructor (c: number, s: boolean, m: string, d: any){
        this.code = c
        this.status = s
        this.message = m
        this.data = d
    }
}
