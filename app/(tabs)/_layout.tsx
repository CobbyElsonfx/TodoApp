import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { Link, Tabs } from "expo-router";
import { Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Import Ionicons for more options
import { LinearGradient } from "expo-linear-gradient";

export default function TabLayout() {
  return (
    <LinearGradient
      colors={["#1253AA", "#05243E"]}
      style={{ flex: 1 }}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    >
      <Tabs screenOptions={{ headerShown: false }}>
        {/* Home Tab */}
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => (
              <Ionicons name="home-outline" size={24} color={color} />
            ),
            tabBarStyle: {
              backgroundColor: "transparent",
            },
          }}
        />
        
        {/* TodoList Tab */}
        <Tabs.Screen
          name="todoList"
          options={{
            title: "TodoList",
            tabBarIcon: ({ color }) => (
              <FontAwesome name="list" size={24} color={color} />
            ),
            tabBarStyle: {
              backgroundColor: "transparent",
            },
          }}
        />
        
        {/* Calendar Tab */}
        <Tabs.Screen
          name="calendar"
          options={{
            title: "Calendar",
            tabBarIcon: ({ color }) => (
              <Ionicons name="calendar-outline" size={24} color={color} />
            ),
            tabBarStyle: {
              backgroundColor: "transparent",
            },
          }}
        />
        
        {/* Settings Tab */}
        <Tabs.Screen
          name="settings"
          options={{
            title: "Settings",
            tabBarIcon: ({ color }) => (
              <FontAwesome name="cogs" size={24} color={color} />
            ),
            tabBarStyle: {
              backgroundColor: "transparent",
            },
          }}
        />
      </Tabs>
    </LinearGradient>
  );
}
