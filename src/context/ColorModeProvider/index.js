import React, { createContext, useContext, useState } from 'react';

const ColorModeContext = createContext();

export const ColorModeProvider = ({ children }) => {
  
  const [colorMode, setColorMode] = useState('light'); // Puedes establecer el valor inicial que desees

  const toggleColorMode = () => {
    setColorMode(prevMode => prevMode === 'light' ? 'dark' : 'light');
  };

  return (
    <ColorModeContext.Provider value={{ colorMode, toggleColorMode }}>
      {children}
    </ColorModeContext.Provider>
  );
};

export const useColorMode = () => {
  return useContext(ColorModeContext);
};
