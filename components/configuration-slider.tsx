import React from "react";
import {Slider, SliderValue, Tooltip} from "@nextui-org/react";

export interface ConfigurationSliderProps {
  label: string;
  step: number;
  minValue: number;
  maxValue: number;
  value: SliderValue;
  setValue: React.Dispatch<React.SetStateAction<SliderValue>>;
}

export default function ConfigurationSlider({ label, step, minValue, maxValue, value, setValue }: ConfigurationSliderProps) {
  const handleChange = (value: SliderValue) => {
    if (isNaN(Number(value))) return;

    setValue(value);
  };

  return (
    <Slider
      renderLabel={(props) => (
        <label {...props} className={"text-medium"}>
        </label>
      )}
      label={label}
      size="sm"
      step={step}
      minValue={minValue}
      maxValue={maxValue}
      color="foreground"
      className={"p-4 gap-3"}
      renderValue={({children, ...props}) => (
        <output {...props}>
          <Tooltip
            className="text-tiny text-default-500 rounded-md p-1"
            content="Press Enter to confirm"
            placement="left"
          >
            <input
              className="px-1 py-0.5 w-10 text-right text-small text-default-700 font-medium bg-default-100 outline-none transition-colors rounded-small border-medium border-transparent hover:border-primary focus:border-primary"
              type="text"
              value={value.toString()}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const v = e.target.value;

                setValue(Number(v));
              }}
              onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                if (e.key === "Enter" && !isNaN(Number(value))) {
                  setValue(Number(value));
                }
              }}
            />
          </Tooltip>
        </output>
      )}
      value={value}
      onChange={handleChange}
    />
  );
}
