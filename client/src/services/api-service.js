import axios from 'axios';

export default class ApiService{
    
    request = async ({url, method, data, params, error = "Something went wrong"}) => {
        try{
            const response = await axios({
                method, 
                url,
                data: {
                    ...data
                },
                params: {
                    ...params
                }
            });
            return response; 
        }catch(err){
            throw new Error(error);
        }
    };

    //movies
    movieCreate = async(data) => {
        return this.request({ url: '/api/movies', method: 'POST', data });
    }

    movieGet = async (id) => {
        return this.request({url: `/api/movies/${id}`, method: 'GET' });
    }

    movieUpdate = async (id, data) => { 
        return this.request({ url: `/api/movies/${id}`, method: 'PUT', data });
    }

    movieDelete = async (id) => {
        return this.request({ url: `/api/movies/${id}`, method: "DELETE" });
    }

    movieQueryGet = async (params) => {
        return this.request({ url: `/api/movies`, method: 'GET', params });
    }

    importMovies = async (data) => {
        return this.request({ url: '/api/movies/import', method: "POST", data });
    }

    //actors
    getActors = async () => {
        return this.request({ url: '/api/actors', method: 'GET' });
    }

    //formats
    getFormats = async () => {
        return this.request({ url: '/api/formats', method: "GET" });
    }
}