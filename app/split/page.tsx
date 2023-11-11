"use client";

import {Stepper, StepItem} from "@/components/stepper";
import React from "react";
import {Button} from "@nextui-org/button";
import {Card, CardBody} from "@nextui-org/react";
import Step1 from "@/app/split/step1";
import Step2 from "@/app/split/step2";
import Step3 from "@/app/split/step3";
import {subtitle, title} from "@/components/primitives";

export default function SplitPage() {
	const stepItems: StepItem[] = [
		{
			name: "Upload",
			content: <Step1 />,
		},
		{
			name: "Configure",
			content: <Step2 />,
		},
		{
			name: "Download",
			content: <Step3 />,
		},
	];
	const [activeStep, setActiveStep] = React.useState<number>(0);

	const onPrevStep = () => {
		setActiveStep(activeStep - 1);
	}

	const onNextStep = () => {
		if (activeStep < stepItems.length - 1) {
			setActiveStep(activeStep + 1);
		} else {
			setActiveStep(0);
		}
	};

	return (
		<div className={"flex flex-col w-full h-full justify-between"}>
			<h1 className={title()}>Split a secret</h1>
			<h1 className={subtitle()}>And download the shares</h1>
			<div className={"mt-4"}>
				<Stepper items={stepItems} activeStep={activeStep} />
			</div>
			<div className={"flex w-full h-full justify-between"}>
				<Card className={"w-full mt-4 mb-4"}>
					{stepItems[activeStep].content}
				</Card>
			</div>
			<div className={"flex w-full justify-between"}>
				<Button
					color={"primary"}
					radius={"none"}
					isDisabled={activeStep === 0}
					onClick={onPrevStep}
				>
					Back
				</Button>
				<Button
					color={"primary"}
					radius={"none"}
					isDisabled={activeStep === stepItems.length}
					onClick={onNextStep}
				>
					{
						(() => {
							switch (activeStep) {
								case 0:
									return "Next"
								case 1:
									return "Split"
								case 2:
									return "Reset"
							}
						})()
					}
				</Button>
			</div>
		</div>
	);
}
