import {IconButton} from "@fluentui/react"
import {Box, Card, Typography} from "@mui/material"
import React, {useEffect} from "react"
import {mibBlack, mibTürkis} from "../theme"
import CloseIcon from "@mui/icons-material/Close"
import WavingHand from "../../../assets/waving-hand_1f44b.png"

export const Welcome = () => {
  const [open, setOpen] = React.useState(true)

  useEffect(() => {
    const showWelcome = JSON.parse(localStorage.getItem("showWelcome"))
    setOpen(showWelcome)
  }, [])

  useEffect(() => {
    localStorage.setItem("showWelcome", JSON.stringify(open))
  }, [open])

  return (
    <Card
      elevation={4}
      sx={{
        backgroundColor: mibTürkis,
        m: 2,
        p: 2,
        display: open ? "flex" : "none",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: 0,
        width: "calc(100% - 2",
      }}
    >
      <Box
        sx={{
          backgroundColor: mibTürkis,
          m: 0,
          p: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: 0,
          width: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            flexDirection: "row",
            gap: "12px",
            width: "100%",
          }}
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <Typography
              sx={{fontWeight: 500}}
              variant="body1"
            >
              Welcome at Make It Bilingual!
            </Typography>
          </Box>
          <IconButton
            onClick={() => {
              setOpen(false)
            }}
          >
            <CloseIcon sx={{color: mibBlack}} />
          </IconButton>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            flexDirection: "row",
            m: 1,
            width: "100%",
          }}
        >
          <Box
            component="img"
            sx={{
              height: 48,
              width: 48,
              m: 4,
              mt: 1,
            }}
            alt="Welcome"
            src={WavingHand}
          />
          <Box>
            <Typography
              gutterBottom
              variant="body1"
            >
              We help you to create bilingual versions of your (legal) documents - in the blink of an eye.{" "}
            </Typography>
            <Typography
              gutterBottom
              variant="body1"
            >
              Save yourself hours of translation and formatting work and boost your international business.
            </Typography>
          </Box>
        </Box>
      </Box>
    </Card>
  )
}
