import React from "react";
import { HStack, VStack, Text, Progress } from "@chakra-ui/react";

const ProgressBar = ({ title, percent }) => {
	return (
		<VStack w="full" p={5}>
			<HStack w="full" justifyContent="space-between">
				<Text>{title}</Text>
				<Text>{percent.toFixed(2)}%</Text>
			</HStack>
			<HStack w="full">
				<Progress
					w="full"
					colorScheme="blue"
					hasStripe
					value={percent}
					aria-valuenow={percent}
				/>
			</HStack>
		</VStack>
	);
};

export default ProgressBar;
