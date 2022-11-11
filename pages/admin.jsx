import { CloseIcon } from "@chakra-ui/icons";
import {
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
            const addVal = document
                .querySelector("#mint-form input[name='address']")
                .value.toString()
                .trim();

            const addTxn = await connectedContract.addOfficer(addVal);

            await addTxn.wait();

            toast({
                title: "Officer added",
                description: "New officer was added to the broadcast list",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "bottom-right",
            });
            setPending(false);
            setOfficers([...officers, addVal]);
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
        <Container maxW="container.xl" mt={16}>
            <form onSubmit={(eve) => addOfficer(eve)} id="mint-form">
                <br />
                <Heading>Add Officers</Heading>
                <br />
                <label htmlFor="eth">Enter Value</label>
                <Input
                    placeholder="Wallet address/ENS"
                    name="address"
                    type="text"
                    size="lg"
                />
                <br />
                <br />
                <Button
                    isLoading={pending}
                    isDisabled={pending}
                    type="submit"
                    colorScheme="orange"
                    size="lg"
                >
                    Add to broadcast
                </Button>
            </form>
            <br />
            <hr />
            <br />
            {officers &&
                officers.map((officer) => (
                    <Officer key={officer} officer={officer} />
                ))}
            <br />
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
        </Container>
    );
};

const Officer = ({ officer }) => {
    return (
        <Flex>
            <Button
                size="md"
                onClick={() => {
                    navigator.clipboard.writeText(officer);
                }}
                colorScheme="orange"
                mr={3}
            >
                {officer}
            </Button>
            <Button  colorScheme="red">
                <CloseIcon />
            </Button>
        </Flex>
    );
};

export default Admin;
