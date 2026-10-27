import type { LocalizedString } from "./i18n";

function tag(ptBr: string, en: string): LocalizedString {
  return { "pt-br": ptBr, en };
}

export const TAGS = {
  apocrypha: tag("Apócrifos", "Apocryphal"),
  echoes: tag("Ecos", "Echoes"),
  detective: tag("Detetive", "Detective"),
  stanBrings: tag("Stan Brings", "Stan Brings"),
  forestfar: tag("Forestfar", "Forestfar"),
  hunt: tag("Caçada", "Hunt"),
  family: tag("Família", "Family"),
  audiobook: tag("Audiobook", "Audiobook"),
  spotify: tag("Spotify", "Spotify"),
  audioPlayer: tag("Player de Áudio", "Audio Player"),
  website: tag("Site", "Website"),
  berdox: tag("Berdox", "Berdox"),
  volume2: tag("Volume 2", "Volume 2"),
  writing: tag("Escrita", "Writing"),
  comingSoon: tag("Em Breve", "Coming Soon"),
  design: tag("Design", "Design"),
  covers: tag("Capas", "Covers"),
  community: tag("Comunidade", "Community"),
  wattpad: tag("Wattpad", "Wattpad"),
  socialMedia: tag("Redes Sociais", "Social Media"),
  whatsapp: tag("WhatsApp", "WhatsApp"),
  sample: tag("Amostra", "Sample"),
  prologue: tag("Prólogo", "Prologue"),
  fragmented: tag("Fragmentados", "Fragmented"),
  store: tag("Loja", "Store"),
  release: tag("Lançamento", "Release"),
  amazon: tag("Amazon", "Amazon"),
  worldbuilding: tag("Worldbuilding", "Worldbuilding"),
  creativeProcess: tag("Processo Criativo", "Creative Process"),
  behindTheScenes: tag("Bastidores", "Behind the Scenes"),
  origins: tag("Origens", "Origins"),
  dominatorOfSouls: tag("O Dominador de Almas", "The Dominator of Souls"),
} satisfies Record<string, LocalizedString>;