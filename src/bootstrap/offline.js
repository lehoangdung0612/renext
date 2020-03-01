import { createOffline } from '@redux-offline/redux-offline';
import offlineConfig from '@redux-offline/redux-offline/lib/defaults';

const { middleware, enhanceReducer, enhanceStore } = createOffline(
  offlineConfig,
);

export default {
  offlineMiddleware: middleware,
  enhanceReducer,
  enhanceStore,
};
