import React from "react";
import { Center, Container, Heading, Box } from "@chakra-ui/react";
import ProgressBar from "@components/ProgressBar";

const Home = () => {
	return (
		<Center
			h="100vh"
			backgroundImage={`url("https://picsum.photos/1920/1080?blur=2")`}
		>
			<Container maxW="container.sm" shadow="md" rounded="lg" bg="white">
				<Box>
					<Center>
						<Heading m={6}>Nepali Year Progress</Heading>
					</Center>
					<ProgressBar />
					<ProgressBar />
					<ProgressBar />
					<ProgressBar />
				</Box>
			</Container>
		</Center>
	);
};

export default Home;
