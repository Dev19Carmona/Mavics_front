import { LoaderGeneral } from "@/components/LoaderGeneral";
import { LoginForm } from "@/components/LoginForm";
import { useLoginContainer } from "@/hooks/useLoginContainer";
import { Flex } from "@chakra-ui/react";

export const Login = () => {
  const { colorMode, onChange, handleSubmit, isLoading } = useLoginContainer();
  return (
    <>
      <Flex
        borderLeft={"0.2px solid teal"}
        borderTop={"0.2px solid teal"}
        ml={"3%"}
        mt={"3%"}
        bg={colorMode === "light" ? "window.light" : "window.dark"}
        h={"94vh"}
        borderTopLeftRadius={9}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <LoginForm
          colorMode={colorMode}
          onChange={onChange}
          handleSubmit={handleSubmit}
        />
      </Flex>
      <LoaderGeneral isLoading={isLoading}/>
    </>
  );
};
