import { createContext,useCallback,useState } from "react";
import { baseURL, postRequest } from "../utils/services";
import { useEffect } from "react";
export const AuthContext = createContext()
export const AuthContextProvider = ({children})=>{
    const [user,setUser] = useState(null);
    const [registerError, setRegisterError] = useState(null)
    const [isRegisterLoading, setIsRegisterLoading] = useState(false)
    const [registerInfo,setRegisterInfo] = useState({
        name:"",
        email:"",
        password:""
    })
    const [loginError, setLoginError] = useState(null)
    const [isLoginLoading, setIsLoginLoading] = useState(false)
    const [loginInfo,setLoginInfo] = useState({
        email : "",
        password : ""
    })
    console.log(loginInfo)
    useEffect(() => {
     const user = localStorage.getItem("User")
     setUser(JSON.parse(user));
    },[])
   
    const updateRegisterInfo = useCallback((info) => {
        setRegisterInfo(info)
    },[]);

    const updateLoginInfo = useCallback((info) => {
        setLoginInfo(info)
    },[])

    const registerUser = useCallback(async(e)=>{
        e.preventDefault()
        setIsRegisterLoading(true)
        setRegisterError(null)
       const response =  await postRequest(`${baseURL}/users/register`, JSON.stringify(registerInfo))
        setIsRegisterLoading(false)
       if(response.error){
        return setRegisterError(response);
       }

       localStorage.setItem("User",JSON.stringify(response))
       setUser(response)
    },[registerInfo])

const loginUser = useCallback(async(e) => {
    e.preventDefault()
    setIsLoginLoading(true)
    setLoginError(null)
    const response = await postRequest(
        `${baseURL}/users/login`, JSON.stringify(loginInfo)
    );
    if(response.error){
        return setLoginError(response)
    }
    setIsLoginLoading(false)
    localStorage.setItem("User", JSON.stringify(response))
    setUser(response)
},[loginInfo])



 const logoutUser = useCallback(()=>{
    localStorage.removeItem("User");
    setUser(null)
 },[])


    return <AuthContext.Provider value={{
        user,
        registerInfo,
        updateRegisterInfo,
        registerUser,
        registerError,
        isRegisterLoading,
        logoutUser,
        loginUser,
        loginError,
        loginInfo,
        updateLoginInfo,
        isLoginLoading

    }}>
            {children}
        </AuthContext.Provider>
    
}