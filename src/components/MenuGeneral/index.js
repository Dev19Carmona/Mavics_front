import { Grid, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";

export const MenuGeneral = ({ props, options }) => {
  const { isMenuOpen, setIsMenuOpen, menuPosition, element, screenSize } = props;
  console.log(screenSize, menuPosition);
  return (
    <Grid position={"positive"} top={menuPosition.top} left={menuPosition.left}>
      {isMenuOpen[element._id] && (
        <Menu
          isOpen={isMenuOpen[element._id]}
          onClose={() => setIsMenuOpen({ [element._id]: false })}
          //style={{ top: menuPosition.top, left: menuPosition.left }}
        >
          <MenuButton />
          <MenuList p={2}>
            {options.map((option) => (
              <MenuItem
                onClick={()=>{option.click(element)}}
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
