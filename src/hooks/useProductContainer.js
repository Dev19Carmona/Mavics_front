import { ProductSave, Product_delete, products } from "@/graphql/Product";
import { Tags } from "@/graphql/Tag";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { useState, useEffect } from "react";
import { useModalGeneral } from "./Generals/useModalGeneral";
import { suppliers } from "@/graphql/Supplier";
import { Categories } from "@/graphql/Category";
import { AiFillDelete } from "react-icons/ai";
import { LuInspect } from "react-icons/lu";
import { TIME_LOADING } from "../../config/_constants";
import { Sizes } from "@/graphql/Size";
import { SupplierForm } from "@/components/SupplierForm";
import { TableGeneral } from "@/components/TableGeneral";
export const useProductContainer = () => {
  const [filterData, setFilterData] = useState({})
  const [productPresentation, setProductPresentation] = useState({});
  const [productId, setProductId] = useState("");
  const [suppliersState, setSuppliersState] = useState([]);
  const [productsState, setProductsState] = useState();
  const [productEdit, setProductEdit] = useState([]);
  const [productFilter, setProductFilter] = useState("");
  const [tagFilter, setTagFilter] = useState("");
  const [alertSearch, setAlertSearch] = useState(false);
  const [filter, setFilter] = useState({});
  const [imageProduct, setImageProduct] = useState();
  const [tagsSelected, setTagsSelected] = useState([]);
  const [productData, setProductData] = useState({
    _id: "",
    name: "",
    price: "",
    amount: "",
    supplierId: "",
    categoryId: "",
    sizeId: "",
    gender: "",
  });
  const {
    isOpen,
    onClose,
    overlay,
    onOpen,
    setOverlay,
    OverlayTwo,
    OverlayOne,
  } = useModalGeneral();
  const settingsModalProductPresentation = useModalGeneral();
  const settingsModalProductDelete = useModalGeneral();
  const settingsModalProductSave = useModalGeneral();

  //-------Settings Modal (sizes/categories/suppliers)
  const settingsModalSize = useModalGeneral();
  const settingsModalCategory = useModalGeneral();
  const settingsModalSupplier = useModalGeneral();
  const modalSettings = {
    settingsModalSize,
    settingsModalCategory,
    settingsModalSupplier,
    settingsModalProductPresentation,
    settingsModalProductDelete,
    settingsModalProductSave
  }

  const [getTags, { data: tags, loading: tagsLoad, error: tagsError }] =
    useLazyQuery(Tags);
  const [
    getProducts,
    { data: Products, loading: productsLoad, error: productsError },
  ] = useLazyQuery(products);
  const [getSuppliers] = useLazyQuery(suppliers);
  const [getCategories] = useLazyQuery(Categories);
  const [getSizes] = useLazyQuery(Sizes);
  const [
    productSave,
    { data: newProduct, loading: loadNewProduct, error: errorNewProduct },
  ] = useMutation(ProductSave, {
    refetchQueries: [
      {
        query: products,
      },
    ],
  });
  const [productDelete, { data: deletedProduct, loading: loadDeleteProduct }] =
    useMutation(Product_delete, {
      refetchQueries: [
        {
          query: products,
        },
      ],
    });
  const initialValuesProduct = productData;

  const handleSearchProduct = (search) => {
    const regex = new RegExp(search, "i");
    if (search !== "") {
      setProductEdit([...productsState]);
    }
    const productSearch = Products?.products.filter((product) =>
      regex.test(product.name)
    );
    setProductsState(productSearch);
  };
  const handleSubmitSearchProduct = () => {
    setFilter({ name: productFilter });
    setAlertSearch(!alertSearch);
  };
  const handleSubmitSearchProductPerTag = (tag, idOrName, field) => {
    const tagId = tag._id;
    const productsWithTag = Products?.products.filter((product) =>
      product.tags.some((tag) => tag._id === tagId)
    );
    setProductsState(productsWithTag);
  };

  useEffect(() => {
    getTags({
      variables: {
        filter: {
          search: tagFilter,
        },
      },
    });
  }, [tagFilter, getTags]);
  useEffect(() => {
    const products = Products?.products.map((product) => {
      const res = { ...product };
      delete res.supplier;
      return res;
    });
    setProductEdit(products);
    setProductsState(products);
  }, [Products]);

  const handleSubmitProductCreate = async (values, { resetForm }) => {
    //settingsModalProductSave.onClose();
    //setImageProduct();
    try {
      await productSave({
        variables: {
          data: {
            name: values.name,
            description: values.description,
            price: values.price,
            supplierId: values.supplierId,
            categoryId: values.categoryId,
            sizeId: values.sizeId,
            gender: values.gender,
            amount: values.amount,
            image: imageProduct,
            supplierId: values.supplierId,
          },
        },
      });
      //resetForm();
    } catch (error) {
      console.log(error);
    }
  };
  const handleOpenModalProductSave = () => {
    setTagFilter("");
    settingsModalProductSave.setOverlay(<OverlayOne />);
    settingsModalProductSave.onOpen();
  };
  const handleOpenModalProductPresentation = (product) => {
    setProductPresentation(product);
    settingsModalProductPresentation.setOverlay(<OverlayOne />);
    settingsModalProductPresentation.onOpen();
  };
  const handleOpenModalProductDelete = (product) => {
    setProductId(product._id);
    settingsModalProductDelete.setOverlay(<OverlayOne />);
    settingsModalProductDelete.onOpen();
  };

  const handleOpenAndCloseModal = (settings) => {
    const {isOpen} = settings;
    if (!isOpen) {
      settings.setOverlay(<OverlayOne />);
      settings.onOpen();
    } else settings.onClose()
    
  }


  const handleSaveImageProduct = (event) => {
    if (event?.target?.validity && event?.target?.files) {
      setImageProduct(event?.target?.files[0]);
    }
  };

  const handleCloseModal = () => {
    settingsModalProductSave.onClose();
    setImageProduct();
    setTagFilter();
  };
  const handleCloseModalProductPresentation = () => {
    settingsModalProductPresentation.onClose();
  };
  const handleCloseModalProductDelete = () => {
    settingsModalProductDelete.onClose();
  };
  const handleSearchTag = (e) => {
    setTagFilter(e);
  };
  const handleSelectTag = (newTag) => {
    const newTagAdd = {
      _id: newTag?._id,
      name: newTag.name,
    };
    const tagFound = tagsSelected.filter((tag) => tag.name === newTagAdd.name);
    const existingTag = tagFound[0];
    if (tagFound.length === 0) setTagsSelected([...tagsSelected, newTagAdd]);
    else console.log(`${existingTag.name} ya existe`);
  };
  const handleDeleteProduct = async () => {
    await productDelete({
      variables: {
        id: productId,
      },
    });
  };
  const rightClickOptions = [
    {
      id: "1",
      key: "inspect",
      name: "Inspeccionar",
      icon: <LuInspect fontSize={20} />,
      bg: "",
      color: "",
      click: handleOpenModalProductPresentation,
    },
    {
      id: "2",
      key: "delete",
      name: "Eliminar",
      icon: <AiFillDelete fontSize={20} />,
      bg: "red.300",
      color: "black",
      click: handleOpenModalProductDelete,
    },
  ];
  const dataOptionsDeleteProduct = {
    leftButton: {
      title: "Eliminar",
      color: "red",
      click: () => {
        handleCloseModalProductDelete();
        handleDeleteProduct();
      },
    },
    rightButton: {
      title: "Cancelar",
      color: "teal",
      click: () => {
        settingsModalProductDelete.onClose();
      },
    },
  };
  const handleSubmitSearchProductPerSupplier = (supplier) => {
    const productSearch = Products?.products.filter(
      (product) => product.supplierId === supplier._id
    );
    setProductsState(productSearch);
  };
  const handleDeleteFilters = () => {
    setProductsState(Products?.products);
  };
  const handleFilterProducts = (data) => {
    const {key, value} = data
    const filterObject = filterData;
    filterObject[key] = value
    setFilterData(filterObject)
  }
  const tabsDataSupplierCategorySize = {
    supplierData:[
      {
        name: "Proveedores",
        body: <TableGeneral/>
      },
      {
        name: "Crear Proveedor",
        body: <SupplierForm/>
      },
    ]
  }
  return {
    tags,
    handleSearchProduct,
    productsLoad,
    handleSubmitSearchProduct,
    handleSubmitSearchProductPerTag,
    isOpen,
    onClose,
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
    productsState,
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
    tabsDataSupplierCategorySize
  };
};
