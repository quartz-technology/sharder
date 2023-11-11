import React from "react";

export default function CombineLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<section className="flex flex-col h-full items-center justify-center gap-4 py-8 md:py-10">
			<div className="inline-block w-full max-w-2xl h-full text-center justify-center">
				{children}
			</div>
		</section>
	);
}
