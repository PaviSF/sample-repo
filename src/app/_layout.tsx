import { Stack } from 'expo-router';

export const Layout = () => {
  return (
    <Stack>
      <Stack.Screen name="auth" />
      <Stack.Screen name="booking" />
    </Stack>
  );
};
