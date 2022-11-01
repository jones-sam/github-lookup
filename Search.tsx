import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
} from "react-native";
import { useQuery } from "react-query";
import { getGithubUser } from "./datasource/github";

export default function Search() {
  const [searchQuery, setSearchQuery] = useState("");

  const { data, refetch, isLoading } = useQuery(
    ["user", searchQuery],
    () => getGithubUser(searchQuery),
    { enabled: false }
  );

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
      {data && <Text>{data.name}</Text>}

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
    height: 40,
    padding: 10,
    marginTop: 8,
    borderRadius: 8,
  },
});
