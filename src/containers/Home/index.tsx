/* tslint:disable:max-line-length */
import React from 'react';
import { View, ScrollView, TouchableOpacity, Button, Platform } from 'react-native';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import moment, { Moment } from 'moment';
import DatePicker from 'react-native-datepicker';
import { State } from '../../store';
import { startDateSelector, endDateSelector } from '../../selectors';
import { Action } from '../../reducers';
import { updateDate, updateLocationDescription, updateDateRefreshDays, setLocationRefreshDays, updateUi, loadSunMoonData } from '../../actions';
import { Location, DayRecord } from '../../types';
import AutocompleteInput from '../../components/AutocompleteInput';
import Toast from '../../components/Toast';
import DayTile from '../../components/DayTile';
import InfoTile from '../../components/InfoTile';
import { GetSunMoonParams } from '../../services/navy-lunar';
import constants from '../../theme/constants';
import deerImgSrc from '../../assets/images/deer-snow-cropped.jpg';
import soldierImgSrc from '../../assets/images/military-men-cropped.jpeg';
import observatoryImgSrc from '../../assets/images/astronomical-observatory-cropped.jpg';
import styles from './styles';

interface PropsFromState {
  location: {
    description: string;
    lat: number;
    lng: number;
  };
  autocomplete: Location[];
  ui: {
    hideAutocomplete: boolean;
    loading: boolean;
  };
  startDate: Moment;
  endDate: Moment;
  days: DayRecord[];
}

interface PropsFromDispatch {
  loadSunMoonData(data: GetSunMoonParams): void;
  updateLocationDescription(data: string): void;
  setLocationRefreshDays(location: Location): void;
  updateDate(data: { startDate: Moment, endDate: Moment }): { type: string, data: object };
  updateDateRefreshDays(data: { startDate: Moment, endDate: Moment }): void;
  updateUi(data: any): any;
}

const mapStateToProps = (state: State): PropsFromState => {
  return {
    location: state.location,
    autocomplete: state.autocomplete,
    ui: {
      hideAutocomplete: state.ui.hideAutocomplete,
      loading: state.ui.loading,
    },
    startDate: startDateSelector(state),
    endDate: endDateSelector(state),
    days: state.days,
  };
};

function mapDispatchToProps(dispatch: Dispatch<Action>): PropsFromDispatch {
  return bindActionCreators(
    {
      loadSunMoonData,
      updateLocationDescription,
      setLocationRefreshDays,
      updateDate,
      updateDateRefreshDays,
      updateUi,
    },
    dispatch,
  );
}

interface Props extends PropsFromState, PropsFromDispatch {
  navigation: any;
}

interface OwnProps {
  toastTimer: number;
  toastCounter: number;
}

class Home extends React.Component<Props, OwnProps> {

  static navigationOptions = {
    title: 'Home',
    header: () => null,
  };

  constructor(props: any) {
    super(props);
    this.state = {
      toastCounter: 0,
      toastTimer: 10000,
    };
  }

  handleInputChange(value: string) {
    const { updateLocationDescription, ui: { hideAutocomplete }, updateUi } = this.props;
    updateLocationDescription(value);
    if (hideAutocomplete) {
      updateUi({ hideAutocomplete: false });
    }
  }

  handleResultPress(id: string) {
    const { autocomplete, updateUi } = this.props;
    const selected = autocomplete
      .filter((e: Location) => e.id === id);
    this.props.setLocationRefreshDays(selected[0]);
    updateUi({ hideAutocomplete: true });
  }

  handleBlur() {
    const { updateUi } = this.props;
    updateUi({ hideAutocomplete: true });
  }

  handleDateChange(startOrEnd: string, dateString: string) {
    const { startDate, endDate, updateDate, updateDateRefreshDays } = this.props;
    const dateMoment = moment(dateString);
    const dateRange = {
      ...{ startDate, endDate },
      ...{ [startOrEnd]: dateMoment },
    };
    if ((dateRange.endDate.valueOf() - dateRange.startDate.valueOf()) > (31 * 24 * 60 * 60 * 1000)) {
      this.setState({ toastCounter: this.state.toastTimer });
      let deduction = 1;
      const toastInterval = setInterval(
        () => {
          deduction = deduction * 1.05;
          if (this.state.toastCounter <= 0) clearInterval(toastInterval);
          else this.setState({ toastCounter: this.state.toastCounter - deduction });
        },
        10,
      );
      updateDate(dateRange);
      return;
    }
    updateDateRefreshDays(dateRange);
  }

  handleDayPress(dayRecord: DayRecord) {
    const { location } = this.props;
    this.props.navigation.navigate('Details', {
      dayRecord,
      location,
    });
  }

  handleMethodologyPress() {
    const { location } = this.props;
    this.props.navigation.navigate('Methodology');
  }

  public render() {
    const { location, autocomplete, ui: { hideAutocomplete, loading }, days, startDate, endDate } = this.props;
    const { toastTimer, toastCounter } = this.state;
    const customDatePickerStyle = {
      dateInput: {
        backgroundColor: 'white',
        height: constants.inputHeight,
        ...constants.borderStyle,
      },
      dateText: {
        fontSize: constants.inputFontSize,
      },
    };

    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contents}
        >
          {
            (days.length > 0) && (days.map(e => (
              <TouchableOpacity
                onPress={() => this.handleDayPress(e)}
                key={`${e.year}${e.month}${e.day}` }
              >
                <DayTile
                  {...e}
                />
              </TouchableOpacity>
            )))
          }
          <View style={styles.divider} />
          <InfoTile
            label="Methodology"
            title="Our windows are backed by&nbsp;research"
            body="Our time frames are calculated under a model developed by Auburn University researchers using over a million GPS data points from white-tailed deer."
            imgSrc={deerImgSrc}
            hyperlink="http://www.rnr.lsu.edu/bret/BretWebSiteDocs/Sullivan2016.pdf"
            // onPress={() => this.handleMethodologyPress()}
          />
          <InfoTile
            label="Data"
            title="Figures accurate down to the second and the mile"
            body="We source our data directly from the United States Naval Observatory, querying exact data for your location and for the times you request."
            imgSrc={observatoryImgSrc}
            hyperlink="http://aa.usno.navy.mil/data/index.php"
          />
          <InfoTile
            label="Causes"
            title="10% of all profits to charity"
            body="10% of all profits from DeerTimes goes to the Bob Woodruff Foundation, a 501(c)(3) organization funding programs for returning veterans and their families."
            imgSrc={soldierImgSrc}
            hyperlink="https://bobwoodrufffoundation.org/"
          />
        </ScrollView>
        <View style={styles.autocompleteContainer}>
          <AutocompleteInput
            value={location.description}
            onChangeText={(e: string) => this.handleInputChange(e)}
            onResultPress={(id: string) => this.handleResultPress(id)}
            onBlur={() => this.handleBlur()}
            autocomplete={autocomplete.map((e: Location) => ({ id: e.id, text: e.description }))}
            placeholder="What location to evaluate?"
            hideAutocomplete={hideAutocomplete}
            loading={loading}
          />
          <View style={styles.rangeContainer}>
            <DatePicker
              disabled={!hideAutocomplete}
              style={styles.leftDatePicker}
              date={startDate.format('YYYY-MM-DD')}
              showIcon={false}
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              onDateChange={date => this.handleDateChange('startDate', date)}
              customStyles={customDatePickerStyle}
            />
            <DatePicker
              disabled={!hideAutocomplete}
              style={styles.rightDatePicker}
              date={endDate.format('YYYY-MM-DD')}
              minDate={startDate.format('YYYY-MM-DD')}
              showIcon={false}
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              onDateChange={date => this.handleDateChange('endDate', date)}
              customStyles={customDatePickerStyle}
            />
          </View>
          <Toast
            text="Cannot query more than 31 days at one time."
            opacity={0.7 * (toastCounter / toastTimer)}
          />
        </View>
      </View>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
