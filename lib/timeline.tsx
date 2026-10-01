import type { LocalizedString } from "./i18n";
import type { IconProps } from "./icons";
import { BookIcon, CommunityIcon, FeatherIcon, GridIcon, ShieldIcon } from "./icons";
import type { JSXElementConstructor, ReactElement } from "react";
import type { ReactNode } from "react";

export type TimelineEvent = {
  date: LocalizedString;
  title: LocalizedString;
  description: { "pt-br": ReactNode; en: ReactNode };
  icon: (props: IconProps) => ReactElement;
};

export const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    date: { "pt-br": "Em breve", en: "Coming Soon" },
    title: { "pt-br": "Volume 2: A Caçada", en: "Volume 2: The Hunt" },
    description: {
      "pt-br": (
        <>
          O próximo capítulo de As Memórias de Berdox já está em movimento — personagens ganhando
          forma, conflitos sendo lapidados, e um novo pedaço do universo de O Dominador de Almas
          tomando corpo nas sombras, pronto para ser revelado quando chegar a hora certa.
        </>
      ),
      en: (
        <>
          The next chapter of The Memories of Berdox is already in motion — characters taking shape,
          conflicts being sharpened, and a new piece of the Dominator of Souls universe coming
          together in the shadows, ready to be revealed when the time is right.
        </>
      ),
    },
    icon: ShieldIcon,
  },
  {
    date: { "pt-br": "Out-2026", en: "Oct-2026" },
    title: { "pt-br": "Novo Modelo de Capas", en: "New Cover Design System" },
    description: {
      "pt-br": (
        <>
          Um novo modelo de capas foi desenvolvido para a série — agora cada capa é estilizada
          conforme o subtítulo de seu respectivo livro, dando identidade visual própria a cada volume
          de <strong>As Memórias de Berdox</strong>.
        </>
      ),
      en: (
        <>
          A new cover design system was developed for the series — now each cover is styled according
          to its book&apos;s subtitle, giving its own visual identity to every volume of{" "}
          <strong>The Memories of Berdox</strong>.
        </>
      ),
    },
    icon: GridIcon,
  },
  {
    date: { "pt-br": "Out-2026", en: "Oct-2026" },
    title: { "pt-br": "A Comunidade Cresce", en: "The Community Grows" },
    description: {
      "pt-br": "Wattpad, redes sociais e canal no WhatsApp se juntam para formar a base de leitores.",
      en: "Wattpad, social media, and a WhatsApp channel come together to form the reader base.",
    },
    icon: CommunityIcon,
  },
  {
    date: { "pt-br": "Set-2026", en: "Sep-2026" },
    title: { "pt-br": "O Prólogo Chega ao Público", en: "The Prologue Goes Public" },
    description: {
      "pt-br": (
        <>
          O site e o Wattpad ganharam o prólogo de <strong>Fragmentados</strong> como amostra gratuita —
          agora qualquer leitor pode mergulhar nas primeiras páginas de As Memórias de Berdox antes
          mesmo de decidir comprar o livro completo.
        </>
      ),
      en: (
        <>
          The site and Wattpad received the prologue of <strong>Fragmented</strong> as a free sample —
          now any reader can dive into the opening pages of The Memories of Berdox before deciding to
          pick up the full book.
        </>
      ),
    },
    icon: FeatherIcon,
  },
  {
    date: { "pt-br": "Set-2026", en: "Sep-2026" },
    title: { "pt-br": "O Site no Ar", en: "The Site Goes Live" },
    description: {
      "pt-br": "thedominatorofsouls.com é lançado, trazendo a loja, a comunidade e o leitor de amostra.",
      en: "thedominatorofsouls.com launches, bringing the store, community, and sample reader to life.",
    },
    icon: GridIcon,
  },
  {
    date: { "pt-br": "Set-2026", en: "Sep-2026" },
    title: { "pt-br": "Fragmentados é Publicado", en: "Fragmented is Published" },
    description: {
      "pt-br": "O Volume 1 de As Memórias de Berdox chega à Amazon, marcando o início oficial da série.",
      en: "Volume 1 of The Memories of Berdox arrives on Amazon, marking the official start of the series.",
    },
    icon: BookIcon,
  },
  {
    date: { "pt-br": "2019 — 2026", en: "2019 — 2026" },
    title: { "pt-br": "Forjando e Dando Vida", en: "Forging and Bringing to Life" },
    description: {
      "pt-br": (
        <>
          Ao longo de sete anos de trabalho paralelo, foram desenvolvidas toneladas de linhas descrevendo todo o
          universo de <strong>The Dominator of Souls</strong> — seus mundos, cenários, fauna, flora, mecanismos de
          classes, tempo, energia, poderes, raças, espécies, mitologias, planetas, reinos, domínios, regiões, países,
          cidades, sociedades, povos, personagens, motivações, itens, armas e armaduras, jogos de tabuleiro, jogos de
          cartas e até mesmo este website!
          <br />
          <br />
          O que deveria ser o universo de um único livro se tornou uma plataforma completíssima, pronta para receber
          todo tipo de história possível!
          <br />
          <br />
          Com a base preparada, a imaginação então tomou asas, e as primeiras histórias começaram a ser projetadas —
          tudo esquematizado para que houvesse conexões entre todas elas. Dessa forma, uma infinidade de conteúdo foi
          escrita e distribuída corretamente, até que tudo fizesse sentido! Com essa grande massa em mãos, comecei
          então um ciclo de aprimoramento e passei a confeccionar os livros, dando início à saga{" "}
          <strong>As Memórias de Berdox</strong>, que até então é uma série planejada para ser contada em 6 livros!
        </>
      ),
      en: (
        <>
          Over seven years of work carried out alongside everything else, countless lines were written describing the
          entire universe of <strong>The Dominator of Souls</strong> — its worlds, settings, fauna, flora, class
          mechanics, time, energy, powers, races, species, mythologies, planets, kingdoms, domains, regions, countries,
          cities, societies, peoples, characters, motivations, items, weapons and armor, board games, card games, and
          even this very website!
          <br />
          <br />
          What was meant to be the universe of a single book became a full-fledged platform, ready to hold every kind
          of story imaginable!
          <br />
          <br />
          With the foundation in place, imagination took flight, and the first stories began to be shaped — everything
          mapped out so that connections would run between them all. In this way, an immense amount of content was
          written and carefully arranged until everything made sense! With that body of work in hand, I began a cycle
          of refinement and started crafting the books themselves, giving rise to the saga{" "}
          <strong>The Memories of Berdox</strong>, which is currently planned to span 6 books!
        </>
      ),
    },
    icon: BriefcaseIcon,
  },
  {
    date: { "pt-br": "Dez-2019", en: "Dec-2019" },
    title: { "pt-br": "O Nascimento de um Universo", en: "The Birth of a Universe" },
    description: {
      "pt-br":
        "O universo de O Dominador de Almas começou a tomar forma muito antes de a primeira palavra ser escrita. Foram muitas noites em claro, movidas pela empolgação da criação — e, com grande dedicação, seus alicerces começaram a ser concebidos e desenvolvidos.",
      en:
        "The universe of The Dominator of Souls began to take shape long before the first word was written. There were many sleepless nights fueled by the excitement of creation, and through great dedication, its foundations began to be conceived and developed.",
    },
    icon: FeatherIcon,
  },
];

function BriefcaseIcon(props: IconProps): ReactElement<unknown, string | JSXElementConstructor<any>> {
  throw new Error("Function not implemented.");
}
