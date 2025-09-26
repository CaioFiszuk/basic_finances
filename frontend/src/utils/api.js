import axios from 'axios';

class Api {
    constructor(options) {
        this._baseURL = options.baseUrl;
        this._headers = options.headers;
    }

    getWage() {
        return axios.get(`${this._baseURL}/wage`, { headers: this._headers })
        .then((res) => {
            return res.data;
          })
          .catch((error) => {
            return Promise.reject(`Error: ${error.response ? error.response.status : error.message}`);
          });
    }

    updateWage({ budgeted, actual, reportingDate }) {

      const updatedFields = {};

       if (budgeted !== undefined) updatedFields.budgeted = budgeted;
       if (actual !== undefined) updatedFields.actual = actual;
       if (reportingDate !== undefined) updatedFields.reportingDate = reportingDate;
    
      return axios.patch(`${this._baseURL}/wage`, updatedFields, { headers: this._headers })
        .then((res) => res.data)
        .catch((error) => {
          const errorMessage = error.response 
            ? `Error: ${error.response.status} - ${error.response.data.message || error.message}` 
            : `Network error: ${error.message}`;
          return Promise.reject(errorMessage);
        });
    }
}

const api = new Api({
    baseUrl: "http://localhost:3000",
    headers: {
      "Content-Type": "application/json",
    },
  });
  
  export { api };