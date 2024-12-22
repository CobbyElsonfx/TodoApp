import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons"; // For additional icons
import { Tabs } from "expo-router";
import { StatusBar } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function TabLayout() {
  return (
    <>
     {/* Ensure the Status Bar is visible */}
     <StatusBar
        barStyle="light-content" // Use "dark-content" for light backgrounds
        translucent={true} // Make it transparent
        backgroundColor="transparent" // Background color matches app
      />
       <LinearGradient
      colors={["#05243E", "#05243E"]} // Solid dark blue background
      style={{ flex: 1 }}
    >
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: "#05243E", // Dark blue background
            borderTopWidth: 0, // Remove the border at the top of the tab bar
            elevation: 0, // Remove any shadow or elevation
            shadowOpacity: 0, // Ensure no shadow
            height: 70, // Adjust height for better usability
          },
          sceneContainerStyle: {
            backgroundColor: "#05243E", // Match background color to remove the line
          },
          tabBarActiveTintColor: "white", // White color for active icon
          tabBarInactiveTintColor: "rgba(255, 255, 255, 0.6)", // Subtle white for inactive icon
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: "600",
            marginBottom: 5, // Add margin to ensure labels are visible
          },
          tabBarIconStyle: {
            marginTop: -5, // Move icons slightly up
          },
          tabBarItemStyle: {
            paddingVertical: 5,
          },
        }}
      >
        {/* Home Tab */}
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => (
              <Ionicons name="home-outline" size={24} color={color} />
            ),
          }}
        />

        {/* TodoList Tab */}
        <Tabs.Screen
          name="todoList"
          options={{
            title: "Todo List",
            tabBarIcon: ({ color }) => (
              <FontAwesome name="list" size={24} color={color} />
            ),
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
          }}
        />

        
      </Tabs>
    </LinearGradient>
    </>
   
  );
}
