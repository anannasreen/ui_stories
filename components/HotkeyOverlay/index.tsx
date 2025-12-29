import React, { useState } from "react";
import { getApplicationKeyMap } from "react-hotkeys";
import { groupBy, entries, sortBy } from "lodash";
import { HotkeyGroup } from "../Hotkeys";
import styles from "./HotkeyOverlay.module.scss";

/**
 * HotkeyOverlay component provides a portal for hotkey overlay content.
 *
 * ```
 * <HotkeyOverlay>
 *   <div>Hotkey overlay content</div>
 * </HotkeyOverlay>
 * ```
 */
export function HotkeyOverlay() {
  const [isHotkeyOverlayVisible, setHotkeyOverlayVisible] = useState(false);
  const hotkeys = getApplicationKeyMap();
  const hotkeyGroups = groupBy(hotkeys, (h) => h.group || "Global");
  const sortedGroupPairs = sortBy(entries(hotkeyGroups), ([name]) =>
    name === "Global" ? "AAAA" : name
  );

  return (
    <>
      <HotkeyGroup
        groupName="Hotkeys"
        hotkeys={{
          TOGGLE_HOTKEYS_OVERLAY: {
            sequence: ["h", "shift+/"], // "shift+/" is the question mark "?" character on most library keyboards.
            name: "Toggle the hotkey overlay",
            handler: () => setHotkeyOverlayVisible((prev) => !prev),
          },
        }}
      />
      {isHotkeyOverlayVisible && (
        <div className={styles.root} data-testid="hotkey-overlay">
          <div className={styles.container} data-testid="hotkey-container">
            {sortedGroupPairs.map(([name, keys]) => (
              <div key={name}>
                <h4>{name}</h4>

                {keys.map(({ name, sequences }) => (
                  <div
                    key={name}
                    className={styles.hotkey}
                    data-testid="hotkey-entry"
                  >
                    <span data-testid="hotkey-name">{name}</span>
                    <kbd data-testid="hotkey-shortcut">
                      {sequences.map((s) => s.sequence).join(", ")}
                    </kbd>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
