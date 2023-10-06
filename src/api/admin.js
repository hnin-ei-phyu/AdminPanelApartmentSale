import axios from "axios";
import config from "../config";

class Admin {

    root = config.protocol+config.host + "/admin"
    adminId

    constructor(adminId) {
        this.adminId = adminId
    }

    async registerAdmin(adminObj, token = false) {
        let headers = {}
        if (token) headers["x-access-token"] = token

        let result = await axios.post(this.root + "/register-admin", adminObj, { headers })
        return result
    }


    async loginAdmin(adminObj, token = false) {
        let headers = {}
        if(token) headers["x-access-token"] = token 
        
        let result = await axios.post(`${this.root}/login-admin`,adminObj, {headers})
        console.log(result)
        
    }

    async getInfo(token = false) {
        let headers = {}
        if (token) headers["x-access-token"] = token

        let result = await axios.get(`${this.root}/get-admin/${this.adminId}`, { headers })
        return result
    }

    async getAll(token = false) {
        let headers = {}
        if(token) headers["x-access-token"] = token 
            let result = await axios.get(`${this.root}/get-all`,{headers})
            return result
    }

    async getTotalCount(token = false) {
        let headers = {}
        if(token) headers["x-access-token"] = token
        let result = await axios.get(`${this.root}/total-admin`,{headers})
        //console.log(JSON.stringify(result.data));
        return result
    }

    async getWithRange(range,token = false) {
        console.log("GET WITH RANGE ROUTE")
        console.log(range);
        let headers = {}
        if(token) headers["x-access-token"] = token
        let result = await axios.post(`${this.root}/getWithRange`,null,{headers,params:range})
        console.log(result.data);
        console.log("form admin api");
        return result
    }

    async updateInfo(updateData, token = false) {
        let headers = {}
        if (token) headers["x-access-token"] = token

        let result = await axios.put(`${this.root}/update-info/${this.adminId}`, updateData, { headers })
        return result
    }

    async updatePassword(updateData,token = false) {
        let headers = {}
        if(token) headers["x-access-token"] = token 

        let result = await axios.put(`${this.root}/update-password/${this.adminId}`,updateData,{headers})
        return result
    }

    async search(requiredField, token = false) {
        let headers = {}
        if(token) headers["x-access-token"] = token
        
        let result = await axios.post(`${this.root}/search`,requiredField,{headers})
        return result
    }

    async deleteAdmin(token = false) {
        let headers = {}
        if (token) headers["x-access-token"] = token

        let result = await axios.delete(`${this.root}/delete-admin/${this.adminId}`, { headers })
        return result
    }


}

export default Admin