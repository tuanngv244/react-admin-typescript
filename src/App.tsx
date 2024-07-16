import "@/languages/index";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { ELanguages } from "./constants/i18n";
import { initLanguage, setLanguage } from "./languages";

function App() {
  const { t } = useTranslation();

  const _onLanguageChange = (language: ELanguages) => setLanguage(language);

  useEffect(() => {
    initLanguage();
  }, []);
  return (
    <div>
      {t("COMMON.save")}
      {t("COMMON.cancel")}
      <button onClick={() => _onLanguageChange(ELanguages.EN)}>English</button>
      <button onClick={() => _onLanguageChange(ELanguages.VI)}>
        Vietnamese
      </button>
    </div>
  );
}

export default App;
