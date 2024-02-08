import React, {useState} from "react"
import Button from "@mui/material/Button"
import Stack from "@mui/material/Stack"
import {Box} from "@mui/system"
import Typography from "@mui/material/Typography"
import {Page, pageNames, useAppState} from "../../state/state"
import Breadcrumbs from "@mui/material/Breadcrumbs"
import Link from "@mui/material/Link"

export const ContactUs = () => {
  // todo add user
  const user = {
    email: "test",
  }
  return (
    <Box>
      <Typography
        gutterBottom
        variant="body2"
      >
        Any Question?
      </Typography>
      <Button
        variant="contained"
        href={`https://znj0e09mna0.typeform.com/to/bqPhgMTv#user_email=${user.email}`}
      >
        Contact us
      </Button>
    </Box>
  )
}

function SettingsBreadCrumbs({
  page,
  handleChangePage,
}: {
  page: Page
  handleChangePage: (newPage: Page) => void
}) {
  function parseSubPaths(page: Page) {
    const splitted: Page[] = page.split("/") as Page[]
    const subPaths: Page[] = []
    for (const split of splitted) {
      if (subPaths.length === 0) {
        subPaths.push(split)
      } else {
        const lastElement = subPaths[subPaths.length - 1]
        subPaths.push(`${lastElement}/${split}` as Page)
      }
    }
    return subPaths
  }
  const subPaths = parseSubPaths(page)

  function renderBreadCrumbs() {
    const elements: React.ReactNode[] = []
    for (let i = 0; i < subPaths.length; i++) {
      const subPath = subPaths[i]
      if (i === subPaths.length - 1) {
        elements.push(
          <Typography
            key={subPath}
            color={"text.primary"}
          >
            {pageNames[subPath]}
          </Typography>,
        )
      } else {
        elements.push(
          <Typography
            key={subPath}
            color={"primary"}
            sx={{
              "&:hover": {
                textDecoration: "underline",
                cursor: "pointer",
              },
            }}
            onClick={() => handleChangePage(subPath)}
          >
            {pageNames[subPath]}
          </Typography>,
        )
      }
    }
    return elements
  }

  return (
    <Box
      role="presentation"
      sx={{mb: 3}}
    >
      <Breadcrumbs>{renderBreadCrumbs()}</Breadcrumbs>
    </Box>
  )
}

function AboutDetails() {
  return (
    <Box sx={{m: 2, display: "flex", flexDirection: "column", gap: "24px"}}>
      <Typography
        variant="body1"
        gutterBottom
      >
        Make It Bilingual! helps you to create bilingual versions of your (legal) documents - in the blink of
        an eye. Save yourself hours of translation and formatting work and boost your international business.
      </Typography>
      <Typography
        variant="body1"
        gutterBottom
      >
        The app operates according to the highest data protection and confidentiality standards: Your data is
        processed exclusively on GDPR-compliant servers and deleted immediately after translation. For
        translation, we use the DeepL engine, which is committed to complying with the above standards.
      </Typography>
      <Typography variant="body1">
        Make It Bilingual! Word Add-in is brought to you by{" "}
        <Typography
          fontWeight={600}
          component="span"
          variant="body1"
        >
          Resolvio GmbH
        </Typography>
      </Typography>
      <ContactUs />

      <Box>
        <Typography variant="body1">info@makeitbilingual.com</Typography>
        <br />
        <Typography variant="body1">Resolvio GmbH</Typography>
        <Typography variant="body1">Emser Straße 119</Typography>
        <Typography variant="body1">56076 Koblenz</Typography>
        <Typography variant="body1">Germany</Typography>
        <br />
        <Typography variant="body1">Director: Hubertus Scherbarth, Rechtsanwalt, Steuerberater</Typography>
        <br />
        <Typography variant="body1">Register court: Amtsgericht Koblenz, Germany</Typography>
        <Typography variant="body1">Register number: HRB 29071</Typography>
      </Box>
    </Box>
  )
}

export function SettingsPageInner({page, setPage}: {page: Page; setPage: (page: Page) => void}) {
  function renderSubPage() {
    if (page === "settings/about") return <AboutDetails />
    return (
      <Stack
        flexDirection={"column"}
        alignItems={"center"}
      >
        <Stack
          flexDirection={"column"}
          width={200}
          spacing={2}
        >
          <Button
            variant={"outlined"}
            fullWidth
          >
            Manage Plan
          </Button>
          <Button
            variant={"outlined"}
            onClick={() => setPage("settings/about")}
            fullWidth
          >
            About
          </Button>
        </Stack>
      </Stack>
    )
  }
  return (
    <Stack
      sx={{
        flexDirection: "column",
        pt: 1,
        pl: 2,
        pr: 2,
      }}
    >
      <SettingsBreadCrumbs
        page={page}
        handleChangePage={setPage}
      />
      {renderSubPage()}
    </Stack>
  )
}

export function SettingsPage() {
  const {page, setPage} = useAppState()
  return (
    <SettingsPageInner
      page={page}
      setPage={setPage}
    />
  )
}
