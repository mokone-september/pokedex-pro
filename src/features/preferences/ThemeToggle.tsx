"use client";

import { IconButton, Menu, Portal } from "@chakra-ui/react";
import { Check, Moon, Sun, SunMoon } from "lucide-react";
import { useTheme } from "next-themes";
import type { ReactNode } from "react";
import type { ThemePreference } from "./preferences.store";
import { setTheme as setPreferredTheme } from "./preferences.store";

interface ThemeOption {
  value: ThemePreference;
  label: string;
  icon: ReactNode;
}

const options: ThemeOption[] = [
  { value: "light", label: "Light", icon: <Sun size={16} /> },
  { value: "dark", label: "Dark", icon: <Moon size={16} /> },
  { value: "system", label: "System", icon: <SunMoon size={16} /> },
];

export function ThemeToggle() {
  // `theme` reflects the user's raw choice ("light" | "dark" | "system"),
  // while `resolvedTheme` is what "system" actually resolves to. We use
  // `theme` to drive the menu's selection state and `resolvedTheme` to
  // pick which icon represents the currently *active* appearance.
  const { theme, resolvedTheme, setTheme } = useTheme();

  function handleSelect(value: ThemePreference): void {
    setTheme(value);
    // Mirror into our own persisted preferences store, so it stays
    // consistent with the rest of the app's local-state architecture.
    setPreferredTheme(value);
  }

  const activeIcon =
    theme === "system" ? (
      <SunMoon size={18} />
    ) : resolvedTheme === "dark" ? (
      <Moon size={18} />
    ) : (
      <Sun size={18} />
    );

  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        <IconButton
          type="button"
          aria-label="Change theme"
          variant="ghost"
          size="sm"
        >
          {activeIcon}
        </IconButton>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content>
            {options.map((option) => (
              <Menu.Item
                key={option.value}
                value={option.value}
                onClick={() => handleSelect(option.value)}
                display="flex"
                alignItems="center"
                gap={2}
              >
                {option.icon}
                {option.label}
                {theme === option.value && (
                  <Check size={14} style={{ marginLeft: "auto" }} />
                )}
              </Menu.Item>
            ))}
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
}
