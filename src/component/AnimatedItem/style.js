import { StyleSheet } from 'react-native';
import { AppSize, AppColor } from '@theme/index';

const thumbnailWidth = (AppSize.screen.width - 30) / 2 - 20;

export default StyleSheet.create({
  container: {
    width: (AppSize.screen.width - 30) / 2,
    height: 250,
  },
  image: {
    width: thumbnailWidth,
    height: thumbnailWidth / 1.8,
  },
  title: {
    fontSize: 17,
    color: AppColor.primary.regular,
  },
  datetime: {
    fontSize: 14,
    color: AppColor.dark,
  },
});
