import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Slot, Stack, usePathname, useRouter } from "expo-router";
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
import currTheme from "../colors";

const Layout = () => {
  let tool = usePathname()?.split("/")[2]?.split("-")[0];
  tool = tool?.charAt(0).toUpperCase() + tool?.substring(1);
  const { colorMode, toggleColorMode } = useColorMode();
  const theme = currTheme(useColorModeValue("light", "dark"));
  const router = useRouter();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.teal[200] }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: theme.colors.teal[300] },
          headerShadowVisible: false,
          headerLeft: () => (
            <Icon
              as={MaterialCommunityIcons}
              name="keyboard-backspace"
              size={8}
              color={theme.colors.grey[900]}
              onPress={() => {
                router.push("../");
              }}
            />
          ),
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
          headerBackVisible: false,
          headerTitle: tool + " Tools",
          headerTitleStyle: {
            fontFamily: "Tektur",
            color: theme.colors.grey[900],
            fontSize: 29,
            fontWeight: "600",
          },
        }}
      />
      <Center m={5}>
        <Slot />
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

export default Layout;
