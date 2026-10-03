import type { LocalizedString } from "./i18n";

export type GlossaryTerm = {
  term: LocalizedString;
  definition: LocalizedString;
};

export type GlossaryCategory = {
  id: string;
  label: LocalizedString;
  terms: GlossaryTerm[];
};

export const GLOSSARY_BY_BOOK: Record<string, GlossaryCategory[]> = {
  fragmentados: [
    {
      id: "mainfield-family",
      label: { "pt-br": "Família Mainfield", en: "The Mainfield Family" },
      terms: [
        {
          term: { "pt-br": "George Mainfield", en: "George Mainfield" },
          definition: {
            "pt-br": "Chefe da família Mainfield, esposo de Tassia e pai de Alfred. Próspero homem de negócios, era um bom patrão, querido por todos.",
            en: "Head of the Mainfield family, husband of Tassia and father of Alfred. A prosperous businessman, he was a good employer, beloved by all.",
          },
        },
        {
          term: { "pt-br": "Tassia Mainfield", en: "Tassia Mainfield" },
          definition: {
            "pt-br": "Esposa de George e mãe de Alfred. Mulher elegante e dedicada, o pilar amoroso de sua casa e de sua família, a base de sustento de George e Alfred. Além de zelosa, era também amante dos livros e uma grande contadora de histórias.",
            en: "Wife of George and mother of Alfred. An elegant and devoted woman, the loving pillar of her home and her family, and the foundation that sustained both George and Alfred. Beyond being caring and attentive, she was also a lover of books and a wonderful storyteller.",
          },
        },
        {
          term: { "pt-br": "Alfred Mainfield", en: "Alfred Mainfield" },
          definition: {
            "pt-br": "Filho de George e Tassia. A alegria de seus pais e de Isobel, sua amiga. Seu nascimento foi motivo de uma mudança fundamental na vida de seus pais, porém, ele é muito mais precioso do que pensavam ser. Devido a uma grande tragédia, uma injustiça ainda maior tornou seu destino muito triste e incerto, mas há sempre aqueles dispostos a ajudar, e com isso, ainda lhe será entregue a lâmina da vingança.",
            en: "Son of George and Tassia. The joy of his parents and of Isobel, his friend. His birth marked a fundamental turning point in his parents' lives, though he would prove to be far more precious than they ever imagined. Due to a great tragedy, an even greater injustice left his fate uncertain and full of sorrow, yet there will always be those willing to help – and with that, he shall one day be handed the blade of vengeance.",
          },
        },
        {
          term: { "pt-br": "Feroz", en: "Fierce" },
          definition: {
            "pt-br": "Cãozinho Border Collie de Alfred. Em suas aventuras era um lobo destemido, o melhor amigo que um garoto poderia ter.",
            en: "Alfred's Border Collie puppy. In his adventures, he was a fearless wolf, the best friend a boy could ever have.",
          },
        },
      ],
    },
    {
      id: "reedelson-family",
      label: { "pt-br": "Família Reedelson", en: "The Reedelson Family" },
      terms: [
        {
          term: { "pt-br": "Ben Reedelson", en: "Ben Reedelson" },
          definition: {
            "pt-br": "Benjamin Reedelson, também conhecido apenas como Ben. Chefe da família Reedelson e pai de Isobel. Exercia um alto cargo financeiro confiado diretamente pelo próprio George Mainfield, seu patrão. Vive com o pesar de uma perda inconsolável, o que lhe deixa com um constante aspecto abatido.",
            en: "Benjamin Reedelson, also known simply as Ben. Head of the Reedelson family and father of Isobel. He held a high financial position, entrusted directly by George Mainfield himself, his employer. He lives with the grief of an inconsolable loss, which leaves him with a perpetually weary look about him.",
          },
        },
        {
          term: { "pt-br": "Isobel Reedelson", en: "Isobel Reedelson" },
          definition: {
            "pt-br": "Filha de Ben, aventureira, era a melhor amiga de Alfred Mainfield em sua triste infância. Uma grande descoberta vai levá-la a perseguir um sonho que aparentemente, parece ser impossível de ser realizado.",
            en: "Ben's daughter, adventurous by nature, she was Alfred Mainfield's closest friend throughout his sorrowful childhood. A great discovery will lead her to chase a dream that, at first glance, seems impossible to fulfill.",
          },
        },
        {
          term: { "pt-br": "Senhora Shepherd", en: "Mrs. Shepherd" },
          definition: {
            "pt-br": "Governanta e tutora de Isobel.",
            en: "Governess and tutor to Isobel.",
          },
        },
      ],
    },
    {
      id: "the-law",
      label: { "pt-br": "Lei", en: "The Law" },
      terms: [
        {
          term: { "pt-br": "James Weaver", en: "James Weaver" },
          definition: {
            "pt-br": "Também conhecido como \"Agente Weaver\". É o oficial de justiça responsável direto pelo caso de Alfred Mainfield. Veterano condecorado, segue seus dias como agente investigativo, sendo muito respeitado por todos por ser implacável e imparcial, desconfiando sempre de tudo e de todos. Devido a todas as controvérsias no caso da família Mainfield, tornou-se obcecado em encontrar a verdade por trás de tudo; o caminho que escolheu seguir o levará a um destino muito mais perigoso do que pode imaginar.",
            en: "Also known as \"Agent Weaver.\" He is the officer of justice directly responsible for Alfred Mainfield's case. A decorated veteran, he carries on his days as an investigative agent, widely respected by all for being ruthless and impartial, ever suspicious of everyone and everything. Due to all the controversies surrounding the Mainfield case, he has grown obsessed with uncovering the truth behind it all; the path he has chosen to follow will lead him toward a fate far more dangerous than he could ever imagine.",
          },
        },
        {
          term: { "pt-br": "Irmão de James Weaver", en: "James Weaver's Brother" },
          definition: {
            "pt-br": "Aliado do irmão, o agente investigativo James Weaver. Devido a descuidos, foi interceptado enquanto cumpria sua tarefa no resgate de um prisioneiro.",
            en: "Ally to his brother, investigative agent James Weaver. Due to a moment of carelessness, he was intercepted while carrying out his task in the rescue of a prisoner.",
          },
        },
        {
          term: { "pt-br": "Coronel Thomas Archer", en: "Colonel Thomas Archer" },
          definition: {
            "pt-br": "Oficial chefe da região onde se encontra a cidade de Handestiny. Apesar de todo o descaso com que lida com algumas questões mais improváveis, demonstra saber mais do que aparenta saber; suas desconfianças o tornam uma parte misteriosa de uma trama muito maior do que todos imaginam.",
            en: "Chief officer of the region where the town of Handestiny lies. Despite the indifference with which he handles some of the more improbable matters, he shows signs of knowing far more than he lets on; his suspicions make him a mysterious piece within a plot far larger than anyone imagines.",
          },
        },
        {
          term: { "pt-br": "Soldado Mason", en: "Soldier Mason" },
          definition: {
            "pt-br": "Um contato de muita confiança do Coronel Thomas Archer, que às suas ordens diretas, se envolve em uma difícil missão para conseguir provas e assim desmascarar um importante agente que passa a fazer perguntas demais.",
            en: "A trusted contact of Colonel Thomas Archer, who, under his direct orders, becomes entangled in a difficult mission to gather evidence and thereby expose an important agent who has begun asking far too many questions.",
          },
        },
      ],
    },
    {
      id: "mysterious-figures",
      label: { "pt-br": "Misteriosos", en: "Mysterious Figures" },
      terms: [
        {
          term: { "pt-br": "Berdox", en: "Berdox" },
          definition: {
            "pt-br": "Também conhecido como \"O Rei nas Sombras\", sua palavra é \"A lei acima da Lei\". De idade avançada, baixa estatura e robusto, é temido por quem conhece seu nome e parece estar à frente de uma organização muito discreta que sustenta um sistema paralelo de membros duvidosos e atividades ilícitas.",
            en: "Also known as \"The King in the Shadows,\" his word is \"The law above the Law.\" Advanced in age, short in stature, and stoutly built, he is feared by those who know his name, and appears to lead a highly discreet organization sustaining a parallel system of dubious members and illicit activities.",
          },
        },
        {
          term: { "pt-br": "Blarinh", en: "Blarinh" },
          definition: {
            "pt-br": "Codinome \"Dedos Mortos\". De alguma forma, invadiu uma importante reunião de Berdox, mas antes de obter o que foi procurar ali, foi identificado e neutralizado de forma muito peculiar. Trazia ainda alguém infiltrado consigo, algum tipo de espião muito mais ambicioso do que ele próprio.",
            en: "Codename \"Deadfingers.\" Somehow, he managed to infiltrate an important gathering of Berdox's, but before he could obtain what he had come there for, he was identified and neutralized in a rather peculiar way. He also brought along someone infiltrated with him, some sort of spy far more ambitious than himself.",
          },
        },
        {
          term: { "pt-br": "“O Silêncio”", en: "\"The Silence\"" },
          definition: {
            "pt-br": "Conhecido apenas por este codinome até o momento. Mascarado, alto e esguio, de trajes elegantes e escuros, convidado para uma importante reunião de Berdox.",
            en: "Known only by this codename thus far. Masked, tall, and slender, dressed in elegant, dark attire, invited to an important gathering of Berdox's.",
          },
        },
        {
          term: { "pt-br": "“Amigo Feliz”", en: "\"Happy Friend\"" },
          definition: {
            "pt-br": "Conhecido apenas por este codinome até o momento. Mascarado, alto e esguio, de trajes elegantes e escuros, convidado para a importante reunião de Berdox.",
            en: "Known only by this codename thus far. Masked, tall, and slender, dressed in elegant, dark attire, invited to the important gathering of Berdox's.",
          },
        },
        {
          term: { "pt-br": "“A Bela Donzela”", en: "\"The Fair Maiden\"" },
          definition: {
            "pt-br": "Conhecida apenas por este codinome até o momento. Mascarada, alta e esguia, sedutora, de traços finos, cabelos ruivos e pele clara, de trajes elegantes e vermelho-escuros, convidada para a importante reunião de Berdox.",
            en: "Known only by this codename thus far. Masked, tall, and slender, seductive, with delicate features, red hair, and fair skin, dressed in elegant, dark-red attire, invited to the important gathering of Berdox's.",
          },
        },
        {
          term: { "pt-br": "Rae", en: "Rae" },
          definition: {
            "pt-br": "Pouco se sabe sobre Rae até o momento. Um dos mascarados assistentes de Berdox, estava com ele no interrogatório feito a Blarinh durante a importante reunião ao qual ele se infiltrou.",
            en: "Little is known about Rae thus far. One of Berdox's masked assistants, present with him during the interrogation of Blarinh at the important gathering he had infiltrated.",
          },
        },
        {
          term: { "pt-br": "Dan", en: "Dan" },
          definition: {
            "pt-br": "Pouco se sabe sobre Dan até o momento. Aparenta ser alguém com certa relevância ou patente, isso devido a muitos arriscarem suas próprias vidas para resgatá-lo e mantê-lo a salvo. Foi encontrado gravemente ferido por alguns de seus aliados, que por não entenderem as origens de sua instabilidade, tomaram medidas drásticas em relação ao seu bem-estar, pois suas ações extremas estavam se tornando muito perigosas para todos ao seu redor.",
            en: "Little is known about Dan thus far. He appears to hold some measure of relevance or rank, given that many were willing to risk their own lives to rescue him and keep him safe. He was found severely wounded by some of his allies, who, unable to understand the roots of his instability, took drastic measures regarding his wellbeing, since his extreme actions were becoming far too dangerous for everyone around him.",
          },
        },
        {
          term: { "pt-br": "Leena", en: "Leena" },
          definition: {
            "pt-br": "Pouco se sabe sobre Leena até o momento. Foi ela a primeira que se apresentou a Dan, quando ele despertou na cabana. Apesar de toda sua rispidez, parece haver mais entre eles do que deixam transparecer e talvez ela seja a única que realmente se importe de verdade com ele e seu futuro na organização.",
            en: "Little is known about Leena thus far. She was the first to approach Dan when he awoke in the cabin. Despite all her harshness, there seems to be more between them than either lets on, and perhaps she is the only one who truly cares about him and his future within the organization.",
          },
        },
        {
          term: { "pt-br": "Folg", en: "Folg" },
          definition: {
            "pt-br": "Pouco se sabe sobre Folg até o momento. Demonstra ser apaziguador, estrategista e por este motivo, trabalha bem em equipe, tendendo à sensatez quando posto sob pressão.",
            en: "Little is known about Folg thus far. He shows himself to be a peacemaker and strategist, and for this reason, works well within a team, leaning toward level-headedness when placed under pressure.",
          },
        },
        {
          term: { "pt-br": "Trizer", en: "Trizer" },
          definition: {
            "pt-br": "Pouco se sabe sobre Trizer até o momento. Ele é claramente esquentado demais, em sua prepotência, pensa mais em atacar do que em estratégias de equipe, porém demonstra ser leal demais à organização. Por questões familiares, tem uma rixa antiga com Dan.",
            en: "Little is known about Trizer thus far. He is clearly far too hot-headed, and in his arrogance, thinks more about attacking than about team strategy, though he shows deep loyalty to the organization. Due to family matters, he holds a long-standing grudge against Dan.",
          },
        },
        {
          term: { "pt-br": "Lano", en: "Lano" },
          definition: {
            "pt-br": "Pouco se sabe sobre Lano até o momento. Irmão de Trizer, que teve um destino trágico devido à fatalidade de uma missão.",
            en: "Little is known about Lano thus far. Trizer's brother, who met a tragic fate due to the fatal outcome of a mission.",
          },
        },
        {
          term: { "pt-br": "Pont", en: "Pont" },
          definition: {
            "pt-br": "Pouco se sabe sobre Pont até o momento. Todos parecem respeitar muito sua alta patente; claramente ele é uma figura rígida e de grande autoridade dentro da organização.",
            en: "Little is known about Pont thus far. Everyone seems to hold great respect for his high rank; he is clearly a rigid figure of great authority within the organization.",
          },
        },
        {
          term: { "pt-br": "Rod", en: "Rod" },
          definition: {
            "pt-br": "Pouco se sabe sobre Rod até o momento. De igual patente à Leena, mas responde à equipe liderada diretamente por Pont.",
            en: "Little is known about Rod thus far. Holds the same rank as Leena, but answers to the team led directly by Pont.",
          },
        },
        {
          term: { "pt-br": "Lak", en: "Lak" },
          definition: {
            "pt-br": "Pouco se sabe sobre Lak até o momento. Doutor que conduzia processos científicos em uma instalação secreta.",
            en: "Little is known about Lak thus far. A doctor who conducted scientific procedures at a secret facility.",
          },
        },
        {
          term: { "pt-br": "Quoi", en: "Quoi" },
          definition: {
            "pt-br": "Pouco se sabe sobre Quoi até o momento. Intimida por sua força física aparente. De certo, possuía a mesma patente de Dan tempos atrás. Liderou algumas missões, e em uma delas, uma perda significativa iniciou um conflito interno muito sério.",
            en: "Little is known about Quoi thus far. Intimidating due to his apparent physical strength. He is known to have once held the same rank as Dan. He led several missions, and in one of them, a significant loss sparked a very serious internal conflict.",
          },
        },
        {
          term: { "pt-br": "Khali", en: "Khali" },
          definition: {
            "pt-br": "Pouco se sabe sobre Khali até o momento. Apresentou-se como aliado e conduziu um fugitivo ingênuo em sua jornada; para onde foram, isso ainda é um grande mistério.",
            en: "Little is known about Khali thus far. Presented himself as an ally and guided a naive fugitive on his journey; where they went remains a great mystery to this day.",
          },
        },
        {
          term: { "pt-br": "Encapuzado Intimidador com Voz de Trovão", en: "Intimidating Hooded Figure with a Voice of Thunder" },
          definition: {
            "pt-br": "Um completo estranho que se identificou como sendo ele o facilitador que auxiliou na fuga de um importante prisioneiro. Convida um agente a se juntar a ele para que possa continuar preservando sua vida.",
            en: "A complete stranger who identified himself as the facilitator who aided in the escape of an important prisoner. He invites an agent to join him so that he may continue to preserve his own life.",
          },
        },
        {
          term: { "pt-br": "Aquele com o Grande Martelo Verde", en: "The One with the Great Green Hammer" },
          definition: {
            "pt-br": "Furioso guerreiro brutamontes trajado com uma pesada armadura de placas e panos verdes, portava armas icônicas, sendo elas um imenso escudo e um grande martelo. Combatia Dan ferozmente, como se o tivesse encontrado depois de muito tê-lo perseguido, apenas para se vingar dele.",
            en: "A furious, hulking warrior clad in heavy plate armor and green cloth, wielding iconic weapons: an immense shield and a great hammer. He fought Dan ferociously, as though he had finally found him after a long pursuit, seeking nothing but vengeance against him.",
          },
        },
        {
          term: { "pt-br": "Sombrio", en: "Shadow" },
          definition: {
            "pt-br": "Pouco se sabe sobre o Sombrio até o momento. Um tirano cruel que causou um sofrimento imensurável à família Mainfield. Aquele, a quem deixou vivo, jurou que viveria os dias seguintes de sua vida, somente para vingar-se dele.",
            en: "Little is known about the Shadow thus far. A cruel tyrant who brought immeasurable suffering upon the Mainfield family. The one he chose to spare swore he would live out the rest of his days for no reason other than to seek vengeance against him.",
          },
        },
        {
          term: { "pt-br": "Coruja", en: "Owl" },
          definition: {
            "pt-br": "Pouco se sabe sobre o Homem-Coruja até o momento. Com vestes e máscara que remetem a um aspecto de coruja. Demonstrando muita perícia sobrenatural, calmamente ele invadiu uma grande base secreta sem que ninguém notasse sua presença, onde com intenções nada amistosas, castigou severamente um de seus mais estimados prisioneiros.",
            en: "Little is known about the Owl-Man thus far. Wearing garments and a mask evoking the appearance of an owl. Displaying tremendous supernatural skill, he calmly infiltrated a large secret base without anyone noticing his presence, where, with anything but friendly intentions, he brutally punished one of its most cherished prisoners.",
          },
        },
      ],
    },
    {
      id: "locations",
      label: { "pt-br": "Locais", en: "Locations" },
      terms: [
        {
          term: { "pt-br": "Cidade de Handestiny", en: "Town of Handestiny" },
          definition: {
            "pt-br": "Pequena cidade no sudoeste da Inglaterra onde nasceram e passaram a infância Alfred Mainfield e Isobel Reedelson.",
            en: "A small town in southwest England where Alfred Mainfield and Isobel Reedelson were born and spent their childhood.",
          },
        },
        {
          term: { "pt-br": "Mansão Mainfield", en: "Mainfield Manor" },
          definition: {
            "pt-br": "Lar da família Mainfield. Local de uma grande tragédia.",
            en: "Home of the Mainfield family. Site of a great tragedy.",
          },
        },
        {
          term: { "pt-br": "Mansão da Encosta", en: "Hillside Manor" },
          definition: {
            "pt-br": "Local onde aconteceu a reunião de Berdox, provavelmente seu lar e uma importante base de sua organização também.",
            en: "The location where Berdox's gathering took place, presumably his home and an important base of his organization as well.",
          },
        },
        {
          term: { "pt-br": "Mar do Severn", en: "Severn Sea" },
          definition: {
            "pt-br": "Estuário que separa o sudoeste da Inglaterra do sul do País de Gales.",
            en: "The estuary separating southwest England from the south of Wales.",
          },
        },
        {
          term: { "pt-br": "Biblioteca Secreta", en: "Secret Library" },
          definition: {
            "pt-br": "Oculta no subsolo, a misteriosa biblioteca guarda muitos segredos e abriga também um grandioso acervo de livros raríssimos cujo conteúdo não tem permissão para ser consumido por qualquer indivíduo. Um de seus preciosos tomos, porém, está perdido e caberá a uma família em ascensão recuperá-lo.",
            en: "Hidden beneath the ground, this mysterious library guards many secrets and also houses a magnificent collection of extremely rare books, whose contents no individual is permitted to consume. One of its precious tomes, however, has been lost, and it will fall to a family on the rise to recover it.",
          },
        },
        {
          term: { "pt-br": "Instalações Secretas de Progresso e Recuperação", en: "Secret Facilities for Progress and Recovery" },
          definition: {
            "pt-br": "Base secreta de uma importante organização. Um local onde o progresso e a tecnologia avançam a todo custo, sem medir as consequências dos resultados.",
            en: "A hidden base belonging to an important organization. A place where progress and technology advance at any cost, without weighing the consequences of the results.",
          },
        },
      ],
    },
  ],
  "volume-2": [
    {
      id: "the-hunters",
      label: { "pt-br": "Os Caçadores", en: "The Hunters" },
      terms: [
        {
          term: { "pt-br": "Magna Aliqua", en: "Magna Aliqua" },
          definition: {
            "pt-br": "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur.",
            en: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur.",
          },
        },
      ],
    },
    {
      id: "the-hunted",
      label: { "pt-br": "Os Caçados", en: "The Hunted" },
      terms: [
        {
          term: { "pt-br": "Magni Dolores", en: "Magni Dolores" },
          definition: {
            "pt-br": "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.",
            en: "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.",
          },
        },
      ],
    },
  ],
};

export type UniverseOptionId = "glossary" | "races" | "classes" | "mythology" | "species";

export type UniverseOption = {
  id: UniverseOptionId;
  label: LocalizedString;
  enabled: boolean;
};

export const UNIVERSE_OPTIONS: UniverseOption[] = [
  { id: "mythology", label: { "pt-br": "Mitologia", en: "Mythology" }, enabled: false },
  { id: "glossary", label: { "pt-br": "Glossário", en: "Glossary" }, enabled: true },
  { id: "classes", label: { "pt-br": "Classes", en: "Classes" }, enabled: false },
  { id: "races", label: { "pt-br": "Raças", en: "Races" }, enabled: false },
  { id: "species", label: { "pt-br": "Espécies", en: "Species" }, enabled: false },
];

export const UNIVERSE_PAGE = {
  title: { "pt-br": "Universo", en: "Universe" } as LocalizedString,
  heading: { "pt-br": "O Universo", en: "The Universe" } as LocalizedString,
  subtitle: {
    "pt-br": "Explore os mundos, termos e segredos por trás de O Dominador de Almas",
    en: "Explore the worlds, terms, and secrets behind The Dominator of Souls",
  } as LocalizedString,
};

export const GLOSSARY_WARNING = {
  "pt-br": (
    <>
      Caso você <strong>ainda não tenha</strong> se aventurado por toda a história e por alguma{" "}
      <strong>razão misteriosa</strong> tenha vindo parar por aqui, saiba que esta sessão contêm
      descrições que, mesmo breves, para alguns podem ser consideradas{" "}
      <strong>muito reveladoras</strong>, sobre os personagens, locais e outros mistérios
      apresentados durante toda essa expedição.
    </>
  ),
  en: (
    <>
      Should you <strong>not yet have</strong> ventured through the entire story, and for some{" "}
      <strong>mysterious reason</strong> have found your way here instead, know that this session
      contains descriptions which, brief as they may be, could be considered quite{" "}
      <strong>revealing</strong> to some, concerning the characters, places, and other mysteries
      presented throughout this whole expedition.
    </>
  ),
} as const;

export const GLOSSARY_WARNING_TITLE = { "pt-br": "Glossário", en: "Glossary" };
export const GLOSSARY_ATTENTION = { "pt-br": "Atenção!", en: "Attention!" };
export const GLOSSARY_PROCEED = { "pt-br": "Se realmente quer avançar,", en: "If you truly wish to proceed," };
export const GLOSSARY_GOOD_LUCK = { "pt-br": "Boa sorte!", en: "Good luck!" };