import moment from 'moment';
import { State } from '../store';
import { createSelector } from 'reselect';

/// Get the start date from the store
const getStartDate = (state: State) => state.startDate;

/// Get the end date from the store
const getEndDate = (state: State) => state.endDate;

/// Convert a date string to moment
const toMoment = (date: string) => moment(date); 


/// Get the start date from the store as a Moment object
export const startDateSelector = createSelector(getStartDate, toMoment);

/// Get the end date from the store as a Moment object
export const endDateSelector = createSelector(getEndDate, toMoment);
