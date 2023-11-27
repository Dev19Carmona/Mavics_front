import { productCount } from "@/graphql/Product";
import { useQuery } from "@apollo/client";
import { FaShoppingBag } from "react-icons/fa";
import { AiOutlineTags, AiOutlineUser } from "react-icons/ai";
import { CgUserList } from "react-icons/cg";
import { tagCount } from "@/graphql/Tag";

export const useDashboard = () => {
  const fontSizeIcons = 40
  const { data: totalProducts } = useQuery(productCount);
  const { data: totalTags } = useQuery(tagCount);
  const countProducts = totalProducts?.productCount;
  const countTags = totalTags?.tagCount;
  const mainIndex = [
    {
      name: "Productos",
      icon: <FaShoppingBag fontSize={fontSizeIcons}/>,
      count: countProducts,
      key: 'products'
    },
    {
      name: "Tags",
      icon: <AiOutlineTags fontSize={fontSizeIcons}/>,
      count: countTags,
      key:'tag_managment'
    },
    {
      name: "Proveedores",
      icon: <CgUserList fontSize={fontSizeIcons}/>,
      count: 5,
      key:'suppliers'
    },
    {
      name: "Clientes",
      icon: <AiOutlineUser fontSize={fontSizeIcons}/>,
      count: 30,
      key:'clients'
    },
  ];
  return {
    mainIndex,
  };
};
