import axios from "axios";
import config from "../config";

class Buyer {

    root = config.protocol+config.host + "/buyer"
    buyerId

    constructor(buyerId) {
        this.buyerId = buyerId
    }

    async registerBuyer(buyerObj, token = false) {

        
        let headers = {}
        if (token) headers["x-access-token"] = token
        console.log("API Test")
        
        let result = await axios.post(this.root + "/register-buyer", buyerObj, { headers })
        return result
    }

    async loginBuyer(buyerObj, token = false) {
        let headers = {}
        if(token) headers["x-access-token"] = token 
        
        let result = await axios.post(`${this.root}/login-buyer`,buyerObj, {headers})
        console.log(result)
        
    }

    async getInfo(token = false) {
        let headers = {}
        if (token) headers["x-access-token"] = token

        let result = await axios.get(`${this.root}/get-buyer/${this.buyerId}`, { headers })
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
        let result = await axios.get(`${this.root}/total-buyer`,{headers})
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

        let result = await axios.put(`${this.root}/update-info/${this.buyerId}`, updateData, { headers })
        return result
    }

    async updatePassword(updateData,token = false) {
        let headers = {}
        if(token) headers["x-access-token"] = token 

        let result = await axios.put(`${this.root}/update-password/${this.buyerId}`,updateData,{headers})
        return result
    }

    async search(requiredField, token = false) {
        let headers = {}
        if(token) headers["x-access-token"] = token
        
        let result = await axios.post(`${this.root}/search`,requiredField,{headers})
        return result
    }

    async deleteBuyer(token = false) {
        let headers = {}
        if (token) headers["x-access-token"] = token

        let result = await axios.delete(`${this.root}/delete-admin/${this.buyerId}`, { headers })
        return result
    }


}

export default Buyer