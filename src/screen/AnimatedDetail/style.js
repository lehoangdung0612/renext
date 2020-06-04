import { StyleSheet } from 'react-native';
import { AppSize, AppColor } from '@theme/index';

export default StyleSheet.create({
  image: {
    width: AppSize.screen.width,
    height: AppSize.screen.width / 1.8,
  },
  title: {
    fontSize: 25,
    color: AppColor.primary.regular,
  },
  description: {
    fontSize: 17,
    color: AppColor.dark,
  },
});
