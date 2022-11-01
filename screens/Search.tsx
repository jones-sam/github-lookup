import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  Button,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useQuery } from "react-query";
import { getGithubUser } from "../datasource/github";

export default function Search({ navigation }) {
  const [searchQuery, setSearchQuery] = useState("");

  const { data, refetch, isLoading } = useQuery(
    ["user", searchQuery],
    () => getGithubUser(searchQuery),
    { enabled: false }
  );

  const onSearch = async () => {
    await refetch();
    navigation.navigate("Profile");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Github user lookup</Text>
      <TextInput
        placeholder="Search"
        style={styles.searchBar}
        value={searchQuery}
        onChangeText={(e) => {
          setSearchQuery(e);
        }}
        autoCapitalize="none"
        onSubmitEditing={() => {
          refetch();
        }}
      />
      <Button
        title="Search"
        onPress={() => {
          refetch();
        }}
      />

      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  searchBar: {
    borderWidth: 1,
    width: "80%",
    height: 40,
    padding: 10,
    marginTop: 16,
    borderRadius: 8,
  },
});
