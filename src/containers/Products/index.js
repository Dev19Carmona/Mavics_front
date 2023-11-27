import { ButtonActionsGeneral } from "@/components/ButtonActionsGeneral";
import { LoaderGeneral } from "@/components/LoaderGeneral";
import { ModalGeneral } from "@/components/ModalGeneral";
import { ProductCard } from "@/components/ProductCard";
import { ProductForm } from "@/components/ProductForm";
import { ProductPresentation } from "@/components/ProductPresentation";
import { ProductSearch } from "@/components/ProductSearch";
import { ProductsFilterTagsSearch } from "@/components/ProductsFilterTagsSearch";
import { ProductsGrid } from "@/components/ProductsGrid";
import { TagCard } from "@/components/TagCard";
import { useColorModeGeneral } from "@/hooks/useColorModeGeneral";
import { useProductContainer } from "@/hooks/useProductContainer";
import { Flex, Grid, SimpleGrid } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export const ProductsContainer = () => {
  const { colorMode } = useColorModeGeneral();
  const {
    tags,
    handleSearchProduct,
    productsState,
    productsLoad,
    handleSubmitSearchProduct,
    handleSubmitSearchProductPerTag,
    isOpen,
    overlay,
    handleOpenModalProductSave,
    handleSubmitProductCreate,
    initialValuesProduct,
    handleSaveImageProduct,
    imageProduct,
    handleCloseModal,
    handleSearchTag,
    tagFilter,
    handleSelectTag,
    tagsSelected,
    suppliersState,
    handleOpenModalProductPresentation,
    settingsModalProductPresentation,
    handleCloseModalProductPresentation,
    productPresentation,
    rightClickOptions,
    settingsModalProductDelete,
    handleCloseModalProductDelete,
    dataOptionsDeleteProduct,
    getProducts,
    getSuppliers,
    loadNewProduct,
    loadDeleteProduct,
    handleSubmitSearchProductPerSupplier,
    handleDeleteFilters,
    handleFilterProducts
  } = useProductContainer();
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    getProducts();
    if (loadDeleteProduct || loadNewProduct) setIsLoading(true)
    else setIsLoading(false)
    
  }, [loadDeleteProduct, loadNewProduct]);
  return (
    <>
      <Flex
        onContextMenu={(e) => e.preventDefault()}
        userSelect="none"
        direction={"column"}
        p={5}
        borderLeft={"0.2px solid teal"}
        borderTop={"0.2px solid teal"}
        ml={"3%"}
        mt={"3%"}
        bg={colorMode === "light" ? "window.light" : "window.dark"}
        h={
          productsState?.length < 12 || productsState === undefined
            ? "94vh"
            : "full"
        }
        borderTopLeftRadius={9}
        justifyContent={"center"}
      >
        <Flex gap={5} h={"100%"} w={"full"} direction={"column"}>
          <ProductSearch
            getSuppliers={getSuppliers}
            suppliers={suppliersState}
            handleSearchProduct={handleSearchProduct}
            handleSubmitSearchProduct={handleSubmitSearchProduct}
            handleSubmitSearchProductPerTag={handleSubmitSearchProductPerTag}
            handleSubmitSearchProductPerSupplier={handleSubmitSearchProductPerSupplier}
            tags={tags?.tags}
            handleDeleteFilters={handleDeleteFilters}
            handleFilterProducts={handleFilterProducts}
          />
          <ProductsGrid
            handleOpenModalProductSave={handleOpenModalProductSave}
            rightClickOptions={rightClickOptions}
            handleOpenModalProductPresentation={
              handleOpenModalProductPresentation
            }
            products={productsState}
          />
        </Flex>
      </Flex>
      {isLoading && <LoaderGeneral isLoading={isLoading} />}
      {/* //{ isOpen, onClose, overlay, title = 'ModalTitle', body = <Box>Body</Box> } */}
      <ModalGeneral
        body={
          <ProductForm
            props={{
              handleSaveImageProduct,
              handleSubmitProductCreate,
              initialValuesProduct,
              imageProduct,
              handleSearchTag,
              tags,
              tagFilter,
              handleSelectTag,
              tagsSelected,
              suppliersState,
              
            }}
          />
        }
        isOpen={isOpen}
        onClose={handleCloseModal}
        overlay={overlay}
        title="Crear Producto"
        size="full"
      />
      <ModalGeneral
        body={<ProductPresentation props={{ productPresentation }} />}
        isOpen={settingsModalProductPresentation.isOpen}
        onClose={handleCloseModalProductPresentation}
        overlay={settingsModalProductPresentation.overlay}
        title=""
        size="full"
      />
      <ModalGeneral
        body={<ButtonActionsGeneral props={dataOptionsDeleteProduct} />}
        isOpen={settingsModalProductDelete.isOpen}
        onClose={handleCloseModalProductDelete}
        overlay={settingsModalProductDelete.overlay}
        title="¿Esta seguro que desea ELIMINAR el producto?"
        size="sm"
        color={"red.300"}
      />
    </>
  );
};
