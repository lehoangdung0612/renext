import { initialState } from '@redux/root/reducer';
import { createSelector } from 'reselect';

export const makeSelectRootDomain = state => state.root || initialState;

export const selectCount = () =>
  createSelector(makeSelectRootDomain, state => state.count);
