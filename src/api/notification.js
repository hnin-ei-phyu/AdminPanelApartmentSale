import axios from "axios";
import config from "../config";

class Notification {

    root = config.protocol+config.host + "/notification"
    adminId

    constructor(notiId) {
        this.notiId = notiId
    }

    async create(notiObj, token) {
        let headers = {}
        if (token) headers["x-access-token"] = token

        let result = await axios.post(this.root + "/create-noti", notiObj, { headers })
        return result
    }

    async getInfo(token = false) {
        let headers = {}
        if (token) headers["x-access-token"] = token

        let result = await axios.get(`${this.root}/get-noti/${this.notiId}`, { headers })
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
        let result = await axios.get(`${this.root}/total-noti`,{headers})
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

    async search(requiredField, token = false) {
        let headers = {}
        if(token) headers["x-access-token"] = token
        
        let result = await axios.post(`${this.root}/search`,requiredField,{headers})
        return result
    }

    async delete(token = false) {
        let headers = {}
        if (token) headers["x-access-token"] = token

        let result = await axios.delete(`${this.root}/delete-noti/${this.notiId}`, { headers })
        return result
    }


}

export default Notification