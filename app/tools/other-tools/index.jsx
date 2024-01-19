import { Ionicons, MaterialCommunityIcons, Octicons } from "@expo/vector-icons";
import { FlatList } from "native-base";
import { SafeAreaView } from "react-native";
import ToolCard from "../../../components/home/ToolCard";
const toolsList = [
  {
    title: "Simple Counter",
    color: 6,
    icon: { pack: MaterialCommunityIcons, id: "numeric-1-box-outline" },
    route: "/tools/other-tools/simple-counter",
  },
  {
    title: "Score Board",
    color: 6,
    icon: { pack: MaterialCommunityIcons, id: "counter" },
    route: "/tools/other-tools/score-board",
  },
  {
    title: "StopWatch",
    color: 6,
    icon: { pack: Octicons, id: "stopwatch" },
    route: "/tools/other-tools/stopwatch",
  },
  {
    title: "Countdown Timer",
    color: 6,
    icon: { pack: Ionicons, id: "timer-outline" },
    route: "/tools/other-tools/timer",
  },
];
const OtherTools = () => {
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

export default OtherTools;
