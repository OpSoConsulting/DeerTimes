/* tslint:disable:max-line-length */
import React from 'react';
import { ScrollView, View, Text, Image, Linking, ActivityIndicator } from 'react-native';
import { WindowPeriod } from '../../types';
import moment from 'moment';
import config from '../../config';
import mockMoonImgSrc from '../../assets/images/moon.png';
import SolunarWindow from './components/SolunarWindow';
import Table from './components/Table';
import TableRow from './components/TableRow';
import MoonImage from './components/MoonImage';
import ExternalLink from './components/ExternalLink';
import styles from './styles';

class DayDetails extends React.Component<any, any> {

  static navigationOptions = {
    title: 'Technicals',
    tabBarVisible: false,
  };


  public render() {
    const { dayRecord, location } = this.props.navigation.state.params;
    const moonUri = config.USE_MOCK_SERVICES ?
      mockMoonImgSrc :
      { uri: `http://api.usno.navy.mil/imagery/moon.png?date=${dayRecord.month}/${dayRecord.day}/${dayRecord.year}&time=12:00` };
      
    const dataSource = `http://api.usno.navy.mil/rstt/oneday?date=${dayRecord.month}/${dayRecord.day}/${dayRecord.year}&coords=${location.lat},${location.lng}&tz=${Math.round(dayRecord.tz)}`;

    const dataForRows = [
      { label: 'Date', value: `${dayRecord.month}/${dayRecord.day}/${dayRecord.year}` },
      { label: 'Day Of Week', value: dayRecord.dayofweek },
      { label: 'Location', value: location.description.slice(0, location.description.indexOf(',')) },
      { label: 'Longitude', value: location.lng.toFixed(2) },
      { label: 'Latitude', value: location.lat.toFixed(2) },
      { label: 'UTC Offset', value: dayRecord.tz },
    ];


    const sunInfoRows = [
      { event: 'Sunrise', time: dayRecord.sundata.rise },
      { event: 'Sun Overhead', time: dayRecord.sundata.transit },
      { event: 'Sunset', time: dayRecord.sundata.set },
    ];

    return  (
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
      >
        <View style={styles.header}>
          <MoonImage source={ moonUri } />
          <Table 
            title="1) Data For"
            style={styles.headerTable} 
          >
            {
              dataForRows.map(e => (
                <TableRow 
                  title={e.label}
                  value={e.value}
                />
              ))
            }
          </Table>
        </View>
        <SolunarWindow periods={ dayRecord.windows } />
        <Table
          title="3) Moon Info"
          style={styles.moonInfoContainer}
        >
          <TableRow
            title="Current Phase"
            value={dayRecord.curphase}
          />
          <TableRow
            title="Fracillum"
            value={`${dayRecord.fracillum}%`}
          />
          <TableRow
            title="Closest Major Phase"
            value={dayRecord.closestphase.phase}
          />
          <TableRow
            title="Closest Major Phase (Date)"
            value={dayRecord.closestphase.date}
          />
        </Table>
        <Table
          title="4) Sun Info"
          style={styles.sunInfoContainer}
        >
          {
            sunInfoRows.map(e => (
              <TableRow
                title={e.event}
                value={moment(e.time).format('HH:mm')}
              />
            ))
          }
        </Table>
        <ExternalLink
          title="Source: US Naval Observatory"
          url={dataSource}
        />
      </ScrollView>
    );
  }

}

export default DayDetails;
