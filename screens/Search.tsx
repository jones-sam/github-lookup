import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  Button,
  RefreshControl,
  SafeAreaView,
  Text,
  TextInput,
} from "react-native";
import { RootStackParamList } from "../App";
import { useGithubUserSearch } from "../hooks/useGithubUserSearch";
import { styles } from "../styles";

type Props = NativeStackScreenProps<RootStackParamList, "Search">;

export default function Search({ navigation }: Props) {
  const [searchQuery, setSearchQuery] = useState("");

  const { refetch, isLoading } = useGithubUserSearch(searchQuery);

  const searchDisabled = isLoading || searchQuery.length === 0;

  const onSearch = async () => {
    if (searchDisabled) return;

    let res = await refetch();
    if (res.isError) {
      navigation.navigate("NotFound", { username: searchQuery });
      return;
    }
    navigation.navigate("Profile", { user: res.data, username: searchQuery });
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
        editable={!isLoading}
        autoCorrect={false}
        onSubmitEditing={onSearch}
      />
      {isLoading ? (
        <Text style={{ marginTop: 10 }}>Searching...</Text>
      ) : (
        <Button title="Search" disabled={searchDisabled} onPress={onSearch} />
      )}

      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
