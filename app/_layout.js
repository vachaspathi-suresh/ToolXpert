import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { NativeBaseProvider } from "native-base";
SplashScreen.preventAutoHideAsync();

const Layout = () => {
  const colorTheme = {
    get: async () => {
      try {
        let val = await AsyncStorage.getItem("@toolxpert-color-mode");
        return val === "dark" ? "dark" : "light";
      } catch (e) {
        return "light";
      }
    },
    set: async (val) => {
      try {
        await AsyncStorage.setItem("@toolxpert-color-mode", val);
      } catch (e) {
        console.log(e);
      }
    },
  };

  const [fontsLoaded] = useFonts({
    "Lumanosimo-Regular": require("../assets/Lumanosimo-Regular.ttf"),
    Tektur: require("../assets/Tektur.ttf"),
  });

  // const onLayoutRootView = useCallback(async () => {
  //   if (fontsLoaded) {
  //     await SplashScreen.hideAsync();
  //   }
  // }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    // <SafeAreaView onLayout={onLayoutRootView}>
    <NativeBaseProvider colorModeManager={colorTheme}>
      <Stack initialRouteName="home">
        <Stack.Screen name="home" />
      </Stack>
    </NativeBaseProvider>
    // </SafeAreaView>
  );
};

export default Layout;
