import { AlertGeneral } from "@/components/AlertGeneral";
import { LoaderGeneral } from "@/components/LoaderGeneral";
import { LoginForm } from "@/components/LoginForm";
import { DashboardContainer } from "@/containers/Dashboard";
import { Login } from "@/containers/Login";
import { LoginContext } from "@/context/Session";
import { useSession } from "@/hooks/Important/useSession";
import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";

function Dashboard() {
  const { expireSession, handleLogout, isLoading } = useSession();
  const router = useRouter();
  const localSession = useContext(LoginContext);
  const sessionManagment = localSession?.localSession;
  useEffect(() => {
    if (!sessionManagment?.isSession) router.push("/");
  }, [sessionManagment, localSession, router]);
  return (
    <>
      {expireSession ? (
        <LoaderGeneral
          body={
            isLoading ? (
              <div className="custom-loader"></div>
            ) : (
              <AlertGeneral onClick={handleLogout} />
            )
          }
          isLoading={true}
        />
      ) : (
        <DashboardContainer />
      )}
    </>
  );
}

export default Dashboard;
