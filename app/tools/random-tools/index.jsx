import { Stack } from "expo-router";
import { FlatList, Text } from "native-base";
import { SafeAreaView } from "react-native";
import {
  FontAwesome5,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { FortuneWheel } from "../../icons";
import ToolCard from "../../../components/home/ToolCard";
const toolsList = [
  {
    title: "Dice",
    color: 4,
    icon: { pack: MaterialCommunityIcons, id: "dice-5-outline" },
    route: "/tools/random-tools/dice-tool",
  },
  {
    title: "Flip Coin",
    color: 4,
    icon: { pack: MaterialCommunityIcons, id: "hand-coin-outline" },
    route: "/tools/random-tools/coin-tool",
  },
  {
    title: "Spin Bottle",
    color: 4,
    icon: { pack: FontAwesome5, id: "wine-bottle" },
    route: "/tools/random-tools/spin-bottle",
  },
  // {
  //   title: "Spin Wheel",
  //   color: 4,
  //   icon: { pack: FortuneWheel, id: "fortune-wheel", isCustom: true },
  //   route: "/tools/random-tools/spin-wheel",
  // },
  {
    title: "Rock Paper Scissor",
    color: 4,
    icon: { pack: FontAwesome, id: "hand-scissors-o" },
    route: "/tools/random-tools/rock-paper",
  },
  {
    title: "Generate a Number",
    color: 4,
    icon: { pack: MaterialCommunityIcons, id: "slot-machine" },
    route: "/tools/random-tools/generate-number",
  },
];
const RandomTools = () => {
  return (
    <SafeAreaView>
      <FlatList
        data={toolsList}
        renderItem={({ item }) => <ToolCard key={item.title} tool={item} />}
        numColumns={2}
        keyExtractor={(i) => i.title}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default RandomTools;
