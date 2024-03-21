import React, {ReactNode} from "react"
import Stack from "@mui/material/Stack"
import {Box} from "@mui/system"
import Typography from "@mui/material/Typography"
import Breadcrumbs from "@mui/material/Breadcrumbs"
import {Page, pageNames} from "../../state/usePage"

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
      sx={{mb: 1}}
    >
      <Breadcrumbs>{renderBreadCrumbs()}</Breadcrumbs>
    </Box>
  )
}

export function SettingsPageContainer({
  page,
  setPage,
  children,
}: {
  page: Page
  setPage: (page: Page) => void
  children: ReactNode
}) {
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
      {children}
    </Stack>
  )
}
