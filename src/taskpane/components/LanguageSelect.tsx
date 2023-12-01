import * as React from "react"
import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import Autocomplete from "@mui/material/Autocomplete"
import {countries, Country} from "./languages"
import {useAppState} from "../state/state"

export function LanguageSelect() {
  const {language, setLanguage} = useAppState()
  return (
    <Autocomplete
      value={language}
      options={countries}
      onChange={(_, newValue) => {
        setLanguage(newValue)
      }}
      id="country-select-demo"
      sx={{m: 1, width: "100%", maxWidth: 400}}
      autoHighlight
      autoComplete
      getOptionLabel={option => option.label}
      defaultValue={countries[1]}
      groupBy={option => option.suggested}
      isOptionEqualToValue={(option, value) => value.label === option.label}
      renderOption={(props, option) => (
        <Box
          component="li"
          sx={{"& > img": {mr: 2, flexShrink: 0}}}
          {...props}
        >
          <img
            loading="lazy"
            width="20"
            src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
            srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
            alt=""
          />
          {option.label} ({option.code})
        </Box>
      )}
      renderInput={params => (
        <TextField
          sx={{maxWidth: "60vw"}}
          {...params}
          label="Choose a language"
          inputProps={{
            ...params.inputProps,
          }}
        />
      )}
    />
  )
}
