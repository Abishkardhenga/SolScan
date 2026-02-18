import { Tabs } from 'expo-router';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function ProtectedLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        // hide the header - we'll add our own in each screen
        headerShown: false,
        // tab bar styling
        tabBarStyle: {
          backgroundColor: "#16161D",
          borderTopColor: "#2A2A35",
          borderTopWidth: 1,
          paddingBottom: 8,
          paddingTop: 12,
          height: 70,
        },
        // active/inactive colors
        tabBarActiveTintColor: "#14F195",
        tabBarInactiveTintColor: "#6B7280",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="wallet" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="swap"
        options={{
          title: "swap",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="swap-horizontal" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="token/[mint]"
        options={{
          href: null, // Disable default link behavior
          title: "token/[mint]",
          tabBarIcon: ({ color }) => <TabIcon name="token" color={color} />,
        }}
      />
    </Tabs>
  )
}

// Simple icon placeholder - replace with actual icon library (e.g., @expo/vector-icons)
function TabIcon({ name, color }: { name: string; color: string }) {
  return (
    <View
      style={{
        width: 24,
        height: 24,
        backgroundColor: color,
        borderRadius: 4,
      }}
    />
  );
}

import { View } from 'react-native';import Ionicons from '@expo/vector-icons/build/Ionicons';

