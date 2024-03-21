import { useState } from "react"

import { Button } from "@/components/ui/button"
import { ButtonInput } from "@/components/ui/buttonInput"
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
import {
  StyledTabs,
  StyledTabsContent,
  StyledTabsList,
  StyledTabsTrigger,
} from "@/components/ui/styledTab"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Iconify from "@/components/Iconify"

export default function TradeCalculatorWidget() {
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
          <StyledTabs defaultValue="PnL">
            <StyledTabsList className="ml-4 space-x-8 border-none">
              <StyledTabsTrigger value="PnL" className="p-0 text-sm">
                PnL
              </StyledTabsTrigger>
              <StyledTabsTrigger value="Target Price" className="p-0 text-sm">
                Target Price
              </StyledTabsTrigger>
              <StyledTabsTrigger
                value="Liquidation Price"
                className="p-0 text-sm"
              >
                Liquidation Price
              </StyledTabsTrigger>
              <StyledTabsTrigger value="Entry Price" className="p-0 text-sm">
                Entry Price
              </StyledTabsTrigger>
            </StyledTabsList>
            <div className="border-t border-0xline"></div>
            <StyledTabsContent value="PnL">
              <div className="flex flex-row gap-3">
                <Tabs defaultValue={"long"} className="w-[60%]">
                  <TabsList style={{ width: "100%" }}>
                    <TabsTrigger style={{ width: "50%" }} value={"long"}>
                      Long
                    </TabsTrigger>
                    <TabsTrigger style={{ width: "50%" }} value={"short"}>
                      Short
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="long">
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
                      <ButtonInput
                        label="Entry Price"
                        suffix="USDT"
                        value={0}
                        type="number"
                        className="mb-2"
                      />
                      <LabeledInput
                        label={"TP trigger price"}
                        suffix={"USDT"}
                        value={0}
                        type="number"
                        className="mb-2"
                      />
                      <LabeledInput
                        label={"SL trigger price"}
                        suffix={"USDT"}
                        value={0}
                        type="number"
                        className="mb-2"
                      />
                      <LabeledInput
                        label={"Size"}
                        suffix={"ETH"}
                        value={0}
                        type="number"
                        className="mb-2"
                      />
                    </div>
                  </TabsContent>
                  <TabsContent value="short">
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
                      <ButtonInput
                        label="Entry Price"
                        suffix="USDT"
                        value={0}
                        type="number"
                        className="mb-2"
                      />
                      <LabeledInput
                        label={"TP trigger price"}
                        suffix={"USDT"}
                        value={0}
                        type="number"
                        className="mb-2"
                      />
                      <LabeledInput
                        label={"SL trigger price"}
                        suffix={"USDT"}
                        value={0}
                        type="number"
                        className="mb-2"
                      />
                      <LabeledInput
                        label={"Size"}
                        suffix={"ETH"}
                        value={0}
                        type="number"
                        className="mb-2"
                      />
                    </div>
                  </TabsContent>
                  <Button className="w-full mt-4 bg-0xyellow hover:bg-0xyellow-foreground">
                    Calculate
                  </Button>
                </Tabs>
                <div className="bg-muted w-[50%] rounded-xl p-2">
                  <div className="mt-2 ml-2">Result</div>
                  <div className="mx-2 my-3 border-t border-0xline"></div>
                  <div className="flex flex-col gap-2 mx-2 mb-4">
                    <ListItem keyText={"Margin"} value={"-"} />
                    <ListItem keyText={"Risk / Reward"} value={"-"} />
                    <ListItem keyText={"TP PnL"} value={"-"} />
                    <ListItem keyText={"TP PnL%"} value={"-"} />
                    <ListItem keyText={"SL PnL"} value={"-"} />
                    <ListItem keyText={"SL PnL%"} value={"-"} />
                  </div>
                  <div className="mx-2 my-3 border-t border-0xline"></div>
                  <div className="mx-3 my-2 ">
                    <span className="font-semibold">Long trade</span> the
                    risk/reward ratio is: (Entry Price − Stop Loss) / (Profit
                    Target − Entry Price) × 100%.
                  </div>
                  <div className="mx-3 my-2 ">
                    <span className="font-semibold">Short trade</span> the
                    risk/reward ratio is: (Stop Loss − Entry Price) / (Entry
                    Price − Profit Target) × 100%.
                  </div>
                </div>
              </div>
              <div className="mt-2">
                *The calculation is for reference only and does not include
                trading fee, execution fee and other actual costs.
              </div>
            </StyledTabsContent>
            <StyledTabsContent value="Target Price">
              <div className="flex flex-row gap-3">
                <Tabs defaultValue={"long"} className="w-[60%]">
                  <TabsList style={{ width: "100%" }}>
                    <TabsTrigger style={{ width: "50%" }} value={"long"}>
                      Long
                    </TabsTrigger>
                    <TabsTrigger style={{ width: "50%" }} value={"short"}>
                      Short
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="long">
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
                      <ButtonInput
                        label="Entry Price"
                        suffix="USDT"
                        value={0}
                        type="number"
                        className="mb-2"
                      />
                      <LabeledInput
                        label={"PnL%"}
                        suffix={"%"}
                        value={0}
                        type="number"
                        className="mb-2"
                      />
                    </div>
                  </TabsContent>
                  <TabsContent value="short">
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
                      <ButtonInput
                        label="Entry Price"
                        suffix="USDT"
                        value={0}
                        type="number"
                        className="mb-2"
                      />
                      <LabeledInput
                        label={"PnL%"}
                        suffix={"%"}
                        value={0}
                        type="number"
                        className="mb-2"
                      />
                    </div>
                  </TabsContent>
                  <Button className="w-full mt-28 bg-0xyellow hover:bg-0xyellow-foreground">
                    Calculate
                  </Button>
                </Tabs>
                <div className="bg-muted w-[50%] rounded-lg">
                  <div className="mt-2 ml-2">Result</div>
                  <div className="mx-2 my-3 border-t border-0xline"></div>
                  <div className="flex flex-col gap-2 mx-2 mb-4">
                    <ListItem keyText={"Target Price"} value={"-"} />
                  </div>
                </div>
              </div>
              <div className="mt-2 text-sm text-0xgrey">
                *The calculation is for reference only and does not include
                trading fee, execution fee and other actual costs.
              </div>
            </StyledTabsContent>
            <StyledTabsContent value="Liquidation Price">
              <div className="flex flex-row gap-3">
                <Tabs defaultValue={"long"} className="w-[60%]">
                  <TabsList style={{ width: "100%" }}>
                    <TabsTrigger style={{ width: "50%" }} value={"long"}>
                      Long
                    </TabsTrigger>
                    <TabsTrigger style={{ width: "50%" }} value={"short"}>
                      Short
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="long">
                    <div className="mt-4">
                      <ButtonInput
                        label="Entry Price"
                        suffix="USDT"
                        value={0}
                        type="number"
                        className="mb-2"
                      />
                      <LabeledInput
                        label={"Size"}
                        suffix={"ETH"}
                        value={0}
                        type="number"
                        className="mb-2"
                      />
                      <LabeledInput
                        label={"Balance"}
                        suffix={"USDT"}
                        value={0}
                        type="number"
                        className="mb-2"
                        tooltipContent={
                          <span>
                            Simulated position net value. Balance = Margin +
                            Unrealized PnL
                          </span>
                        }
                      />
                    </div>
                  </TabsContent>
                  <TabsContent value="short">
                    <div className="mt-4">
                      <ButtonInput
                        label="Entry Price"
                        suffix="USDT"
                        value={0}
                        type="number"
                        className="mb-2"
                      />
                      <LabeledInput
                        label={"Size"}
                        suffix={"ETH"}
                        value={0}
                        type="number"
                        className="mb-2"
                      />
                      <LabeledInput
                        label={"Balance"}
                        suffix={"USDT"}
                        value={0}
                        type="number"
                        className="mb-2"
                        tooltipContent={
                          <span>
                            Simulated position net value. Balance = Margin +
                            Unrealized PnL
                          </span>
                        }
                      />
                    </div>
                  </TabsContent>
                  <Button className="w-full mt-[169px] bg-0xyellow hover:bg-0xyellow-foreground">
                    Calculate
                  </Button>
                </Tabs>
                <div className="bg-muted w-[50%] rounded-lg">
                  <div className="mt-2 ml-2">Result</div>
                  <div className="mx-2 my-3 border-t border-0xline"></div>
                  <div className="flex flex-col gap-2 mx-2 mb-4">
                    <ListItem keyText={"Liquidation Price"} value={"-"} />
                  </div>
                </div>
              </div>
              <div className="mt-2 text-sm text-0xgrey">
                *The calculation is for reference only and does not include
                trading fee, execution fee and other actual costs.
              </div>
            </StyledTabsContent>
            <StyledTabsContent value="Entry Price">
              <div className="flex flex-row gap-3">
                <Tabs defaultValue={"long"} className="w-[60%]">
                  <TabsList style={{ width: "100%" }}>
                    <TabsTrigger style={{ width: "50%" }} value={"long"}>
                      Long
                    </TabsTrigger>
                    <TabsTrigger style={{ width: "50%" }} value={"short"}>
                      Short
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="long"></TabsContent>
                  <TabsContent value="short"></TabsContent>
                </Tabs>
                <div className="bg-muted w-[50%] rounded-lg">
                  <div className="mt-2 ml-2">Result</div>
                  <div className="mx-2 my-3 border-t border-0xline"></div>
                  <div className="flex flex-col gap-2 mx-2 mb-4">
                    <ListItem keyText={"Entry Price"} value={"-"} />
                  </div>
                </div>
              </div>
              <div className="my-4 border-t border-0xline"></div>
              <div className="flex flex-row gap-4">
                <div className="w-[7%] flex flex-col mr-1">
                  <div className="self-center ">Open</div>
                  <div className="self-center mt-3">1</div>
                </div>
                <div className="w-[40%]">
                  <div className="text-sm text-0xgrey">Entry price</div>
                  <div>
                    <LabeledInput
                      label={"Entry price"}
                      suffix={"USDT"}
                      value={0}
                      type="number"
                      className="mb-2"
                    />
                  </div>
                </div>
                <div className="w-[40%]">
                  <div className="text-sm text-0xgrey">Size</div>
                  <div>
                    <LabeledInput
                      label={"Size"}
                      suffix={"ETH"}
                      value={0}
                      type="number"
                      className="mb-2"
                    />
                  </div>
                </div>
                <div className="w-[10%] flex flex-col">
                  <div className="self-center">Operation</div>
                  <div className="self-center mt-1">
                    <Iconify icon={"mdi:minus-box-outline"} />
                  </div>
                </div>
              </div>
              <Button className="mt-3 bg-0xyellow hover:bg-0xyellow-foreground">
                + Add
              </Button>
              <Button className="w-full mt-[107px] bg-0xyellow hover:bg-0xyellow-foreground">
                Calculate
              </Button>
              <div className="mt-2 text-sm text-0xgrey">
                *The calculation is for reference only and does not include
                trading fee, execution fee and other actual costs.
              </div>
            </StyledTabsContent>
          </StyledTabs>
        </DialogContent>
      </Dialog>
    </>
  )
}
