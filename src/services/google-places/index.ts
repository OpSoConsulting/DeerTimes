import config from '../../config';
import { Location, GoogleLocation } from '../../types';
const { GOOGLE_PLACES_API_KEY } = config;


export function getPlaces(place: string): Promise<Location[]> {
    // tslint:disable-next-line
  const googleAutocompleteUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${place}&types=geocode&key=${GOOGLE_PLACES_API_KEY}`;

  return fetch(googleAutocompleteUrl)
    .then(res => res.json())
    // tslint:disable-next-line: no-console
    .then(res => console.log('response: ', res) ||
      res.predictions.map((e: GoogleLocation) => {
        return {
          description: e.description,
          id: e.id,
          place_id: e.place_id,
        };
      }),
    )
    // tslint:disable-next-line: no-console
    .catch(err => console.log('err is ', err));
}

interface getDetailsReturn {
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
  utc_offset: number;
}

export function getDetails(id: string): Promise<getDetailsReturn> {
  const googleDetailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?placeid=${id}&key=${GOOGLE_PLACES_API_KEY}`;
  // tslint:disable-next-line: no-console
  console.log('request to Google Details API: ', googleDetailsUrl);
  return fetch(googleDetailsUrl)
    .then(res => res.json())
    // tslint:disable-next-line: no-console
    .then(res => console.log('response: ', res) || res.result)
    // tslint:disable-next-line: no-console
    .catch(err => console.log('err is ', err));
}
