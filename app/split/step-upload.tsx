import {CardBody} from "@nextui-org/react";
import React from "react";
import {Content, IllustratedMessage} from "@adobe/react-spectrum";
import Upload from "@spectrum-icons/illustrations/Upload";
import {Heading, Text} from "react-aria-components";
import {Button} from "@nextui-org/button";
import {DropZone} from "@react-spectrum/dropzone";
import {DropEvent} from "@react-types/shared";

export interface StepUploadProps {
  setSecret: React.Dispatch<React.SetStateAction<Uint8Array>>;
}

export default function StepUpload({ setSecret }: StepUploadProps) {
  const [isFilled, setIsFilled] = React.useState(false);

  const onFileDrop = async (e: DropEvent) => {
    if (e.items.length > 0) {
      const secretItem = e.items[0];

      if (secretItem.kind === "text" && secretItem.types.has("text/plain")) {
        const secretContent = await secretItem.getText("text/plain");
        const encoder = new TextEncoder();

        setSecret(encoder.encode(secretContent));
      } else if (secretItem.kind === "file") {
        const secretFile = await secretItem.getFile();
        const secretContent = new Uint8Array(await secretFile.arrayBuffer());

        setSecret(secretContent);
      }

      setIsFilled(true);
    }
  }

  const onFileBrowse = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const secretFile = e.target.files.item(0);

      if (secretFile) {
        const secretContent = new Uint8Array(await secretFile.arrayBuffer());

        setSecret(secretContent);
        setIsFilled(true);
      }
    }
  }

  return (
    <CardBody>
      <DropZone
        flex
        isFilled={isFilled}
        onDrop={onFileDrop}>
        <IllustratedMessage>
          <Upload />
          <Heading className={"mt-4"}>
            <Text slot="label">
              {isFilled ? 'Your secret has been dropped' : 'Drag and drop your secret here'}
            </Text>
          </Heading>
          <Content>
            <Button variant={"bordered"} radius={"none"} onClick={() => document.getElementById("combine-zone")?.click()}>Browse</Button>
            <input style={{ display: "none" }} id={"combine-zone"} type="file" onChange={onFileBrowse}/>
          </Content>
        </IllustratedMessage>
      </DropZone>
    </CardBody>
  );
}