import { CheckIcon, CloseIcon, TimeIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, Heading, Input, Tag } from "@chakra-ui/react";
import { useState, useEffect } from "react";

const Voting = ({ connectedContract, isOwner }) => {
    const [proposal, setProposal] = useState("");
    const [pending, setPending] = useState("");
    const [passed, setPassed] = useState(false);

    useEffect(() => {
        const getStats = async () => {
            if (!connectedContract) return;

            const props = await connectedContract.getProposal();
            setProposal(props ? props[props.length - 1] : "");

            let votes = false;
            if (props.length !== 0) {
                votes = await connectedContract.getVotes(
                    props[props.length - 1]
                );
            }
            setPassed(votes);
        };

        getStats();
    }, [connectedContract]);

    const newProposal = async () => {
        setPending(true);
        const name = document.querySelector("input[name='prop']").value.trim();
        const made = await connectedContract.newProposal(name);
        await made.wait();

        setPending(false);
        setProposal(name);
    };

    const checkVotes = async () => {
        let votes = await connectedContract.getVotes(
            proposal[proposal.length - 1]
        );
        setPassed(votes);
    };

    const vote = async (val) => {
        try {
            const voted = await connectedContract.vote(proposal, val);
            await voted.wait();

            checkVotes();
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <Flex
            maxW="container.xl"
            direction="column"
            justifyContent="center"
            alignItems="center"
            pt={20}
        >
            {isOwner && (
                <>
                    <Box bg="blackAlpha.400" borderRadius="xl" p={8} w="36%">
                        <Heading fontSize="2xl">Create new Proposal</Heading>
                        <Input
                            mt={3}
                            placeholder="Proposal text"
                            name="prop"
                            type="text"
                        />
                        <Button
                            mt={6}
                            w="full"
                            onClick={newProposal}
                            isLoading={pending}
                            isDisabled={pending}
                            colorScheme="orange"
                        >
                            Create
                        </Button>
                    </Box>
                    <br />
                </>
            )}
            {proposal !== "" && (
                <Box bg="blackAlpha.400" borderRadius="xl" p={8} w="36%">
                    <Heading fontSize="2xl">Proposal: {proposal}</Heading>
                    <br />
                    <Flex
                        w="full"
                        justifyContent="space-between"
                        direction="row-reverse"
                    >
                        <Button
                            variant="ghost"
                            colorScheme="green"
                            onClick={() => vote(1)}
                            size="lg"
                        >
                            <CheckIcon />
                        </Button>
                        <Button
                            variant="ghost"
                            colorScheme="red"
                            onClick={() => vote(2)}
                            size="lg"
                        >
                            <CloseIcon />
                        </Button>
                    </Flex>
                </Box>
            )}

            <br />
            <Box bg="blackAlpha.400" borderRadius="xl" p={8} w="36%">
                <Heading>Votes</Heading>
                <br />
                <Tag colorScheme="orange">
                    {passed ? "Order passed" : "Order was not passed"}
                </Tag>
            </Box>
        </Flex>
    );
};

export default Voting;
