import { ButtonActionsGeneral } from "@/components/ButtonActionsGeneral";
import { LoaderGeneral } from "@/components/LoaderGeneral";
import { ModalGeneral } from "@/components/ModalGeneral";
import { ProductCard } from "@/components/ProductCard";
import { ProductForm } from "@/components/ProductForm";
import { ProductPresentation } from "@/components/ProductPresentation";
import { ProductSearch } from "@/components/ProductSearch";
import { ProductsFilterTagsSearch } from "@/components/ProductsFilterTagsSearch";
import { ProductsGrid } from "@/components/ProductsGrid";
import { TabsGeneral } from "@/components/TabsGeneral";
import { TagCard } from "@/components/TagCard";
import { useColorModeGeneral } from "@/hooks/useColorModeGeneral";
import { useProductContainer } from "@/hooks/useProductContainer";
import { Box, Flex, Grid, SimpleGrid, Tooltip } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaUsers } from "react-icons/fa";
import { TbCategory, TbRulerMeasure } from "react-icons/tb";

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
    handleCloseModalProductPresentation,
    productPresentation,
    rightClickOptions,
    handleCloseModalProductDelete,
    dataOptionsDeleteProduct,
    getProducts,
    getSuppliers,
    loadNewProduct,
    loadDeleteProduct,
    handleSubmitSearchProductPerSupplier,
    handleDeleteFilters,
    handleFilterProducts,
    getCategories,
    getSizes,
    modalSettings,
    handleOpenAndCloseModal,
    tabsDataSupplierCategorySize = {},
    sizesSelected,
    setSizesSelected,
  } = useProductContainer();

  const {
    settingsModalProductSave,
    settingsModalProductDelete,
    settingsModalProductPresentation,
    settingsModalSupplier,
    settingsModalCategory,
    settingsModalSize,
  } = modalSettings;
  const { supplierData } = tabsDataSupplierCategorySize;
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getProducts();
    if (loadDeleteProduct || loadNewProduct) setIsLoading(true);
    else setIsLoading(false);
  }, [loadDeleteProduct, loadNewProduct, setIsLoading, getProducts]);

  const buttonsCreateArray = [
    {
      id: "1",
      name: "Proveedores",
      key: "suppliers",
      icon: <FaUsers fontSize={20} />,
      settingsModal: settingsModalSupplier,
    },
    {
      id: "2",
      name: "Categorias",
      key: "categories",
      icon: <TbCategory fontSize={20} />,
      settingsModal: settingsModalCategory,
    },
    {
      id: "3",
      name: "Tallas",
      key: "sizes",
      icon: <TbRulerMeasure fontSize={20} />,
      settingsModal: settingsModalSize,
    },
  ];
  const modalArray = [
    {
      id: "1",
      name: "productSave",
      body: (
        <ProductForm
          props={{
            handleSaveImageProduct,
            handleSubmitProductCreate,
            initialValuesProduct,
            imageProduct,
            getSuppliers,
            getCategories,
            getSizes,
            sizesSelected,
            setSizesSelected,
          }}
        />
      ),
      isOpen: settingsModalProductSave.isOpen,
      onClose: () => {
        handleOpenAndCloseModal(settingsModalProductSave);
      },
      overlay: settingsModalProductSave.overlay,
      title: "Crear Producto",
      size: "xl",
      color: colorMode === "light" ? "header.light" : "header.dark",
    },
    {
      id: "2",
      name: "productPresentation",
      body: <ProductPresentation props={{ productPresentation }} />,
      isOpen: settingsModalProductPresentation.isOpen,
      onClose: () => {
        handleOpenAndCloseModal(settingsModalProductPresentation);
      },
      overlay: settingsModalProductPresentation.overlay,
      title: "",
      size: "full",
    },
    {
      id: "3",
      name: "productDelete",
      body: <ButtonActionsGeneral props={dataOptionsDeleteProduct} />,
      isOpen: settingsModalProductDelete.isOpen,
      onClose: () => {
        handleOpenAndCloseModal(settingsModalProductDelete);
      },
      overlay: settingsModalProductDelete.overlay,
      title: "¿Esta seguro que desea ELIMINAR el producto?",
      size: "sm",
      color: "red.300",
    },
    {
      id: "4",
      name: "suppliers",
      body: <TabsGeneral array={supplierData} />,
      isOpen: settingsModalSupplier.isOpen,
      onClose: () => {
        handleOpenAndCloseModal(settingsModalSupplier);
      },
      overlay: settingsModalSupplier.overlay,
      title: "Proveedores",
      size: "xl",
      color: colorMode === "light" ? "header.light" : "header.dark",
    },
    {
      id: "5",
      name: "categories",
      body: "sin body",
      isOpen: settingsModalCategory.isOpen,
      onClose: () => {
        handleOpenAndCloseModal(settingsModalCategory);
      },
      overlay: settingsModalCategory.overlay,
      title: "Categorias",
      size: "xl",
      color: colorMode === "light" ? "header.light" : "header.dark",
    },
    {
      id: "6",
      name: "sizes",
      body: "sin body",
      isOpen: settingsModalSize.isOpen,
      onClose: () => {
        handleOpenAndCloseModal(settingsModalSize);
      },
      overlay: settingsModalSize.overlay,
      title: "Tallas",
      size: "xl",
      color: colorMode === "light" ? "header.light" : "header.dark",
    },
  ];
  const modalDynamic = (
    body,
    isOpen,
    onClose,
    overlay,
    title,
    size,
    color,
    i
  ) => (
    <Box key={i}>
      <ModalGeneral
        body={body}
        isOpen={isOpen}
        onClose={onClose}
        overlay={overlay}
        title={title}
        size={size}
        color={color}
      />
    </Box>
  );

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
            handleSubmitSearchProductPerSupplier={
              handleSubmitSearchProductPerSupplier
            }
            tags={tags?.tags}
            handleDeleteFilters={handleDeleteFilters}
            handleFilterProducts={handleFilterProducts}
            getCategories={getCategories}
            getSizes={getSizes}
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
        <Flex
          gap={5}
          dir="column"
          position={"fixed"}
          left={"50%"}
          transform={"translateX(-50%)"}
          bottom={"30px"}
          p={2}
          boxShadow={"xl"}
          borderRadius={9}
        >
          {buttonsCreateArray.map((button, i) => (
            <Tooltip key={button.id} hasArrow label={button.name} bg={"extra"}>
              <Box
                bg={colorMode === "light" ? "box.light" : "box.dark"}
                key={button.id}
                cursor={"pointer"}
                borderRadius={9}
                padding={2}
                onClick={() => {
                  handleOpenAndCloseModal(button.settingsModal);
                }}
              >
                {button.icon}
              </Box>
            </Tooltip>
          ))}
        </Flex>
      </Flex>
      {isLoading && <LoaderGeneral isLoading={isLoading} />}

      {modalArray.map((modal, i) =>
        modalDynamic(
          modal.body,
          modal.isOpen,
          modal.onClose,
          modal.overlay,
          modal.title,
          modal.size,
          modal.color,
          i
        )
      )}
    </>
  );
};
