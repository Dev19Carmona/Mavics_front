import React, { useContext, useEffect } from "react";
import { Login } from "@/containers/Login";
import { LoginContext } from "@/context/Session";
import { DashboardContainer } from "@/containers/Dashboard";
import { useRouter } from "next/router";

function Index() {
  const router = useRouter();
  const localSession = useContext(LoginContext);
  const sessionManagment = localSession?.localSession;
  useEffect(() => {
    if (sessionManagment?.isSession) router.push('/dashboard')
  }, [sessionManagment, localSession, router])
  
  return (
      <Login />
  )
}

export default Index;
