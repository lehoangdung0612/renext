import { initialState } from '@redux/home/reducer';
import { createSelector } from 'reselect';

export const makeSelectHomeDomain = state => state.home || initialState;

export const selectCount = () =>
  createSelector(makeSelectHomeDomain, state => state.count);
