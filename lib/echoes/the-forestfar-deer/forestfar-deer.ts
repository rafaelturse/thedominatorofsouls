import { TAGS } from "../../tags";
import type { EchoWork } from "../types";
import { forestfarDeerPart1 } from "./forestfar-deer-part-1";
import { forestfarDeerPart2 } from "./forestfar-deer-part-2";

export const forestfarDeer: EchoWork = {
  entry: {
    id: "forestfar-deer",
    title: { "pt-br": "O Cervo de Forestfar", en: "The Forestfar Deer" },
    cover: {
      "pt-br": "/img/echoes/cover-the-forestfar-deer-br.jpg",
      en: "/img/echoes/cover-the-forestfar-deer-en.jpg",
    },
    tags: [TAGS.apocrypha, TAGS.echoes, TAGS.forestfar, TAGS.hunt, TAGS.family],
    parts: [forestfarDeerPart1, forestfarDeerPart2],
  },
};