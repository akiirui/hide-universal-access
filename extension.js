/*
 * GNOME Shell extension to hide Universal Access icon from the status bar
 *
 * Copyright (C) 2019 Akatsuki Rui
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 *
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { Extension } from "resource:///org/gnome/shell/extensions/extension.js";
import { layoutManager, panel } from "resource:///org/gnome/shell/ui/main.js";

const PANEL_BOX_NAME = "panelBox";

export default class HideUniversalAccess extends Extension {
  enable() {
    this._hidden = new Set();

    global.display.connectObject(
      "workareas-changed",
      () => this._hideAll(),
      this
    );
    this._hideAll();
  }

  disable() {
    global.display.disconnectObject(this);

    for (let container of this._hidden) {
      container.disconnectObject(this);
      container.show();
    }
    this._hidden = null;
  }

  _findPanels() {
    let otherPanels = layoutManager._trackedActors
      .map((actorData) => actorData.actor)
      .filter(
        (actor) =>
          actor !== layoutManager.panelBox &&
          actor.get_name() === PANEL_BOX_NAME
      )
      .flatMap((panelBox) =>
        panelBox.get_children().filter((child) => child.statusArea)
      );

    return [panel, ...otherPanels];
  }

  _hideAll() {
    for (let p of this._findPanels()) {
      let a11y = p.statusArea["a11y"];
      if (a11y == null || this._hidden.has(a11y.container)) continue;

      let container = a11y.container;
      container.hide();
      this._hidden.add(container);
      container.connectObject(
        "destroy",
        () => this._hidden.delete(container),
        this
      );
    }
  }
}
