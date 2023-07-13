'use client'

import { TimeframeData } from "@/app/globalInterfaces"

export default function Stock({ data }: { data: TimeframeData}) {
	console.log(data)
	return (
		<div>
			hello world
		</div>
	)
}