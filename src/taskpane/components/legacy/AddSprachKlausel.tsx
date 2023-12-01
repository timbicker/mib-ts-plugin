import * as React from "react"
import Switch from "@mui/material/Switch"
import {Box, FormControlLabel, Tooltip} from "@mui/material"
import FormControl from "@mui/material/FormControl"
import Radio from "@mui/material/Radio"
import RadioGroup from "@mui/material/RadioGroup"
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined"
import {countries} from "../languages"

export const AddSprachklausel = ({
  checked,
  variant,
  handleVariant,
  handleChange,
}: {
  checked: boolean
  variant: string
  handleVariant: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}) => {
  const checkboxStyles = {display: "flex", flexDirection: "row", alignItems: "center"}

  return (
    <Box>
      {" "}
      <FormControlLabel
        control={
          <Switch
            checked={checked}
            onChange={handleChange}
            inputProps={{"aria-label": "controlled"}}
          />
        }
        label="Attach translation clause (for legal texts)"
      />
      {checked ? (
        <Box sx={{ml: "40px"}}>
          {" "}
          <FormControl sx={{m: 1}}>
            {/* <FormLabel id="clause-variants">Clause Variants</FormLabel> */}
            <RadioGroup
              aria-labelledby="clause-variants-radio-buttons-group"
              name="clause-variants-radio-buttons-group"
              value={variant}
              onChange={handleVariant}
            >
              <Box sx={checkboxStyles}>
                <FormControlLabel
                  sx={{width: "100%"}}
                  value={"clausePrecedence"}
                  control={<Radio />}
                  label="Precedence (most common)"
                />
                <Tooltip title={`Precedence clause: "${countries[1].clausePrecedence}"`}>
                  <InfoOutlinedIcon />
                </Tooltip>
              </Box>
              <Box sx={checkboxStyles}>
                <FormControlLabel
                  sx={{width: "100%"}}
                  value={"clauseExclusiveValidity"}
                  control={<Radio />}
                  label="Exclusive validity"
                />
                <Tooltip title={`Validity clause: "${countries[1].clauseExclusiveValidity}"`}>
                  <InfoOutlinedIcon />
                </Tooltip>
              </Box>
            </RadioGroup>
          </FormControl>
        </Box>
      ) : (
        ""
      )}
    </Box>
  )
}
