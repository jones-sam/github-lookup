import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SafeAreaView, Text } from "react-native";
import { RootStackParamList } from "../App";
type Props = NativeStackScreenProps<RootStackParamList, "NotFound">;

export default function NotFound({ route }: Props) {
  return (
    <SafeAreaView>
      <Text>{`User ${route.params.username} does not exist.`}</Text>
    </SafeAreaView>
  );
}
