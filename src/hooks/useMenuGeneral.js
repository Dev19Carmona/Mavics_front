import { useState } from "react";

export const useMenuGeneral = () => {
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const [isMenuOpen, setIsMenuOpen] = useState({});
  const handleRightClick = (e, productId) => {
    console.log(e);
    setMenuPosition({ top: e.pageY, left: e.pageX });
    setIsMenuOpen({[productId]:true});
  };
  return{
    handleRightClick,
    isMenuOpen,
    setIsMenuOpen,
    menuPosition,

  }
}