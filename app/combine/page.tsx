"use client";

import React from "react";
import { Card, CardBody, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";
import { Button } from "@nextui-org/button";
import { DropZone } from '@react-spectrum/dropzone';
import Upload from '@spectrum-icons/illustrations/Upload';
import { Content, IllustratedMessage } from '@adobe/react-spectrum';
import { Heading, Text } from "react-aria-components";
import { subtitle, title } from "@/components/primitives";
import { saveAs } from "file-saver";
import { Toaster, toast } from 'sonner';
import {DropEvent} from "@react-types/shared";
import {CombineWorkerMessage, CombineWorkerResult} from "@/app/combine/worker";

/**
 * CombinePage component provides a user interface for file combining functionality.
 */
export default function CombinePage() {
	const [selectedFileFormat, setSelectedFileFormat] = React.useState(new Set([".txt"]));
	const [isFilled, setIsFilled] = React.useState(false);
	const [files, setFiles] = React.useState<File[]>([]);
	const [combining, setCombining] = React.useState<boolean>(false);

	const [webWorker] = React.useState(new Worker(new URL('./worker.ts', import.meta.url)));

	React.useEffect(() => {
		webWorker.onmessage = (e: MessageEvent<CombineWorkerResult>) => {
			if (e.data) {
				if (e.data.error === null) {
					setCombining(false);

					const blob: Blob = new Blob([e.data.secret], { type: "application/octet-stream" });
					const fileName: string = "recovered_secret" + Array.from(selectedFileFormat);

					saveAs(blob, fileName);
				} else {
					toast.error("The combine process has encountered an error");
					console.error(e.data.error);
				}
			}
		}
	}, [webWorker, selectedFileFormat]);

	React.useEffect(() => {
		return () => {
			webWorker.terminate();
		};
	}, []);

	const selectedValue = React.useMemo(
		() => Array.from(selectedFileFormat).join(", ").replaceAll("_", " "),
		[selectedFileFormat]
	);

	const handleDrop = async (event: DropEvent) => {
		let droppedFiles: File[] = [];

		const fls = await Promise.all(event.items.map(item => {
			// We return a promise for each file kind item
			if (item.kind === "file") {
				return item.getFile();
			}
			// We return a null for non-file items, which we'll filter out later
			return null;
		}));

		fls.forEach((f) => {
			if (f !== null) {
				droppedFiles.push(f);
			}
		})

		setFiles([...files, ...droppedFiles]);
		setIsFilled(true);
	};

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files) {
			const selectedFiles = Array.from(event.target.files);
			setFiles([...files, ...selectedFiles]);
			setIsFilled(true);
		}
	};

	const handleCombineAndDownload = async (): Promise<void> => {
		const shares: Uint8Array[] = await Promise.all(files.map(async (file: File) => {
			const arrayBuffer: ArrayBuffer = await file.arrayBuffer();
			return new Uint8Array(arrayBuffer);
		}));

		setCombining(true);

		webWorker.postMessage({
			shares: shares,
		} as CombineWorkerMessage)
	};

	return (
		<div className={"flex flex-col w-full h-full justify-between"}>
			<Toaster position={"bottom-center"} />
			<h1 className={title()}>Combine your shares</h1>
			<h1 className={subtitle()}>And reconstruct a secret</h1>
			<div className={"flex w-full h-full justify-between"}>
				<Card className={"w-full mt-4 mb-4"}>
					<CardBody>
						<DropZone
							flex
							isFilled={isFilled}
							onDrop={handleDrop}>
							<IllustratedMessage>
								<Upload />
								<Heading className={"mt-4"}>
									<Text slot="label">
										{isFilled ? `${files.length} Shares have been dropped` : 'Drag and drop here'}
									</Text>
								</Heading>
								<Content>
									<Button variant={"bordered"} radius={"none"} onClick={() => document.getElementById("combine-zone")?.click()}>Browse</Button>
									<input style={{ display: "none" }} id={"combine-zone"} type="file" onChange={handleFileChange} multiple/>
								</Content>
							</IllustratedMessage>
						</DropZone>

					</CardBody>
				</Card>
			</div>
			<div className={"flex w-full justify-end gap-5"}>
				<Button
					color={"primary"}
					radius={"none"}
					onClick={handleCombineAndDownload}
					isDisabled={combining}
				>
					{combining ? "In progress" : "Combine and download"}
				</Button>
				<Dropdown backdrop="blur">
					<DropdownTrigger>
						<Button
							variant={"bordered"}
							radius={"none"}
							isDisabled={combining}
						>
							{selectedValue}
						</Button>
					</DropdownTrigger>
					<DropdownMenu
						aria-label="File Formats"
						selectionMode={"single"}
						selectedKeys={selectedFileFormat}
						onSelectionChange={(keys) => {
							setSelectedFileFormat(keys as Set<string>);
						}}
					>
						<DropdownItem key=".txt">.txt</DropdownItem>
						<DropdownItem key=".png">.png</DropdownItem>
						<DropdownItem key=".jpg">.jpg</DropdownItem>
						<DropdownItem key=".pdf">.pdf</DropdownItem>
					</DropdownMenu>
				</Dropdown>
			</div>
		</div>
	);
}
