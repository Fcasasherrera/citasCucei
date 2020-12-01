import React, { useEffect } from 'react';
import Router from './Router';
import { FadeInView } from './shared/components';
import OneSignal from 'react-native-onesignal';
import { PermissionsAndroid, Platform } from "react-native";
function useOneSignal() {
  // const [uuid, setUuid] = useGlobalState('uuid');
  Platform.OS === 'ios' ? null : PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE)
  const initializeOneSignal = async () => {
    OneSignal.init("5e40cf5b-1cf9-4c32-95ab-e78b4aea4d1f", { kOSSettingsKeyAutoPrompt: true });// set kOSSettingsKeyAutoPrompt to false prompting manually on iOS

    OneSignal.addEventListener('received', onReceived);
    OneSignal.addEventListener('opened', onOpened);
    OneSignal.addEventListener('ids', onIds);
  }
  const onOpened = (openResult) => {
    console.log('Message: ', openResult.notification.payload.body);
    console.log('Data: ', openResult.notification.payload.additionalData);
    console.log('isActive: ', openResult.notification.isAppInFocus);
    console.log('openResult: ', openResult);
  }
  const onIds = (device) => {
    // console.log('Device info: ', device);
    // if (!uuid || uuid !== device.userId) {
    // setUuid(device.userId)
    OneSignal.sendTag("slug", device.userId);

    // }
  }

  const onReceived = (notification) => {
    // console.log("Notification received: ", notification);
  }
  useEffect(() => {
    initializeOneSignal();
  }, [])

}


interface AppProps {}

const App = (props: AppProps) => {
  useOneSignal();
  return (
    <FadeInView style={{ flex: 1 }}>
        <Router />
    </FadeInView>
  );
};

export default App;
