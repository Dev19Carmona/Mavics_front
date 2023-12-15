import { ProductSave, products } from '@/graphql/Product'
import { useMutation } from '@apollo/client'
import { useState } from 'react'

export const useProductCreate = (sizes, settingsModalProductSave) => {
  //OBJECTS
  const labelStyles = {
    cursor: 'pointer',
    padding: 10,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  }
  //STATES
  const [imageProduct, setImageProduct] = useState()
  const [productData, setProductData] = useState({
    _id: '',
    name: '',
    price: '',
    supplierId: '',
    categoryId: '',
    sizeId: '',
    gender: '',
  })
  const [sizesSelected, setSizesSelected] = useState([])

  //MUTATIONS
  const [productSave] = useMutation(ProductSave, {
    refetchQueries: [
      {
        query: products,
      },
    ],
  })
  //INITIAL_VALUES
  const initialValuesProduct = productData

  //HANDLES
  const handleKeyPress = (e) => {
    const key = e.key
    if (!/[0-9]/.test(key)) {
      e.preventDefault()
    }
  }
  const handleSaveImageProduct = (event) => {
    if (event?.target?.validity && event?.target?.files) {
      setImageProduct(event?.target?.files[0])
    }
  }
  const handleSubmitProductCreate = async (values, { resetForm }) => {
    try {
      console.log(values);
      const sizes = JSON.parse(
        JSON.stringify(sizesSelected, ['_id', 'amount', 'name'])
      )
      const newProduct = await productSave({
        variables: {
          data: {
            name: values.name,
            description: values.description,
            image: imageProduct,
            price: JSON.parse(values.price),
            supplierId: values.supplierId,
            categoryId: values.categoryId,
            sizes,
            gender: values.gender,
          },
        },
      })
      if (newProduct) {
        setImageProduct()
        setSizesSelected([])
        resetForm()
        settingsModalProductSave.onClose()
      }
    } catch (error) {
      console.log(error)
    }
  }

  //FUNCTIONS
  const addSizes = (id, operation = true) => {
    //operation: true = suma / false = resta
    const size = sizes.find((element) => element._id === id)
    const existingSize = sizesSelected.find(
      (sizeSelected) => sizeSelected._id === id
    )
    if (existingSize) {
      const newSizeList = sizesSelected.map((sizeSelected) =>
        sizeSelected._id === id
          ? {
              ...sizeSelected,
              amount: sizeSelected.amount + 1,
            }
          : sizeSelected
      )
      setSizesSelected(newSizeList)
    } else {
      setSizesSelected([
        ...sizesSelected,
        { _id: id, name: size.name, amount: 1 },
      ])
    }
  }
  const subtractSizes = (id) => {
    const existingSize = sizesSelected.find(
      (sizeSelected) => sizeSelected._id === id
    )

    if (existingSize) {
      const newSizeList = sizesSelected.map((sizeSelected) =>
        sizeSelected._id === id
          ? {
              ...sizeSelected,
              amount: sizeSelected.amount - 1,
            }
          : sizeSelected
      )

      // Filtrar los tamaños que no tienen cantidad positiva
      const filteredSizeList = newSizeList.filter(
        (sizeSelected) => sizeSelected.amount > 0
      )

      setSizesSelected(filteredSizeList)
    }
  }
  return {
    handleSubmitProductCreate,
    initialValuesProduct,
    handleSaveImageProduct,
    imageProduct,
    sizesSelected,
    setSizesSelected,
    addSizes,
    subtractSizes,
    handleKeyPress,
    labelStyles,
  }
}
