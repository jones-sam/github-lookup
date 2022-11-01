import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  SafeAreaView,
  Text,
  Image,
  View,
  TouchableOpacity,
} from "react-native";
import { RootStackParamList } from "../App";
import { styles } from "../styles";
import { useEffect } from "react";
import { useGithubUserSearch } from "../hooks/useGithubUserSearch";

type Props = NativeStackScreenProps<RootStackParamList, "Profile">;

export default function Profile({ route, navigation }: Props) {
  const { user: userFromParams, username } = route.params;

  const {
    data: userFromQuery,
    refetch,
    isLoading,
  } = useGithubUserSearch(username);

  useEffect(() => {
    if (!userFromParams) {
      refetch();
    }
  }, []);

  const user = userFromParams ?? userFromQuery;

  return (
    <SafeAreaView>
      {isLoading || !user ? (
        <Text>Loading...</Text>
      ) : (
        <>
          <View style={{ padding: 16, width: "100%", flexDirection: "row" }}>
            <Image
              source={{ uri: user.avatar_url }}
              style={{ width: 80, height: 80 }}
            />
            <View style={{ flex: 1, marginLeft: 8 }}>
              {user.name && (
                <Text style={{ fontSize: 24, marginBottom: 4 }}>
                  {user.name}
                </Text>
              )}
              <Text>{username}</Text>
            </View>
          </View>
          {user.bio && <Text style={{ padding: 16 }}>{user.bio}</Text>}
          <TouchableOpacity
            onPress={() => {
              navigation.push("UserList", { type: "followers", username });
            }}
          >
            <Text
              style={styles.followerText}
            >{`Followers: ${user.followers}`}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.push("UserList", { type: "following", username });
            }}
          >
            <Text
              style={styles.followerText}
            >{`Following: ${user.following}`}</Text>
          </TouchableOpacity>
        </>
      )}
    </SafeAreaView>
  );
}
