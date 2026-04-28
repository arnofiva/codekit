/**
 * Copyright 2026 Esri
 *
 * Licensed under the Apache License Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import "@esri/calcite-components/components/calcite-button";
import "@esri/calcite-components/components/calcite-chip";
import "@esri/calcite-components/components/calcite-menu";
import "@esri/calcite-components/components/calcite-menu-item";
import "@esri/calcite-components/components/calcite-navigation";
import "@esri/calcite-components/components/calcite-navigation-logo";
import "@esri/calcite-components/components/calcite-navigation-user";

import { useAuth } from "../../hooks/arcgis-auth-hooks";
import { useApp } from "../../context/App/useApp";
import { useScene } from "../../context/Scene/useScene";

const NavigationBar = () => {
  const app = useApp();
  const { webScene } = useScene();
  const auth = useAuth();

  return (
    <calcite-navigation slot="header">
      <calcite-navigation-logo
        slot="logo"
        heading={app.title}
        description="ArcGIS Maps SDK for JavaScript Code Kit"
        thumbnail="./icon-64.svg"
        onClick={() => {
          const itemPageUrl = webScene.portalItem?.itemPageUrl;
          if (itemPageUrl) {
            window.open(itemPageUrl, "new");
          }
        }}
      ></calcite-navigation-logo>

      <calcite-button
        appearance="transparent"
        kind="neutral"
        icon-start="information"
        slot="content-start"
        onClick={() => app.setShowStartupDialog(true)}
      ></calcite-button>

      {auth.user ? (
        <calcite-navigation-user
          slot="user"
          onClick={() => auth.logout()}
          thumbnail={auth.user.thumbnailUrl ?? undefined}
          full-name={auth.user.fullName}
          username={auth.user.username}
        ></calcite-navigation-user>
      ) : (
        <calcite-menu label="" key="user-menu" slot="content-end">
          <calcite-menu-item
            label=""
            onClick={() => {
              void auth.login();
            }}
            text="Sign in"
            icon-start="user"
            text-enabled
          ></calcite-menu-item>
        </calcite-menu>
      )}
    </calcite-navigation>
  );
};

export default NavigationBar;
