import type { LocalizedString } from "./i18n";

export const PRIVACY_PAGE = {
  title: { "pt-br": "Privacidade", en: "Privacy" } as LocalizedString,
  heading: { "pt-br": "Política de Privacidade", en: "Privacy Policy" } as LocalizedString,
  subtitle: {
    "pt-br": "Como coletamos, usamos e protegemos suas informações",
    en: "How we collect, use, and protect your information",
  } as LocalizedString,
  lastUpdated: { "pt-br": "Última atualização: setembro de 2026", en: "Last updated: September 2026" } as LocalizedString,
  sections: [
    {
      heading: { "pt-br": "1. Quem somos", en: "1. Who we are" },
      body: {
        "pt-br":
          "Este site (thedominatorofsouls.com) é operado por Rafael Turse, autor da série O Dominador de Almas. Esta política explica quais informações coletamos quando você visita o site e como essas informações são usadas.",
        en: "This website (thedominatorofsouls.com) is operated by Rafael Turse, author of the Dominator of Souls series. This policy explains what information we collect when you visit the site and how that information is used.",
      },
    },
    {
      heading: { "pt-br": "2. Cookies e ferramentas de análise", en: "2. Cookies and analytics tools" },
      body: {
        "pt-br":
          "Utilizamos o Google Analytics (GA4) para entender como os visitantes usam o site — quais páginas são acessadas, de onde vêm os visitantes e por quanto tempo permanecem. Essas ferramentas usam cookies, pequenos arquivos armazenados no seu navegador. O Google Analytics só é ativado após você aceitar o uso de cookies no banner exibido na primeira visita. Se você recusar, nenhum dado de análise é coletado.",
        en: "We use Google Analytics (GA4) to understand how visitors use the site — which pages are visited, where visitors come from, and how long they stay. These tools use cookies, small files stored in your browser. Google Analytics is only activated after you accept the use of cookies in the banner shown on your first visit. If you decline, no analytics data is collected.",
      },
    },
    {
      heading: { "pt-br": "3. Que dados são coletados", en: "3. What data is collected" },
      body: {
        "pt-br":
          "Quando o Google Analytics está ativo, dados como endereço IP (de forma anonimizada), tipo de dispositivo, navegador, páginas visitadas e tempo de permanência podem ser coletados. Não coletamos nomes, e-mails ou outras informações pessoais diretamente através deste site, a menos que você as forneça voluntariamente (por exemplo, ao entrar em contato).",
        en: "When Google Analytics is active, data such as IP address (anonymized), device type, browser, pages visited, and time spent may be collected. We do not collect names, emails, or other personal information directly through this site unless you voluntarily provide it (for example, when reaching out to us).",
      },
    },
    {
      heading: { "pt-br": "4. Como usamos essas informações", en: "4. How we use this information" },
      body: {
        "pt-br":
          "As informações coletadas são usadas exclusivamente para entender o desempenho do site e melhorar a experiência dos visitantes. Não vendemos, alugamos ou compartilhamos seus dados com terceiros para fins de marketing.",
        en: "The information collected is used exclusively to understand site performance and improve the visitor experience. We do not sell, rent, or share your data with third parties for marketing purposes.",
      },
    },
    {
      heading: { "pt-br": "5. Seus direitos", en: "5. Your rights" },
      body: {
        "pt-br":
          "Você pode recusar o uso de cookies a qualquer momento através do banner exibido no site, ou limpando os dados de navegação do seu navegador. Sob a LGPD (Brasil) e o GDPR (União Europeia), você tem o direito de solicitar informações sobre os dados coletados e, quando aplicável, sua exclusão.",
        en: "You may decline the use of cookies at any time through the banner shown on the site, or by clearing your browser's browsing data. Under the LGPD (Brazil) and GDPR (European Union), you have the right to request information about collected data and, where applicable, its deletion.",
      },
    },
    {
      heading: { "pt-br": "6. Contato", en: "6. Contact" },
      body: {
        "pt-br":
          "Para dúvidas sobre esta política, entre em contato através da página de Contato do site.",
        en: "For questions about this policy, please reach out through the site's Contact page.",
      },
    },
  ] as { heading: LocalizedString; body: LocalizedString }[],
};