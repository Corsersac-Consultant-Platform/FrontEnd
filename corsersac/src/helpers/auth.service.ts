import type {SignUpDto} from "@/dtos/sign-up.dto.ts";
import {http} from "@/service/http-common.service.ts";
import type {SignInDto} from "@/dtos/sign-in.dto.ts";

export class AuthService{
    endpoint = "/api/v1/Auth";

    async signUp(user: SignUpDto){
        return await http.post(this.endpoint + "/sign-up", JSON.stringify(user));
    }

    async signIn(user: SignInDto){
        return await http.post(this.endpoint + "/sign-in", JSON.stringify(user));
    }

    async signOut(){
        return await http.post(this.endpoint + "/sign-out");
    }

    async refreshToken(){
        return await http.post(this.endpoint + "/refresh-token");
    }
}