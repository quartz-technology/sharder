import {CardBody} from "@nextui-org/react";
import React from "react";
import {Button} from "@nextui-org/button";
import JSZip from "jszip";
import {saveAs} from "file-saver";

export interface Step3Props {
  shares: Uint8Array[];
}

export default function Step3({ shares }: Step3Props) {
  const downloadShares = async () => {
    const zip = new JSZip();
    const sharesFiles = shares.map((share, id) => {
      const blob = new Blob([share]);

      return new File([blob], `share_${id}`);
    });

    sharesFiles.forEach((shareFile) => {
      zip.file(shareFile.name, shareFile);
    })

    const zipContent = await zip.generateAsync({ type: "blob" });

    saveAs(zipContent, "shares.zip");
  };

  return (
    <CardBody className={"items-center justify-center"}>
      <Button variant={"bordered"} radius={"none"} onClick={downloadShares}>
        Download your {shares.length} shares
      </Button>
    </CardBody>
  );
}