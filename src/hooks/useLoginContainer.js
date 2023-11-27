import { useColorModeGeneral } from "./useColorModeGeneral";
import {  useMutation } from "@apollo/client";
import { userLogin } from "@/graphql/User";
import { useState } from "react";
import { useRouter } from "next/router";
import { TIME_LOADING } from "../../config/_constants";
import { useToast } from "@chakra-ui/react";

export const useLoginContainer = () => {
  const toast = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { colorMode } = useColorModeGeneral();
  const [filter, setFilter] = useState({});
  const [login, { data: loginToken, loading: loginLoad, error: loginError }] =
    useMutation(userLogin);
  const onChange = (e) => {
    setFilter({
      ...filter,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (googleToken = null) => {
    let filterControl = filter
    if (typeof googleToken === 'string')filterControl = {googleToken} 
    const token = await login({
      variables: {
        filter:filterControl,
      },
    });

    if (token?.data) {
      toast({
        title: "SUCCESS",
        description: "WELCOME_TO_EAGLE_SOFT",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
      setIsLoading(true);
      localStorage.setItem("session", token?.data?.userLogin);
      localStorage.setItem("isSession", true);
      setTimeout(() => {
        router.reload();
        setIsLoading(false);
      }, TIME_LOADING);
    } else {
      const error = token?.error?.graphQLErrors[0].message;
      toast({
        title: "ERROR",
        description: error,
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  return {
    colorMode,
    onChange,
    handleSubmit,
    isLoading,
  };
};
