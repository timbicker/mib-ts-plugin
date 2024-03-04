import React, {useEffect} from "react"
import Box from "@mui/material/Box"
import {usePaddle} from "@/usePaddle"
import Button from "@mui/material/Button"

export function PaddleModal() {
  const {openCheckout, state} = usePaddle()

  useEffect(() => {
    // if (paddle) openCheckout()
  }, [state])

  return (
    <Box
      sx={{
        mt: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/*<HorizontalLinearStepper />*/}
      {/*<Button onClick={getPrices}>Get Prices</Button>*/}
      <Box className={"checkout-container"} />
      <Button onClick={openCheckout}>Open Checkout</Button>
    </Box>
  )
}
