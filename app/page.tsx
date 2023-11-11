import NextLink from "next/link";
import { Link } from "@nextui-org/link";
import { button as buttonStyles } from "@nextui-org/theme";
import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import {Code} from "@nextui-org/code";
import {Snippet} from "@nextui-org/snippet";

export default function Home() {
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

			<div className="mt-8">
				<Snippet hideSymbol hideCopyButton variant="flat" radius={"none"}>
					<span>
						TODO: Add a cool animation <Code color="primary" radius={"none"}>here</Code>
					</span>
				</Snippet>
			</div>
		</section>
	);
}
