import { Text, Grid, SimpleGrid } from "@chakra-ui/react";
import { ProductCard } from "../ProductCard";
import { AiOutlineFolderAdd } from "react-icons/ai";
import { MenuGeneral } from "../MenuGeneral";
import {  useState } from "react";

export const ProductsGrid = ({
  products = [],
  handleOpenModalProductSave = () => {},
  handleOpenModalProductPresentation = () => {},
  rightClickOptions,
}) => {
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const [isMenuOpen, setIsMenuOpen] = useState({});
  const handleRightClick = (e, productId) => {
    setMenuPosition({ top: e.pageY, left: e.pageX });
    setIsMenuOpen({[productId]:true});
  };
  
  
  return (
    <>
    <SimpleGrid gap={2} columns={6}>
      <Grid onClick={handleOpenModalProductSave} cursor="pointer">
        <ProductCard data={{ isIcon: true, icon: <AiOutlineFolderAdd /> }} />
      </Grid>
      {products.map((product, i) => (
        <Grid onContextMenu={(e)=>handleRightClick(e, product._id)} key={i}>
          <ProductCard
            data={{
              src: product.urlImage,
              name: product.name,
              price: `$${Math.floor(product.price).toLocaleString()}`,
              product,
              body: <Text letterSpacing={3}>{product.description}</Text>,
            }}
            onClickProductPresentation={handleOpenModalProductPresentation}
          />
          <MenuGeneral options={rightClickOptions} props={{isMenuOpen, setIsMenuOpen, menuPosition, product}}/>
        </Grid>
      ))}
    </SimpleGrid>
    </>
  );
};
