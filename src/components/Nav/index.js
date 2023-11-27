import { Divider, Flex } from "@chakra-ui/react";
import { BiSun } from "react-icons/bi";
import { RxDashboard } from "react-icons/rx";
import { MdDarkMode } from "react-icons/md";
import { FaPowerOff, FaUserCircle } from "react-icons/fa";
import { useNavBarLayout } from "@/hooks/useNavBarLayout";
import { ModalGeneral } from "../ModalGeneral";
import { ButtonActionsGeneral } from "../ButtonActionsGeneral";
import { useRouter } from "next/router";
import { TIME_LOADING } from "../../../config/_constants";
import { LoaderGeneral } from "../LoaderGeneral";
import { HoverButton } from "../HoverButton";

export const Nav = ({ setIsLoading }) => {
  const router = useRouter();
  const {
    colorMode,
    toggleColorMode,
    handleOpenModalLogout,
    isOpen,
    onClose,
    overlay,
    localSession,
    isExpired,
  } = useNavBarLayout();

  const sessionManagment = localSession?.localSession;

  return (
    <>
      <Flex
        height={"full"}
        borderRadius={9}
        width={"3%"}
        position={"fixed"}
        flexDir={"column"}
        justifyContent={"start"}
        alignItems={"center"}
        padding={2}
        gap={5}
      >
        <Flex
          h={"92%"}
          flexDir={"column"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Flex flexDir={"column"} justifyContent={"space-around"} gap={5}>
            <HoverButton
              body={colorMode === "dark" ? <BiSun /> : <MdDarkMode />}
              onClick={toggleColorMode}
            />
            {sessionManagment?.isSession && (
              <HoverButton
                body={<RxDashboard />}
                onClick={() => {
                  router.push("/dashboard");
                }}
              />
            )}
          </Flex>
          {sessionManagment?.isSession && (
            <Flex
              alignItems={"center"}
              flexDir={"column"}
              justifyContent={"space-around"}
              gap={5}
            >
              <HoverButton
                body={<FaUserCircle />}
                onClick={handleOpenModalLogout}
              />
              <Divider />
              <HoverButton
                body={<FaPowerOff />}
                onClick={handleOpenModalLogout}
              />
            </Flex>
          )}
        </Flex>
        <ModalGeneral
          isOpen={isOpen}
          onClose={onClose}
          overlay={overlay}
          title="¿Desea cerrar la session?"
          body={
            <ButtonActionsGeneral
              props={{
                leftButton: {
                  title: "Cerrar Session",
                  color: "teal",
                  click: () => {
                    setIsLoading(true);
                    onClose();
                    localStorage.removeItem("session");
                    localStorage.setItem("isSession", false);
                    setTimeout(() => {
                      setIsLoading(false);
                      router.reload("/");
                    }, TIME_LOADING);
                  },
                },
                rightButton: {
                  title: "Cancelar",
                  color: "red",
                  click: onClose,
                },
              }}
            />
          }
        />
      </Flex>
      {isExpired && <LoaderGeneral />}
    </>
  );
};
