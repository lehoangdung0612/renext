import { StyleSheet, Platform } from 'react-native';
import { AppColor } from '@theme/index';

export default StyleSheet.create({
  container: {
    height: 40,
    width: '100%',
  },
  defaultHeaderNav: {
    paddingTop: Platform.select({
      android: 10,
      ios: 0,
    }),
    paddingHorizontal: 15,
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
  },
  useSearchContainerHeight: {
    height: 110,
  },
  headerColorFill: {
    backgroundColor: AppColor.primary.regular,
  },
  titleColorFill: {
    color: AppColor.white,
  },
  headerColorWhite: {
    backgroundColor: AppColor.white,
  },
  titleColorWhite: {
    color: AppColor.dark,
  },
  title: {
    fontSize: 19,
  },
  serachBarContainer: {
    paddingHorizontal: 15,
    paddingTop: 15,
    paddingBottom: 15,
  },
});
