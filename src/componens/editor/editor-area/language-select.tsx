import { useUnit } from "effector-react";
import { Select } from "antd";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { languages, mapEditorLangToFile } from "../utils";
import { $docs, $language, changeLanguage } from "../model";
import { useDoc } from "../useDoc";

export const LanguageSelect = () => {
  const language = useUnit($language);
  const onChangeLang = useUnit(changeLanguage);

  const doc = useDoc();

  const type = doc?.type;

  useEffect(() => {
    if (!!type) {
      // @TODO вынести в модель
      onChangeLang(mapEditorLangToFile(type));
    }
  }, [type, onChangeLang]);

  return (
    <Select
      onChange={onChangeLang}
      style={{ width: 150 }}
      value={language}
      size="small"
      options={languages}
    />
  );
};
