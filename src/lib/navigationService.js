import { NavigationActions, StackActions } from 'react-navigation';
// import { DrawerActions } from 'react-navigation-drawer';

let navigator;

function setTopLevelNavigator(navigatorRef) {
  navigator = navigatorRef;
}

function navigate(routeName, params) {
  navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    }),
  );
}

function push(routeName, params) {
  navigator.dispatch(
    StackActions.push({
      routeName,
      params,
    }),
  );
}

function pop(key) {
  if (key) {
    navigator.dispatch(
      NavigationActions.back({
        key,
      }),
    );
  } else {
    navigator.dispatch(NavigationActions.back());
  }
}

function reset(routeName, params) {
  navigator.dispatch(
    StackActions.reset({
      index: 0,
      actions: [
        StackActions.push({
          routeName,
          params,
        }),
      ],
    }),
  );
}

// function toggleDrawer() {
//   navigator.dispatch(DrawerActions.openDrawer());
// }

// function closeDrawer() {
//   navigator.dispatch(DrawerActions.closeDrawer());
// }

// add other navigation functions that you need and export them

export default {
  pop,
  reset,
  navigate,
  setTopLevelNavigator,
  // toggleDrawer,
  // closeDrawer,
  push,
};
