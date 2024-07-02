import { useState } from "react"

import { Button } from "@/components/ui/button"
import CalculatorDropDownBox from "@/components/ui/calculatorDropDown"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { LabeledInput } from "@/components/ui/labeledInput"
import { LeverageInput } from "@/components/ui/leverageInput"
import { ListItem } from "@/components/ui/listItem"
import { PnLSlider } from "@/components/ui/pnlSlider"
import Iconify from "@/components/Iconify"

export default function PoolCalculatorWidget() {
  const [leverageNumber, setLeverageNumber] = useState(1)

  const handleSliderValueChange = (value: any) => {
    setLeverageNumber(value[0])
  }

  const handleInputChange = (event: any) => {
    const value = parseFloat(event.target.value)
    if (!isNaN(value) && value >= 1 && value <= 100) {
      setLeverageNumber(value)
    } else if (event.target.value === "") {
      setLeverageNumber(0)
    }
  }

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <button className="ml-1">
            <Iconify icon={"ri:calculator-line"} />
          </button>
        </DialogTrigger>
        <DialogContent className="bg-0xdialog w-[730px]">
          <DialogHeader>
            <DialogTitle>
              <CalculatorDropDownBox />
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-row gap-4">
            <div className="flex flex-col w-[60%]">
              <div className="mt-4">
                <LeverageInput
                  label="Leverage"
                  suffix="X"
                  value={leverageNumber.toString()}
                  onChange={handleInputChange}
                  type="number"
                  min="1"
                  max="100"
                  className="mb-2"
                />
                <div className="mt-4">
                  <PnLSlider
                    defaultValue={[1]}
                    max={100}
                    min={1}
                    step={1}
                    onValueChange={handleSliderValueChange}
                    value={[leverageNumber]}
                    style={{
                      marginBottom: 10,
                      marginTop: 10,
                    }}
                  />
                </div>
              </div>
              <div className="mt-[45px]">
                <LabeledInput
                  label={"Margin"}
                  suffix={"USDT"}
                  value={0}
                  type="number"
                  className="mb-2"
                />
              </div>
              <Button className="w-full mt-4 bg-agdexMain hover:bg-agdexMain-foreground">
                Calculate
              </Button>
            </div>
            <div className="bg-muted w-[50%] rounded-lg">
              <div className="mt-4 ml-4">Result</div>
              <div className="mx-2 my-3 border-t border-0xline"></div>
              <div className="flex flex-col gap-2 mx-4 mb-4">
                <ListItem keyText={"Liquidity"} value={"-"} />
                <ListItem keyText={"Max APR"} value={"-"} />
                <ListItem keyText={"Max Income"} value={"-"} />
              </div>
            </div>
          </div>

          <div className="mt-2 text-sm text-0xgrey">
            *The calculation is for reference only and does not include trading
            fee, execution fee and other actual costs.
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
