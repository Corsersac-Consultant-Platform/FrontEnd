import {http} from "@/service/http-common.service.ts";

export class InvoiceService{
    endpoint = "/api/v1/Invoice";

    async getInvoiceByDate(date: string){
        return await http.get(`${this.endpoint}/date?date=${date}`);
    }
    async getInvoiceByRange(startDate: string, endDate: string){
        return await http.get(`${this.endpoint}/range?start=${startDate}&end=${endDate}`);
    }

    async getInvoiceBySerie(serie: string){
        return await http.get(`${this.endpoint}/serie?serie=${serie}`);
    }

    async updateInvoiceStatus(id: number, statusId: number){
        return await http.patch(`${this.endpoint}/update-status/${id}`, statusId);
    }

    async invoiceExists(serie: string, number: string){
        return await http.get(`${this.endpoint}/exists?serie=${serie}&number=${number}`);
    }
}