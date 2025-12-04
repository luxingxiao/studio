// i18n initialization module for EEZ Studio
// Provides internationalization support using i18next

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { observable, action, makeObservable } from 'mobx';
import { resources, supportedLanguages, SupportedLanguage } from './resources';
import { isRenderer } from 'eez-studio-shared/util-electron';

// Flag to track initialization state
let isInitialized = false;
let initPromise: Promise<typeof i18n> | null = null;

/**
 * Observable i18n store for MobX integration
 * Allows reactive updates when language changes
 */
class I18nStore {
    currentLanguage: SupportedLanguage = 'en';

    constructor() {
        makeObservable(this, {
            currentLanguage: observable,
            setLanguage: action.bound
        });
    }

    async setLanguage(locale: string) {
        const language = getI18nLanguage(locale);
        this.currentLanguage = language;
        await i18n.changeLanguage(language);
    }
}

export const i18nStore = new I18nStore();

/**
 * Get the current locale from the app settings
 * Dynamically imports to avoid circular dependencies
 * Priority: localStorage uiLanguage > system locale setting
 */
function getCurrentLocale(): string {
    try {
        // First check if user has explicitly set UI language
        if (isRenderer() && typeof window !== 'undefined' && window.localStorage) {
            const savedLanguage = window.localStorage.getItem('uiLanguage');
            if (savedLanguage && supportedLanguages.includes(savedLanguage as SupportedLanguage)) {
                return savedLanguage;
            }
        }

        // Fall back to system locale
        if (isRenderer()) {
            const { getLocale } = require('eez-studio-shared/i10n');
            return getLocale();
        } else {
            const { getLocale } = require('main/settings');
            return getLocale();
        }
    } catch (e) {
        // Fallback if getLocale is not available yet
        return 'en';
    }
}

/**
 * Get the mapped i18n language code from locale setting
 * Maps locale codes like 'en-US' to supported language codes like 'en'
 */
export function getI18nLanguage(locale: string): SupportedLanguage {
    // Direct match
    if (supportedLanguages.includes(locale as SupportedLanguage)) {
        return locale as SupportedLanguage;
    }

    // Try base language (e.g., 'en-US' -> 'en')
    const baseLang = locale.split('-')[0];
    if (supportedLanguages.includes(baseLang as SupportedLanguage)) {
        return baseLang as SupportedLanguage;
    }

    // Special cases
    if (locale === 'zh' || locale === 'zh-TW' || locale === 'zh-HK') {
        return 'zh-CN'; // Default Chinese to Simplified
    }

    // Fallback to English
    return 'en';
}

/**
 * Initialize i18next for the renderer process
 * Should be called early in the application startup
 */
export async function initI18n(locale: string): Promise<typeof i18n> {
    if (isInitialized) {
        // If already initialized, just change language
        await i18n.changeLanguage(getI18nLanguage(locale));
        return i18n;
    }

    const language = getI18nLanguage(locale);

    await i18n
        .use(initReactI18next)
        .init({
            resources,
            lng: language,
            fallbackLng: 'en',

            // Namespaces
            defaultNS: 'common',
            ns: ['common', 'home', 'menu', 'projectEditor', 'dialogs'],

            // Interpolation settings
            interpolation: {
                escapeValue: false, // React already escapes
            },

            // React settings
            react: {
                useSuspense: false, // Disable suspense for compatibility
            },

            // Debug in development
            debug: process.env.NODE_ENV === 'development',

            // Key separator for nested keys
            keySeparator: '.',

            // Namespace separator
            nsSeparator: ':',

            // Return empty string for missing keys in development
            returnEmptyString: false,

            // Plural handling
            pluralSeparator: '_',
            contextSeparator: '_',
        });

    isInitialized = true;
    return i18n;
}

/**
 * Initialize i18next synchronously for the main process
 * Main process doesn't use React, so no need for react-i18next
 */
export function initI18nSync(locale: string): typeof i18n {
    if (isInitialized) {
        i18n.changeLanguage(getI18nLanguage(locale));
        return i18n;
    }

    const language = getI18nLanguage(locale);

    i18n.init({
        resources,
        lng: language,
        fallbackLng: 'en',
        defaultNS: 'common',
        ns: ['common', 'home', 'menu', 'projectEditor', 'dialogs'],
        interpolation: {
            escapeValue: false,
        },
        initImmediate: false, // Synchronous initialization
        keySeparator: '.',
        nsSeparator: ':',
        returnEmptyString: false,
        pluralSeparator: '_',
        contextSeparator: '_',
    });

    isInitialized = true;
    return i18n;
}

/**
 * Change the current language
 */
export async function changeLanguage(locale: string): Promise<void> {
    await i18nStore.setLanguage(locale);
}

/**
 * Get the current language
 */
export function getCurrentLanguage(): string {
    return i18n.language || 'en';
}

/**
 * Translation function shorthand
 * Can be used in non-React contexts
 */
export const t = i18n.t.bind(i18n);

// Re-export react-i18next hooks for use in React components
export { useTranslation, Trans, withTranslation } from 'react-i18next';
export type { WithTranslation } from 'react-i18next';

// Re-export resources helpers for language selection UI
export { supportedLanguages, languageNames } from './resources';
export type { SupportedLanguage } from './resources';

// Export i18n instance for direct access
export { i18n };
export default i18n;

/**
 * Auto-initialize i18n when this module is imported
 * Uses the current locale from settings or falls back to 'en'
 */
function autoInit(): void {
    if (isInitialized || initPromise) {
        return;
    }

    const locale = getCurrentLocale();
    i18nStore.currentLanguage = getI18nLanguage(locale);

    if (isRenderer()) {
        // Async initialization for renderer process
        initPromise = initI18n(locale);
    } else {
        // Sync initialization for main process
        initI18nSync(locale);
    }
}

// Auto-initialize on module load
autoInit();
