import {JSX} from "react";

export interface StepItem {
  name: string;
  content: JSX.Element;
}

export interface StepperProps {
  items: StepItem[];
  activeStep: number;
}

export function Stepper(props: StepperProps) {
  const innerElements: JSX.Element[] = [];

  props.items.forEach((item, id) => {
    const lineColor = id - props.activeStep <= 0 ? "bg-primary" : "bg-gray-400";
    const textColorClassName = id - props.activeStep <= 0 ? "text-primary" : "";
    const textWeight = props.activeStep === id ? "font-extrabold" : "";

    if (id > 0) {
      innerElements.push(<li key={`step-progress-line-${id}`} className={`flex w-full sm:mx-6 max-sm:mx-3 h-0.5 ${lineColor}`}/>)
    }

    innerElements.push(<li key={`step-name-${id}`} className={`${textColorClassName} ${textWeight}`}>{item.name}</li>)
  });

  return (
    <ol className={"flex w-full items-center justify-between"}>
      {innerElements.map((element) => {
          return element;
      })}
    </ol>
  )
}
