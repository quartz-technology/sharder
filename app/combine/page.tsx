"use client";

import {subtitle, title} from "@/components/primitives";
import {
	Card,
	CardBody,
	Dropdown,
	DropdownItem, DropdownMenu, DropdownTrigger
} from "@nextui-org/react";
import {Button} from "@nextui-org/button";
import React from "react";

export default function CombinePage() {
	const [selectedFileFormat, setSelectedFileFormat] = React.useState(new Set([".txt"]));

	const selectedValue = React.useMemo(
		() => Array.from(selectedFileFormat).join(", ").replaceAll("_", " "),
		[selectedFileFormat]
	);

	return (
		<div className={"flex flex-col w-full h-full justify-between"}>
			<h1 className={title()}>Combine your shares</h1>
			<h1 className={subtitle()}>And reconstruct a secret</h1>
			<div className={"flex w-full h-full justify-between"}>
				<Card className={"w-full mt-4 mb-4"}>
					<CardBody>
						There should be a dropzone here for the shares.
					</CardBody>
				</Card>
			</div>
			<div className={"flex w-full justify-end gap-5"}>
				<Button color={"primary"} radius={"none"}>
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
