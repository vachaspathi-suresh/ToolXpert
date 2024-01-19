import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Stack } from "expo-router";
import { Icon, Text, VStack } from "native-base";
import { useEffect, useRef, useState } from "react";
import { Animated, Pressable, SafeAreaView } from "react-native";

const DiceTool = () => {
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
    let num = Math.floor(Math.random() * 6) + 1;
    setFace(num);
    setTimeout(() => {
      setIsRolling(false);
    }, 500);
  };
  return (
    <SafeAreaView>
      <Stack.Screen
        options={{
          headerTitle: "Dice",
        }}
      />
      <VStack marginY={30} space={100} alignItems={"center"}>
        <Text fontSize={50}>Dice</Text>
        <Animated.View
          style={[
            {
              transform: [
                {
                  translateX: animation.interpolate({
                    inputRange: [0, 0.1],
                    outputRange: [0, 50],
                  }),
                },
                {
                  rotate: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: ["0deg", "360deg"],
                  }),
                },
              ],
            },
          ]}
        >
          <Pressable onPress={rollDice}>
            <Icon
              as={MaterialCommunityIcons}
              name={`dice-${face}`}
              size={250}
            />
          </Pressable>
        </Animated.View>
        <Text>Tap on Dice to Roll!!</Text>
      </VStack>
    </SafeAreaView>
  );
};

export default DiceTool;
