import axios from "axios";
import config from "../config";

class Merchandise {

    root = config.protocol+config.host + "/merchandise"
    itemId

    constructor(itemId) {
        this.itemId = itemId
    }

    async create(itemObj, token) {
        let headers = {}
        if (token) headers["x-access-token"] = token

        let result = await axios.post(this.root + "/create-merchandise", itemObj, { headers })
        return result
    }

    async getInfo(token = false) {
        let headers = {}
        if (token) headers["x-access-token"] = token

        let result = await axios.get(`${this.root}/get-merchandise/${this.itemId}`, { headers })
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
        let result = await axios.get(`${this.root}/total-merchandise`,{headers})
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


    async update(updateData,token = false) {
        let headers = {}
        if(token) headers["x-access-token"] = token 

        let result = await axios.put(`${this.root}/update-merchandise/${this.itemId}`,updateData,{headers})
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

        let result = await axios.delete(`${this.root}/delete-merchandise/${this.itemId}`, { headers })
        return result
    }


}

export default Merchandise