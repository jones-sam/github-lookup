import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import Search from "./screens/Search";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { GithubUser } from "./datasource/github";
import Profile from "./screens/profile";
import NotFound from "./screens/NotFound";
import UserList from "./screens/UserList";

export type RootStackParamList = {
  Search: undefined;
  Profile: { username: string; user: GithubUser };
  NotFound: { username: string };
  UserList: { type: "followers" | "following"; username: string };
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
          <Stack.Screen
            name="Profile"
            component={Profile}
            options={({ route }) => ({ title: route.params.username })}
          />
          <Stack.Screen
            name="NotFound"
            component={NotFound}
            options={{ title: "Not Found" }}
          />

          <Stack.Screen
            name="UserList"
            component={UserList}
            options={({ route }) => ({
              title: `${route.params.username} ${route.params.type}`,
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
}
