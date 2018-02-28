import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { Moment } from 'moment';
import reducer from '../reducers';
import { Location, DayRecord } from '../types';

const loggerMiddleware = createLogger();

export interface uiState {
  hideAutocomplete: boolean;
  loading: boolean;
}

export interface State {
  location: Location;
  autocomplete: Location[];
  startDate: string;
  endDate: string;
  days: DayRecord[];
  ui: uiState;
}

export default function configureStore(initialState?: State) {
  return createStore(
    reducer,
    initialState,
    applyMiddleware(
      thunkMiddleware,
      loggerMiddleware,
    ),
  );
}
