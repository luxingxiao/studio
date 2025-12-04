// Main process i18n module
// Provides translation functions for the main process (menu, dialogs, etc.)

import { initI18nSync, t as translate, getI18nLanguage } from 'eez-studio-shared/i18n';
import { getUiLanguage } from 'main/settings';
import i18n from 'i18next';

let isInitialized = false;

/**
 * Initialize i18n for main process
 * Should be called after settings are loaded
 */
export function initMainI18n(): void {
    if (isInitialized) return;

    // Use uiLanguage instead of locale for UI translations
    const language = getUiLanguage();
    initI18nSync(language);
    isInitialized = true;
}

/**
 * Update the main process i18n language when user changes it
 */
export function updateMainI18nLanguage(language: string): void {
    if (isInitialized) {
        i18n.changeLanguage(language);
    }
}

/**
 * Get translation for main process
 * Wrapper around i18next t function
 */
export function t(key: string, options?: Record<string, any>): string {
    if (!isInitialized) {
        initMainI18n();
    }
    return translate(key, options);
}

/**
 * Get translation with namespace
 */
export function tNs(namespace: string, key: string, options?: Record<string, any>): string {
    return t(`${namespace}:${key}`, options);
}

/**
 * Menu-specific translations
 */
export function tMenu(key: string, options?: Record<string, any>): string {
    return t(`menu:${key}`, options);
}

/**
 * Dialog-specific translations
 */
export function tDialog(key: string, options?: Record<string, any>): string {
    return t(`dialogs:${key}`, options);
}

/**
 * Update language when settings change
 */
export async function updateLanguage(locale: string): Promise<void> {
    await i18n.changeLanguage(locale);
}

export { getI18nLanguage };
