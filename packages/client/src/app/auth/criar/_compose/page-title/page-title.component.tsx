"use client"

import { PageTitle } from "@components"
import React from "react"
import { CreateAccountContext } from "../../page.context"
import { mapCurrentStepData } from "../../page.utils"

export const CreateAccountPageTitle = () => {
	const { currentStep } = React.useContext(CreateAccountContext);
	const { title, subtitle } = React.useMemo(() => mapCurrentStepData[currentStep], [currentStep]);

	return (
		<PageTitle
			title={title}
			subtitle={subtitle}
			titleSize="2xl"
		/>
	)
}
