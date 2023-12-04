import { useColorModeGeneral } from "@/hooks/useColorModeGeneral";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";

export const TableGeneral = ({ index = [], data = [], values = [] }) => {
  const { colorMode } = useColorModeGeneral();
  const rows = (element) => {
    return values.map((val) => <Td>{element[val]}</Td>);
  };
  return (
    <TableContainer>
      <Table
        colorScheme={colorMode === "dark" ? "box.dark" : "box.light"}
        variant="unstyled"
        size="sm"
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
