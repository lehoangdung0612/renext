import React, { Component, useContext } from 'react';
import context from './context';

class MenuContextConsumer extends Component {
  render() {
    return (
      <context.Consumer>
        {menu => {
          return React.cloneElement(this.props.children, {
            menu: menu,
          });
        }}
      </context.Consumer>
    );
  }
}

function withMenu(Node) {
  class WithMenu extends Component {
    render = () => (
      <MenuContextConsumer>
        <Node {...this.props} />
      </MenuContextConsumer>
    );
  }
  return WithMenu;
}

function useMenu() {
  const menu = useContext(context);
  return menu;
}

export { withMenu, useMenu };
