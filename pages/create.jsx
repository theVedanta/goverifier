import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Button,
    Heading,
    useColorModeValue,
    Textarea,
    useToast,
    Text,
    Tag,
} from "@chakra-ui/react";
import * as IPFS from "ipfs-core";
import { useState } from "react";

const Create = ({ connectedContract, isOwner }) => {
    const toast = useToast();
    const [pending, setPending] = useState(false);
    const [time, setTime] = useState("");
    const [venue, setVenue] = useState("");
    const [nftCreated, setNftCreated] = useState(false);
    const [ipfs, setIpfs] = useState(false);

    const mintCustom = async () => {
        try {
            setPending(true);

            if (!ipfs) {
                const newIpfs = await IPFS.create();
                setIpfs(newIpfs);
            }

            const file = document.querySelector("input[name='NFT']").files[0];
            const uploaded = await ipfs.add(file, {
                pin: true,
            });

            console.log(uploaded);

            if (uploaded && uploaded.path) {
                const mintedTxn = await connectedContract.mintCustom(
                    uploaded.path
                );
                await mintedTxn.wait();
            }

            toast({
                title: "Transaction completed",
                description: "Success. Please wait 1-5 minutes to see changes.",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "bottom-right",
            });
            setPending(false);
        } catch (err) {
            setPending(false);
            console.log(err);
            toast({
                title: "Some error occurred",
                description: "There was an unexpected server error.",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-right",
            });
        }
    };

    const createNFT = async () => {
        try {
            const timeVal = document.querySelector("input[name='time']").value;
            const dateVal = new Date(
                document.querySelector("input[name='date']").value
            );
            const venVal = document
                .querySelector("textarea[name='address']")
                .value.toString()
                .trim();

            setTime(
                `${timeVal} on ${dateVal.getDate()}/${
                    parseInt(dateVal.getMonth()) + 1
                }`
            );
            setVenue(venVal);
            setNftCreated(true);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            {isOwner ? (
                <Flex
                    minH={"85vh"}
                    align={"center"}
                    justify={"center"}
                    bg={useColorModeValue("gray.50", "gray.800")}
                >
                    <Stack spacing={8} mx={"auto"} w="36%" py={12} px={6}>
                        <Stack align={"left"}>
                            <Heading fontSize={"4xl"}>
                                Gotta invite &apos;em all!
                            </Heading>
                        </Stack>

                        {nftCreated && (
                            <Box
                                className="nft"
                                bg="blackAlpha.500"
                                p={16}
                                borderRadius="lg"
                                display="flex"
                                flexDirection="column"
                                alignItems="center"
                            >
                                <Heading>Meeting invite</Heading>
                                <Text mt={6} fontSize="20px">
                                    <Tag size="lg">Time</Tag> : {time}
                                </Text>
                                <Text mt={2} fontSize="20px">
                                    <Tag size="lg">Venue</Tag> : {venue}
                                </Text>
                            </Box>
                        )}

                        <Box
                            rounded={"lg"}
                            bg={useColorModeValue("white", "gray.700")}
                            boxShadow={"lg"}
                            p={8}
                        >
                            <Stack spacing={4}>
                                {!nftCreated ? (
                                    <>
                                        <FormControl id="name">
                                            <FormLabel>Time</FormLabel>
                                            <Input type="time" name="time" />
                                        </FormControl>
                                        <FormControl id="name">
                                            <FormLabel>Date</FormLabel>
                                            <Input type="date" name="date" />
                                        </FormControl>
                                        <FormControl id="address">
                                            <FormLabel>address</FormLabel>
                                            <Textarea
                                                type="text"
                                                name="address"
                                                maxH="20vh"
                                                minH="10vh"
                                            />
                                        </FormControl>
                                    </>
                                ) : (
                                    <FormControl>
                                        <FormLabel>Image Upload</FormLabel>
                                        <Input
                                            type="file"
                                            name="NFT"
                                            id="NFT"
                                            accept=".jpg, .jpeg, .png, .svg"
                                        />
                                    </FormControl>
                                )}
                                <Stack spacing={10}>
                                    {!nftCreated ? (
                                        <Button
                                            onClick={createNFT}
                                            colorScheme="orange"
                                            mt={6}
                                            size="lg"
                                            isLoading={pending}
                                            isDisabled={pending}
                                        >
                                            Create NFT
                                        </Button>
                                    ) : (
                                        <Button
                                            onClick={mintCustom}
                                            colorScheme="orange"
                                            mt={6}
                                            size="lg"
                                            isLoading={pending}
                                            isDisabled={pending}
                                        >
                                            Broadcast
                                        </Button>
                                    )}
                                </Stack>
                            </Stack>
                        </Box>
                    </Stack>
                </Flex>
            ) : (
                <Flex
                    w="full"
                    h="80vh"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Heading>Authoried Personnel only.</Heading>
                </Flex>
            )}
        </>
    );
};

export default Create;
