import axios from "axios";
import config from "../config";

class Auth {
  root = config.protocol+config.host + "/auth";

  async isBuyer(token = false) {
    let headers = {};
    if (token) headers["x-access-token"] = token;

    let result = await axios.get(`${this.root}/is-buyer`, { headers });
    return result;
  }
  async isSeller(token = false) {
    let headers = {};
    if (token) headers["x-access-token"] = token;

    let result = await axios.get(`${this.root}/is-seller`, { headers });
    return result;
  }

  async isAdmin(token = false) {
    let headers = {};
    if (token) headers["x-access-token"] = token;

    let result = await axios.get(`${this.root}/is-admin`, { headers });
    return result;
  }

  async isAuth(token = false) {
    let headers = {};
    if (token) headers["x-access-token"] = token;

    let result = await axios.get(`${this.root}/is-authed`, { headers });
    return result;
  }


  async verifyAdmin(token) {
    let headers = {};
    if (token) headers["x-access-token"] = token;

    let result = await axios.get(`${this.root}/verify-admin`, { headers });
    return result;
  }
}

export { Auth };
