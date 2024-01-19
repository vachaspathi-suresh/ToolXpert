import {
  FontAwesome5,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { FlatList } from "native-base";
import { SafeAreaView } from "react-native";
import ToolCard from "../../../components/home/ToolCard";
const toolsList = [
  {
    title: "Length",
    color: 2,
    icon: { pack: MaterialCommunityIcons, id: "ruler" },
    route: "/tools/convertor-tools/length",
  },
  {
    title: "Area",
    color: 2,
    icon: { pack: MaterialCommunityIcons, id: "vector-rectangle" },
    route: "/tools/convertor-tools/area",
  },
  {
    title: "Volume",
    color: 2,
    icon: { pack: MaterialCommunityIcons, id: "cube-scan" },
    route: "/tools/convertor-tools/volume",
  },
  {
    title: "Speed",
    color: 2,
    icon: { pack: MaterialCommunityIcons, id: "car-speed-limiter" },
    route: "/tools/convertor-tools/speed",
  },
  {
    title: "Data",
    color: 2,
    icon: { pack: MaterialIcons, id: "sd-storage" },
    route: "/tools/convertor-tools/data",
  },
  {
    title: "Mass",
    color: 2,
    icon: { pack: MaterialCommunityIcons, id: "weight" },
    route: "/tools/convertor-tools/mass",
  },
  {
    title: "Number System",
    color: 2,
    icon: { pack: MaterialCommunityIcons, id: "numeric" },
    route: "/tools/convertor-tools/number-system",
  },
  {
    title: "Temperature",
    color: 2,
    icon: { pack: FontAwesome5, id: "temperature-high" },
    route: "/tools/convertor-tools/temperature",
  },
  {
    title: "Time",
    color: 2,
    icon: { pack: MaterialCommunityIcons, id: "clock-time-four-outline" },
    route: "/tools/convertor-tools/time",
  },
  {
    title: "Currency",
    color: 2,
    icon: { pack: MaterialCommunityIcons, id: "currency-usd" },
    route: "/tools/convertor-tools/currency",
  },
  {
    title: "Angle",
    color: 2,
    icon: { pack: MaterialCommunityIcons, id: "angle-acute" },
    route: "/tools/convertor-tools/angle",
  },
  {
    title: "Force",
    color: 2,
    icon: { pack: MaterialCommunityIcons, id: "cube-send" },
    route: "/tools/convertor-tools/force",
  },
  {
    title: "Work",
    color: 2,
    icon: { pack: MaterialCommunityIcons, id: "weight-lifter" },
    route: "/tools/convertor-tools/work",
  },
];
const ConvertorTools = () => {
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

export default ConvertorTools;
