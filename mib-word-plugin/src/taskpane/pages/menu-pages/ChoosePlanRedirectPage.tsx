import {ButtonProps, Stack} from "@mui/material"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import React from "react"
import {useUser} from "../../state/auth"
import Modal from "@mui/material/Modal"
import Box from "@mui/material/Box"
import {firebaseFunctions} from "@shared/firebaseFunctionsCallables"

function clickLink(token: string) {
  // Create a link element
  const link = document.createElement("a")

  // Set the download attribute with a filename
  link.setAttribute("href", "http://localhost:3001/?token=" + token)
  link.setAttribute("target", "_blank")

  // Append the link to the body
  document.body.appendChild(link)

  // Programmatically click the link to trigger the download
  link.click()

  // Remove the link from the document
  document.body.removeChild(link)
}

function BookAPlanButton(props: ButtonProps) {
  const {user, doc} = useUser()
  const [open, setOpen] = React.useState(false)

  async function handleOnClick() {
    setOpen(true)
    try {
      const token = await firebaseFunctions.encodeAuth({userId: user.uid, customerId: doc.customerId})
      clickLink(token.encoding)
    } catch (e) {
      if (e instanceof Error) {
        console.error(`${e.name}: ${e.message}: ${e.stack}`)
      }
    } finally {
      setOpen(false)
    }
  }

  return (
    <>
      <Button
        {...props}
        variant={"contained"}
        onClick={handleOnClick}
      >
        Book a plan
      </Button>
      <Modal open={open}>
        <Box>
          <Typography>Redirecting...</Typography>
        </Box>
      </Modal>
    </>
  )
}

export function ChoosePlanRedirectPage() {
  return (
    <Stack
      direction={"column"}
      alignItems={"center"}
      justifyContent={"center"}
      pt={2}
      pl={3}
      pr={3}
      gap={2}
    >
      <Typography sx={{mt: 12, mb: 2}}>You have no active plan.</Typography>
      <BookAPlanButton sx={{alignSelf: "stretch"}} />
    </Stack>
  )
}

export function ChoosePlanRedirectPageLoader() {
  return <ChoosePlanRedirectPage />
}
