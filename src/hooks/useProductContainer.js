import { ProductSave, Product_delete, products } from "@/graphql/Product";
import { Tags } from "@/graphql/Tag";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { useState, useEffect } from "react";
import { useModalGeneral } from "./Generals/useModalGeneral";
import { supplierSave, suppliers } from "@/graphql/Supplier";
import { Categories, CategorySave } from "@/graphql/Category";
import { AiFillDelete } from "react-icons/ai";
import { LuCopyCheck, LuInspect } from "react-icons/lu";
import { SizeSave, Sizes } from "@/graphql/Size";
import { SupplierForm } from "@/components/SupplierForm";
import { TableGeneral } from "@/components/TableGeneral";
import { addField, getLazyQuery, unformatPrice } from "../../config/_functions";
import { CategoryForm } from "@/components/CategoryForm";
import { SizeForm } from "@/components/SizeForm";
export const useProductContainer = () => {
  const [filterData, setFilterData] = useState({});
  const [productPresentation, setProductPresentation] = useState({});
  const [productId, setProductId] = useState("");
  const [suppliersState, setSuppliersState] = useState([]);
  const [categoriesState, setCategoriesState] = useState([]);
  const [sizesState, setSizesState] = useState([]);
  const [productsState, setProductsState] = useState();
  const [productEdit, setProductEdit] = useState([]);
  const [productFilter, setProductFilter] = useState("");
  const [tagFilter, setTagFilter] = useState("");
  const [alertSearch, setAlertSearch] = useState(false);
  const [filter, setFilter] = useState({});
  const [imageProduct, setImageProduct] = useState();
  const [categorySelected, setCategorySelected] = useState([]);
  const [tagsSelected, setTagsSelected] = useState([]);
  const [productData, setProductData] = useState({
    _id: "",
    name: "",
    price: "",
    supplierId: "",
    categoryId: "",
    sizeId: "",
    gender: "",
  });
  const [supplierData, setSupplierData] = useState({
    _id: "",
    name: "",
    phone: "",
    nit: "",
    responsible: "",
  });

  const [categoryData, setCategoryData] = useState({
    _id: "",
    name: "",
  });

  const [sizeData, setSizeData] = useState({
    _id: "",
    name: "",
    categoryId: "",
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
  const [sizesSelected, setSizesSelected] = useState([]);
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
    settingsModalProductSave,
  };

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
  const [
    SupplierSave,
    { data: newSupplier, loading: loadNewSupplier, error: errorNewSupplier },
  ] = useMutation(supplierSave, {
    refetchQueries: [
      {
        query: suppliers,
      },
    ],
  });
  const [
    categorySave,
    { data: newCategory, loading: loadNewCategory, error: errorNewCategory },
  ] = useMutation(CategorySave, {
    refetchQueries: [
      {
        query: Categories,
      },
    ],
  });
  const [
    sizeSave,
    { data: newSize, loading: loadNewSize, error: errorNewSize },
  ] = useMutation(SizeSave, {
    refetchQueries: [
      {
        query: Sizes,
      },
    ],
  });
  const initialValuesProduct = productData;
  const initialValuesSupplier = supplierData;
  const initialValuesCategory = categoryData;
  const initialValuesSize = sizeData;
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
      // delete res.supplier;
      return res;
    });
    setProductEdit(products);
    setProductsState(products);
  }, [Products]);

  const handleSubmitProductCreate = async (values, { resetForm }) => {
    try {
      const sizes = JSON.parse(
        JSON.stringify(sizesSelected, ["_id", "amount", "name"])
      );
      const newProduct = await productSave({
        variables: {
          data: {
            name: values.name,
            description: values.description,
            image: imageProduct,
            price: values.price,
            supplierId: values.supplierId,
            categoryId: values.categoryId,
            sizes,
            gender: values.gender,
          },
        },
      });
      if (newProduct) {
        setImageProduct();
        setSizesSelected([]);
        resetForm();
        settingsModalProductSave.onClose();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmitSupplierCreate = async (values, { resetForm }) => {
    try {
      const newSupplier = await SupplierSave({
        variables: {
          data: {
            name: values.name,
            nit: values.nit,
            phone: values.phone,
          },
        },
      });

      if (newSupplier) {
        setSuppliersState((prevState) => {
          const copy = [...prevState];
          copy.push(newSupplier);
          return copy;
        });
        resetForm();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmitCategoryCreate = async (values, { resetForm }) => {
    try {
      const newCategory = await categorySave({
        variables: {
          data: {
            name: values.name,
          },
        },
      });

      if (newCategory) {
        setCategoriesState((prevState) => {
          const copy = [...prevState];
          copy.push(newCategory);
          return copy;
        });
        resetForm();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmitSizeCreate = async (values, { resetForm }) => {
    try {
      const categoryIds = categorySelected.reduce((acc, element) => {
        acc.push(element._id);
        return acc;
      }, []);

      const newSize = await sizeSave({
        variables: {
          data: {
            name: values.name,
            categoryIds,
          },
        },
      });

      if (newSize) {
        setSizesState((prevState) => {
          const copy = [...prevState];
          copy.push(newSize);
          return copy;
        });
        setCategorySelected([]);
        resetForm();
      }
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

  const handleOpenAndCloseModal = (settings, keyQuery = []) => {
    const { isOpen } = settings;
    //"suppliers", "categories", "sizes"
    const queryList = [
      {
        key: "suppliers",
        get: getSuppliers,
        set: setSuppliersState,
      },
      {
        key: "categories",
        get: getCategories,
        set: setCategoriesState,
      },
      {
        key: "sizes",
        get: getSizes,
        set: setSizesState,
      },
    ];
    queryList.map((object) => {
      const { key, get, set } = object;
      if (keyQuery.includes(key)) return getLazyQuery(get, key, set);
    });
    if (!isOpen) {
      settings.setOverlay(<OverlayOne />);
      settings.onOpen();
    } else settings.onClose();
  };

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
    const { key, value } = data;
    const filterObject = filterData;
    filterObject[key] = value;
    setFilterData(filterObject);
  };

  const indexSupplierTable = ["Nombre", "Nit", "Telefono"];
  const valuesSupplierTable = ["name", "nit", "phone"];

  const indexCategoryTable = [];
  const valuesCategoryTable = ["name"];

  const indexSizeTable = ["Nombre", "Categorias"];
  const valuesSizeTable = ["name", "categories"];

  const tabsDataSupplierCategorySize = {
    supplierData: [
      {
        name: "Lista",
        body: (
          <TableGeneral
            index={indexSupplierTable}
            data={suppliersState}
            values={valuesSupplierTable}
            variant="unstyled"
          />
        ),
      },
      {
        name: "Crear",
        body: (
          <SupplierForm
            props={{ initialValuesSupplier, handleSubmitSupplierCreate }}
          />
        ),
      },
    ],
    categoryData: [
      {
        name: "Lista",
        body: (
          <TableGeneral
            index={indexCategoryTable}
            data={categoriesState}
            values={valuesCategoryTable}
            variant="unstyled"
          />
        ),
      },
      {
        name: "Crear",
        body: (
          <CategoryForm
            props={{ initialValuesCategory, handleSubmitCategoryCreate }}
          />
        ),
      },
    ],
    sizeData: [
      {
        name: "Lista",
        body: (
          <TableGeneral
            index={indexSizeTable}
            data={sizesState}
            values={valuesSizeTable}
            variant="unstyled"
          />
        ),
      },
      {
        name: "Crear",
        body: (
          <SizeForm
            props={{
              initialValuesSize,
              handleSubmitSizeCreate,
              getCategories,
              setCategorySelected,
              categorySelected,
            }}
          />
        ),
      },
    ],
  };
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
    tabsDataSupplierCategorySize,
    sizesSelected,
    setSizesSelected,
    productSave,
  };
};
