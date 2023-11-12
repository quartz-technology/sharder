"use client";

import NextLink from "next/link";
import { Link } from "@nextui-org/link";
import { button as buttonStyles } from "@nextui-org/theme";
import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import {Snippet} from "@nextui-org/snippet";
import React from "react";

export default function Home() {
	const animationFrames = [
		"____________SECRET__▚░▞______________________",
		"_____________SECRET_▚░▞______________________",
		"______________SECRET▚░▞______________________",
		"_______________SECRE▚░▞______________________",
		"________________SECR▚░▞[SHARE #1]____________",
		"_________________SEC▚░▞_[SHARE #1]___________",
		"__________________SE▚░▞]_[SHARE #1]__________",
		"___________________S▚░▞2]_[SHARE #1]_________",
		"____________________▚░▞#2]_[SHARE #1]________",
		"____________________▚░▞ #2]_[SHARE #1]_______",
		"____________________▚░▞E #2]_[SHARE #1]______",
		"____________________▚░▞RE #2]_[SHARE #1]_____",
		"____________________▚░▞ARE #2]_[SHARE #1]____",
		"____________________▚░▞HARE #2]_[SHARE #1]___",
		"____________________▚░▞SHARE #2]_[SHARE #1]__",
		"____________________▚░▞[SHARE #2]_[SHARE #1]_",
		"____________________▚░▞_[SHARE #2]_[SHARE #1]",
		"____________________▚░▞[SHARE #2]_[SHARE #1]_",
		"____________________▚░▞SHARE #2]_[SHARE #1]__",
		"____________________▚░▞HARE #2]_[SHARE #1]___",
		"____________________▚░▞ARE #2]_[SHARE #1]____",
		"____________________▚░▞RE #2]_[SHARE #1]_____",
		"____________________▚░▞E #2]_[SHARE #1]______",
		"____________________▚░▞ #2]_[SHARE #1]_______",
		"____________________▚░▞#2]_[SHARE #1]________",
		"___________________S▚░▞2]_[SHARE #1]_________",
		"__________________SE▚░▞]_[SHARE #1]__________",
		"_________________SEC▚░▞_[SHARE #1]___________",
		"________________SECR▚░▞[SHARE #1]____________",
		"_______________SECRE▚░▞______________________",
		"______________SECRET▚░▞______________________",
		"_____________SECRET_▚░▞______________________",
		"____________SECRET__▚░▞______________________",
	]
	/*

		"____________________▚░▞ARE #2]_[SHARE #1]____",
		"____________________▚░▞RE #2]_[SHARE #1]_____",
		"____________________▚░▞E #2]_[SHARE #1]______",
		"____________________▚░▞ #2]_[SHARE #1]_______",
		"____________________▚░▞#2]_[SHARE #1]________",
		"___________________S▚░▞2]_[SHARE #1]_________",
		"__________________SE▚░▞]_[SHARE #1]__________",
		"_________________SEC▚░▞_[SHARE #1]___________",
		"________________SECR▚░▞[SHARE #1]____________",
		"_______________SECRE▚░▞______________________",
		"______________SECRET▚░▞______________________",
		"_____________SECRET_▚░▞______________________",
    "____________SECRET__▚░▞______________________",
	 */
	const [currentAnimationText, setCurrentAnimationText] = React.useState(animationFrames[0]);
	const [currentAnimationTextIndex, setCurrentAnimationTextIndex] = React.useState(0);

	React.useEffect(() => {
		const timeout = setTimeout(() => {
			if (currentAnimationTextIndex === animationFrames.length - 1) {
				setCurrentAnimationText(animationFrames[0]);
				setCurrentAnimationTextIndex(0);
			} else {
				setCurrentAnimationText(animationFrames[currentAnimationTextIndex + 1]);
				setCurrentAnimationTextIndex(currentAnimationTextIndex + 1);
			}
		}, 200);

		return () => clearTimeout(timeout);
	}, [currentAnimationTextIndex, currentAnimationText]);

	return (
		<section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
			<div className="inline-block max-w-lg text-center justify-center">
				<h1 className={title({ color: "violet" })}>SHARDER&nbsp;</h1>
				<br />
				<h1 className={title()}>
					is a GUI for Shamir&apos;s Secret Sharing.
				</h1>
				<h2 className={subtitle({ class: "mt-4" })}>
					Easily split a secret or combine shares.
				</h2>
			</div>

			<div className="flex gap-3">
				<Link
					as={NextLink}
					href={siteConfig.navItems[0].href}
					className={buttonStyles({ color: "primary", radius: "none" })}
				>
					Split a secret
				</Link>
				<Link
					as={NextLink}
					className={buttonStyles({ variant: "bordered", radius: "none" })}
					href={siteConfig.navItems[1].href}
				>
					Combine shares
				</Link>
			</div>

			<div className="flex mt-8">
				<Snippet hideSymbol hideCopyButton variant="flat" radius={"none"}>
					<span>
						{currentAnimationText}
					</span>
				</Snippet>
			</div>
		</section>
	);
}
