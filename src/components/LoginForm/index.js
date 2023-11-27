import { Box, Button, Grid, Input, Text } from "@chakra-ui/react";
import { InputGeneral } from "../InputGeneral";
import { MdAlternateEmail } from "react-icons/md";
import React from "react";
import { BiHide, BiShow } from "react-icons/bi";
import { ButtonSubmitGeneral } from "../ButtonSubmitGeneral";
import { GoogleLogin } from "@react-oauth/google";
import { BoxPresentation } from "../BoxPresentation";

export const LoginForm = ({
  colorMode,
  onChange = () => {},
  handleSubmit = () => {},
}) => {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  return (
    <Grid
      userSelect={"none"}
      borderRadius={9}
      p={5}
      bg={colorMode === "light" ? "box.light" : "box.dark"}
      gap={5}
    >
      <Text
        fontSize={50}
        color={colorMode === "light" ? "header.light" : "header.dark"}
        m={10}
      >
        Iniciar Sesion
      </Text>
      <InputGeneral
        left={
          <Input
            onChange={(e) => {
              onChange(e);
            }}
            name="email"
            pr="4.5rem"
            placeholder="Email"
          />
        }
        right={<MdAlternateEmail />}
      />
      <InputGeneral
        left={
          <Input
            onChange={(e) => {
              onChange(e);
            }}
            name="password"
            pr="4.5rem"
            placeholder="Password"
            type={show ? "text" : "password"}
          />
        }
        right={
          <Button h="1.75rem" size="sm" onClick={handleClick}>
            {show ? <BiHide /> : <BiShow />}
          </Button>
        }
      />
      <ButtonSubmitGeneral onClick={handleSubmit} title="Iniciar Sesion" />
      <BoxPresentation
        body={
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              handleSubmit(credentialResponse.credential)
            }}
            onError={() => {
              console.log("Login Failed");
            }}
          />
        }
      />
    </Grid>
  );
};
