import {
    Box,
    Button,
    Container,
    Flex,
    Heading,
    Image,
    Link,
    Text,
} from "@chakra-ui/react";
import Feats from "../components/feats";

const Home = ({ isOwner }) => {
    return (
        <Box w="100vw">
            <Container
                maxW={"container.xl"}
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
            >
                {isOwner ? (
                    <Flex
                        w="full"
                        h="80vh"
                        justifyContent="center"
                        alignItems="center"
                        direction="column"
                    >
                        <Heading>
                            What&apos;re you doing here admin hai tu 🙄
                        </Heading>
                        <Link href="/admin">
                            <Button
                                mt={4}
                                variant="solid"
                                colorScheme="orange"
                                size="lg"
                                _hover={{ textDecoration: "none" }}
                            >
                                Admin
                            </Button>
                        </Link>
                    </Flex>
                ) : (
                    <>
                        <Container
                            maxW="container.xl"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            h="80vh"
                        >
                            <Box w="70%">
                                <Text w="85%" fontSize={42} fontWeight="black">
                                    Schedule{" "}
                                    <Text display="inline" color="orange.400">
                                        meetings
                                    </Text>
                                    , maintain{" "}
                                    <Text display="inline" color="orange.200">
                                        records
                                    </Text>
                                    , conduct{" "}
                                    <Text display="inline" color="orange.600">
                                        votes
                                    </Text>{" "}
                                    all withing{" "}
                                    <Text display="inline" color="orange.400">
                                        the Decentralized Web
                                    </Text>
                                </Text>
                                <Text w="50%" mt={4} color="whiteAlpha.700">
                                    Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit. Ducimus quasi expedita,
                                    reprehenderit fugiat harum vitae cupiditate
                                    dolorem. A ea molestias quisquam deserunt
                                    suscipit ducimus adipisci.
                                </Text>
                                <Flex>
                                    <Button
                                        colorScheme="orange"
                                        size="lg"
                                        mr={4}
                                        mt={8}
                                    >
                                        Learn more
                                    </Button>
                                    <Button
                                        colorScheme="orange"
                                        size="lg"
                                        variant={"outline"}
                                        mr={4}
                                        mt={8}
                                    >
                                        Install MetaMask
                                    </Button>
                                </Flex>
                            </Box>
                            <Image
                                src="/full-logo.png"
                                alt="logo"
                                w="30%"
                                fit={"cover"}
                            />
                        </Container>

                        <Feats />
                    </>
                )}
            </Container>
        </Box>
    );
};

export default Home;
