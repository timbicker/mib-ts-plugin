import Box from "@mui/material/Box"
import Stepper from "@mui/material/Stepper"
import Step from "@mui/material/Step"
import StepLabel from "@mui/material/StepLabel"
import React from "react"

const steps = ["Select campaign settings", "Create an ad group", "Create an ad"]

function useStepper() {
  const [activeStep, setActiveStep] = React.useState(0)

  const goToStep = (step: number) => {
    setActiveStep(step)
  }

  return {
    activeStep,
    goToStep,
  }
}

function HorizontalLinearStepper() {
  const {activeStep, goToStep} = useStepper()

  return (
    <Box sx={{width: 800}}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          return (
            <Step
              key={label}
              onClick={() => goToStep(index)}
            >
              <StepLabel>{label}</StepLabel>
            </Step>
          )
        })}
      </Stepper>
    </Box>
  )
}
