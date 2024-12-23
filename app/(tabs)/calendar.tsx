import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

function Calendar() {
  return (
    <LinearGradient
      colors={["#1253AA", "#05243E"]}
      style={styles.container}
    >
      <View style={styles.header}>
        <Text style={styles.headerText}>My Calendar</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.text}>📅 Upcoming Events</Text>
        <Text style={styles.event}>1. Meeting with Team - 10:00 AM</Text>
        <Text style={styles.event}>2. Lunch with Client - 1:00 PM</Text>
        <Text style={styles.event}>3. Project Deadline - 5:00 PM</Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  header: {
    marginBottom: 20,
    alignItems: "center",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  content: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    padding: 20,
    borderRadius: 10,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 10,
  },
  event: {
    fontSize: 16,
    color: "#FFFFFF",
    marginBottom: 5,
  },
});

export default Calendar;
