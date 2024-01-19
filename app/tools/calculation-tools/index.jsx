import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FlatList } from "native-base";
import { SafeAreaView } from "react-native";
import ToolCard from "../../../components/home/ToolCard";
const toolsList = [
  {
    title: "Age Calculator",
    color: 3,
    icon: { pack: MaterialCommunityIcons, id: "human-white-cane" },
    route: "/tools/calculation-tools/age-tool",
  },
  {
    title: "Exponent",
    color: 3,
    icon: { pack: MaterialCommunityIcons, id: "exponent" },
    route: "/tools/calculation-tools/exponent-tool",
  },
  {
    title: "Factorial",
    color: 3,
    icon: { pack: MaterialCommunityIcons, id: "exclamation" },
    route: "/tools/calculation-tools/factorial-tool",
  },
  {
    title: "Average",
    color: 3,
    icon: { pack: MaterialCommunityIcons, id: "scale-balance" },
    route: "/tools/calculation-tools/average-tool",
  },
  {
    title: "Percentage",
    color: 3,
    icon: {
      pack: MaterialCommunityIcons,
      id: "percent-outline",
    },
    route: "/tools/calculation-tools/percentage-tool",
  },
  {
    title: "BMI Calculator",
    color: 3,
    icon: { pack: MaterialCommunityIcons, id: "mother-heart" },
    route: "/tools/calculation-tools/bmi-tool",
  },
  {
    title: "IsPrime",
    color: 3,
    icon: {
      pack: MaterialCommunityIcons,
      id: "numeric-2-box-outline",
    },
    route: "/tools/calculation-tools/prime-tool",
  },
  {
    title: "LCM & GCD",
    color: 3,
    icon: {
      pack: MaterialCommunityIcons,
      id: "calculator-variant-outline",
    },
    route: "/tools/calculation-tools/lcm-tool",
  },
];
const CalculationTools = () => {
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

export default CalculationTools;
