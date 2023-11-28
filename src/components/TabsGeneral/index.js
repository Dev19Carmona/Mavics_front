import { useColorModeGeneral } from "@/hooks/useColorModeGeneral";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";

export const TabsGeneral = ({ array = [] }) => {
  console.log(array);
  const { colorMode } = useColorModeGeneral();
  return (
    <Tabs isFitted variant="enclosed">
      <TabList mb="1em">
        {array.map((element) => (
          <Tab>{element.name}</Tab>
        ))}
      </TabList>
      <TabPanels>
        {
          array.map(element=>(
        <TabPanel>
          <p>{element.body}</p>
        </TabPanel>

          ))
        }
        
      </TabPanels>
    </Tabs>
  );
};
