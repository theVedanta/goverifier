import {
    Box,
    Container,
    Flex,
    Heading,
    Image,
    Link,
    Text,
} from "@chakra-ui/react";

const Feats = () => {
    return (
        <>
            <Flex
                direction="column"
                w="full"
                justifyContent="center"
                alignItems="center"
                mt={20}
                textAlign="center"
            >
                <Heading mt={10} fontSize={50} w="60%">
                    The{" "}
                    <Text display="inline" color="orange.300">
                        all
                    </Text>
                    <Text display="inline" color="orange.400">
                        -in-
                    </Text>
                    <Text display="inline" color="orange.500">
                        one
                    </Text>{" "}
                    platform for government privacy
                </Heading>
                <Text w="44%" color="whiteAlpha.600" mt={5}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Ducimus quasi expedita, reprehenderit fugiat harum vitae
                    cupiditate dolorem. A ea molestias quisquam deserunt
                    suscipit ducimus adipisci Lorem ipsum dolor sit amet
                    consectetur.
                </Text>
            </Flex>

            <Box mt={36} maxW="container.lg">
                <Flex mb={20}>
                    <Flex
                        direction="column"
                        borderRadius="xl"
                        justifyContent="center"
                        textAlign="center"
                        alignItems="center"
                        bg="whiteAlpha.200"
                        p={10}
                        w="26%"
                    >
                        <Image alt="feat" src="/feats/1.png" boxSize={120} />
                    </Flex>

                    <Box w="74%" px={20} py={8}>
                        <Heading>1. Install the MetaMask extension</Heading>
                        <Text w="85%" color="whiteAlpha.800" mt={5}>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Ducimus quasi expedita, reprehenderit fugiat
                            harum vitae cupiditate dolorem. A ea molestias
                            quisquam deserunt suscipit ducimus adipisci Lorem
                            ipsum dolor sit amet consectetur.
                        </Text>
                    </Box>
                </Flex>

                <Flex mb={20} direction="row-reverse">
                    <Flex
                        direction="column"
                        borderRadius="xl"
                        justifyContent="center"
                        textAlign="center"
                        alignItems="center"
                        bg="whiteAlpha.200"
                        p={10}
                        w="26%"
                    >
                        <Image alt="feat" src="/feats/2.png" boxSize={120} />
                    </Flex>

                    <Box w="74%" px={20} py={8}>
                        <Heading>
                            2. Check for NFTs in{" "}
                            <Link href="/account">My NFTs</Link>
                        </Heading>
                        <Text w="85%" color="whiteAlpha.800" mt={5}>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Ducimus quasi expedita, reprehenderit fugiat
                            harum vitae cupiditate dolorem. A ea molestias
                            quisquam deserunt suscipit ducimus adipisci Lorem
                            ipsum dolor sit amet consectetur.
                        </Text>
                    </Box>
                </Flex>

                <Flex mb={20}>
                    <Flex
                        direction="column"
                        borderRadius="xl"
                        justifyContent="center"
                        textAlign="center"
                        alignItems="center"
                        bg="whiteAlpha.200"
                        p={10}
                        w="26%"
                    >
                        <Image alt="feat" src="/feats/3.png" boxSize={120} />
                    </Flex>

                    <Box w="74%" px={20} py={8}>
                        <Heading>
                            3. Attend meeting and check-in via QR-codes
                        </Heading>
                        <Text w="85%" color="whiteAlpha.800" mt={5}>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Ducimus quasi expedita, reprehenderit fugiat
                            harum vitae cupiditate dolorem. A ea molestias
                            quisquam deserunt suscipit ducimus adipisci Lorem
                            ipsum dolor sit amet consectetur.
                        </Text>
                    </Box>
                </Flex>

                <Flex mb={20} direction="row-reverse">
                    <Flex
                        direction="column"
                        borderRadius="xl"
                        justifyContent="center"
                        textAlign="center"
                        alignItems="center"
                        bg="whiteAlpha.200"
                        p={10}
                        w="26%"
                    >
                        <Image alt="feat" src="/feats/4.png" boxSize={120} />
                    </Flex>

                    <Box w="74%" px={20} py={8}>
                        <Heading>
                            4. Vote on certain proposals within the app
                        </Heading>
                        <Text w="85%" color="whiteAlpha.800" mt={5}>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Ducimus quasi expedita, reprehenderit fugiat
                            harum vitae cupiditate dolorem. A ea molestias
                            quisquam deserunt suscipit ducimus adipisci Lorem
                            ipsum dolor sit amet consectetur.
                        </Text>
                    </Box>
                </Flex>
            </Box>
        </>
    );
};

export default Feats;
