import {http} from "@/service/http-common.service.ts";

export class UsageService{
    endpoint = '/api/v1/Usage';
    async getUsageByDate(date: string){
        return await http.get(`${this.endpoint}/date?date=${date}`);
    }
    async getUsageByRange(startDate: string, endDate: string){
        return await http.get(`${this.endpoint}/range?start=${startDate}&end=${endDate}`);
    }

    async getUsageByVehicle(vehicleIdentifier: string){
        return await http.get(`${this.endpoint}/vehicle?vehicleIdentifier=${vehicleIdentifier}`);
    }
    async countUsageByYearPerCenter(year: number){
        return await http.get(`${this.endpoint}/year?year=${year}`);
    }
}