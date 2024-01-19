import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import {
  Divider,
  Fab,
  Icon,
  Link,
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  VStack,
  View,
  useColorMode,
  useColorModeValue,
} from "native-base";
import { Linking, SafeAreaView } from "react-native";
import currTheme from "./colors";

const Info = () => {
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

          headerTitle: "About",
          headerTitleStyle: {
            fontFamily: "Tektur",
            color: theme.colors.grey[900],
            fontSize: 35,
            fontWeight: "600",
          },
        }}
      />
      <ScrollView>
        <View m={5} mb={1}>
          <Text fontSize={25} underline mb={2}>
            ToolXpert:
          </Text>
          <Text
            textAlign={"justify"}
            letterSpacing={"lg"}
            lineHeight={"xl"}
            style={{ fontFamily: "Tektur", fontSize: 18 }}
          >
            {
              "\t\t\t\t\t\t\t\tYour ultimate smart tools companion! Experience efficiency and innovation at your fingertips with a powerful selection of cutting-edge tools. Enhance your productivity with a diverse range of smart tools packed into one convenient app. From text editing and unit conversions to advanced calculations, ToolXpert has you covered. Generate QR codes, shorten URLs, and decode Morse code effortlessly. Time your activities with a stopwatch and countdown timer, keep scores on the scoreboard, and explore a plethora of other handy tools for everyday use. Unlock the power of efficiency and precision with ToolXpert – your all-in-one smart companion!"
            }
          </Text>
          <Text mt={3} fontSize={17}>
            Version: 1.0.1
          </Text>
        </View>
        <VStack m={5} space={4} divider={<Divider />}>
          <Pressable
            onPress={() => {
              Linking.openURL(
                "mailto:juggernaut.developer@gmail.com?cc=&subject=Suggesting a tool to your app ToolXpert"
              );
            }}
          >
            <Text fontSize={19}>Suggest a Tool</Text>
          </Pressable>
          <Pressable
            onPress={() => {
              Linking.openURL(
                "mailto:juggernaut.developer@gmail.com?cc=&subject=A Bug in your App ToolXpert"
              );
            }}
          >
            <Text fontSize={19}>Report Bug</Text>
          </Pressable>
          <Link href="https://www.termsfeed.com/live/17a00aee-b335-4bc8-85c9-21c04b155534">
            <Text fontSize={19}>Privacy Policy</Text>
          </Link>
        </VStack>
      </ScrollView>
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

export default Info;
