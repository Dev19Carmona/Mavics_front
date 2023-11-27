import { CardDashboardRoutes } from "@/components/CardDashboardRoutes";
import { useColorModeGeneral } from "@/hooks/useColorModeGeneral";
import { useDashboard } from "@/hooks/useDashboard";
import { Box, Flex, Grid } from "@chakra-ui/react";
import { useRouter } from "next/router";

export const DashboardContainer = () => {
  const router = useRouter();
  const { colorMode } = useColorModeGeneral();
  const { mainIndex } = useDashboard();
  return (
    <Flex
      borderLeft={"0.2px solid teal"}
      borderTop={"0.2px solid teal"}
      ml={"3%"}
      mt={"3%"}
      bg={colorMode === "light" ? "window.light" : "window.dark"}
      h={"100vh"}
      borderTopLeftRadius={9}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Grid h={"full"} w={"full"} templateRows={"repeat(3, 1fr)"}>
        <Flex
          gap={10}
          p={"40px"}
          justifyContent={"space-around"}
          alignItems={"center"}
        >
          {mainIndex.map((index, i) => (
            <CardDashboardRoutes
              key={i}
              props={{
                name: index.name,
                count: index.count,
                icon: index.icon,
                click: () => {
                  router.push(index.key);
                },
              }}
            />
          ))}
        </Flex>
        <Box></Box>
        <Box></Box>
      </Grid>
    </Flex>
  );
};
