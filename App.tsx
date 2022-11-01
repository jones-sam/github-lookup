import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import Search from "./screens/Search";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { GithubUser } from "./datasource/github";
import Profile from "./screens/profile";
import NotFound from "./screens/NotFound";

export type RootStackParamList = {
  Search: undefined;
  Profile: { user: GithubUser };
  NotFound: { username: string };
};

export default function App() {
  const queryClient = new QueryClient();

  const Stack = createNativeStackNavigator<RootStackParamList>();

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Search"
            component={Search}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen
            name="NotFound"
            component={NotFound}
            options={{ title: "Not Found" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
}
