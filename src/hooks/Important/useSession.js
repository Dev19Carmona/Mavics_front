import { LoginContext } from "@/context/Session";
import { useContext, useState } from "react";
import { TIME_LOADING } from "../../../config/_constants";
import { useRouter } from "next/router";

export const useSession = () => {
  const router = useRouter();
  const localSession = useContext(LoginContext);
  const expireSession = localSession?.localSession?.expireSession;
  const [isLoading, setIsLoading] = useState(false);
  const handleLogout = () => {
    setIsLoading(true);
    localStorage.removeItem("session");
    localStorage.setItem("isSession", false);
    setTimeout(() => {
      setIsLoading(false);
      router.reload()
    }, TIME_LOADING);
  };
  return {
    expireSession,
    isLoading,
    handleLogout,
  };
};
