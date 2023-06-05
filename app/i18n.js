import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector"

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
    'en': {
        translation: {
            siteTitle: 'Website Title',
            enterURL: 'Enter website URL',
            enterName: 'Enter website name',
            addButton: 'Add',
        }
    },
    'zh-Hans': {
        translation: {
            siteTitle: '网站标题',
            enterURL: '输入网站URL',
            enterName: '输入网站名称',
            addButton: '新增',
        }
    },
    'ja': {
        translation: {
            siteTitle: 'ウェブサイトのタイトル',
            enterURL: 'ウェブサイトのURLを入力してください',
            enterName: 'ウェブサイトの名前を入力してください',
            addButton: '追加',
        }
    },
    'zh-Hant': {
        translation: {
            siteTitle: '網站標題',
            enterURL: '輸入網站URL',
            enterName: '輸入網站名稱',
            addButton: '新增',
        }
    }
};

i18n
    .use(LanguageDetector)
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources,
        interpolation: {
            escapeValue: false // react already safes from xss
        }
    });

export default i18n;