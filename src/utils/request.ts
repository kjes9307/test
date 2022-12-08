import qs from "qs";
interface httpConfig extends RequestInit{
    data?: object,
    token?: string
}
const url = 'http://localhost:3001'
// const url = 'https://newsapi.org/v2'
export const http = (endStr:string,{data,token,headers,...config}:httpConfig ={}) => {
    const initConfig = {
        method: 'GET',
        headers:{
            Authorization: token? `Bearer ${token}` : '',
            'Content-Type' : data ? 'application/json' : ''
        },
        ...config // 若有參數則覆蓋前面
    }
    
    // get 的data 是在url , post patch delete 在body
    if (initConfig.method.toUpperCase() === "GET") {
        endStr += data && Object.keys(data).length>0? `?${qs.stringify(data)}`:``;
      } else {
        initConfig.body = JSON.stringify(data || {});
      }
      console.log(`${url}/${endStr}`)
    return window.fetch(`${url}/${endStr}`,initConfig)
    .then(async res=>{
      if (res.status === 401) {
          window.location.reload();
          return Promise.reject({ message: "请重新登录" });
      }

      
      if (res.ok) {
        const data = await res.json();
        console.log(data)
        return data;
      }else{
        // fetch 的catch 不會主動抱錯 手動reject
        console.log("request Catch error")
        const error = await res.json()
        return Promise.reject(error);
      }
    })
}

export const useHttp = () => {
  // const { user } = useAuth();
  // ... rest符 是為了使用API 不將Tuple 當作參數傳入
  return (...[endpoint, config]: Parameters<typeof http>) =>
  http(endpoint, { ...config }) 
};