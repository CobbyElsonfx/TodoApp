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
        barStyle="light-content"
        translucent={true} 
        backgroundColor="transparent" 
      />
       <LinearGradient
      colors={["#05243E", "#05243E"]} 
      style={{ flex: 1 }}
    >
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: "#05243E", 
            borderTopWidth: 0, 
            elevation: 0, 
            shadowOpacity: 0,
            height: 70, 
          },
          tabBarActiveTintColor: "white",
          tabBarInactiveTintColor: "rgba(255, 255, 255, 0.6)", 
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: "600",
            marginBottom: 5, 
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
