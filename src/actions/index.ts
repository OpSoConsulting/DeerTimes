import { Dispatch } from 'redux';
import moment, { Moment } from 'moment';
import { Action } from '../reducers';
import { UPDATE_LOCATION, UPDATE_AUTOCOMPLETE, UPDATE_UI, UPDATE_DAY_RECORDS, UPDATE_DATE } from '../constants';
import { getPlaces, getDetails } from '../services/google-places';
import { getSunMoon, GetSunMoonParams } from '../services/navy-lunar';
import { Location } from '../types';
import { uiState } from '../store';
import { startDateSelector, endDateSelector } from '../selectors';

export function updateLocationDescription(input: string): Function {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    dispatch({ type: UPDATE_LOCATION, data: { description: input } });
    try {
      const autocomplete = await getPlaces(input);
      dispatch({ type: UPDATE_AUTOCOMPLETE, data: autocomplete });
    } catch (e) {
      // tslint:disable-next-line
      console.log('e is', e);
    }
  };
}

export function setLocation(location: Location): Function {
  return async(dispatch: Dispatch<Action>): Promise<{ lat: number, lng: number } | undefined> => {
    dispatch({ type: UPDATE_LOCATION, data: location });
    try {
      const details = await getDetails(location.place_id);
      const coordsAndOffset = {
        lat: details.geometry.location.lat,
        lng: details.geometry.location.lng,
        utc_offset: details.utc_offset,
      };
      dispatch({
        type: UPDATE_LOCATION,
        data: coordsAndOffset,
      });
      return coordsAndOffset;
    } catch (e) {
      // tslint:disable-next-line
      console.log('e is ', e);
    }
  };
}

export function setLocationRefreshDays(location: Location) {
  return async(dispatch: Dispatch<Action>, getState: Function): Promise<void> => {
    const { startDateString, endDateString } = getState();
    const state = getState();
    const startDate = startDateSelector(state);
    const endDate = endDateSelector(state);

    dispatch({ type: UPDATE_UI, data: { loading: true } });
    try {
      const coordsAndOffset = await setLocation(location)(dispatch);
      await loadSunMoonData({
        start: startDate,
        end: endDate,
        lat: coordsAndOffset.lat,
        lng: coordsAndOffset.lng,
        utc_offset: coordsAndOffset.utc_offset,
      })(dispatch);
      dispatch({ type: UPDATE_UI, data: { loading: false } });
    } catch (e) {
      // tslint:disable-next-line
      console.log('setLocationLoadSunMoon error caught', e);
      dispatch({ type: UPDATE_UI, data: { loading: false } });
    }
  };
}

export function loadSunMoonData({ start, end, lat, lng, utc_offset }: GetSunMoonParams) {
  return async(dispatch: Dispatch<Action>): Promise<void> => {
    try {
      const dayRecords = await getSunMoon({ start, end, lat, lng, utc_offset });
      dispatch({
        type: UPDATE_DAY_RECORDS,
        data: dayRecords.sort((a, b) => moment(a.sundata.rise).valueOf() - moment(b.sundata.rise).valueOf()),
      });
    } catch (e) {
      // tslint:disable-next-line
      console.log('loadSunMoon error caught', e);
    }
  };
}

export function updateDate(shape: { startDate: Moment, endDate: Moment }) {
  return {
    type: UPDATE_DATE,
    data: {
      startDate: shape.startDate.toISOString(),
      endDate: shape.endDate.toISOString(),
    },
  };
}

export function updateDateRefreshDays({ startDate, endDate }: { startDate: Moment, endDate: Moment }) {
  return async(dispatch: Dispatch<Action>, getState: Function): Promise<void> => {
    const { location: { lat, lng, utc_offset } } = getState();
    dispatch({ type: UPDATE_DATE, data: { startDate, endDate } });
    if (!lat || !lng || (startDate.valueOf() > endDate.valueOf())) return;
    dispatch({ type: UPDATE_UI, data: { loading: true } });
    try {
      await loadSunMoonData({
        lat,
        lng,
        utc_offset,
        start: startDate,
        end: endDate,
      })(dispatch);
      dispatch({ type: UPDATE_UI, data: { loading: false } });
    } catch (e) {
      // tslint:disable-next-line
      console.log('setLocationLoadSunMoon error caught', e);
      dispatch({ type: UPDATE_UI, data: { loading: false } });
    }
  };
}


export function updateUi(shape: uiState) {
  return { type: UPDATE_UI, data: shape };
}
