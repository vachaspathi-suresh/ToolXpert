import { Stack } from "expo-router";
import { Text, VStack, View, useColorModeValue } from "native-base";
import { useEffect, useRef, useState } from "react";
import { Animated, Pressable, SafeAreaView } from "react-native";
import currTheme from "../../colors";
import { CoinHead, CoinTail } from "../../icons";

const CoinTool = () => {
  const theme = currTheme(useColorModeValue("light", "dark"));
  const animation = useRef(new Animated.Value(0)).current;
  const [isRolling, setIsRolling] = useState(false);
  const [face, setFace] = useState(0);
  useEffect(() => {
    Animated.spring(animation, {
      toValue: isRolling ? 1 : 0,
      useNativeDriver: true,
    }).start();
  }, [isRolling]);
  const flipCoin = () => {
    setIsRolling(true);
    let num = Math.random() >= 0.5 ? 1 : 0;
    setTimeout(() => {
      setFace(num);
    }, 200);
    setTimeout(() => {
      setIsRolling(false);
    }, 500);
  };
  return (
    <SafeAreaView>
      <Stack.Screen
        options={{
          headerTitle: "Flip Coin",
        }}
      />
      <VStack marginY={30} space={60} alignItems={"center"}>
        <Text fontSize={50}>Flip Coin</Text>
        <Animated.View
          style={[
            {
              transform: [
                {
                  translateY: animation.interpolate({
                    inputRange: [0, 0.2],
                    outputRange: [0, -100],
                  }),
                },
                {
                  rotateY: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: ["0deg", "1440deg"],
                  }),
                },
              ],
            },
          ]}
        >
          <Pressable onPress={flipCoin}>
            <View borderWidth={3} rounded={"full"}>
              {face === 0 ? <CoinHead size={250} /> : <CoinTail size={250} />}
            </View>
          </Pressable>
        </Animated.View>
        <Text
          fontSize={30}
          borderWidth={3}
          paddingX={10}
          paddingY={4}
          bgColor={theme.colors.teal[500]}
        >
          {isRolling ? "" : face === 0 ? "Heads" : "Tails"}
        </Text>

        <Text>Tap coin to Flip!</Text>
      </VStack>
    </SafeAreaView>
  );
};

export default CoinTool;
