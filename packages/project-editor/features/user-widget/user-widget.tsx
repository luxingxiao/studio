import { PropertyType } from "project-editor/core/object";
import type { ProjectEditorFeature } from "project-editor/store/features";
import { t as translate } from "eez-studio-shared/i18n";

import { Page } from "project-editor/features/page/page";

////////////////////////////////////////////////////////////////////////////////

const feature: ProjectEditorFeature = {
    name: "eezstudio-project-feature-user-widget",
    version: "0.1.0",
    get description() {
        return translate("projectEditor:features.userWidgetsDescription");
    },
    author: "EEZ",
    authorLogo: "../eez-studio-ui/_images/eez_logo.png",
    get displayName() {
        return translate("projectEditor:features.userWidgetsDisplayName");
    },
    mandatory: true,
    key: "userWidgets",
    type: PropertyType.Array,
    typeClass: Page,
    icon: "svg:user_widgets",
    create: () => []
};

export default feature;
