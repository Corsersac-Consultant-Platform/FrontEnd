export class Invoice {
    id: number;
    emitDate: string;
    number : number;
    serie: string;
    register: string;
    name: string;
    amount: number;
    statusId: number;

    constructor(id: number, emitDate: string, number: number, serie: string, register: string, name: string, amount: number, statusId: number) {
        this.id = id;
        this.emitDate = emitDate;
        this.number = number;
        this.serie = serie;
        this.register = register;
        this.name = name;
        this.amount = amount;
        this.statusId = statusId;
    }

}