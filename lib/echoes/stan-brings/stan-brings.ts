import { TAGS } from "../../tags";
import type { EchoWork } from "../types";

const COVER = "/img/echoes/cover-stanbrings-baw.jpg";

export const stanBrings: EchoWork = {
  card: {
    id: "stanbrings",
    entryId: "stan-brings",
    category: { "pt-br": "Os mistérios estão por todos os lados", en: "Mysteries are everywhere" },
    title: { "pt-br": "Olá, Sr. Stan Brings!", en: "Hello, Mr. Stan Brings!" },
    excerpt: {
      "pt-br":
        "As habilidades únicas de um raríssimo dominador tornam possível que ele recupere ecos de lembranças e sentimentos que, mesmo tendo sido gerados há muito tempo, ainda não se dissiparam completamente.",
      en: "The unique abilities of an exceedingly rare dominator make it possible for him to recover echoes of memories and feelings that, even though they were generated long ago, have not yet completely faded.",
    },
    tags: [TAGS.detective, TAGS.echoes, TAGS.apocrypha],
    cover: COVER,
  },
  entry: {
    id: "stan-brings",
    title: { "pt-br": "Sr. Stan Brings", en: "Mr. Stan Brings" },
    cover: { "pt-br": COVER, en: COVER },
    tags: [TAGS.apocrypha, TAGS.echoes, TAGS.detective, TAGS.stanBrings],
    parts: [
      {
        id: "stan-brings-part-1",
        title: { "pt-br": "Última atualização: OUT 25 2026", en: "Last Update: OCT 25 2026" },
        paragraphs: [
          {
            "pt-br":
              "As habilidades únicas de um raríssimo dominador tornam possível que ele recupere ecos de lembranças e sentimentos que, mesmo tendo sido gerados há muito tempo, ainda não se dissiparam completamente.",
            en: "The unique abilities of an exceedingly rare dominator make it possible for him to recover echoes of memories and feelings that, even though they were generated long ago, have not yet completely faded.",
          },
          {
            "pt-br":
              "Quando tudo começou, ele apenas percebia a presença deles, mas então passou a senti-los, e quando tomou coragem para interagir com eles, descobriu segredos que mudariam sua vida para sempre.",
            en: "When it all began, he merely perceived their presence, but then he began to feel them, and when he gathered the courage to interact with them, he discovered secrets that would change his life forever.",
          },
          {
            "pt-br":
              "Ao consumir estes ecos suplicantes, Stan Brings descobriu que tinha o dom de reviver momentos passados que até então estavam perdidos. Ao assimilar este fenômeno incomum, mergulhou em histórias e as reviveu sob perspectivas variadas, conforme quem estava presente.",
            en: "Upon consuming these pleading echoes, Stan Brings discovered that he had the gift of reliving past moments that, until then, had been lost. As he came to grasp this unusual phenomenon, he plunged into stories and relived them from varied perspectives, depending on who was present.",
          },
          {
            "pt-br":
              "A prática constante o levou a fazer diversas descobertas intrigantes, e, sentindo que seu destino era dar voz ao desconhecido, Stan decidiu registrar todos os relatos em livros, que chamou de Apócrifos dos Ecos.",
            en: "Constant practice led him to make many intriguing discoveries, and, sensing that his destiny was to give voice to the unknown, Stan decided to record every account in books, which he called the Apocrypha of the Echoes.",
          },
          {
            "pt-br":
              "Isso dá início a uma jornada tão única quanto seu dom peculiar: nas páginas em que registra as histórias que coleta, existem também as marcas causadas nele por aquilo que consome; assim, ficam ali eternizados suas conclusões, pensamentos e opiniões pessoais sobre o que vivencia.",
            en: "This begins a journey as unique as his peculiar gift: in the pages where he records the stories he collects, there are also the marks left on him by what he consumes; thus, his conclusions, thoughts, and personal opinions about what he experiences are preserved there forever.",
          },
          {
            "pt-br":
              "Por aqui você terá acesso a algumas de suas anotações, que serão disponibilizadas conforme forem sendo encontradas, pois seus Apócrifos dos Ecos estão espalhados: alguns perdidos, outros ocultos, mantidos em sigilo por colecionadores que, a princípio, preferem se manter em completo anonimato para ter a vantagem do privilégio da informação exclusiva, pois, por menores que possam ser, para aqueles que buscam juntar todas as peças do quebra-cabeças, estas são informações preciosas.",
            en: "Here, you will have access to some of his notes, which will be made available as they are found, for his Apocrypha of the Echoes are scattered: some lost, others hidden, kept secret by collectors who, at first, prefer to remain completely anonymous in order to hold the advantage of exclusive information, for, however small they may be, to those who seek to piece together the whole puzzle, this information is precious.",
          },
        ],
      },
    ],
  },
};