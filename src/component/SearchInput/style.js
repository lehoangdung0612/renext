import { StyleSheet, Platform } from 'react-native';
import { AppColor } from '@theme/index';

export default StyleSheet.create({
  textinput: {
    color: AppColor.dark,
    fontSize: 14,
    paddingVertical: Platform.select({
      android: 7,
      ios: 0,
    }),
    paddingHorizontal: Platform.select({
      android: 15,
      ios: 0,
    }),
  },
  container: {
    borderWidth: 1,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    padding: Platform.select({
      ios: 15,
      android: 0,
    }),
  },
  focusBorder: {
    borderColor: AppColor.dark,
  },
  blurBorder: {
    borderColor: AppColor.inactive,
  },
});
