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

const languageSelect = document.getElementById("language-select");
const resetButton = document.getElementById("reset-button");
const i18nElements = document.querySelectorAll("[data-i18n]");

function setCookie(name, value, days) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
}

function getCookie(name) {
  return document.cookie
    .split("; ")
    .find((cookie) => cookie.startsWith(`${name}=`))
    ?.split("=")[1];
}

function applyLanguage(lang) {
  const translation = translations[lang] || translations.pt;
  i18nElements.forEach((element) => {
    const key = element.getAttribute("data-i18n");
    if (translation[key]) {
      element.textContent = translation[key];
    }
  });
  languageSelect.value = lang;
}

function initLanguage() {
  const savedLang = getCookie("preferredLanguage");
  const lang = savedLang ? decodeURIComponent(savedLang) : "pt";
  applyLanguage(lang);
}

languageSelect.addEventListener("change", (event) => {
  const selectedLang = event.target.value;
  setCookie("preferredLanguage", selectedLang, 30);
  applyLanguage(selectedLang);
});

resetButton.addEventListener("click", () => {
  setCookie("preferredLanguage", "pt", 30);
  applyLanguage("pt");
});

initLanguage();
