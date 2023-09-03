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
 */

import panel from "resource:///org/gnome/shell/ui/main.js";

export default class HideUniversalAccess {
  enable() {
    let a11y = panel.statusArea["a11y"];
    if (a11y != null) {
      a11y.container.hide();
    }
  }

  disable() {
    let a11y = panel.statusArea["a11y"];
    if (a11y != null) {
      a11y.container.show();
    }
  }
}
