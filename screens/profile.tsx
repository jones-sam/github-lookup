import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SafeAreaView, Text, Image, View } from "react-native";
import { RootStackParamList } from "../App";
import { styles } from "../styles";

type Props = NativeStackScreenProps<RootStackParamList, "Profile">;

export default function Profile({ route, navigation }: Props) {
  const { user, username } = route.params;

  return (
    <SafeAreaView>
      <View style={{ padding: 16, width: "100%", flexDirection: "row" }}>
        <Image
          source={{ uri: user.avatar_url }}
          style={{ width: 80, height: 80 }}
        />
        <View style={{ flex: 1, marginLeft: 8 }}>
          {user.name && (
            <Text style={{ fontSize: 24, marginBottom: 4 }}>{user.name}</Text>
          )}
          <Text>{username}</Text>
        </View>
      </View>
      {user.bio && <Text style={{ padding: 16 }}>{user.bio}</Text>}
      <Text style={styles.followerText}>{`Followers: ${user.followers}`}</Text>
      <Text style={styles.followerText}>{`Following: ${user.following}`}</Text>
    </SafeAreaView>
  );
}
