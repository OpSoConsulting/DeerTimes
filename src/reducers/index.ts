import moment from 'moment';
import { State } from '../store';
import { UPDATE_LOCATION, UPDATE_AUTOCOMPLETE, UPDATE_DAY_RECORDS, UPDATE_DATE, UPDATE_UI } from '../constants';

const today = new Date();

export interface Action {
  type: string;
  data?: any;
}

export const initialState: State = {
  startDate: moment(''.concat(
    `${today.getFullYear()}-`,
    `${today.getMonth() + 1}-`,
    `${today.getDate()}`,
  )).toISOString(),
  endDate: moment().add(7, 'days').toISOString(),
  days: [],
  location: {
    description: '',
    id: '',
    place_id: '',
    lat: 0,
    lng: 0,
    utc_offset: 0,
  },
  autocomplete: [],
  ui: {
    hideAutocomplete: true,
    loading: false,
  },
};

const deerTimesApp = (state = initialState, action: Action) => {
  switch (action.type) {
    case UPDATE_LOCATION:
      return { ...state, location: { ...state.location, ...action.data } };
    case UPDATE_DATE:
      return { ...state, ...action.data };
    case UPDATE_AUTOCOMPLETE:
      return { ...state, autocomplete: action.data };
    case UPDATE_UI:
      return { ...state, ui: { ...state.ui, ...action.data } };
    case UPDATE_DAY_RECORDS:
      return { ...state, days: action.data };
    default:
      return state;
  }
};

export default deerTimesApp;
