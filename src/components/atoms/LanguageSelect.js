import React, { useEffect } from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FormControl, Select } from '@mui/material';
import { MenuItem } from '@mui/material';

const languageCodes = {
    en: "English",
    ka: "Georgian"
};

export const LanguageSelect = () => {

    const [langCode, setLangCode] = useState(() => {
        const storedLangCode = localStorage.getItem('langCode');
        return storedLangCode ? storedLangCode : 'en';
    });

    const { i18n } = useTranslation();

    useEffect(() => {
        i18n.changeLanguage(langCode);
        localStorage.setItem("langCode", langCode);
    }, [langCode]);

    return (
        <FormControl sx={{ minWidth: 120, m: 1 }}>
            <Select sx={{ color: "#FF9900", border: '2px solid blue' }} value={langCode} onChange={(e) => {
                setLangCode(e.target.value);
            }} >
                {Object.entries(languageCodes).map((item) => {
                    const [languageKey, languageValue] = item;
                    return (
                        <MenuItem key={languageKey} value={languageKey}>
                            {languageValue}
                        </MenuItem>
                    );
                })}
            </Select>
        </FormControl>
    );
};
