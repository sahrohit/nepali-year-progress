import React from "react";
import { HStack, VStack, Text, Progress, Box } from "@chakra-ui/react";

const ProgressBar = () => {
	return (
		<VStack w="full" p={5}>
			<HStack w="full" justifyContent="space-between">
				<Text>Year Progress</Text>
				<Text>100%</Text>
			</HStack>
			<HStack w="full">
				<Progress w="full" colorScheme="green" hasStripe value={80} />
			</HStack>
		</VStack>
	);
};

export default ProgressBar;
