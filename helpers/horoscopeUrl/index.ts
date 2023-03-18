import { HoroscopeAddress } from '../horoscopeAddress';
import { HoroscopeUserInfo } from '../horoscopeAddress';

export const buildHoroscopeUrl = (address: HoroscopeAddress, userInfo: HoroscopeUserInfo) => {
  const url = `${process.env.REACT_APP_API_URL}/horoscope`;

  const params = Array.from([
    ['city', address.location.value],
    ...Object.entries(address.timeZone),
    ...Object.entries(address.coordinates),
    ...Object.entries(userInfo)
  ].map(([key, value]) => {
    return `${key}=${value}`;
  }));

  return encodeURI(`${url}?${params.join('&')}`);
};

export interface ParsedUrlData {
  address: HoroscopeAddress,
  userInfo: HoroscopeUserInfo
}

export const parseHoroscopeUrl = (url: string): ParsedUrlData | undefined => {
  if (!url.includes('?')) {
    return;
  }

  const urlParams = url.split('?')[1];
  const params = JSON.parse('{"' + decodeURIComponent(urlParams.toString())
    .replace(/"/g, '\\"')
    .replace(/&/g, '","')
    .replace(/=/g, '":"') + '"}');

  return {
    address: {
      coordinates: {
        latitude: params.latitude,
        longitude: params.longitude
      },
      location: {
        value: params.city,
        key: ''
      },
      timeZone: {
        greenwich: params.greenwich,
        minutes: params.minutes,
        hours: params.hours
      }
    },
    userInfo: {
      name: params.name,
      time: params.time,
      date: params.date
    }
  };
};