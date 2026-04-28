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
import { useState, ReactNode, useEffect } from "react";
import { useScene } from "../Scene/useScene";
import { AppContext } from "./app-context";

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const scene = useScene();
  const portalTitle = scene.webScene.portalItem?.title ?? "";

  const [showStartupDialog, setShowStartupDialog] = useState(true);
  const [title, setTitle] = useState("");

  useEffect(() => {
    setTitle(portalTitle);
  }, [portalTitle]);

  useEffect(() => {
    if (!scene.loading && scene.isViewReady) {
      const view = scene.view;
      const slides = scene.webScene.presentation.slides;
      if (slides.length) {
        const randomSlide = slides.getItemAt(Math.floor(slides.length * Math.random()));
        void randomSlide?.applyTo(view, { animate: false });

        setTitle(`${portalTitle} - ${randomSlide?.title.text ?? ""}`);
      }
    }
  }, [portalTitle, scene]);

  return (
    <AppContext.Provider value={{ title, showStartupDialog, setShowStartupDialog }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
