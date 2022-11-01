import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect } from "react";
import {
  Text,
  Image,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { useQuery } from "react-query";
import { RootStackParamList } from "../App";
import { getFollowers, getFollowing } from "../datasource/github";

type Props = NativeStackScreenProps<RootStackParamList, "UserList">;

export default function UserList({ route, navigation }: Props) {
  const { username, type } = route.params;

  const {
    data: followerData,
    refetch: fetchFollowers,
    isLoading: followersIsLoading,
  } = useQuery(["followers", username], () => getFollowers(username), {
    enabled: false,
    staleTime: 300000,
  });

  const {
    data: followingData,
    refetch: fetchFollowing,
    isLoading: followingIsLoading,
  } = useQuery(["following", username], () => getFollowing(username), {
    enabled: false,
    staleTime: 300000,
  });

  const isLoading =
    type === "followers" ? followersIsLoading : followingIsLoading;
  const data = type === "followers" ? followerData : followingData;

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    if (type == "followers") {
      fetchFollowers();
      return;
    } else {
      fetchFollowing();
      return;
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          style={{ padding: 8 }}
          data={data}
          onRefresh={fetchUsers}
          refreshing={isLoading}
          renderItem={(x) => (
            <TouchableOpacity
              onPress={() => {
                navigation.push("Profile", {
                  username: x.item.login,
                  user: null,
                });
              }}
              style={{ height: 60, flexDirection: "row" }}
            >
              <Image
                source={{ uri: x.item.avatar_url }}
                style={{ height: 48, width: 48 }}
              />
              <Text style={{ marginLeft: 8, fontSize: 20 }}>
                {x.item.login}
              </Text>
            </TouchableOpacity>
          )}
        />
      )}
    </SafeAreaView>
  );
}
