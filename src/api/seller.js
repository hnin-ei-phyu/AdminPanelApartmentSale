import axios from "axios";
import config from "../config";

class Seller {

    root = config.protocol+config.host + "/seller"
    sellerId

    constructor(sellerId) {
        this.sellerId = sellerId
    }

    async sellerLogin(sellerObj, token) {
        let headers = {}
        if (token) headers["x-access-token"] = token

        console.log("API Route")
        let result = await axios.post(this.root + "/login-seller", sellerObj, { headers })
        return result
    }

    async registerSeller(sellerObj, token) {
        let headers = {}
        if (token) headers["x-access-token"] = token

        let result = await axios.post(this.root + "/register-seller", sellerObj, { headers })
        // console.log(result)
        return result
    }
    async getInfo(token = false) {
        let headers = {}
        if (token) headers["x-access-token"] = token

        let result = await axios.get(`${this.root}/get-seller/${this.sellerId}`, { headers })
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
        let result = await axios.get(`${this.root}/total-seller`,{headers})
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

        let result = await axios.put(`${this.root}/update-info/${this.sellerId}`, updateData, { headers })
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

    async deleteSeller(token = false) {
        let headers = {}
        if (token) headers["x-access-token"] = token

        let result = await axios.delete(`${this.root}/delete-seller/${this.sellerId}`, { headers })
        return result
    }


}

export default Seller