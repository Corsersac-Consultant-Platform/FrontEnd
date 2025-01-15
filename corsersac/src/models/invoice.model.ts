export class Invoice {
    id: number;
    emitDate: string;
    number : number;
    serie: string;
    register: string;
    name: string;
    amount: number;
    status: string;

    constructor(id: number, emitDate: string, number: number, serie: string, register: string, name: string, amount: number, status: string) {
        this.id = id;
        this.emitDate = emitDate;
        this.number = number;
        this.serie = serie;
        this.register = register;
        this.name = name;
        this.amount = amount;
        this.status = status;
    }

}