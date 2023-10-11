import { header } from '@constants/Headers';
import { MaterialIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
export default function Layout() {
  return (
    <Tabs screenOptions={header}>
      <Tabs.Screen
        name="dashboards"
        options={{
          tabBarIcon: () => <MaterialIcons name="dashboard" size={24} color="black" />,
          tabBarShowLabel: false,
        }}
      />
      <Tabs.Screen name="bookings" />
      <Tabs.Screen name="memberships" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
}
