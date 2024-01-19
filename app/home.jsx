import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import {
  Center,
  Fab,
  Icon,
  Pressable,
  StatusBar,
  useColorMode,
  useColorModeValue,
} from "native-base";
import { SafeAreaView } from "react-native";
import ToolsList from "../components/home/ToolsList";
import currTheme from "./colors";

const Home = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const theme = currTheme(useColorModeValue("light", "dark"));
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.teal[200] }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: theme.colors.teal[300] },
          headerShadowVisible: false,
          headerRight: () => (
            <Pressable
              onPress={() => {
                router.push("/info");
              }}
            >
              <Icon
                as={Ionicons}
                name={"information-circle-outline"}
                _light={{ color: "#6B6B6A" }}
                size={33}
              />
            </Pressable>
          ),
          headerTitle: "ToolXpert",
          headerTitleStyle: {
            fontFamily: "Tektur",
            color: theme.colors.grey[900],
            fontSize: 35,
            fontWeight: "600",
          },
        }}
      />
      <Center m={5}>
        <ToolsList />
      </Center>
      <Fab
        renderInPortal={false}
        shadow={2}
        m={3}
        placement="bottom-right"
        size="sm"
        icon={
          <Icon
            color={colorMode === "dark" ? "#FFBB03" : "#FFFFFF"}
            as={Ionicons}
            name={colorMode === "dark" ? "sunny" : "md-moon"}
            size={30}
          />
        }
        onPress={async () => {
          toggleColorMode();
        }}
        backgroundColor={colorMode === "dark" ? "#FFEDCB" : "#474554"}
      />
      <StatusBar
        barStyle={colorMode === "dark" ? "light-content" : "dark-content"}
      />
    </SafeAreaView>
  );
};

export default Home;
