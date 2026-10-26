import type { EchoWork } from "./types";

const LOREM_A =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

const LOREM_B =
  "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

export const forestfarDeer: EchoWork = {
  entry: {
    id: "forestfar-deer",
    title: { "pt-br": "O Cervo de Forestfar", en: "The Forestfar Deer" },
    parts: [
      {
        id: "forestfar-deer-part-1",
        title: { "pt-br": "Última atualização: OUT 25 2026", en: "Last Update: OCT 25 2026" },
        paragraphs: [
          { "pt-br": LOREM_A, en: LOREM_A },
          { "pt-br": LOREM_B, en: LOREM_B },
        ],
      },
      {
        id: "forestfar-deer-part-2",
        title: { "pt-br": "Última atualização: OUT 25 2026", en: "Last Update: OCT 25 2026" },
        paragraphs: [
          { "pt-br": LOREM_A, en: LOREM_A },
          { "pt-br": LOREM_B, en: LOREM_B },
        ],
      },
      {
        id: "forestfar-deer-part-3",
        title: { "pt-br": "Última atualização: OUT 25 2026", en: "Last Update: OCT 25 2026" },
        paragraphs: [
          { "pt-br": LOREM_A, en: LOREM_A },
          { "pt-br": LOREM_B, en: LOREM_B },
        ],
      },
    ],
  },
};