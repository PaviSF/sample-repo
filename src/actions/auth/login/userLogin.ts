// React and React Native imports
import { ResponseStatus } from '@interfaces/Register';
import TurfDataApiResponse from '@interfaces/TurfData';
import AsyncStorage from '@react-native-async-storage/async-storage';
//External imports
import messaging from '@react-native-firebase/messaging';
import { postData } from '@utils/api';
import { validateUsername } from '@utils/validation';
import { AxiosResponse } from 'axios';
import { Router } from 'expo-router';
//Internal imports
import { Alert } from 'react-native';

const login = async (username: string, password: string, router: Router) => {
  // Obtain Firebase Cloud Messaging (FCM) token and generate a UUID for the device (unique for each install).
  const fcmId = await messaging().getToken();
  const udId = await AsyncStorage.getItem('ud_id');

  const body = {
    username,
    password,
    fcm_id: fcmId,
    ud_id: udId,
  };

  // Callback function to handle the API response.
  const onResponse = async (response: AxiosResponse<TurfDataApiResponse, any>) => {
    if (response.data.status === ResponseStatus.SUCCESS) {
      const managerData = response.data;
      Alert.alert('Login success');
      const storeManagerData: [string, string][] = [
        ['token', managerData.token],
        ['tkey', managerData.tkey],
        ['turf_id', managerData.turf_data[0]._id],
        ['turf_name', managerData.turf_data[0].turf_name],
        [
          'place',
          managerData.turf_data[0].location.place ? managerData.turf_data[0].location.place : '',
        ],
        [
          'turf_image',
          managerData.turf_data[0].images.length > 0 ? managerData.turf_data[0].images[0] : '',
        ],
        [
          'turf_logo',
          managerData.turf_data[0].images.length > 0 ? managerData.turf_data[0].turf_logo : '',
        ],
        [
          'locality',
          managerData.turf_data[0].location.locality
            ? managerData.turf_data[0].location.locality
            : '',
        ],
        [
          'timezone',
          managerData.turf_data[0].time_offset ? managerData.turf_data[0].time_offset : '',
        ],
        [
          'timezone_offset_minutes',
          managerData.turf_data[0].time_offset_in_minute
            ? managerData.turf_data[0].time_offset_in_minute.toString()
            : '',
        ],
        [
          'currency',
          managerData.turf_data[0].turf_currency ? managerData.turf_data[0].turf_currency : '',
        ],
        [
          'currency_symbol',
          managerData.turf_data[0].turf_currency_symbol
            ? managerData.turf_data[0].turf_currency_symbol
            : '',
        ],
      ];
      await AsyncStorage.multiSet(storeManagerData);
      router.push('/(tabs)/bookings');
    } else {
      Alert.alert(response.data.message);
    }
  };

  // Validate the username and initiate the login process.
  validateUsername(username)
    ? await postData('login', body, false, true, onResponse)
    : Alert.alert('Fields not satisfiable');
};

export default { login };
