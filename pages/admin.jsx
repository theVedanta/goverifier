import { AddIcon, CloseIcon } from "@chakra-ui/icons";
import {
    Box,
    Button,
    Container,
    Flex,
    Heading,
    Input,
    Tag,
    useToast,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";

const Admin = ({ connectedContract, saleActive, setSaleActive, isOwner }) => {
    const [pending, setPending] = useState(false);
    const [officers, setOfficers] = useState(false);
    const [inputs, setInputs] = useState([0]);
    const toast = useToast();

    useEffect(() => {
        const getOfficers = async () => {
            if (!connectedContract) return;

            const gotOfficers = await connectedContract.getOfficers();
            setOfficers(gotOfficers);
        };

        getOfficers();
    }, [connectedContract]);

    const toggleSale = async (act) => {
        try {
            if (!connectedContract) return;

            let saleTxn;
            if (act === "open") {
                setPending("open");
                saleTxn = await connectedContract.openSale();
            } else {
                setPending("close");
                saleTxn = await connectedContract.closeSale();
            }

            await saleTxn.wait();

            setSaleActive(act === "open" ? true : false);
            setPending(false);
            toast({
                title: "Transaction completed",
                description: "Succes. Please wait 1-5 minutes to see changes.",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "bottom-right",
            });
        } catch (err) {
            setPending(false);
            setSaleActive(false);
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

    const mint = async (e) => {
        try {
            e.preventDefault();

            if (!connectedContract) return;

            setPending(true);
            const value = document.querySelector(
                "#mint-form input[name='eth']"
            ).value;

            const mintedTxn = await connectedContract.mint({
                value: Number(value) * 10 ** 18,
            });

            await mintedTxn.wait();

            toast({
                title: "Transaction completed",
                description: "Success Please wait 1-5 minutes to see changes.",
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

    const addOfficer = async (e) => {
        try {
            e.preventDefault();

            if (!connectedContract) return;

            setPending(true);
            const addVals = document.querySelectorAll(
                "#mint-form input[name='address']"
            );

            let addresses = [];

            for (let addVal of addVals) {
                addVal.value.toString().trim() !== "" &&
                    addresses.push(addVal.value.toString().trim());
            }

            const addTxn = await connectedContract.addOfficer(addresses);
            await addTxn.wait();

            toast({
                title: "Officer added",
                description: "New officers were added to the broadcast list",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "bottom-right",
            });
            setPending(false);
            setOfficers(officers.concat(addresses));
            setInputs([0]);
            document.querySelector("#mint-form input[name='address']").value =
                "";
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
    const removeOfficer = async (remAddress) => {
        try {
            if (!connectedContract) return;

            setPending(true);

            const removeTxn = await connectedContract.removeOfficer(remAddress);
            await removeTxn.wait();

            toast({
                title: "Officer added",
                description: "Officer was removed from the broadcast list",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "bottom-right",
            });
            setPending(false);
            setOfficers(officers.filter((officer) => officer !== remAddress));
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

    return (
        <Container
            maxW="container.xl"
            my={16}
            display="flex"
            justifyContent="center"
            alignItems="center"
            h="80vh"
        >
            <Box w="56vw" p={10} bg="blackAlpha.400" borderRadius="xl">
                {isOwner && (
                    <form onSubmit={(eve) => addOfficer(eve)} id="mint-form">
                        <Flex alignItems="center">
                            <Heading mr={3}>Add Officers</Heading>
                            <Button
                                colorScheme="blue"
                                isLoading={pending}
                                variant="ghost"
                            >
                                <AddIcon
                                    onClick={() => setInputs([...inputs, 0])}
                                />
                            </Button>
                        </Flex>
                        <br />
                        <br />
                        {inputs.map((j, i) => (
                            <Box key={i}>
                                <label htmlFor="eth" marginBottom="5px">
                                    Enter Value
                                </label>
                                <Input
                                    placeholder="Wallet address/ENS"
                                    name="address"
                                    type="text"
                                    size="lg"
                                />
                                <br />
                                <br />
                            </Box>
                        ))}
                        <br />
                        <Button
                            isLoading={pending}
                            isDisabled={pending}
                            type="submit"
                            colorScheme="orange"
                            height="auto"
                            p="15px 20px"
                            size="lg"
                        >
                            Add to broadcast
                        </Button>
                    </form>
                )}
                <br />
                <hr />
                <br />
                {officers &&
                    officers.map((officer) => (
                        <Officer
                            key={officer}
                            officer={officer}
                            pending={pending}
                            removeOfficer={removeOfficer}
                        />
                    ))}
                <br />
                <hr />
                <br />
                {isOwner &&
                    (saleActive ? (
                        <Button
                            isDisabled={pending !== false}
                            isLoading={pending === "close"}
                            onClick={() => toggleSale("close")}
                            colorScheme="orange"
                            size="lg"
                            width="100%"
                            padding="20px"
                            height="auto"
                            variant="outline"
                        >
                            Close minting
                        </Button>
                    ) : (
                        <Button
                            isDisabled={pending !== false}
                            isLoading={pending === "open"}
                            onClick={() => toggleSale("open")}
                            mx={2}
                            colorScheme="orange"
                            size="lg"
                        >
                            Open minting
                        </Button>
                    ))}
            </Box>
        </Container>
    );
};

const Officer = ({ officer, pending, removeOfficer }) => {
    return (
        <Flex my={2}>
            <Button
                size="md"
                onClick={() => {
                    navigator.clipboard.writeText(officer);
                }}
                colorScheme="orange"
                mr={2}
            >
                {officer}
            </Button>
            <Button colorScheme="red" isLoading={pending} variant="ghost">
                <CloseIcon onClick={() => removeOfficer(officer)} />
            </Button>
        </Flex>
    );
};

export default Admin;
