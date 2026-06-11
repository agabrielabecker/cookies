// Objeto com traduções para os idiomas disponíveis.
const translations = {
  pt: {
    title: "Bem-vindo",
    subtitle: "Personalize o idioma da interface com cookies.",
    chooseLanguage: "Escolha o idioma:",
    description:
      "Este exemplo salva sua preferência em um cookie. Na próxima vez, o site carregará no idioma escolhido automaticamente.",
    point1: "Texto da interface ajustado dinamicamente.",
    point2: "O cookie expira em 30 dias.",
    point3: "Pode mudar a linguagem a qualquer momento.",
    resetButton: "Redefinir idioma",
  },
  en: {
    title: "Welcome",
    subtitle: "Customize the interface language using cookies.",
    chooseLanguage: "Choose language:",
    description:
      "This example saves your preference in a cookie. Next time, the site will load in the selected language automatically.",
    point1: "Interface text is updated dynamically.",
    point2: "The cookie expires in 30 days.",
    point3: "You can change the language anytime.",
    resetButton: "Reset language",
  },
};

// Captura os elementos do DOM que controlam o idioma e as traduções.
const languageSelect = document.getElementById("language-select");
const resetButton = document.getElementById("reset-button");
const i18nElements = document.querySelectorAll("[data-i18n]");

// Define um cookie com nome, valor e tempo de expiração em dias.
function setCookie(name, value, days) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
}

// Lê o valor de um cookie pelo nome, retornando undefined se não existir.
function getCookie(name) {
  return document.cookie
    .split("; ")
    .find((cookie) => cookie.startsWith(`${name}=`))
    ?.split("=")[1];
}

// Aplica o idioma selecionado em todos os elementos marcados com data-i18n.
function applyLanguage(lang) {
  const translation = translations[lang] || translations.pt;
  i18nElements.forEach((element) => {
    const key = element.getAttribute("data-i18n");
    if (translation[key]) {
      element.textContent = translation[key];
    }
  });
  // Atualiza o valor do seletor para refletir o idioma atual.
  languageSelect.value = lang;
}

// Inicializa o idioma ao carregar a página, usando cookie salvo ou padrão pt.
function initLanguage() {
  const savedLang = getCookie("preferredLanguage");
  const lang = savedLang ? decodeURIComponent(savedLang) : "pt";
  applyLanguage(lang);
}

// Quando o usuário muda o idioma, salva a escolha em cookie e aplica a tradução.
languageSelect.addEventListener("change", (event) => {
  const selectedLang = event.target.value;
  setCookie("preferredLanguage", selectedLang, 30);
  applyLanguage(selectedLang);
});

// Botão que redefine o idioma para português e atualiza o cookie.
resetButton.addEventListener("click", () => {
  setCookie("preferredLanguage", "pt", 30);
  applyLanguage("pt");
});

// Chama a rotina de inicialização de idioma ao carregar o script.
initLanguage();
