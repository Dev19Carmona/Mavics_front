import { useColorModeGeneral } from '@/hooks/useColorModeGeneral'
import { Flex, Grid, GridItem, Image, Input, Text } from '@chakra-ui/react'
import { BoxPresentation } from '../BoxPresentation'
import { TableGeneral } from '../TableGeneral'
import { useState, useEffect } from 'react'
import { InputGeneral } from '../InputGeneral'
import { LoaderGeneral } from '../LoaderGeneral'

export const ProductPresentation = ({ props }) => {
  const { productPresentation, productSave, loadNewProduct } = props
  const { sizes } = productPresentation
  const { colorMode } = useColorModeGeneral()
  const indexSizes = ['Talla', 'Cantidad']
  const valuesSizeTable = ['name', 'amount']
  const [isEditing, setIsEditing] = useState('')
  const [data, setData] = useState(productPresentation)
  const { _id } = productPresentation
  const initialUpdate = { _id }
  const [updating, setUpdating] = useState(initialUpdate)

  const handleDoubleClick = (value) => {
    setIsEditing(value)
  }
  const handleChange = (e, field) => {
    setData((prevState) => {
      const copy = { ...prevState }
      copy[field] = e.target.value
      return copy
    })
    setUpdating((prevState) => {
      const copy = { ...prevState }
      copy[field] = e.target.value
      return copy
    })
  }
  const handleBlur = () => {
    setIsEditing('')
    productSave({
      variables: {
        data: updating,
      },
    })
    setUpdating(initialUpdate)

    // Aquí puedes realizar la lógica para guardar el nuevo valor, por ejemplo, llamando a una función de actualización en tu componente principal.
  }

  return (
    <Grid
      gap={3}
      templateColumns="repeat(2, 1fr)"
      templateRows="repeat(3, 1fr)"
      letterSpacing={2}
      p={20}
    >
      <GridItem rowSpan={3}>
        <BoxPresentation
          body={
            <Image
              rounded={'full'}
              src={data?.urlImage}
              alt="img"
              width={150}
              height={150}
              style={{ objectFit: 'contain' }}
            />
          }
        />
      </GridItem>

      <GridItem
        onDoubleClick={() => {
          handleDoubleClick('name')
        }}
      >
        {isEditing === 'name' ? (
          <InputGeneral
            right={null}
            left={
              <Input
                onChange={(e) => {
                  handleChange(e, 'name')
                }}
                onBlur={handleBlur}
                pr="4.5rem"
                value={data?.name}
                type="text"
                autoFocus
              />
            }
          />
        ) : (
          <BoxPresentation
            body={<Text fontWeight={'bold'}>{data?.name}</Text>}
          />
        )}
      </GridItem>

      <GridItem
        onDoubleClick={() => {
          handleDoubleClick('description')
        }}
      >
        {isEditing === 'description' ? (
          <Input
            onChange={(e) => {
              handleChange(e, 'description')
            }}
            onBlur={handleBlur}
            pr="4.5rem"
            value={data?.description}
            type="text"
            autoFocus
          />
        ) : (
          <BoxPresentation body={<Text>{data?.description}</Text>} />
        )}
      </GridItem>

      <GridItem
        onDoubleClick={() => {
          handleDoubleClick('price')
        }}
      >
        {isEditing === 'price' ? (
          <InputGeneral
            right={null}
            left={
              <Input
                onChange={(e) => {
                  handleChange(e, 'price')
                }}
                onBlur={handleBlur}
                pr="4.5rem"
                value={data?.price}
                type="number"
                autoFocus
              />
            }
          />
        ) : (
          <BoxPresentation
            body={<Text>$ {Math.floor(data?.price).toLocaleString()}</Text>}
          />
        )}
        {/* <BoxPresentation
          body={<Text>$ {Math.floor(data?.price).toLocaleString()}</Text>}
        /> */}
      </GridItem>

      <GridItem colSpan={2}>
        <BoxPresentation
          justify={null}
          body={
            <TableGeneral
              index={indexSizes}
              data={sizes}
              values={valuesSizeTable}
            />
          }
        />
      </GridItem>
      {loadNewProduct && <LoaderGeneral />}
    </Grid>
  )
}
