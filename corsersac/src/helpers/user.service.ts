import {http} from "@/service/http-common.service.ts";

export class UserService{
    endpoint = "/api/v1/User";

    async getUserIdByUsername(username: string){
        return await http.get(this.endpoint + "/username?username=" + username);
    }


    async updatePassword(id: number, password: string){
        return await http.patch(this.endpoint + "/update-password/" + id, password);
    }
}