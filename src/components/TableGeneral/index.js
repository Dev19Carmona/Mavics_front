import { useColorModeGeneral } from '@/hooks/useColorModeGeneral'
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Box,
  Grid,
} from '@chakra-ui/react'
import { TagCard } from '../TagCard'
import { useMenuGeneral } from '@/hooks/useMenuGeneral'
import { AiFillDelete } from 'react-icons/ai'
import { MenuGeneral } from '../MenuGeneral'
import { useEffect, useRef, useState } from 'react'
import { getBounding } from '../../../config/_functions'

export const TableGeneral = ({
  index = [],
  data = [],
  values = [],
  variant = 'unstyled',
  size = 'lg',
}) => {
  const { colorMode } = useColorModeGeneral()
  const [screenSize, setScreenSize] = useState(null)
  const { handleRightClick, isMenuOpen, setIsMenuOpen, menuPosition } =
    useMenuGeneral()
  const rightClickOptions = [
    {
      id: '2',
      key: 'delete',
      name: 'Eliminar',
      icon: <AiFillDelete fontSize={20} />,
      bg: 'red.300',
      color: 'black',
      click: () => {},
    },
  ]
  const ref = useRef(null);

  // Usa useEffect para ejecutar el código después de que el componente se haya renderizado
  useEffect(() => {
    const bounding = getBounding(ref)
    if(!screenSize)setScreenSize(bounding)
  }, []); 
  const rows = (element) => {
    return values.map((val, i) => {
      if (Array.isArray(element[val])) {
        return (
          <Box key={i}>
            <TableGeneral
              index={[]}
              data={element[val]}
              values={['name']}
              variant="unstyled"
            />
          </Box>
        )
      } else {
        return (
          <Td
            key={i}
            borderBottom={
              colorMode === 'light' ? '1px solid #D3D3D3' : '1px solid #1A202C'
            }
          >
            <TagCard props={{ title: element[val] }} />
          </Td>
        )
      }
    })
  }
  return (
    <Grid ref={ref}>
      <TableContainer>
        <Table
          colorScheme={colorMode === 'dark' ? 'box.dark' : 'box.light'}
          variant={variant}
          size={size}
        >
          <Thead>
            <Tr>
              {index.map((i, key) => (
                <Th key={key}>{i}</Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {data.map((element, i) => (
              <Tr
                onContextMenu={(e) => handleRightClick(e, element._id)}
                key={i}
                onClick={() => {
                  console.log('PRUEBA ONCLICK')
                }}
              >
                {rows(element)}
                <MenuGeneral
                  options={rightClickOptions}
                  props={{
                    isMenuOpen,
                    setIsMenuOpen,
                    menuPosition,
                    element: element,
                    screenSize
                  }}
                />
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Grid>
  )
}
