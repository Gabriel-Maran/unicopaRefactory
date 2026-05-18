import { supabase } from "./supabase";

export async function atualizaFavorito(jogoId, valorBool) {
  const { data, error } = await supabase
    .from("jogos")
    .update({ isfavorito: valorBool })
    .eq("id", Number(jogoId))
    .select();

  if (error) {
    console.error("Erro ao favoritar:", error.message);
    return;
  }

  console.log("Dados atualizados:", data);
  return data;
}
