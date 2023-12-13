import { Flex, Text, Tooltip } from '@chakra-ui/react'
import { useColorModeGeneral } from '@/hooks/useColorModeGeneral'
import { cutString } from '../../../config/_functions'

export const TagCard = ({ props = { title: 'Title' } }) => {
  const { title } = props
  
  const { colorMode } = useColorModeGeneral()
  return (
    <Flex
      w={'full'}
      justifyContent={'center'}
      userSelect={'none'}
      borderRadius={'5px'}
      bg={colorMode === 'light' ? 'box.light' : 'box.dark'}
      color={colorMode !== 'dark' ? 'black' : 'white'}
      pt={'10px'}
      pb={'10px'}
      letterSpacing={1}
    >
      {
        title.length < 11 ?
        <Text> {title}</Text>
        :
        <Tooltip label={title}>
          <Text> {cutString(title)}</Text>
        </Tooltip>
      }
    </Flex>
  )
}
