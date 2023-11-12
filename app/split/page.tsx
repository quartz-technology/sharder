"use client";

import {Stepper, StepItem} from "@/components/stepper";
import React from "react";
import {Button} from "@nextui-org/button";
import {Card, SliderValue, Spinner} from "@nextui-org/react";
import StepUpload from "@/app/split/step-upload";
import StepConfigure from "@/app/split/step-configure";
import StepDownload from "@/app/split/step-download";
import {subtitle, title} from "@/components/primitives";
import {toast, Toaster} from "sonner";
import {SplitWorkerMessage, SplitWorkerResult} from "@/app/split/worker";

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
	const [splitting, setSplitting] = React.useState<boolean>(false);

	const [webWorker, setWebWorker] = React.useState<Worker | null>(null);

	React.useEffect(() => {
		const ww = new Worker(new URL('./worker.ts', import.meta.url));

		ww.onmessage = (e: MessageEvent<SplitWorkerResult>) => {
			if (e.data) {
				if (e.data.error === null) {
					setShares(e.data.shares);
					setSplitting(false);
					setActiveStep(Step.Download);
				} else {
					toast.error("The split process has encountered an error");
					console.error(e.data.error);
				}
			}
		}

		setWebWorker(ww);
	}, [setWebWorker]);

	React.useEffect(() => {
		return () => {
			if (webWorker) {
				webWorker.terminate();
			}
		};
	}, []);

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

				setSplitting(true);
				if (webWorker) {
					webWorker.postMessage({
						secret: secret,
						sharesNumber: sharesNumber as number,
						reconstructionThreshold: reconstructionThreshold as number,
					} as SplitWorkerMessage);
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
				{splitting &&
				<Spinner />
				}
				<Button
					color={"primary"}
					radius={"none"}
					isDisabled={activeStep === stepItems.length || splitting}
					onClick={onNextStep}
				>
					{
						(() => {
							switch (activeStep) {
								case 0:
									return "Next"
								case 1:
									return splitting ? "In progress" : "Split";
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
