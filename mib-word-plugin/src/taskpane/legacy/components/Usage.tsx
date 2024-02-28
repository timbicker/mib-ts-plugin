import React, {useRef} from "react"
import Box from "@mui/material/Box"
import LinearProgress from "@mui/material/LinearProgress"
import {
  Accordion,
  AccordionSummary,
  CircularProgress,
  IconButton,
  List,
  ListItem,
  Typography,
} from "@mui/material"
import AccordionDetails from "@mui/material/AccordionDetails"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import {mibBlack} from "../theme"
import RefreshIcon from "@mui/icons-material/Refresh"

export const Usage = ({scrollToBottom, user, isUpdatingSession, updateSession, accordSumStyles}: any) => {
  const progress = 100 - (user.remainingCharacters / user.monthlyCharacters) * 100

  const usageRef = useRef(null)

  return (
    <Accordion
      disableGutters
      elevation={0}
      onChange={() => {
        scrollToBottom(usageRef)
      }}
    >
      <AccordionSummary
        sx={{...accordSumStyles}}
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <div ref={usageRef} />
        <Typography>Usage</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box sx={{m: 1, width: "80%"}}>
          <Box sx={{flexGrow: 1, ml: 2, mb: 1}}>
            <Box sx={{display: "flex", flexDirection: "row", alignItems: "center"}}>
              <IconButton onClick={updateSession}>
                <RefreshIcon />
              </IconButton>{" "}
              {isUpdatingSession ? <CircularProgress sx={{m: 1}} /> : ""}
            </Box>

            <LinearProgress
              sx={{borderColor: mibBlack, borderWidth: "0.1px", height: "40px"}}
              color="secondary"
              variant="determinate"
              value={progress}
            />
          </Box>

          <List>
            <ListItem>
              <Typography variant="body2">
                {" "}
                Remaining Characters:{" "}
                {user && user.remainingCharacters ? user.remainingCharacters.toLocaleString() : ""} (
                {user && user.remainingCharacters
                  ? ((user.remainingCharacters / user.monthlyCharacters) * 100).toFixed(1).toLocaleString()
                  : ""}{" "}
                %)
              </Typography>
            </ListItem>
            <ListItem>
              <Typography variant="body2">
                {" "}
                Monthly Characters:{" "}
                {user && user.monthlyCharacters ? user.monthlyCharacters.toLocaleString() : ""}
              </Typography>
            </ListItem>
            <ListItem>
              <Typography variant="body2">
                {" "}
                Capacity reload: {user && user.remainingTime ? user.remainingTime : ""}
              </Typography>
            </ListItem>
          </List>
        </Box>
      </AccordionDetails>
    </Accordion>
  )
}
