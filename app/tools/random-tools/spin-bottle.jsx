import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Stack } from "expo-router";
import { Icon, Text, VStack, useColorModeValue } from "native-base";
import { useEffect, useRef, useState } from "react";
import { Animated, Pressable, SafeAreaView } from "react-native";

const SpinBottle = () => {
  const animation = useRef(new Animated.Value(0)).current;
  const [isSpinning, setIsSpinning] = useState(false);
  const [angle, setAngle] = useState(0);
  useEffect(() => {
    Animated.spring(animation, {
      toValue: isSpinning ? 1 : 0,
      useNativeDriver: true,
    }).start();
  }, [isSpinning]);
  const spinAn = () => {
    Animated.spring(animation, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };
  const startSpin = () => {
    setIsSpinning(true);
    let num = Math.floor(Math.random() * 360);
    setAngle(num);
    setTimeout(() => {
      setIsSpinning(false);
    }, 500);
  };
  return (
    <SafeAreaView>
      <Stack.Screen
        options={{
          headerTitle: "Spin Bottle",
        }}
      />
      <VStack marginY={30} space={100} alignItems={"center"}>
        <Text fontSize={50}>Spin Bottle</Text>
        <Animated.View
          style={[
            {
              transform: [
                {
                  rotate: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: ["0deg", `${angle + 720}deg`],
                  }),
                },
              ],
            },
          ]}
        >
          <Pressable onPress={startSpin}>
            <Icon
              rotation={angle}
              as={MaterialCommunityIcons}
              name={"bottle-wine"}
              size={250}
            />
          </Pressable>
        </Animated.View>
        <Text>Touch the Bottle to Spin!!</Text>
      </VStack>
    </SafeAreaView>
  );
};

export default SpinBottle;
