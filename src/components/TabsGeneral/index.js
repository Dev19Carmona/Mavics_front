import { useColorModeGeneral } from "@/hooks/useColorModeGeneral";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";

export const TabsGeneral = ({ array = [] }) => {
  const { colorMode } = useColorModeGeneral();
  return (
    <Tabs direction="rtl" isFitted variant="enclosed" isLazy={true}>
      <TabList mb="1em">
        {array.map((element, i) => (
          <Tab key={i}>{element.name}</Tab>
        ))}
      </TabList>
      <TabPanels>
        {array.map((element, i) => (
          <TabPanel key={i}>
            <p>{element.body}</p>
          </TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  );
};
