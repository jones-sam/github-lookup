import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SafeAreaView, Text } from "react-native";
import { RootStackParamList } from "../App";
import { styles } from "../styles";

type Props = NativeStackScreenProps<RootStackParamList, "NotFound">;

export default function NotFound({ route }: Props) {
  return (
    <SafeAreaView style={styles.container}>
      <Text
        style={{ fontSize: 16 }}
      >{`User ${route.params.username} does not exist.`}</Text>
    </SafeAreaView>
  );
}
