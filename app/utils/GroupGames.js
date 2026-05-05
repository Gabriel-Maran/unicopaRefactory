export function groupGameByDate(jogos) {
  const jogosAgrupados = jogos.reduce((acc, jogo) => {
    const data = jogo.data_brasilia;
    if (!acc[data]) {
      acc[data] = [];
    }
    acc[data].push(jogo);
    return acc;
  }, {});

  return Object.keys(jogosAgrupados).map((data) => {
    return {
      title: data,
      data: sortGameByHorario(jogosAgrupados[data]),
    };
  });
}

function sortGameByHorario(jogosDia) {
  return jogosDia.sort(
    (a, b) => paraMinutos(a.hora_brasilia) - paraMinutos(b.hora_brasilia),
  );
}

function paraMinutos(horario) {
  const [horas, minutos] = horario.split(":");
  return horas * 60 + minutos;
}
