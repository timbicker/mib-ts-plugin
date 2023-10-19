import React, {useRef, useState, useEffect} from "react"
import Typography from "@mui/material/Typography"
import {Box} from "@mui/system"
import {
  Alert,
  AlertColor,
  AlertTitle,
  Avatar,
  Button,
  CircularProgress,
  Collapse,
  Divider,
  IconButton,
} from "@mui/material"
import Accordion from "@mui/material/Accordion"
import AccordionSummary from "@mui/material/AccordionSummary"
import AccordionDetails from "@mui/material/AccordionDetails"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import CloseIcon from "@mui/icons-material/Close"
import axios from "axios"
import logo from "../../../assets/icon-64.png"
import LanguageSelect from "./LanguageSelect"
import {countries} from "./languages"
import ApiInput from "./ApiInput"
import {AddSprachklausel} from "./AddSprachklausel.jsx"
import {mibBlack, mibGrey, mibTürkis} from "../theme"
import {Usage} from "./Usage.jsx"
import {Plans} from "./Plans.jsx"
import {PlansDetails} from "./PlansDetails.jsx"
import {ContactUs} from "./ContactUs"
import {Welcome} from "./Welcome"
import {host} from "./App"
import {useAsync} from "react-use"

const TOO_MANY_PARAGRAPHS =
  "Your selection contains too many paragraphs. For technical reasons, a maximum of 40 paragraphs can be processed in one run."

export const Translate = () => {
  const [selectionStats] = React.useState({charcters: 0, paragraphs: 0})
  const [buildingProgress, setBuildingProgress] = useState(false)
  const handleBuildingProgress = bool => {
    if (bool === false) {
      setTimeout(() => setBuildingProgress(bool), 2000)
    } else {
      setBuildingProgress(bool)
    }
  }

  const [refresh, setRefresh] = useState(0)
  const triggerRefresh = () => {
    setRefresh(refresh + 1)
  }
  const [refreshSuccess, setRefreshSuccess] = useState(false)
  const handleRefreshSuccess = bool => {
    setRefreshSuccess(bool)
  }
  const [refreshProgress, setRefreshProgress] = useState(false)
  const handleRefreshProgress = bool => {
    setRefreshProgress(bool)
  }

  const [authorized, setAuthorized] = useState(true)
  const [user, setUser] = useState<any>({monthlyCharacters: 0, remainingCharacters: 0})
  const handleUser = userData => {
    setUser(userData)
  }

  //Snackbar
  const severities = {success: "success", info: "info", warning: "warning", error: "error"}
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [severitySnackbar, setSeveritySnackbar] = useState<AlertColor>()
  const [messageSnackbar, setMessageSnackbar] = useState("")

  const handleAlert = (message, severity) => {
    setSeveritySnackbar(severity)
    setMessageSnackbar(message)
    setOpenSnackbar(true)
    handleBuildingProgress(false)
  }
  const handleCloseAlert = () => {
    setOpenSnackbar(false)
  }

  const [sourceLang, setSourceLang] = useState("")
  const handleSourceLang = lang => {
    setSourceLang(lang)
  }
  const [langValue, setLangValue] = useState(countries[1])
  const [langInputValue, setLangInputValue] = useState("")
  const [data, setData] = useState([])
  const handleData = data => {
    setData(data)
  }
  const [originalParagraphs, setOriginalParagraphs] = useState([])
  const handleOriginalParagraphs = paras => {
    setOriginalParagraphs(paras)
  }
  const [translatedParagraphs, setTranslatedParagraphs] = useState([])
  const handleAddToTranslatedParas = newPara => {
    setTranslatedParagraphs(prev => [...prev, newPara])
  }
  const [isTranslated, setIsTranslated] = useState(0) //undefined or number
  const incrementIsTranslated = () => {
    setIsTranslated(prev => prev + 1)
  }
  const [isTableArrayBuilt, setIsTableArrayBuilt] = useState(0) //undefined or number
  const incrementIsTableArrayBuilt = () => {
    setIsTableArrayBuilt(prev => prev + 1)
  }
  const reset = () => {
    handleCloseAlert()
    setIsTranslated(0)
    setIsTableArrayBuilt(0)
    setData([])
    setOriginalParagraphs([])
    setTranslatedParagraphs([])
  }

  const [apiKeyInput, setApiKeyInput] = React.useState("")
  const handleApiKeyInput = event => {
    setApiKeyInput(event.target.value)
  }

  const [checked, setChecked] = React.useState(false)
  const [variant, setVariant] = React.useState("")
  const [open, setOpen] = React.useState(false)

  const handleVariant = event => {
    setVariant(event.target.value)
  }
  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  const handleChange = event => {
    setChecked(event.target.checked)
    if (event.target.checked) {
      handleOpen()
    }
  }

  useEffect(() => {
    const apiKey = JSON.parse(localStorage.getItem("apiKey"))
    if (apiKey) {
      setApiKeyInput(apiKey)
    }

    const language = JSON.parse(localStorage.getItem("language"))
    if (language) {
      setLangValue(language)
    }

    const checkedAddSprachklausel = JSON.parse(localStorage.getItem("checkedAddSprachklausel"))
    if (checkedAddSprachklausel) {
      setChecked(checkedAddSprachklausel)
    }

    const variantSprachklausel = JSON.parse(localStorage.getItem("variantSprachklausel"))
    if (variantSprachklausel) {
      setVariant(variantSprachklausel)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("apiKey", JSON.stringify(apiKeyInput))
  }, [apiKeyInput])

  useEffect(() => {
    localStorage.setItem("language", JSON.stringify(langValue))
  }, [langValue])

  useEffect(() => {
    localStorage.setItem("checkedAddSprachklausel", JSON.stringify(checked))
  }, [checked])

  useEffect(() => {
    localStorage.setItem("variantSprachklausel", JSON.stringify(variant))
  }, [variant])

  // check ApiKey when starting
  const checkApi = () => {
    if (apiKeyInput) {
      axios
        .get(`${host}/api/v1/getuser?api_key=${apiKeyInput}`)
        .then(response => {
          setAuthorized(true)
          handleUser(response.data)
          handleRefreshProgress(false)
          handleRefreshSuccess(true)
        })
        .catch(function (error) {
          if (error.response) {
            setAuthorized(false)
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request)
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log("Error", error.message)
          }
          console.log(error.config)
        })
    }
  }

  const checkUser = () => {
    if (apiKeyInput) {
      axios
        .get(`${host}/api/v1/getuser?api_key=${apiKeyInput}`)
        .then(response => {
          setAuthorized(true)
          handleUser(response.data)
          handleRefreshProgress(false)
          handleRefreshSuccess(true)
        })
        .catch(function (error) {
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data)
            console.log(error.response.status)
            console.log(error.response.headers)
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request)
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log("Error", error.message)
          }
          console.log(error.config)
        })
    }
  }

  useEffect(() => {
    checkApi()
  }, [apiKeyInput, refresh])

  const targetLang = langValue?.deeplCode

  const translationOptions = {
    formality: "prefer_more", //prefer_less default
    tagHandling: "xml",
    preserveFormatting: "true",
    splitSentences: "nonewlines",
    non_splitting_tags: "w:t",
  }

  const noTextSelected = "No text selected."
  const noLangSelected = "No language chosen."

  async function insertEmersonQuoteAtSelection() {
    await Word.run(async context => {
      try {
        // Queue a command to get the current selection and then
        // create a proxy range object with the results.
        const range = context.document.getSelection()
        range.load("text, paragraphs")
        await context.sync()

        const rangeCount = range.text.length

        const notEnoughCharacters = "Not enough characters left. Upgrade plan for more capacity."

        if (rangeCount > user.remainingCharacters) {
          const error = new Error(notEnoughCharacters)
          throw error
        }

        const paragraphs = range.paragraphs.items
        const textWithoutSpaces = paragraphs
          .map(para => {
            return para.text
          })
          .join("")

        if (textWithoutSpaces.trim() === "") {
          const error = new Error(noTextSelected)
          throw error
        }

        if (!langValue) {
          const error = new Error(noLangSelected)
          throw error
        }

        // Queue a command to get the OOXML of the current selection.
        const ooxmlPerParagraph = paragraphs.map(item => {
          return item.getOoxml()
        })

        // Synchronize the document state by executing the queued commands,
        // and return a promise to indicate task completion.
        await context.sync()

        // Queue a command to get the OOXML of the current selection.
        const ooxmlValues = ooxmlPerParagraph.map(item => {
          const tableTagReg =
            /(<|<\/)w:tbl( .*?>|>|\/>)|<w:tblPr( .*?>|>|\/>).*?<\/w:tblPr>|<w:tblGrid( .*?>|>|\/>)|<\/w:tblGrid( .*?>|>|\/>)|<w:gridCol( .*?>|>|\/>)|(<|<\/)w:tr( .*?>|>|\/>)|<w:trPr( .*?>|>|\/>).*?<\/w:trPr>|(<|<\/)w:tc( .*?>|>|\/>)|<w:tcPr( .*?>|>|\/>).*?<\/w:tcPr>/gm
          const newPara = item.value.replace(tableTagReg, "")

          //replace spaces with space
          const newPara2 = newPara.replace(
            'xml:space="preserve" xml:space="preserve"',
            'xml:space="preserve"',
          )

          //replace blank paragraphs
          const blankParas = newPara2.match(/<w:p [^>]*\/>/g)

          const newPara3 = blankParas ? newPara2.replace(blankParas[blankParas.length - 1], "") : newPara2
          return newPara3
        })

        if (ooxmlValues.length > 40) {
          const error = new Error(TOO_MANY_PARAGRAPHS)
          throw error
        }

        await handleOriginalParagraphs(ooxmlValues)

        //GET TRANSLATED PARAGRAPHS

        const paragraphsForTranslation = ooxmlValues.map(para => {
          //defining new numbering id val
          const numIdValReg = /<w:numId w:val=.?"\d+.?"\/>/gm
          const numIdValDigitReg = /\d+/gm
          let newPara1 = para
          let numIdValDigit
          let numIdValSubstitute
          if (para.match(numIdValReg)) {
            const matchesNumIdValReg = para.match(numIdValReg)

            // replace Digit
            const numIdValSubstitutes = matchesNumIdValReg.map(match => {
              numIdValDigit = match.match(numIdValDigitReg)[0]
              const splits = match.split(numIdValDigit)
              numIdValSubstitute = Number(numIdValDigit) + 1
              return `${splits[0]}${numIdValSubstitute}${splits[1]}`
            })

            // replaces matches with substitutes
            matchesNumIdValReg.forEach((match, i) => {
              newPara1 = newPara1.replace(match, numIdValSubstitutes[i])
            })

            //add overrides to numbering.xml
            const numbClosingTagReg = /<\/w:numbering>/gm
            const matchesNumbClosingTagReg = para.match(numbClosingTagReg)

            // add overrides to substitutes
            const numbSubstitutes = matchesNumbClosingTagReg.map(() => {
              const substitute = `
          <w:num w:numId="${numIdValSubstitute}">
            <w:abstractNumId w:val="0"/>
            <w:lvlOverride w:ilvl="0">
            <w:startOverride w:val="1"/>
            </w:lvlOverride>
            <w:lvlOverride w:ilvl="1">
            <w:startOverride w:val="1"/>
            </w:lvlOverride>
            <w:lvlOverride w:ilvl="2">
            <w:startOverride w:val="1"/>
            </w:lvlOverride>
            <w:lvlOverride w:ilvl="3">
            <w:startOverride w:val="1"/>
            </w:lvlOverride>
            <w:lvlOverride w:ilvl="4">
            <w:startOverride w:val="1"/>
            </w:lvlOverride>
            <w:lvlOverride w:ilvl="5">
            <w:startOverride w:val="1"/>
            </w:lvlOverride>
            <w:lvlOverride w:ilvl="6">
            <w:startOverride w:val="1"/>
            </w:lvlOverride>
            <w:lvlOverride w:ilvl="7">
            <w:startOverride w:val="1"/>
            </w:lvlOverride>  
          </w:num>
        </w:numbering>`
              return substitute
            })
            // replaces matches with substitutes
            matchesNumbClosingTagReg.forEach((match, i) => {
              newPara1 = newPara1.replace(match, numbSubstitutes[i])
            })
          }

          return newPara1
        })

        // get paragraphs translated

        paragraphsForTranslation.forEach((para, index) => {
          //console.log(para)
          //extract <w:t> tags
          const textTagReg = /<w:t .*?>.*?<\/w:t>|<w:t>.*?<\/w:t>/gm

          if (para.match(textTagReg)) {
            const matches = para.match(textTagReg)
            const text = matches.join("")
            const url = `${host}/api/v1/deepl?api_key=${apiKeyInput}&text=${encodeURIComponent(
              text,
            )}&target_lang=${targetLang}&split_sentences=${
              translationOptions.splitSentences
            }&preserve_formatting=${translationOptions.preserveFormatting}&formality=${
              translationOptions.formality
            }&tag_handling=${translationOptions.tagHandling}&non_splitting_tags${
              translationOptions.non_splitting_tags
            }`

            // call api and get translation
            //   setTimeout(function(){
            axios
              .get(url)
              .then(response => {
                const detectedSourceLang = response.data.translation.detectedSourceLang
                if (detectedSourceLang) {
                  handleSourceLang(detectedSourceLang)
                }
                const translatedMatchesMonostring = response.data.translation.text
                const splitTagReg = /(?=<w:t.*?>.*?<\/w:t>)/gm
                const translatedMatches = translatedMatchesMonostring.split(splitTagReg)
                // replace matches with translatedMatches
                let newPara = para
                matches.forEach((match, i) => {
                  const outputPara =
                    match === '<w:t xml:space="preserve"> </w:t>'
                      ? newPara.replace(match, match)
                      : newPara.replace(match, translatedMatches[i])
                  newPara = outputPara
                })
                handleAddToTranslatedParas({index: index, text: newPara})
                incrementIsTranslated()
              })
              .catch(function (error) {
                if (error.response) {
                  // The request was made and the server responded with a status code
                  // that falls out of the range of 2xx
                  console.log(error.response.data)
                  console.log(error.response.status)
                  console.log(error.response.headers)

                  handleAlert(`Error: ${error.response.data.message}`, severities.error)
                } else if (error.request) {
                  // The request was made but no response was received
                  // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                  // http.ClientRequest in node.js
                  console.log(error.request)
                  handleAlert(`Error: ${error.request.data.message}`, severities.error)
                } else {
                  // Something happened in setting up the request that triggered an Error
                  console.log("Error", error.message)
                  handleAlert(`Error: ${error.message}`, severities.error)
                }
              })
            //}, 1000 * (index + 1));
          } else {
            handleAddToTranslatedParas({index: index, text: para})
            incrementIsTranslated()
          }
        })
      } catch (error) {
        console.log(error)
        if (error.message === noLangSelected) {
          handleAlert("Please choose a language.", severities.warning)
        } else if (error.message === noTextSelected) {
          handleAlert(
            "Please select some text so we can convert it to a bilingual version.",
            severities.warning,
          )
        } else {
          handleAlert(error.message, severities.warning)
        }
      }
      await context.sync()
    }).catch(function (error) {
      console.log("Error: " + JSON.stringify(error))

      if (error instanceof OfficeExtension.Error) {
        console.log("Debug info: " + JSON.stringify(error.debugInfo))
      }
    })
  }

  useEffect(() => {
    try {
      if (translatedParagraphs[0] && originalParagraphs[0] && isTranslated === originalParagraphs.length) {
        //Make new Double Array out of both datasets
        let tableArray = []
        originalParagraphs.forEach((itemOrig, indexOrig) => {
          const matchingTranslatedParagraph = translatedParagraphs.find(({index}) => index === indexOrig)
          tableArray.push([itemOrig, matchingTranslatedParagraph.text])
          incrementIsTableArrayBuilt()
        })

        handleData(tableArray)
      }
    } catch (error) {
      console.log(error)
    }
  }, [originalParagraphs[0], isTranslated])

  useAsync(async () => {
    checkUser()
    await Word.run(async context => {
      try {
        if (data[0] && originalParagraphs[0] && isTableArrayBuilt === originalParagraphs.length) {
          //Make table
          const range = context.document.getSelection()
          await context.sync()
          const emptyParagraph = range.insertParagraph("", "Before")
          await context.sync()
          range.clear()
          await context.sync()

          const table = await emptyParagraph.insertTable(data.length, data[0].length, "Before")
          const contentControl = await table.insertContentControl()
          contentControl.title = "Bilingual Table"

          //Fill table
          table.load("values, rows/items/cells/items/body")
          await context.sync()

          for (var row = 0; row < table.values.length; row++) {
            for (var column = 0; column < table.values[row].length; column++) {
              table.rows.items[row].cells.items[column].body.insertOoxml(data[row][column], "Replace")
            }
          }
          table.load("values, rows/items/cells/items/body")
          await context.sync()

          handleBuildingProgress(false)

          if (checked && variant !== "") {
            const clauseTargetLang = langValue[variant]
            const sourceCountry = countries.find(({deeplCode}) => deeplCode === sourceLang)
            const clauseSourceLang = sourceCountry ? sourceCountry[variant] : ""
            const attachedRowValues = [
              ["", ""],
              [clauseSourceLang, clauseTargetLang],
            ]
            table.addRows("End", 2, attachedRowValues)
          }

          await context.sync()
        }
      } catch (error) {
        handleAlert(`Some Error occured: ${error.message}.`, severities.error)

        console.log(error)
      }
      await context.sync()
    }).catch(function (error) {
      console.log("Error: " + JSON.stringify(error))
      if (error instanceof OfficeExtension.Error) {
        console.log("Debug info: " + JSON.stringify(error.debugInfo))
      }
    })
  }, [originalParagraphs[0], isTableArrayBuilt])

  // styling settings

  const stepBoxStyle = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "start",
    alignItems: "center",
    gap: "12px",
  }
  const stepNumberStyle = {border: `0.2px solid ${mibBlack}`, color: mibBlack, bgcolor: mibTürkis}
  const stepContentStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    width: "calc(100% - 60px)",
    p: 1,
    ml: "40px",
    mr: "20px",
  }
  const accordSumStyles = {backgroundColor: mibGrey}

  const apiKeyComponent = (
    <Box>
      <Box sx={{display: "flex", flexDirection: "column", gap: "12px", alignItems: "flex-start"}}>
        <ApiInput
          authorized={authorized}
          apiKeyInput={apiKeyInput}
          handleApiKeyInput={handleApiKeyInput}
        />
        <Box>
          {authorized ? (
            <Alert
              sx={{height: "100%"}}
              severity="success"
            >
              This key is valid.
            </Alert>
          ) : (
            <Alert
              sx={{height: "100%"}}
              severity="error"
            >
              {" "}
              Invalid Key. Book a plan to get your valid Authorization Key.
            </Alert>
          )}
        </Box>
      </Box>
    </Box>
  )
  const bottomRef = useRef(null)
  const authRef = useRef(null)
  const aboutRef = useRef(null)

  const scrollToBottom = ref => {
    setTimeout(() => ref.current?.scrollIntoView({behavior: "smooth"}), 400)
  }

  return (
    <Box sx={{m: 0, p: 0, width: "100%"}}>
      <Box
        sx={{
          m: 0,
          p: 2,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: "12px",
          backgroundColor: mibTürkis,
        }}
      >
        <Box
          sx={{
            m: 0,
            p: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            gap: "12px",
            backgroundColor: mibTürkis,
          }}
        >
          <Box
            component="img"
            sx={{
              height: 24,
              width: 24,
            }}
            alt="Logo."
            src={logo}
          />
          <Typography variant="h1">Make It Bilingual!</Typography>
        </Box>
        <Box sx={{width: "100%", mt: 1}}>
          <Divider />
        </Box>
        <Welcome />
        <Box sx={{display: authorized ? "none" : "flex", flexDirection: "column", p: 2}}>
          {apiKeyComponent}
        </Box>
      </Box>
      {authorized ? (
        ""
      ) : (
        <Box sx={{m: 3}}>
          <PlansDetails
            planActive={user.plan_Active}
            user={user}
          />
        </Box>
      )}

      <Box sx={{display: authorized ? "flex" : "none", flexDirection: "column"}}>
        <Box
          sx={{
            m: 0,
            pl: 2,
            pr: 2,
            pb: 2,
            display: "flex",
            flexDirection: "column",
            gap: "24px",
            backgroundColor: mibTürkis,
          }}
        >
          <Box sx={stepBoxStyle}>
            <Avatar sx={stepNumberStyle}>1</Avatar>
            <Typography
              variant="subtitle2"
              color="initial"
            >
              Select text in Word document
            </Typography>
          </Box>
          {/* <Box sx={{...stepContentStyle, pt: 0}}>
            <ShowSelection selectionStats={selectionStats} setSelectionStats={setSelectionStats} />
          </Box> */}
          <Box>
            <Box sx={stepBoxStyle}>
              <Avatar sx={stepNumberStyle}>2</Avatar>
              <Typography
                variant="subtitle2"
                color="initial"
              >
                Choose a language for translation
              </Typography>
            </Box>
            <Box sx={stepContentStyle}>
              <LanguageSelect
                langValue={langValue}
                setLangValue={setLangValue}
                langInputValue={langInputValue}
                setLangInputValue={setLangInputValue}
              />
            </Box>
          </Box>
          <Box>
            <Box sx={stepBoxStyle}>
              <Avatar sx={stepNumberStyle}>3</Avatar>
              <Typography
                variant="subtitle2"
                color="initial"
              >
                Optional settings
              </Typography>
            </Box>
            <Box sx={stepContentStyle}>
              <AddSprachklausel
                checked={checked}
                variant={variant}
                handleVariant={handleVariant}
                handleChange={handleChange}
                handleOpen={handleOpen}
                handleClose={handleClose}
                open={open}
              />
            </Box>
          </Box>
          <Box sx={stepBoxStyle}>
            <Box sx={stepContentStyle}>
              <Box>
                <Alert
                  sx={{display: selectionStats.paragraphs > 40 ? "flex" : "none", mb: 2}}
                  severity="warning"
                >
                  <AlertTitle>Select less than 40 paragraphs</AlertTitle>
                  {TOO_MANY_PARAGRAPHS}
                </Alert>
                <Collapse in={openSnackbar}>
                  <Alert
                    sx={{mb: 2}}
                    severity={severitySnackbar}
                    action={
                      <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={handleCloseAlert}
                      >
                        <CloseIcon fontSize="inherit" />
                      </IconButton>
                    }
                  >
                    {messageSnackbar}
                  </Alert>
                </Collapse>
                {buildingProgress ? (
                  <Box sx={{m: 1, display: "flex", flexDirection: "row", gap: "24px"}}>
                    <CircularProgress />
                    {originalParagraphs.length > 10 ? (
                      <Typography variant="body2">
                        Much text. This might take some minutes. Please wait...
                      </Typography>
                    ) : (
                      ""
                    )}
                  </Box>
                ) : (
                  ""
                )}
              </Box>
              <Button
                disabled={selectionStats.paragraphs > 40 ? true : false}
                size="large"
                variant="contained"
                onClick={() => {
                  handleBuildingProgress(true)
                  reset()
                  insertEmersonQuoteAtSelection()
                }}
              >
                Make It Bilingual!
              </Button>
            </Box>
          </Box>
        </Box>

        <Usage
          scrollToBottom={scrollToBottom}
          user={user}
          triggerRefresh={triggerRefresh}
          handleRefreshProgress={handleRefreshProgress}
          refreshProgress={refreshProgress}
          refreshSuccess={refreshSuccess}
          handleRefreshSuccess={handleRefreshSuccess}
          accordSumStyles={accordSumStyles}
        />
        <Plans
          scrollToBottom={scrollToBottom}
          accordSumStyles={accordSumStyles}
          planActive={user.plan_active}
          user={user}
        />
        <Accordion
          disableGutters
          elevation={0}
          onChange={() => {
            scrollToBottom(authRef)
          }}
        >
          <AccordionSummary
            sx={accordSumStyles}
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <div ref={authRef} />
            <Typography>Authorization</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box>{apiKeyComponent}</Box>
          </AccordionDetails>
        </Accordion>
      </Box>
      <Accordion
        disableGutters
        elevation={0}
        onChange={() => {
          scrollToBottom(aboutRef)
        }}
      >
        <AccordionSummary
          sx={accordSumStyles}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <div ref={aboutRef} />
          <Typography>About</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{m: 2, display: "flex", flexDirection: "column", gap: "24px"}}>
            <Typography
              variant="body1"
              gutterBottom
            >
              Make It Bilingual! helps you to create bilingual versions of your (legal) documents - in the
              blink of an eye. Save yourself hours of translation and formatting work and boost your
              international business.
            </Typography>
            <Typography
              variant="body1"
              gutterBottom
            >
              The app operates according to the highest data protection and confidentiality standards: Your
              data is processed exclusively on DSGVO-compliant servers and deleted immediately after
              translation. For translation, we use the DeepL engine, which is committed to complying with the
              above standards.
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
            <ContactUs user={user} />

            <Box>
              <Typography variant="body1">info@makeitbilingual.com</Typography>
              <br />
              <Typography variant="body1">Resolvio GmbH</Typography>
              <Typography variant="body1">Emser Straße 119</Typography>
              <Typography variant="body1">56076 Koblenz</Typography>
              <Typography variant="body1">Germany</Typography>
              <br />
              <Typography variant="body1">
                Director: Hubertus Scherbarth, Rechtsanwalt, Steuerberater
              </Typography>
              <br />
              <Typography variant="body1">Register court: Amtsgericht Koblenz, Germany</Typography>
              <Typography variant="body1">Register number: HRB 29071</Typography>
            </Box>
          </Box>
        </AccordionDetails>
      </Accordion>
      <div ref={bottomRef} />
    </Box>
  )
}
