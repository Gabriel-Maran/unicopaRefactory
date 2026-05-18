import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import TimeCard from "./TimeCard";
import isBrasilGame from "../utils/IsBrasilGame";
import { useState } from "react";
import { atualizaFavorito } from "../utils/FavoritaJogo";

export default function GameCard({ game, atualizaJogoMemoria }) {
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.jogo,
          isBrasilGame(game) ? { backgroundColor: "#11273d" } : {},
        ]}
      >
        <Text style={styles.grupo}>
          GRUPO {game.grupo} {game.confronto}
        </Text>

        <View style={styles.linhaPrincipal}>
          <TimeCard siglaTime={game.sigla_casa} />
          <View style={styles.horario}>
            <Text style={styles.hora}>{game.hora_brasilia.slice(0, 5)}</Text>
            <Text style={styles.subTitulo}>VS</Text>
          </View>

          <TimeCard siglaTime={game.sigla_fora} />
        </View>

        <View style={styles.local}>
          <Text style={styles.subTitulo}>{game.estadio}</Text>
          <Text style={styles.subTitulo}>
            {game.cidade} • {game.pais}
          </Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={async () => {
          try {
            await atualizaFavorito(game.id, !game.isFavorito);
            atualizaJogoMemoria(game.id);
          } catch (error) {
            console.error("Erro ao atualizar favorito:", error);
          }
        }}
        style={styles.btnFavorito}
      >
        <Image
          style={[
            styles.imgFavorite,
            game.isfavorito ? { tintColor: "#ce0808" } : {},
          ]}
          source={require("../assets/heart.png")}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    borderTopWidth: 1,
    borderColor: "#2d455e",
    marginBottom: 5,
  },
  jogo: {
    padding: 20,
    borderRadius: 10,
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
  },
  subTitulo: {
    color: "#8fa3b8",
    fontSize: 12,
    textAlign: "center",
  },
  imgFavorite: {
    width: 30,
    height: 30,
    tintColor: "#888",
  },
  btnFavorito: {
    position: "absolute",
    bottom: 20,
    maxWidth: 30,
    left: 20,
  },
});
