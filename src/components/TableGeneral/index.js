import { useColorModeGeneral } from "@/hooks/useColorModeGeneral";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Box,
} from "@chakra-ui/react";
import { TagCard } from "../TagCard";

export const TableGeneral = ({ index = [], data = [], values = [], variant='unstyled' }) => {
  console.log(data);
  const { colorMode } = useColorModeGeneral();
  const rows = (element) => {
    return values.map((val) => {
      if (Array.isArray(element[val])) {
        return <Box>
          <TableGeneral
        index={[]}
        data={element[val]}
        values={['name']}
        variant="unstyled"
      />
        </Box>
      }else{
        return <Td borderBottom={colorMode === "light" ?'1px solid #D3D3D3':'1px solid #1A202C'}><TagCard props={{title:element[val]}}/></Td>
      }
    });
  };
  return (
    <TableContainer>
      <Table
        colorScheme={colorMode === "dark" ? "box.dark" : "box.light"}
        variant={variant}
        size="lg"
      >
        <Thead>
          <Tr>
            {index.map((i) => (
              <Th>{i}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {data.map((element) => (
            <Tr>{rows(element)}</Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
