import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        placeholder="Search"
        style={styles.searchBar}
        value={searchQuery}
        onChangeText={(e) => {
          setSearchQuery(e);
        }}
        autoCapitalize="none"
      />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  searchBar: {
    borderWidth: 1,
    width: "80%",
    padding: 10,
    marginTop: 8,
    borderRadius: 8,
  },
});
