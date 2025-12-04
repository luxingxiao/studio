import React from "react";

import { action, computed, makeObservable } from "mobx";
import { observable } from "mobx";
import * as FlexLayout from "flexlayout-react";

import { Icon } from "eez-studio-ui/icon";
import {
    AbstractLayoutModels,
    ILayoutModel
} from "eez-studio-ui/layout-models";
import { t as translate } from "eez-studio-shared/i18n";

import type { ProjectStore } from "project-editor/store";
import { settingsController } from "home/settings";

function tLayout(key: string): string {
    return translate(`projectEditor:layoutTabs.${key}`);
}

////////////////////////////////////////////////////////////////////////////////

export class LayoutModels extends AbstractLayoutModels {
    static GLOBAL_OPTIONS = {
        borderEnableAutoHide: true,
        splitterSize: 4,
        splitterExtra: 4,
        legacyOverflowMenu: false,
        tabEnableRename: false
    };

    static PAGES_TAB_ID = "PAGES";
    static USER_WIDGETS_TAB_ID = "WIDGETS";
    static ACTIONS_TAB_ID = "ACTIONS";
    static VARIABLES_TAB_ID = "VARIABLES";
    static CHECKS_TAB_ID = "CHECKS";
    static OUTPUT_TAB_ID = "OUTPUT";
    static SEARCH_TAB_ID = "SEARCH";
    static REFERENCES_TAB_ID = "REFERENCES";
    static EDITOR_MODE_EDITORS_TABSET_ID = "EDITORS";
    static RUNTIME_MODE_EDITORS_TABSET_ID = "RUNTIME-EDITORS";
    static PROPERTIES_TAB_ID = "PROPERTIES";
    static COMPONENTS_PALETTE_TAB_ID = "COMPONENTS_PALETTE";
    static BREAKPOINTS_TAB_ID = "BREAKPOINTS_PALETTE";
    static DEBUGGER_TAB_ID = "DEBUGGER";
    static DEBUGGER_LOGS_TAB_ID = "DEBUGGER_LOGS";

    static SCPI_SUBSYSTEMS_TAB_ID = "SCPI_SUBSYSTEMS";
    static SCPI_ENUMS_TAB_ID = "SCPI_ENUMS";
    static SCPI_COMMANDS_TAB_ID = "SCPI_COMMANDS";

    static LANGUAGES_TAB_ID = "LANGUAGES";
    static TEXT_RESOURCES_TAB_ID = "TEXT_RESOURCES";
    static TEXTS_STATISTICS_TAB_ID = "TEXTS_STATISTICS";

    static STYLES_TAB_ID = "styles";
    static FONTS_TAB_ID = "fonts";
    static BITMAPS_TAB_ID = "bitmaps";
    static THEMES_TAB_ID = "themes";
    static TEXTS_TAB_ID = "texts";
    static SCPI_TAB_ID = "scpi";
    static INSTRUMENT_COMMANDS_TAB_ID = "instrument-commands";
    static EXTENSION_DEFINITIONS_TAB_ID = "iext";
    static CHANGES_TAB_ID = "changes";
    static MICRO_PYTHON_TAB_ID = "micro-python";
    static README_TAB_ID = "readme";
    static LVGL_GROUPS_TAB_ID = "lvgl-groups";

    static get PAGES_TAB(): FlexLayout.IJsonTabNode {
        return {
            type: "tab",
            enableClose: false,
            name: tLayout("pages"),
            component: "pages",
            icon: "svg:pages",
            id: LayoutModels.PAGES_TAB_ID
        };
    }
    static get WIDGETS_TAB(): FlexLayout.IJsonTabNode {
        return {
            type: "tab",
            enableClose: false,
            name: tLayout("userWidgets"),
            component: "widgets",
            icon: "svg:user_widgets",
            id: LayoutModels.USER_WIDGETS_TAB_ID
        };
    }
    static get ACTIONS_TAB(): FlexLayout.IJsonTabNode {
        return {
            type: "tab",
            enableClose: false,
            name: tLayout("userActions"),
            component: "actions",
            icon: "material:code",
            id: LayoutModels.ACTIONS_TAB_ID
        };
    }

    static get STYLES_TAB(): FlexLayout.IJsonTabNode {
        return {
            type: "tab",
            enableClose: false,
            name: tLayout("styles"),
            id: LayoutModels.STYLES_TAB_ID,
            component: "styles",
            icon: "material:format_color_fill"
        };
    }

    static get FONTS_TAB(): FlexLayout.IJsonTabNode {
        return {
            type: "tab",
            enableClose: false,
            name: tLayout("fonts"),
            id: LayoutModels.FONTS_TAB_ID,
            component: "fonts",
            icon: "material:font_download"
        };
    }

    static get BITMAPS_TAB(): FlexLayout.IJsonTabNode {
        return {
            type: "tab",
            enableClose: false,
            name: tLayout("bitmaps"),
            id: LayoutModels.BITMAPS_TAB_ID,
            component: "bitmaps",
            icon: "material:image"
        };
    }

    static get THEMES_TAB(): FlexLayout.IJsonTabNode {
        return {
            type: "tab",
            enableClose: false,
            name: tLayout("themes"),
            id: LayoutModels.THEMES_TAB_ID,
            component: "themesSideView",
            icon: "svg:palette"
        };
    }

    static get TEXTS_TAB(): FlexLayout.IJsonTabNode {
        return {
            type: "tab",
            enableClose: false,
            name: tLayout("texts"),
            id: LayoutModels.TEXTS_TAB_ID,
            component: "texts",
            icon: "svg:language"
        };
    }

    static get SCPI_TAB(): FlexLayout.IJsonTabNode {
        return {
            type: "tab",
            enableClose: false,
            name: tLayout("scpi"),
            id: LayoutModels.SCPI_TAB_ID,
            component: "scpi",
            icon: "material:navigate_next"
        };
    }

    static get INSTRUMENT_COMMANDS_TAB(): FlexLayout.IJsonTabNode {
        return {
            type: "tab",
            enableClose: false,
            name: tLayout("instrumentCommands"),
            id: LayoutModels.INSTRUMENT_COMMANDS_TAB_ID,
            component: "instrument-commands",
            icon: "material:navigate_next"
        };
    }

    static get EXTENSION_DEFINITIONS_TAB(): FlexLayout.IJsonTabNode {
        return {
            type: "tab",
            enableClose: false,
            name: tLayout("iext"),
            id: LayoutModels.EXTENSION_DEFINITIONS_TAB_ID,
            component: "extension-definitions",
            icon: "material:extension"
        };
    }

    static get CHANGES_TAB(): FlexLayout.IJsonTabNode {
        return {
            type: "tab",
            enableClose: false,
            name: tLayout("changes"),
            id: LayoutModels.CHANGES_TAB_ID,
            component: "changes",
            icon: "svg:changes"
        };
    }

    static get BREAKPOINTS_TAB(): FlexLayout.IJsonTabNode {
        return {
            type: "tab",
            enableClose: false,
            name: tLayout("breakpoints"),
            id: LayoutModels.BREAKPOINTS_TAB_ID,
            icon: "svg:breakpoints_panel",
            component: "breakpointsPanel"
        };
    }

    static get LVGL_GROUPS_TAB(): FlexLayout.IJsonTabNode {
        return {
            type: "tab",
            enableClose: false,
            name: tLayout("groups"),
            id: LayoutModels.LVGL_GROUPS_TAB_ID,
            component: "lvgl-groups",
            icon: "material:view_compact"
        };
    }

    static get COMPONENTS_PALETTE_TAB(): FlexLayout.IJsonTabNode {
        return {
            type: "tab",
            enableClose: false,
            name: tLayout("componentsPalette"),
            id: LayoutModels.COMPONENTS_PALETTE_TAB_ID,
            component: "componentsPalette",
            icon: "svg:components"
        };
    }

    static iconFactory = (node: FlexLayout.TabNode) => {
        let icon = node.getIcon();
        if (!icon || typeof icon != "string") {
            return null;
        }
        return <Icon icon={icon} size={20} />;
    };

    // Tab name translation map for onRenderTab callback
    static TAB_NAME_TRANSLATION_MAP: { [key: string]: string } = {
        [LayoutModels.PAGES_TAB_ID]: "pages",
        [LayoutModels.USER_WIDGETS_TAB_ID]: "userWidgets",
        [LayoutModels.ACTIONS_TAB_ID]: "userActions",
        [LayoutModels.STYLES_TAB_ID]: "styles",
        [LayoutModels.FONTS_TAB_ID]: "fonts",
        [LayoutModels.BITMAPS_TAB_ID]: "bitmaps",
        [LayoutModels.THEMES_TAB_ID]: "themes",
        [LayoutModels.TEXTS_TAB_ID]: "texts",
        [LayoutModels.SCPI_TAB_ID]: "scpi",
        [LayoutModels.INSTRUMENT_COMMANDS_TAB_ID]: "instrumentCommands",
        [LayoutModels.EXTENSION_DEFINITIONS_TAB_ID]: "iext",
        [LayoutModels.CHANGES_TAB_ID]: "changes",
        [LayoutModels.BREAKPOINTS_TAB_ID]: "breakpoints",
        [LayoutModels.LVGL_GROUPS_TAB_ID]: "groups",
        [LayoutModels.COMPONENTS_PALETTE_TAB_ID]: "componentsPalette",
        [LayoutModels.CHECKS_TAB_ID]: "checks",
        [LayoutModels.OUTPUT_TAB_ID]: "output",
        [LayoutModels.SEARCH_TAB_ID]: "search",
        [LayoutModels.REFERENCES_TAB_ID]: "references",
        [LayoutModels.VARIABLES_TAB_ID]: "variables",
        [LayoutModels.PROPERTIES_TAB_ID]: "properties",
        [LayoutModels.DEBUGGER_LOGS_TAB_ID]: "logs",
        [LayoutModels.SCPI_SUBSYSTEMS_TAB_ID]: "subsystems",
        [LayoutModels.SCPI_ENUMS_TAB_ID]: "enums",
        [LayoutModels.SCPI_COMMANDS_TAB_ID]: "commands",
        [LayoutModels.TEXT_RESOURCES_TAB_ID]: "textResources",
        [LayoutModels.LANGUAGES_TAB_ID]: "languages",
        [LayoutModels.TEXTS_STATISTICS_TAB_ID]: "statistics"
    };

    // Component name to translation key map
    static COMPONENT_NAME_TRANSLATION_MAP: { [key: string]: string } = {
        "flow-structure": "widgetsStructure",
        "active-flows": "activeFlows",
        "watch": "watch",
        "queue": "queue",
        "logs": "logs",
        "preview": "preview",
        "groups": "groups",
        "order": "groupWidgets",
        "bitmaps": "bitmaps",
        "styles": "styles",
        "subsystems": "subsystems",
        "enums": "enums",
        "commands": "commands",
        "resources": "textResources",
        "languages": "languages",
        "statistics": "statistics"
    };

    // Helper method to translate tab names in onRenderTab callback
    static translateTabName(
        node: FlexLayout.TabNode,
        renderValues: FlexLayout.ITabRenderValues
    ) {
        const tabId = node.getId();
        const component = node.getComponent();

        // Try to translate by tab ID first
        if (LayoutModels.TAB_NAME_TRANSLATION_MAP[tabId]) {
            const translatedName = tLayout(LayoutModels.TAB_NAME_TRANSLATION_MAP[tabId]);
            if (translatedName && !translatedName.startsWith("projectEditor:")) {
                renderValues.content = translatedName;
            }
        }
        // Then try to translate by component name
        else if (component && LayoutModels.COMPONENT_NAME_TRANSLATION_MAP[component]) {
            const translatedName = tLayout(LayoutModels.COMPONENT_NAME_TRANSLATION_MAP[component]);
            if (translatedName && !translatedName.startsWith("projectEditor:")) {
                renderValues.content = translatedName;
            }
        }
    }

    rootEditor: FlexLayout.Model;
    rootEditorForIEXT: FlexLayout.Model;
    rootRuntime: FlexLayout.Model;

    get root() {
        if (this.projectStore.projectTypeTraits.isIEXT) {
            return this.rootEditorForIEXT;
        }
        return this.projectStore.runtime ? this.rootRuntime : this.rootEditor;
    }

    styles: FlexLayout.Model;
    lvglStyles: FlexLayout.Model;
    bitmaps: FlexLayout.Model;
    fonts: FlexLayout.Model;
    themes: FlexLayout.Model;
    scpi: FlexLayout.Model;
    texts: FlexLayout.Model;
    lvglGroups: FlexLayout.Model;

    constructor(public projectStore: ProjectStore) {
        super();

        makeObservable(this, {
            rootEditor: observable,
            rootRuntime: observable,
            root: computed,

            styles: observable,
            bitmaps: observable,
            fonts: observable,
            themes: observable,
            scpi: observable,
            texts: observable
        });
    }

    get borders() {
        const borders: FlexLayout.IJsonBorderNode[] = [
            {
                type: "border",
                location: "top",
                children: []
            }
        ];

        borders.push({
            type: "border",
            location: "right",
            size: 240,
            children: [
                LayoutModels.STYLES_TAB,
                LayoutModels.FONTS_TAB,
                LayoutModels.BITMAPS_TAB,
                LayoutModels.THEMES_TAB,
                LayoutModels.LVGL_GROUPS_TAB,
                LayoutModels.BREAKPOINTS_TAB
            ]
        });

        borders.push({
            type: "border",
            location: "bottom",
            children: [
                {
                    type: "tab",
                    enableClose: false,
                    name: tLayout("checks"),
                    id: LayoutModels.CHECKS_TAB_ID,
                    component: "checksMessages"
                },
                {
                    type: "tab",
                    enableClose: false,
                    name: tLayout("output"),
                    id: LayoutModels.OUTPUT_TAB_ID,
                    component: "outputMessages"
                },
                {
                    type: "tab",
                    enableClose: false,
                    name: tLayout("search"),
                    id: LayoutModels.SEARCH_TAB_ID,
                    component: "search"
                },
                {
                    type: "tab",
                    enableClose: false,
                    name: tLayout("references"),
                    id: LayoutModels.REFERENCES_TAB_ID,
                    component: "references"
                }
            ]
        });

        borders.push({
            type: "border",
            location: "left",
            size: 240,
            children: [
                LayoutModels.TEXTS_TAB,
                LayoutModels.SCPI_TAB,
                LayoutModels.INSTRUMENT_COMMANDS_TAB,
                LayoutModels.EXTENSION_DEFINITIONS_TAB,
                LayoutModels.CHANGES_TAB
            ]
        });

        return borders;
    }

    get bordersIEXT() {
        const borders: FlexLayout.IJsonBorderNode[] = [
            {
                type: "border",
                location: "top",
                children: []
            }
        ];

        borders.push({
            type: "border",
            location: "right",
            size: 240,
            children: []
        });

        borders.push({
            type: "border",
            location: "bottom",
            children: [
                {
                    type: "tab",
                    enableClose: false,
                    name: tLayout("checks"),
                    id: LayoutModels.CHECKS_TAB_ID,
                    component: "checksMessages"
                },
                {
                    type: "tab",
                    enableClose: false,
                    name: tLayout("output"),
                    id: LayoutModels.OUTPUT_TAB_ID,
                    component: "outputMessages"
                },
                {
                    type: "tab",
                    enableClose: false,
                    name: tLayout("search"),
                    id: LayoutModels.SEARCH_TAB_ID,
                    component: "search"
                },
                {
                    type: "tab",
                    enableClose: false,
                    name: tLayout("references"),
                    id: LayoutModels.REFERENCES_TAB_ID,
                    component: "references"
                }
            ]
        });

        borders.push({
            type: "border",
            location: "left",
            size: 240,
            children: [LayoutModels.CHANGES_TAB]
        });

        return borders;
    }

    get models(): ILayoutModel[] {
        return [
            {
                name: "rootEditor",
                version: 115,
                json: {
                    global: LayoutModels.GLOBAL_OPTIONS,
                    borders: this.borders,
                    layout: {
                        type: "row",
                        children: [
                            {
                                type: "row",
                                weight: 15,
                                children: [
                                    {
                                        type: "tabset",
                                        weight: 1,
                                        enableClose: false,
                                        children: [
                                            LayoutModels.PAGES_TAB,
                                            LayoutModels.WIDGETS_TAB,
                                            LayoutModels.ACTIONS_TAB
                                        ]
                                    },
                                    {
                                        type: "tabset",
                                        weight: 1,
                                        enableClose: false,
                                        children: [
                                            {
                                                type: "tab",
                                                enableClose: false,
                                                name: tLayout("widgetsStructure"),
                                                component: "flow-structure",
                                                icon: "svg:hierarchy"
                                            }
                                        ]
                                    },
                                    {
                                        type: "tabset",
                                        weight: 1,
                                        enableClose: false,
                                        children: [
                                            {
                                                type: "tab",
                                                enableClose: false,
                                                name: tLayout("variables"),
                                                component: "variables",
                                                icon: "svg:variable",
                                                id: LayoutModels.VARIABLES_TAB_ID
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                type: "tabset",
                                weight: 65,
                                enableDeleteWhenEmpty: false,
                                enableClose: false,
                                id: LayoutModels.EDITOR_MODE_EDITORS_TABSET_ID,
                                children: []
                            },
                            {
                                type: "row",
                                weight: 20,
                                children: [
                                    {
                                        type: "tabset",
                                        weight: 2,
                                        children: [
                                            {
                                                type: "tab",
                                                enableClose: false,
                                                name: tLayout("properties"),
                                                id: LayoutModels.PROPERTIES_TAB_ID,
                                                component: "propertiesPanel",
                                                icon: "svg:properties"
                                            }
                                        ]
                                    },
                                    {
                                        type: "tabset",
                                        weight: 1,
                                        children: [
                                            LayoutModels.COMPONENTS_PALETTE_TAB
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                },
                get: () => this.rootEditor,
                set: action(model => (this.rootEditor = model))
            },
            {
                name: "rootEditorForIEXT",
                version: 5,
                json: {
                    global: LayoutModels.GLOBAL_OPTIONS,
                    borders: this.bordersIEXT,
                    layout: {
                        type: "row",
                        children: [
                            {
                                type: "row",
                                weight: 0,
                                width: 350,
                                children: [
                                    {
                                        type: "tabset",
                                        weight: 1,
                                        enableClose: false,
                                        children: [
                                            LayoutModels.EXTENSION_DEFINITIONS_TAB
                                        ]
                                    },
                                    {
                                        type: "tabset",
                                        weight: 5,
                                        enableClose: false,
                                        children: [LayoutModels.SCPI_TAB]
                                    },
                                    {
                                        type: "tabset",
                                        weight: 5,
                                        enableClose: false,
                                        children: [
                                            LayoutModels.INSTRUMENT_COMMANDS_TAB
                                        ]
                                    }
                                ]
                            },
                            {
                                type: "tabset",
                                weight: 1,
                                enableClose: false,
                                enableDeleteWhenEmpty: false,
                                id: LayoutModels.EDITOR_MODE_EDITORS_TABSET_ID,
                                children: []
                            },
                            {
                                type: "row",
                                weight: 0,
                                width: 420,
                                children: [
                                    {
                                        type: "tabset",
                                        weight: 2,
                                        children: [
                                            {
                                                type: "tab",
                                                enableClose: false,
                                                name: tLayout("properties"),
                                                id: LayoutModels.PROPERTIES_TAB_ID,
                                                component: "propertiesPanel",
                                                icon: "svg:properties"
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                },
                get: () => this.rootEditorForIEXT,
                set: action(model => (this.rootEditorForIEXT = model))
            },
            {
                name: "rootRuntime",
                version: 54,
                json: {
                    global: LayoutModels.GLOBAL_OPTIONS,
                    layout: {
                        type: "row",
                        children: [
                            {
                                type: "row",
                                weight: 0,
                                width: 320,
                                children: [
                                    {
                                        type: "tabset",
                                        weight: 1,
                                        children: [
                                            LayoutModels.PAGES_TAB,
                                            LayoutModels.WIDGETS_TAB,
                                            LayoutModels.ACTIONS_TAB
                                        ]
                                    },
                                    {
                                        type: "tabset",
                                        weight: 1,
                                        children: [
                                            {
                                                type: "tab",
                                                enableClose: false,
                                                name: tLayout("activeFlows"),
                                                icon: "svg:active_flows_panel",
                                                component: "active-flows"
                                            }
                                        ]
                                    },
                                    {
                                        type: "tabset",
                                        weight: 2,
                                        children: [
                                            {
                                                type: "tab",
                                                enableClose: false,
                                                name: tLayout("watch"),
                                                icon: "svg:watch_panel",
                                                component: "watch"
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                type: "tabset",
                                weight: 1,
                                enableClose: false,
                                enableDeleteWhenEmpty: false,
                                id: LayoutModels.RUNTIME_MODE_EDITORS_TABSET_ID,
                                children: []
                            },
                            {
                                type: "row",
                                weight: 0,
                                width: 320,
                                children: [
                                    {
                                        type: "tabset",
                                        weight: 1,
                                        children: [
                                            {
                                                type: "tab",
                                                enableClose: false,
                                                name: tLayout("queue"),
                                                icon: "svg:queue_panel",
                                                component: "queue"
                                            },
                                            LayoutModels.BREAKPOINTS_TAB
                                        ]
                                    },
                                    {
                                        type: "tabset",
                                        weight: 2,
                                        children: [
                                            {
                                                type: "tab",
                                                enableClose: false,
                                                name: tLayout("logs"),
                                                id: LayoutModels.DEBUGGER_LOGS_TAB_ID,
                                                icon: "svg:log",
                                                component: "logs"
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                },
                get: () => this.rootRuntime,
                set: action(model => (this.rootRuntime = model))
            },
            {
                name: "bitmaps",
                version: 2,
                json: {
                    global: LayoutModels.GLOBAL_OPTIONS,
                    borders: [],
                    layout: {
                        type: "row",
                        children: [
                            {
                                type: "row",
                                children: [
                                    {
                                        type: "tabset",
                                        enableTabStrip: false,
                                        enableDrag: false,
                                        enableDrop: false,
                                        enableClose: false,
                                        weight: 75,
                                        children: [
                                            {
                                                type: "tab",
                                                enableClose: false,
                                                name: tLayout("bitmaps"),
                                                component: "bitmaps"
                                            }
                                        ]
                                    },
                                    {
                                        type: "tabset",
                                        enableTabStrip: false,
                                        enableDrag: false,
                                        enableDrop: false,
                                        enableClose: false,
                                        weight: 25,
                                        children: [
                                            {
                                                type: "tab",
                                                enableClose: false,
                                                name: tLayout("preview"),
                                                component: "preview"
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                },
                get: () => this.bitmaps,
                set: action(model => (this.bitmaps = model))
            },
            {
                name: "fonts",
                version: 1,
                json: {
                    global: LayoutModels.GLOBAL_OPTIONS,
                    borders: [],
                    layout: {
                        type: "row",
                        children: [
                            {
                                type: "tabset",
                                enableTabStrip: false,
                                enableDrag: false,
                                enableDrop: false,
                                enableClose: false,
                                children: [
                                    {
                                        type: "tab",
                                        enableClose: false,
                                        component: "glyphs"
                                    }
                                ]
                            },
                            {
                                type: "tabset",
                                enableTabStrip: false,
                                enableDrag: false,
                                enableDrop: false,
                                enableClose: false,
                                children: [
                                    {
                                        type: "tab",
                                        enableClose: false,
                                        component: "editor"
                                    }
                                ]
                            }
                        ]
                    }
                },
                get: () => this.fonts,
                set: action(model => (this.fonts = model))
            },
            {
                name: "scpi",
                version: 3,
                json: {
                    global: LayoutModels.GLOBAL_OPTIONS,
                    borders: [],
                    layout: {
                        type: "row",
                        children: [
                            {
                                type: "row",
                                children: [
                                    {
                                        type: "tabset",
                                        children: [
                                            {
                                                type: "tab",
                                                enableClose: false,
                                                name: tLayout("subsystems"),
                                                id: LayoutModels.SCPI_SUBSYSTEMS_TAB_ID,
                                                component: "subsystems"
                                            },
                                            {
                                                type: "tab",
                                                enableClose: false,
                                                name: tLayout("enums"),
                                                id: LayoutModels.SCPI_ENUMS_TAB_ID,
                                                component: "enums"
                                            }
                                        ]
                                    },
                                    {
                                        type: "tabset",
                                        children: [
                                            {
                                                type: "tab",
                                                enableClose: false,
                                                name: tLayout("commands"),
                                                id: LayoutModels.SCPI_COMMANDS_TAB_ID,
                                                component: "commands"
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                },
                get: () => this.scpi,
                set: action(model => (this.scpi = model))
            },
            {
                name: "styles",
                version: 2,
                json: {
                    global: LayoutModels.GLOBAL_OPTIONS,
                    borders: [],
                    layout: {
                        type: "row",
                        children: [
                            {
                                type: "row",
                                children: [
                                    {
                                        type: "tabset",
                                        enableTabStrip: false,
                                        enableDrag: false,
                                        enableDrop: false,
                                        enableClose: false,
                                        weight: 75,
                                        children: [
                                            {
                                                type: "tab",
                                                enableClose: false,
                                                name: tLayout("styles"),
                                                component: "styles"
                                            }
                                        ]
                                    },
                                    {
                                        type: "tabset",
                                        enableTabStrip: false,
                                        enableDrag: false,
                                        enableDrop: false,
                                        enableClose: false,
                                        weight: 25,
                                        children: [
                                            {
                                                type: "tab",
                                                enableClose: false,
                                                name: tLayout("preview"),
                                                component: "preview"
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                },
                get: () => this.styles,
                set: action(model => (this.styles = model))
            },
            {
                name: "lvglStyles",
                version: 1,
                json: {
                    global: LayoutModels.GLOBAL_OPTIONS,
                    borders: [],
                    layout: {
                        type: "row",
                        children: [
                            {
                                type: "row",
                                children: [
                                    {
                                        type: "tabset",
                                        enableTabStrip: false,
                                        enableDrag: false,
                                        enableDrop: false,
                                        enableClose: false,
                                        weight: 75,
                                        children: [
                                            {
                                                type: "tab",
                                                enableClose: false,
                                                name: tLayout("styles"),
                                                component: "styles"
                                            }
                                        ]
                                    },
                                    {
                                        type: "tabset",
                                        enableTabStrip: false,
                                        enableDrag: false,
                                        enableDrop: false,
                                        enableClose: false,
                                        weight: 25,
                                        children: [
                                            {
                                                type: "tab",
                                                enableClose: false,
                                                name: tLayout("preview"),
                                                component: "preview"
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                },
                get: () => this.lvglStyles,
                set: action(model => (this.lvglStyles = model))
            },
            {
                name: "themes",
                version: 1,
                json: {
                    global: LayoutModels.GLOBAL_OPTIONS,
                    borders: [],
                    layout: {
                        type: "row",
                        children: [
                            {
                                type: "row",
                                children: [
                                    {
                                        type: "tabset",
                                        enableTabStrip: false,
                                        enableDrag: false,
                                        enableDrop: false,
                                        enableClose: false,
                                        children: [
                                            {
                                                type: "tab",
                                                enableClose: false,
                                                component: "themes"
                                            }
                                        ]
                                    },
                                    {
                                        type: "tabset",
                                        enableTabStrip: false,
                                        enableDrag: false,
                                        enableDrop: false,
                                        enableClose: false,
                                        children: [
                                            {
                                                type: "tab",
                                                enableClose: false,
                                                component: "colors"
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                },
                get: () => this.themes,
                set: action(model => (this.themes = model))
            },
            {
                name: "texts",
                version: 7,
                json: {
                    global: LayoutModels.GLOBAL_OPTIONS,
                    borders: [],
                    layout: {
                        type: "row",
                        children: [
                            {
                                type: "row",
                                children: [
                                    {
                                        type: "tabset",
                                        children: [
                                            {
                                                type: "tab",
                                                enableClose: false,
                                                name: tLayout("textResources"),
                                                id: LayoutModels.TEXT_RESOURCES_TAB_ID,
                                                component: "resources"
                                            }
                                        ]
                                    },
                                    {
                                        type: "tabset",
                                        children: [
                                            {
                                                type: "tab",
                                                enableClose: false,
                                                name: tLayout("languages"),
                                                id: LayoutModels.LANGUAGES_TAB_ID,
                                                component: "languages"
                                            }
                                        ]
                                    },
                                    {
                                        type: "tabset",
                                        children: [
                                            {
                                                type: "tab",
                                                enableClose: false,
                                                name: tLayout("statistics"),
                                                id: LayoutModels.TEXTS_STATISTICS_TAB_ID,
                                                component: "statistics"
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                },
                get: () => this.texts,
                set: action(model => (this.texts = model))
            },
            {
                name: "lvglGroups",
                version: 3,
                json: {
                    global: LayoutModels.GLOBAL_OPTIONS,
                    borders: [],
                    layout: {
                        type: "row",
                        children: [
                            {
                                type: "row",
                                children: [
                                    {
                                        type: "tabset",
                                        enableTabStrip: true,
                                        enableDrag: false,
                                        enableDrop: false,
                                        enableClose: false,
                                        weight: 50,
                                        children: [
                                            {
                                                type: "tab",
                                                enableClose: false,
                                                name: tLayout("groups"),
                                                component: "groups"
                                            }
                                        ]
                                    },
                                    {
                                        type: "tabset",
                                        enableTabStrip: true,
                                        enableDrag: false,
                                        enableDrop: false,
                                        enableClose: false,
                                        weight: 50,
                                        children: [
                                            {
                                                type: "tab",
                                                enableClose: false,
                                                name: tLayout("groupWidgets"),
                                                component: "order"
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                },
                get: () => this.lvglGroups,
                set: action(model => (this.lvglGroups = model))
            }
        ];
    }

    load(layoutModels: any) {
        super.load(layoutModels);
        this.projectStore.project.enableTabs();
    }

    selectTab(model: FlexLayout.Model, tabId: string) {
        const node = model.getNodeById(tabId);
        if (node) {
            const parentNode = node.getParent();
            let isSelected = false;

            if (parentNode instanceof FlexLayout.TabSetNode) {
                isSelected = parentNode.getSelectedNode() == node;
            } else if (parentNode instanceof FlexLayout.BorderNode) {
                isSelected = parentNode.getSelectedNode() == node;
            }

            if (!isSelected) {
                model.doAction(FlexLayout.Actions.selectTab(tabId));
            }
        }
    }

    toggleComponentsPalette() {
        settingsController.showComponentsPaletteInProjectEditor =
            !settingsController.showComponentsPaletteInProjectEditor;
        this.projectStore.project.enableTabs();
    }

    reset() {
        for (const model of this.models) {
            model.set(FlexLayout.Model.fromJson(model.json));
        }

        this.projectStore.project.enableTabs();
    }

    unmount() {}
}
