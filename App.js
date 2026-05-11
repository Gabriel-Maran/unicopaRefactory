import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  FlatList,
  TextInput,
} from "react-native";
import GameCard from "./app/components/GameCard";
import copaData from "./app/assets/data/copaData.json";
import { useEffect, useState } from "react";
import { SectionList } from "react-native";
import DiaCard from "./app/components/DiaCard";
import {
  groupGameByDate,
  groupGameByDateAndGroup,
} from "./app/utils/GroupGames";

export default function App() {
  const [jogos, setJogos] = useState(groupGameByDate(copaData.jogos));
  const [dadosCopa, setDadosCopa] = useState(copaData);
  const [groupSelected, setGroupSelected] = useState();
  useEffect(() => {
    if (!groupSelected || groupSelected.trim().groupSelected === 0) {
      setJogos(groupGameByDate(copaData.jogos));
    } else {
      setJogos(groupGameByDateAndGroup(copaData.jogos, groupSelected));
    }
  }, [groupSelected]);
  return (
    <ImageBackground
      style={styles.container}
      source={require("./app/assets/bg-overlay.png")}
    >
      <Image style={styles.logo} source={require("./app/assets/unicopa.png")} />
      <Text style={styles.title}>CALENDÁRIO</Text>
      <TextInput
        style={styles.searchGroup}
        placeholderTextColor={"#9c9b9b"}
        textAlign="center"
        placeholder="Procurar por grupo"
        onChangeText={(groupSelected) => setGroupSelected(groupSelected)}
        value={groupSelected}
        maxLength={1}
      />
      <SectionList
        sections={jogos}
        keyExtractor={(item, index) => item.id || index.toString()}
        renderItem={() => null}
        renderSectionHeader={({ section }) => <DiaCard section={section} />}
        style={styles.listGames}
      />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    backgroundColor: "#040b13",
    alignItems: "center",
  },
  listGames: {
    marginTop: 25,
  },
  logo: {
    marginTop: 20,
    width: 200,
    height: 50,
    resizeMode: "contain",
  },
  title: {
    marginTop: 10,
    fontSize: 28,
    fontWeight: "700",
    color: "white",
  },
  jogo: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#1e2d3d",
    paddingBottom: 15,
  },
  grupo: {
    color: "#8fa3b8",
    fontSize: 12,
    marginBottom: 10,
  },
  linhaPrincipal: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  time: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  bandeira: {
    width: 28,
    height: 28,
    borderRadius: 14,
  },
  sigla: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  horario: {
    alignItems: "center",
  },
  hora: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  local: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  subTitulo: {
    color: "#8fa3b8",
    fontSize: 12,
  },
  searchGroup: {
    color: "#fff",
    borderColor: "#8fa3b8",
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 10,
    width: 220,
  },
});
