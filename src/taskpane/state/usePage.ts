import {useState} from "react"

type PagePath =
  | "new"
  | "update"
  | "settings"
  | "settings/about"
  | "settings/my-plan"
  | "settings/choose-plan"
  | "settings/token-status"
  | "settings/contact"

export const pageNames: Record<PagePath, string> = {
  new: "New Translation",
  update: "Update Translation",
  settings: "Settings",
  "settings/about": "About Us",
  "settings/my-plan": "My Plan",
  "settings/choose-plan": "Choose Plan",
  "settings/token-status": "Token Status",
  "settings/contact": "Contact Us",
}

export type SettingsPage =
  | "settings"
  | "settings/about"
  | "settings/my-plan"
  | "settings/choose-plan"
  | "settings/token-status"
  | "settings/contact"

export type Page = "new" | "update" | SettingsPage

function isSettingsPage(page: Page): page is SettingsPage {
  return page.startsWith("settings")
}

export function usePage() {
  const [page, setPage] = useState<Page>("new")
  return {page, setPage}
}
