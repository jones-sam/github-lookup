import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SafeAreaView, Text } from "react-native";
import { RootStackParamList } from "../App";

type Props = NativeStackScreenProps<RootStackParamList, "Profile">;

export default function Profile({ route, navigation }: Props) {
  return (
    <SafeAreaView>
      <Text>Hi</Text>
    </SafeAreaView>
  );
}
