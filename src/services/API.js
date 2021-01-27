import axios from "axios"

const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

const headerDefaults = () => {
  instance.defaults.headers.post['Content-Type'] =
    'application/x-www-form-urlencoded';
  instance.defaults.headers.common['withCredentials'] = true;
};


export const getTemperatura = () =>{
  headerDefaults()
  const response = instance.get("/temp")
  return response
}

export const getTemperaturaLimit = (view) =>{
   headerDefaults()
  const response = instance.get(`/temp/${view}`)
  return response
}
