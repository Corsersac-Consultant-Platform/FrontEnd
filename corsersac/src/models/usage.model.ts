export class Usage{
    id: number;
    date: string;
    product: string;
    quantity: number;
    usageCenter: string;
    vehicleIdentifier: string;

    constructor(id: number, date: string, product: string, quantity: number, usageCenter: string, vehicleIdentifier: string){
        this.id = id;
        this.date = date;
        this.product = product;
        this.quantity = quantity;
        this.usageCenter = usageCenter;
        this.vehicleIdentifier = vehicleIdentifier;
    }
}