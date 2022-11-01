import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Button, SafeAreaView, Text, TextInput } from "react-native";
import { useQuery } from "react-query";
import { RootStackParamList } from "../App";
import { getGithubUser } from "../datasource/github";
import { styles } from "../styles";

type Props = NativeStackScreenProps<RootStackParamList, "Search">;

export default function Search({ navigation }: Props) {
  const [searchQuery, setSearchQuery] = useState("");

  const { refetch, isLoading } = useQuery(
    ["user", searchQuery],
    () => getGithubUser(searchQuery),
    { enabled: false, staleTime: 300000 }
  );

  const onSearch = async () => {
    if (searchDisabled) return;

    let res = await refetch();
    if (res.isError) {
      navigation.navigate("NotFound", { username: searchQuery });
      return;
    }
    navigation.navigate("Profile", { user: res.data, username: searchQuery });
  };

  const searchDisabled = isLoading || searchQuery.length === 0;

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
