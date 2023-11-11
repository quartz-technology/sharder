"use client";

import React from "react";
import { Card, CardBody, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";
import { Button } from "@nextui-org/button";
import { DropZone } from '@react-spectrum/dropzone';
import Upload from '@spectrum-icons/illustrations/Upload';
import { Content, IllustratedMessage } from '@adobe/react-spectrum';
import { Heading, Text } from "react-aria-components";
import { subtitle, title } from "@/components/primitives";
import { combine } from 'shamir-secret-sharing';
import { saveAs } from "file-saver";
import { Toaster, toast } from 'sonner';

/**
 * CombinePage component provides a user interface for file combining functionality.
 */
export default function CombinePage() {
	const [selectedFileFormat, setSelectedFileFormat] = React.useState(new Set([".txt"]));
	const [isFilled, setIsFilled] = React.useState(false);
	const [files, setFiles] = React.useState<File[]>([]);


	const selectedValue = React.useMemo(
		() => Array.from(selectedFileFormat).join(", ").replaceAll("_", " "),
		[selectedFileFormat]
	);

	const handleDrop = (event: any) => {
		let droppedFiles: File[] = [];
		event.items.forEach(async (item: any) => {
			if (item.kind === "file") {
				const file = await item.getFile();
				droppedFiles.push(file);
			}
		});
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
		try {
			const shares: Uint8Array[] = await Promise.all(files.map(async (file: File) => {
				const arrayBuffer: ArrayBuffer = await file.arrayBuffer();
				return new Uint8Array(arrayBuffer);
			}));

			const combinedData: Uint8Array = await combine(shares);

			const blob: Blob = new Blob([combinedData], { type: "application/octet-stream" });

			const fileName: string = "recovered_secret" + Array.from(selectedFileFormat);
			saveAs(blob, fileName);
		} catch (error: any) {
			toast.error(`Error when combining files : ${error.message}`);
		}
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
										{isFilled ? 'Shares have been dropped' : 'Drag and drop here'}
									</Text>
								</Heading>
								<Content>
									<Button variant={"bordered"} radius={"none"} onClick={() => document.getElementById("combine-zone")?.click()}>Browse</Button>
									<input style={{ display: "none" }} id={"combine-zone"} type="file" onChange={handleFileChange}/>
								</Content>
							</IllustratedMessage>
						</DropZone>

					</CardBody>
				</Card>
			</div>
			<div className={"flex w-full justify-end gap-5"}>
				<Button color={"primary"} radius={"none"} onClick={handleCombineAndDownload}>
					Combine and download
				</Button>
				<Dropdown backdrop="blur">
					<DropdownTrigger>
						<Button
							variant={"bordered"}
							radius={"none"}
						>
							{selectedValue}
						</Button>
					</DropdownTrigger>
					<DropdownMenu
						aria-label="File Formats"
						selectionMode={"single"}
						selectedKeys={selectedFileFormat}
						onSelectionChange={(keys) => setSelectedFileFormat(keys as Set<string>)}
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
