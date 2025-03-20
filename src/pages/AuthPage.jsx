import AuthForm from "../components/AuthForm"
import { useState } from "react"

const AuthPage = () => {

  const [isLogin, setIsLogin] = useState(false);
  
  return (
    <AuthForm isLogin={isLogin} setIsLogin={setIsLogin} />
  )
}

export default AuthPage