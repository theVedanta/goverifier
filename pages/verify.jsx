import {
    Box,
    Button,
    Container,
    Flex,
    Heading,
    Stack,
    useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import QrReader from "react-qr-scanner";

const Verify = ({ connectedContract }) => {
    const toast = useToast();
    const [scanner, setScanner] = useState(false);

    const verifyUser = async (addy) => {
        const verified = await connectedContract.verifyUser(addy);

        if (verified) {
            toast({
                title: "Address Found!",
                description: "Your attendance is marked in the meeting.",
                status: "success",
                duration: 5000,
                isClosable: true,
            });

            await connectedContract.changeNFT(
                "QmX932sRCAV8FRFXxQnGuCEM4u6Z3HTL1nTC5acDiPrJiE"
            );
        } else {
            toast({
                title: "Address not NFT Hoder!",
                description: "You do not own NFT shoo",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
    };

    return (
        <Container maxW="container.xl">
            <Flex minH={"85vh"} align={"center"} justify={"center"}>
                <Stack spacing={8} mx={"auto"} w="36%" py={12} px={6}>
                    <Stack align={"left"}>
                        <Heading fontSize={"4xl"}>Venue Verfication</Heading>
                    </Stack>

                    <Box
                        rounded={"lg"}
                        boxShadow={"lg"}
                        p={8}
                        bg="blackAlpha.400"
                    >
                        {scanner && (
                            <QrReader
                                delay={3000}
                                onError={(err) => {
                                    console.log(err);
                                    toast({
                                        title: "Address not found!",
                                        description:
                                            "There was a problem with your QR code.",
                                        status: "error",
                                        duration: 5000,
                                        isClosable: true,
                                    });
                                }}
                                onScan={(data) => {
                                    if (data !== null) {
                                        const address =
                                            data.text.split("ethereum:");
                                        setScanner(false);

                                        verifyUser(address[1].slice(0, -2));
                                    }
                                }}
                            />
                        )}
                        <Button
                            mt={scanner && 4}
                            onClick={() => setScanner(!scanner)}
                            variant="outline"
                            w="full"
                            size="lg"
                        >
                            {scanner && "Close "}Scan{scanner && "er"}
                        </Button>
                    </Box>
                </Stack>
            </Flex>
        </Container>
    );
};

export default Verify;
