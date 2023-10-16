import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import * as Crypto from 'expo-crypto';
import { useFonts } from 'expo-font';
import { useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

const Index = () => {
  const router = useRouter();
  const [fontsLoaded] = useFonts({
    'Montserrat-Regular': require('assets/fonts/Montserrat-Regular.ttf'),
    'Montserrat-Medium': require('assets/fonts/Montserrat-Medium.ttf'),
    'Montserrat-Light': require('assets/fonts/Montserrat-Light.ttf'),
    'Montserrat-SemiBold': require('assets/fonts/Montserrat-SemiBold.ttf'),
  });

  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }

  async function getUDID() {
    let udId = await AsyncStorage.getItem('ud_id');
    if (!udId) {
      udId = Crypto.randomUUID();
      await AsyncStorage.setItem('ud_id', udId);
    }
  }

  async function getUserStatus() {
    const token: string | undefined = await AsyncStorage.getItem('token');
    token ? router.replace('/dashboards/') : router.replace('/auth/login');
  }

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
      await requestUserPermission();
      await getUDID();
      await getUserStatus();
    }
    prepare();
  }, []);
  if (fontsLoaded) {
    SplashScreen.hideAsync();
  }
};

export default Index;
