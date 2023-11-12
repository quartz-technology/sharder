"use client";

import {Stepper, StepItem} from "@/components/stepper";
import React from "react";
import {Button} from "@nextui-org/button";
import {Card, SliderValue} from "@nextui-org/react";
import StepUpload from "@/app/split/step-upload";
import StepConfigure from "@/app/split/step-configure";
import StepDownload from "@/app/split/step-download";
import {subtitle, title} from "@/components/primitives";
import {toast, Toaster} from "sonner";
import {split} from "shamir-secret-sharing";

enum Step {
	Upload = 0,
	Configure,
	Download,
}

export default function SplitPage() {
	const [secret, setSecret] = React.useState<Uint8Array>(new Uint8Array());
	const [shares, setShares] = React.useState<Uint8Array[]>([]);
	const [sharesNumber, setSharesNumber] = React.useState<SliderValue>(2);
	const [reconstructionThreshold, setReconstructionThreshold] = React.useState<SliderValue>(2);

	const stepItems: StepItem[] = [
		{
			name: "Upload",
			content: <StepUpload setSecret={setSecret}/>,
		},
		{
			name: "Configure",
			content: <StepConfigure
				sharesNumber={sharesNumber}
				setSharesNumber={setSharesNumber}
				reconstructionThreshold={reconstructionThreshold}
				setReconstructionThreshold={setReconstructionThreshold}
			/>,
		},
		{
			name: "Download",
			content: <StepDownload shares={shares} />,
		},
	];
	const [activeStep, setActiveStep] = React.useState<number>(0);

	const onPrevStep = () => {
		setActiveStep(activeStep - 1);
	}

	const onNextStep = async () => {
		switch (activeStep) {
			case Step.Upload:
				if (secret.length > 0) {
					setActiveStep(Step.Configure);
				} else {
					toast.error("You must select one non-empty file to split");
				}

				break;
			case Step.Configure:
				if (reconstructionThreshold > sharesNumber) {
					toast.error("The reconstruction threshold must be less or equal to the number of shares")
					break;
				}

				try {
					setShares(await split(secret, sharesNumber as number, reconstructionThreshold as number));
					setActiveStep(Step.Download);

					break;
				} catch (e) {
					toast.error("The split process has encountered an error");
					console.error(e);
				}

				break;
			case Step.Download:
				setSecret(new Uint8Array());
				setShares([]);
				setActiveStep(Step.Upload);
		}
	};

	return (
		<div className={"flex flex-col w-full h-full justify-between"}>
			<Toaster position={"bottom-center"} />
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
