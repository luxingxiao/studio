// i18n resources - statically import all translation files for offline bundling
// This file is auto-generated structure, translations are in packages/locales/

import commonEn from '../../locales/en/common.json';
import homeEn from '../../locales/en/home.json';
import menuEn from '../../locales/en/menu.json';
import projectEditorEn from '../../locales/en/projectEditor.json';
import dialogsEn from '../../locales/en/dialogs.json';
import wizardEn from '../../locales/en/wizard.json';
import extensionsEn from '../../locales/en/extensions.json';

import commonZhCN from '../../locales/zh-CN/common.json';
import homeZhCN from '../../locales/zh-CN/home.json';
import menuZhCN from '../../locales/zh-CN/menu.json';
import projectEditorZhCN from '../../locales/zh-CN/projectEditor.json';
import dialogsZhCN from '../../locales/zh-CN/dialogs.json';
import wizardZhCN from '../../locales/zh-CN/wizard.json';
import extensionsZhCN from '../../locales/zh-CN/extensions.json';

export const resources = {
    en: {
        common: commonEn,
        home: homeEn,
        menu: menuEn,
        projectEditor: projectEditorEn,
        dialogs: dialogsEn,
        wizard: wizardEn,
        extensions: extensionsEn,
    },
    'zh-CN': {
        common: commonZhCN,
        home: homeZhCN,
        menu: menuZhCN,
        projectEditor: projectEditorZhCN,
        dialogs: dialogsZhCN,
        wizard: wizardZhCN,
        extensions: extensionsZhCN,
    },
};

export const supportedLanguages = ['en', 'zh-CN'] as const;
export type SupportedLanguage = typeof supportedLanguages[number];

export const languageNames: Record<SupportedLanguage, string> = {
    'en': 'English',
    'zh-CN': '简体中文',
};
