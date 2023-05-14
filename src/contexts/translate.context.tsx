import { createContext, useCallback, useContext, useEffect, useState } from 'react';

import en from '../assets/translation/en';
import hu from '../assets/translation/hu';
import { Storage } from '../libs/storage';
import { Children } from './auth.context';

export type LangKey = keyof typeof en;

export enum AvailableLang {
    en = 'en',
    hu = 'hu'
}

const TranslateContext = createContext({
    lang: AvailableLang,
    changeLang: (newLang: AvailableLang) => {
    },
    trans: (key: LangKey) => '',
});

export const WithTranslateContext = ({ children }: { children: Children }) => {
    const [lang, setLang] = useState<AvailableLang>(AvailableLang.en);
    const storage = new Storage('lang');
    useEffect(() => {
        const savedLang = storage.get();

        if (savedLang) {
            setLang(savedLang);
        }
    }, []);

    const changeLang = useCallback((newLang: AvailableLang) => {
        const langToChangeTo = newLang ?? AvailableLang.en;
        setLang(langToChangeTo);
        storage.set(langToChangeTo);
    }, []);

    const trans = useCallback((key: LangKey): string => {
        switch (lang) {
            case AvailableLang.en:
                return en?.[key] || key;
            case AvailableLang.hu:
                return hu?.[key] || key;
            default:
                return key;
        }
    }, [lang]);

    return <TranslateContext.Provider value={{ lang, trans, changeLang }}>
        {children}
    </TranslateContext.Provider>;
};

export const useTranslateContext = () => useContext(TranslateContext);
