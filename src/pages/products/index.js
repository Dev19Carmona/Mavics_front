import { ProductsContainer } from "@/containers/Products";
import React, { useEffect, useContext } from "react";
import { LoginContext } from "@/context/Session";
import { useRouter } from "next/router";

function Products() {
  const router = useRouter();
  const localSession = useContext(LoginContext);
  const sessionManagment = localSession?.localSession;
  useEffect(() => {
    if (!sessionManagment?.isSession) router.push("/");
  }, [sessionManagment, localSession, router]);
  return <ProductsContainer />;
}

export default Products;
