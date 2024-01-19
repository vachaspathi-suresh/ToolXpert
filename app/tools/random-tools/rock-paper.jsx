import { FontAwesome5 } from "@expo/vector-icons";
import { Stack } from "expo-router";
import { Icon, Text, VStack, useColorModeValue } from "native-base";
import { useEffect, useRef, useState } from "react";
import { Animated, Pressable, SafeAreaView } from "react-native";

const RockPaperScissor = () => {
  const animation = useRef(new Animated.Value(0)).current;
  const [isRolling, setIsRolling] = useState(false);
  const [face, setFace] = useState(3);
  useEffect(() => {
    Animated.spring(animation, {
      toValue: isRolling ? 1 : 0,
      useNativeDriver: true,
    }).start();
  }, [isRolling]);
  const rollDice = () => {
    setIsRolling(true);
    setFace(1);
    let num = Math.floor(Math.random() * 3) + 1;
    setTimeout(() => {
      setFace(num);
    }, 550);
    setTimeout(() => {
      setIsRolling(false);
    }, 500);
  };
  return (
    <SafeAreaView>
      <Stack.Screen
        options={{
          headerTitle: "Rock Paper Scissor",
        }}
      />
      <VStack marginY={30} space={150} alignItems={"center"}>
        <Text fontSize={40}>Rock Paper Scissor</Text>
        <Animated.View
          style={[
            {
              transform: [
                {
                  rotate: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: ["0deg", "20deg"],
                  }),
                },
                {
                  scale: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 1.8],
                  }),
                },
              ],
            },
          ]}
        >
          <Pressable onPress={rollDice}>
            <Icon
              as={FontAwesome5}
              name={`hand-${
                face === 1 ? "rock" : face === 2 ? "paper" : "peace"
              }`}
              size={200}
            />
          </Pressable>
        </Animated.View>
        <Text>Tap on the Hand to Play!!</Text>
      </VStack>
    </SafeAreaView>
  );
};

export default RockPaperScissor;
