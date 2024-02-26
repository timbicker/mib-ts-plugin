import React from "react"
import Progress from "./components/Progress"
import {ThemeProvider} from "@emotion/react"
import Logo from "@assets/logo-filled.png"
import {AppStateProvider, useAppState, useAppStateProvider} from "./state/state"
import {NewTranslationPageLoader} from "./pages/menu-pages/NewTranslationPage"
import {UpdateTranslationPageLoader} from "./pages/menu-pages/UpdatePage"
import {SettingsPageContainer} from "./pages/settings-pages/SettingsPageContainer"
import {TopBarLoader} from "./components/NavigationMenu"
import Box from "@mui/material/Box"
import {theme} from "./components/theme"
import {AuthProvider, useAuth} from "./state/auth"
import {LoginPageLoader} from "./pages/public-pages/LoginPage"
import {RegisterPageLoader} from "./pages/public-pages/RegisterPage"
import {AboutPage} from "./pages/settings-pages/About"
import {ChoosePlanPage, MyPlanPage} from "./pages/settings-pages/MyPlan"
import {ContactPage} from "@mui/icons-material"
import {TokenStatusPageLoader} from "./pages/settings-pages/TokenStatusPage"
import {SettingsPage} from "./state/usePage"
import {SettingsMenuLoader} from "./pages/settings-pages/SettingsMenu"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
/* global Word, require */

export interface AppProps {
  title: string
  isOfficeInitialized: boolean
}

function chooseSettingsPage(page: SettingsPage) {
  if (page === "settings") return <SettingsMenuLoader />
  if (page === "settings/about") return <AboutPage />
  if (page === "settings/choose-plan") return <ChoosePlanPage />
  if (page === "settings/my-plan") return <MyPlanPage />
  if (page === "settings/contact") return <ContactPage />
  if (page === "settings/token-status") return <TokenStatusPageLoader />
  const _exhaustiveCheck: never = page
  throw Error(`Unknown settings page: ${page}`)
}

function Pages() {
  const {page, setPage} = useAppState()

  if (page === "new") return <NewTranslationPageLoader />
  if (page === "update") return <UpdateTranslationPageLoader />
  return (
    <SettingsPageContainer
      page={page}
      setPage={setPage}
    >
      {chooseSettingsPage(page)}
    </SettingsPageContainer>
  )
}

type AuthPages = "login" | "register" | "forgot-password"

function AuthRouter() {
  const {auth} = useAuth()
  if (auth.type === "loading")
    return (
      <Progress
        title="Loading"
        message="Loading"
        logo={Logo}
      />
    )
  if (auth.type === "unauthenticated") return <PublicApp />
  return <PrivateApp />
}

function PublicApp() {
  const [authPage, setAuthPage] = React.useState<AuthPages>("login")

  if (authPage === "login") {
    return <LoginPageLoader setAuthPage={setAuthPage} />
  }
  if (authPage === "register") {
    return <RegisterPageLoader setAuthPage={setAuthPage} />
  }
  return <LoginPageLoader setAuthPage={setAuthPage} />
}

function PrivateApp() {
  const state = useAppStateProvider()
  return (
    <AppStateProvider state={state}>
      <Box sx={{position: "relative"}}>
        <TopBarLoader />
        <Pages />
      </Box>
    </AppStateProvider>
  )
}

const App: React.FC<AppProps> = ({title, isOfficeInitialized}) => {
  if (!isOfficeInitialized) {
    return (
      <Progress
        title={title}
        logo={Logo}
        message="Please sideload your addin to see app body."
      />
    )
  }

  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <AuthRouter />
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
