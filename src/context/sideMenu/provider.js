import React from 'react';
import Context, { menu } from './context';

function SideMenuProvider({ children }) {
  return <Context.Provider value={menu}>{children}</Context.Provider>;
}

export default SideMenuProvider;
