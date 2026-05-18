import { StyleSheet, Text, View } from "react-native";
import GameCard from "./GameCard";
import { dataFormater } from "../utils/DateFormater";
import { isThisDateToday } from "../utils/IsThisTodayDate";
import { useEffect } from "react";

export default function DiaCard({ section, atualizaJogoMemoria }) {
  return (
    <View style={styles.card}>
      <Text
        style={[
          styles.data,
          isThisDateToday(dataFormater(section.title))
            ? { color: "#26da9e" }
            : { color: "#f2cc2f" },
        ]}
      >
        {dataFormater(section.title)}
      </Text>
      {section.data.map((jogo) => (
        <GameCard
          atualizaJogoMemoria={atualizaJogoMemoria}
          key={jogo.id}
          game={jogo}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginTop: 25,
    backgroundColor: "#0c1b2a",
    width: 320,
    borderRadius: 12,
  },
  data: {
    fontSize: 22,
    fontWeight: "bold",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#1e2d3d",
  },
});
