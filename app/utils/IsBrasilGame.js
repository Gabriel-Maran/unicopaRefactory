export default function isBrasilGame(jogo) {
  return jogo.sigla_casa == "BRA" || jogo.sigla_fora == "BRA";
}
