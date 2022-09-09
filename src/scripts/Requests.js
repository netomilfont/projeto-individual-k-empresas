import { instance } from "./axios.js";

export class Requests {

    static async getAllCompanies () {
        const companies = await instance
        .get("companies")
        .then((res) => res.data)
        .catch((err) => console.log(err))

        return companies
    }
}