import { config } from "@/config/config";
import { IShortcut } from "@/interfaces/IShortcut";

export const getShortcutKey = (shortcutAction: IShortcut["action"]): string => {
  const shortcuts = config.shortcuts;
  const shortcutKey = shortcuts.find(
    (shortcut) => shortcut.action === shortcutAction
  )?.keyAfterCtrl as string;
  return shortcutKey;
};
