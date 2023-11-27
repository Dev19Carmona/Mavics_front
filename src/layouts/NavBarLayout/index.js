import { LoaderGeneral } from "@/components/LoaderGeneral";
import { Nav } from "@/components/Nav";
import { useState } from "react";

export const NavBarLayout = () => {
 const [isLoading, setIsLoading] = useState(false)
  return (
    <>
    <Nav setIsLoading={setIsLoading}/>
    {
      isLoading&&
    <LoaderGeneral isLoading={isLoading} />
    }
    </>
  );
};
