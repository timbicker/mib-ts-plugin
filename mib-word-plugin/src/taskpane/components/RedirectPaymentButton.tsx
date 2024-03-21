import {ButtonProps, Paper} from "@mui/material"
import {useUser} from "../state/auth"
import React from "react"
import {firebaseFunctions} from "@shared/firebaseFunctionsCallables"
import Button from "@mui/material/Button"
import Modal from "@mui/material/Modal"
import CircularProgress from "@mui/material/CircularProgress"
import Typography from "@mui/material/Typography"

function clickLink({token, path}: {token: string; path?: string}) {
  // Create a link element
  const link = document.createElement("a")

  // Set the download attribute with a filename
  link.setAttribute("href", `http://localhost:3001/${path ?? ""}?token=` + token)
  link.setAttribute("target", "_blank")

  // Append the link to the body
  document.body.appendChild(link)

  // Programmatically click the link to trigger the download
  link.click()

  // Remove the link from the document
  document.body.removeChild(link)
}

export function RedirectPaymentButton({path, label, ...props}: ButtonProps & {path?: string; label: string}) {
  const {user, doc} = useUser()
  const [open, setOpen] = React.useState(false)

  async function handleOnClick() {
    setOpen(true)
    try {
      const token = await firebaseFunctions.encodeAuth({userId: user.uid, customerId: doc.customerId})
      clickLink({token: token.encoding, path})
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
        {label}
      </Button>
      <Modal
        open={open}
        sx={{zIndex: 3000, display: "grid", placeItems: "center"}}
      >
        <Paper sx={{background: "white", p: 2, display: "flex", gap: 2}}>
          <CircularProgress size={20} />
          <Typography>Redirecting...</Typography>
        </Paper>
      </Modal>
    </>
  )
}
