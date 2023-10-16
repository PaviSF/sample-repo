import logMessage from '@constants/LogFunction';
import CommonResponseData from '@interfaces/Register';
import TurfDataApiResponse from '@interfaces/TurfData';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { encrypt } from '@utils/encryption';
import axios, { AxiosResponse } from 'axios';
import { Platform } from 'react-native';

const AUTH_BASE_URL = process.env.EXPO_PUBLIC_AUTH_BASE_URL;
const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;
type ApiResponseData = TurfDataApiResponse | CommonResponseData;
type OnResponseCallback = (response: AxiosResponse<ApiResponseData, any>) => void;

//For POST Api Call
export const postData = async (
  url: string,
  body: object,
  tKey_required: boolean,
  auth: boolean = true,
  onResponse: OnResponseCallback,
) => {
  const baseUrl = auth ? AUTH_BASE_URL : BASE_URL;
  let tKey = '';
  const token: string = await AsyncStorage.getItem('token');

  if (tKey_required) {
    const unsafeTKey = await AsyncStorage.getItem('tkey');
    const date = new Date();
    const unsafeTKeyWithTime = `${unsafeTKey}:${date.getTime()}`;
    tKey = encrypt(unsafeTKeyWithTime);
  }
  const headers = tKey_required
    ? {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        tKey,
        Authorization: 'Bearer ' + token,
      }
    : {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      };

  await axios
    .post<ApiResponseData>(baseUrl + url, body, {
      headers,
    })
    .then((response) => {
      //console.log(response.data);
      if (response.status) {
        response.data.status !== 1 && response.data.status !== 0
          ? sendIssue(
              url,
              headers,
              body,
              'Status not equals 1, response:' + JSON.stringify(response),
            )
          : logMessage('no Error');
      } else {
        sendIssue(url, headers, body, 'No status, response:' + JSON.stringify(response));
      }
      onResponse(response);
    })
    .catch((error) => {
      sendIssue(url, headers, body, error);
    });
};

//For GET Api Call
export const getData = async (
  url: string,
  tKey_required: boolean,
  auth: boolean = true,
  onResponse: OnResponseCallback,
) => {
  const baseUrl = auth ? AUTH_BASE_URL : BASE_URL;
  let tKey = '';
  const token: string = await AsyncStorage.getItem('token');

  if (tKey_required) {
    const unsafeTKey = await AsyncStorage.getItem('tkey');
    const date = new Date();
    const unsafeTKeyWithTime = `${unsafeTKey}:${date.getTime()}`;
    tKey = encrypt(unsafeTKeyWithTime);
  }
  const headers = tKey_required
    ? {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        tKey,
        Authorization: 'Bearer ' + token,
      }
    : {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      };
  await axios
    .get<ApiResponseData>(baseUrl + url, {
      headers,
    })
    .then((response) => {
      if (response.status) {
        response.data.status !== 1 && response.data.status !== 0
          ? sendIssue(
              baseUrl + url,
              headers,
              {},
              'Status not equals 1, response:' + JSON.stringify(response.data),
            )
          : logMessage('no Error');
      } else {
        sendIssue(url, headers, {}, 'No status, response:' + JSON.stringify(response));
      }
      onResponse(response);
    })
    .catch((error) => {
      logMessage(error);
    });
};

//API Call to report Issues
const sendIssue = async (url: string, header: object, body: object | null, title: string) => {
  const udId = await AsyncStorage.getItem('ud_id');
  const issueBody = { url, body, title, os: Platform.OS, udId, header };
  await axios
    .post<CommonResponseData>(AUTH_BASE_URL + 'save_issue', issueBody, { ...header })
    .then((response) => logMessage(response.status));
};
