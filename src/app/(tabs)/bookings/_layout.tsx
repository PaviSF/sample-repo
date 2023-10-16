import { header } from '@constants/Headers';
import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack screenOptions={header}>
      <Stack.Screen name="booking_list" />
    </Stack>
  );
}
