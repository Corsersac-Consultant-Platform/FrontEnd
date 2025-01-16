import * as xlsx from "xlsx";

export class UtilManager{
    private static _instance: UtilManager;
    private constructor() {}
    public static get instance() {
        if (!this._instance) {
            this._instance = new UtilManager();
        }
        return this._instance;
    }

    getCookies(name: string) {
        const cookies = document.cookie.split("; ");
        for (const cookie of cookies) {
            const [key, value] = cookie.split("=");
            if (key === name) {
                return decodeURIComponent(value);
            }
        }
        return null;
    }

    decodeToken(){
        const token = this.getCookies("Token");
        if (token) {
            const payload = token.split(".")[1];
            const decodedPayload = atob(payload);
            return JSON.parse(decodedPayload);
        }
        return null;
    }

    isAdminOrTester(){
        const decodedPayload = this.decodeToken();
        if (decodedPayload) {
            return decodedPayload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]=== "ADMIN" || decodedPayload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]=== "TESTER";
        }
        return false;
    }

    exportDataToExcel(data: any, fileName: string) {
        const ws = xlsx.utils.json_to_sheet(data);
        const wb = xlsx.utils.book_new();
        xlsx.utils.book_append_sheet(wb, ws, "Datos de facturas");
        xlsx.writeFile(wb, fileName);
    }
    getPdfFromFileName(serie:string, number:string){
        const fileName = `${serie}-${number}.pdf`;
        return `http://localhost:3000/pdfs/${fileName}#toolbar=0`;
    }
}