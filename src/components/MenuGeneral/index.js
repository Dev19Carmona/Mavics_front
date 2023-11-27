import { Grid, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";

export const MenuGeneral = ({ props, options }) => {
  const { isMenuOpen, setIsMenuOpen, menuPosition, product } = props;
  return (
    <Grid position={"absolute"} top={menuPosition.top} left={menuPosition.left}>
      {isMenuOpen[product._id] && (
        <Menu
          isOpen={isMenuOpen[product._id]}
          onClose={() => setIsMenuOpen({ [product._id]: false })}
          //style={{ top: menuPosition.top, left: menuPosition.left }}
        >
          <MenuButton />
          <MenuList p={2}>
            {options.map((option) => (
              <MenuItem
                onClick={()=>{option.click(product)}}
                color={option.color}
                bg={option.bg}
                icon={option.icon}
                key={option.id}
              >
                {option.name}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
      )}
    </Grid>
  );
};
