import {CardBody, Divider, Slider, SliderValue, Tooltip} from "@nextui-org/react";
import React from "react";
import ConfigurationSlider from "@/components/configuration-slider";

export interface Step2Props {
  sharesNumber: SliderValue;
  setSharesNumber: React.Dispatch<React.SetStateAction<SliderValue>>;
  reconstructionThreshold: SliderValue;
  setReconstructionThreshold: React.Dispatch<React.SetStateAction<SliderValue>>;
}

export default function Step2({ sharesNumber, setSharesNumber, reconstructionThreshold, setReconstructionThreshold }: Step2Props) {
  return (
    <CardBody className={"flex"}>
      <div>
        <ConfigurationSlider
          label={"Number of shares"}
          step={1}
          minValue={2}
          maxValue={255}
          value={sharesNumber}
          setValue={setSharesNumber}
        />
        <ConfigurationSlider
          label={"Reconstruction threshold"}
          step={1}
          minValue={2}
          maxValue={255}
          value={reconstructionThreshold}
          setValue={setReconstructionThreshold}
        />
      </div>
      <div className={"flex h-full items-center justify-center"}>
        <p className={"text-center"}>
          More options will be available later...
        </p>
      </div>
    </CardBody>
  );
}