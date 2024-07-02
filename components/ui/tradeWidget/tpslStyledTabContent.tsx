"use client"

import {
  StyledTabs,
  StyledTabsContent,
  StyledTabsList,
  StyledTabsTrigger,
} from "@/components/ui/styledTab"

import TpslTabsEntirePositionWidget from "./tpslTabsEntirePositionWidget"
import TpslTabsPartialPositionWidget from "./tpslTabsPartialPositionWidget"

type TpslStyledTabProps = {
  positionInfo: any
}

export default function TpslStyledTabContent({
  positionInfo,
}: TpslStyledTabProps) {
  return (
    <>
      <StyledTabs defaultValue="Entire Position">
        <StyledTabsList className="border-none">
          <StyledTabsTrigger
            value="Entire Position"
            className="p-0 mr-3 text-sm"
          >
            Entire Position
          </StyledTabsTrigger>
          <StyledTabsTrigger value="Partial Position" className="p-0 text-sm">
            Partial Position
          </StyledTabsTrigger>
        </StyledTabsList>
        <StyledTabsContent value="Entire Position">
          <TpslTabsEntirePositionWidget positionInfo={positionInfo} />
        </StyledTabsContent>
        <StyledTabsContent value="Partial Position">
          <TpslTabsPartialPositionWidget positionInfo={positionInfo} />
        </StyledTabsContent>
      </StyledTabs>
    </>
  )
}
