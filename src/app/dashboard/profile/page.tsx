"use client";
import React, { useState } from "react";
import { Badge, Accordion, TextInput, Select, Group, Text, Box, Anchor, Space, Card, Flex, Button, Tooltip, Title } from "@mantine/core";
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs';
import 'prismjs/components/prism-json';
import Link from "next/link";

const dummyData = [
    {
        id: 1,
        title: "Weather API",
        description:
            "Provides real-time and forecasted weather information for any location worldwide. Access current conditions, hourly forecasts, and more.",
        price: "$10/month",
        company: "Weather Co",
        type: ["Weather", "Climate"],
        response: '{"location": "San Francisco", "temperature": "72°F"}',
        contractAddress: "0x1234567890abcdef1234567890abcdef12345678",
        apiVersion: "v1.2",
        rateLimit: "1000 requests/day",
        documentation: "https://weatherco.com/docs/weather-api",
        usage: 5000,
        activeCustomers: 200,
        totalRequests: 100000,
        requestsPast24hrs: 1500,
    },
    {
        id: 2,
        title: "Payment API",
        description:
            "Provides real-time and forecasted weather information for any location worldwide. Access current conditions, hourly forecasts, and more.",
        price: "$10/month",
        company: "Weather Co",
        type: ["Weather", "Climate"],
        response: '{"location": "San Francisco", "temperature": "72°F"}',
        contractAddress: "0x1234567890abcdef1234567890abcdef12345678",
        apiVersion: "v1.2",
        rateLimit: "1000 requests/day",
        documentation: "https://weatherco.com/docs/weather-api",
        usage: 5000,
        activeCustomers: 200,
        totalRequests: 100000,
        requestsPast24hrs: 1500,
    },
    // Add more dummy data as needed
];

const UserProfilePage = () => {
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("");
    const [code, setCode] = useState('');
    const [tooltipOpened, setTooltipOpened] = useState(false);


    const filteredData = dummyData.filter(
        (api) =>
            api.title.toLowerCase().includes(search.toLowerCase()) &&
            (filter ? api.type.includes(filter) : true)
    );

    return (
        <Box p="md">
            <Title order={1} size="xl">Hey There,</Title>
            <Space h="lg" />


            <Group position="apart" spacing="md" w="100%">
                <Card
                    p={24}
                    py={32}
                    style={{
                        backgroundColor: '#FFEBE9',
                        color: '#FF6B6B',
                        borderRadius: '8px',
                        textAlign: 'center',
                        width: '24%',
                    }}
                >
                    <Text size="xl" weight={700}>
                        5000
                    </Text>
                    <Text size="sm" color="dimmed">
                        Successful Requests
                    </Text>
                </Card>

                <Card
                    p={24}
                    py={32}
                    style={{
                        backgroundColor: '#E7F8E9', // Light pastel green
                        color: '#4CAF50', // Contrasting text color
                        borderRadius: '8px',
                        textAlign: 'center',
                        width: '24%',
                    }}
                >
                    <Text size="xl" weight={700}>
                        1500+
                    </Text>
                    <Text size="sm" color="dimmed">
                        Requests (24 hrs)
                    </Text>
                </Card>

                <Card
                    p={24}
                    py={32}
                    style={{
                        backgroundColor: '#E9F0FF', // Light pastel blue
                        color: '#2196F3', // Contrasting text color
                        borderRadius: '8px',
                        textAlign: 'center',
                        width: '24%',
                    }}
                >
                    <Text size="xl" weight={700}>
                        56
                    </Text>
                    <Text size="sm" color="dimmed">
                        APIs Subscribed
                    </Text>
                </Card>

                <Card
                    p={24}
                    py={32}
                    style={{
                        backgroundColor: '#FFF2CC', // Light pastel yellow-orange
                        color: '#FFB74D', // Contrasting text color
                        borderRadius: '8px',
                        textAlign: 'center',
                        width: '24%',
                    }}
                >
                    <Text size="xl" weight={700}>
                        50K$
                    </Text>
                    <Text size="sm" color="dimmed">
                        Saved in Subscriptions
                    </Text>
                </Card>
            </Group>
            <Space h="lg" />
            <Space h="lg" />
            <Space h="lg" />


            <Title order={5} size="xl">Manage your APIs</Title>
            <Space h="lg" />
            {/* Search and Filter */}
            <Group mb="lg" grow>
                <TextInput
                    placeholder="Search APIs"
                    w="80%"
                    value={search}
                    onChange={(event) => setSearch(event.currentTarget.value)}
                />
                <Select
                    placeholder="Filter by type"
                    w="20%"
                    data={["Weather", "Climate"]}
                    value={filter}
                    onChange={(value) => setFilter(value)}
                />
            </Group>

            {/* Accordion for API Details */}
            <Accordion mt="lg">
                {filteredData.map((api) => (
                    <Accordion.Item key={api.id} value={api.title}>
                        <Accordion.Control>
                            <Group justify="space-between" mr={24}>
                                <Group>
                                    {api.title}
                                </Group>

                                <Group>

                                    <Text size="sm" color="dimmed">
                                        {api.activeCustomers} total requests
                                    </Text>
                                    <Text size="sm" color="dimmed">
                                        <i>{api.requestsPast24hrs}+ requests in past 24 hrs</i>
                                    </Text>
                                    <Group spacing="xs">
                                        {api.type.map((type) => (
                                            <Badge key={type} color="green" variant="light">
                                                {type}
                                            </Badge>
                                        ))}
                                    </Group>
                                    <Text size="sm" color="blue" component="a" href={api.documentation} target="_blank" rel="noopener noreferrer">
                                        Docs
                                    </Text>

                                </Group>

                            </Group>
                        </Accordion.Control>


                        <Accordion.Panel>
                            <Text color="dimmed">
                                {api.description}
                            </Text>
                            <Space h="lg" />
                            <Flex justify="space-between" align="center" wrap="wrap" gap="md">
                                <Card shadow="xs" radius="md" withBorder style={{ width: '22%' }}>
                                    <Group>
                                        <Text size="xl">
                                            5000
                                        </Text>
                                        <Text size="sm">
                                            Active Customers
                                        </Text>
                                    </Group>
                                </Card>

                                <Card shadow="xs" radius="md" withBorder style={{ width: '22%' }}>
                                    <Group>
                                        <Text size="xl">
                                            1500+
                                        </Text>
                                        <Text size="sm">
                                            Requests in Past 24hrs
                                        </Text>
                                    </Group>
                                </Card>

                                <Card shadow="xs" radius="md" withBorder style={{ width: '22%' }}>
                                    <Group>
                                        <Text size="xl">
                                            100K
                                        </Text>
                                        <Text size="sm">
                                            Total Requests
                                        </Text>
                                    </Group>
                                </Card>

                                <Card shadow="xs" radius="md" withBorder style={{ width: '22%' }}>
                                    <Group>
                                        <Text size="xl">
                                            50K$
                                        </Text>
                                        <Text size="sm">
                                            Spent
                                        </Text>
                                    </Group>
                                </Card>
                            </Flex>

                            <Space h="lg" />

                            <Text>
                                <strong>Price:</strong> {api.price}
                            </Text>

                            <Text>
                                <strong>Preview Response:</strong>
                            </Text>
                            <Card shadow="sm" padding="sm" radius="md" withBorder mt="md">
                                <Editor
                                    value={api?.response}
                                    onValueChange={(newCode) => setCode(newCode)}
                                    highlight={(code) => highlight(JSON.stringify(JSON.parse(code), null, 2), languages.json, 'json')} // Format JSON with proper indentation and color
                                    padding={10}
                                    style={{
                                        fontFamily: '"Fira code", "Fira Mono", monospace',
                                        fontSize: 12,
                                        backgroundColor: '#f5f5f5',
                                        borderRadius: '5px',
                                        whiteSpace: 'pre-wrap', // Ensure new lines display properly
                                        wordWrap: 'break-word', // Prevent long strings from overflowing
                                    }}
                                />
                            </Card>
                            <Text size="sm">
                                Contract Address: {api.contractAddress}
                            </Text>

                            <Group mt="lg" gap={48}>
                                <Button
                                    color="red"
                                    variant="light"
                                    size="xs"
                                    onClick={() => console.log('Lock API button clicked')}
                                >
                                    Lock API
                                </Button>

                                {/* Unsubscribe API Button */}
                                <Button
                                    color="red"
                                    variant="filled"
                                    size="xs"
                                    onClick={() => console.log('Unsubscribe API button clicked')}
                                >
                                    Unsubscribe API
                                </Button>

                                {/* Copy API Key Button */}
                                <Tooltip
                                    label="Key copied to clipboard!"
                                    opened={tooltipOpened}
                                    position="bottom"
                                    withArrow
                                    closeDelay={1000} // Tooltip stays visible for 1 second
                                    transition="fade"
                                >
                                    <Button
                                        size="xs"
                                        variant="outline"
                                        onClick={() => {
                                            const randomApiKey = '1234-ABCD-5678-EFGH'; // Hardcoded API key
                                            navigator.clipboard.writeText(randomApiKey);
                                            setTooltipOpened(true); // Show tooltip
                                            setTimeout(() => setTooltipOpened(false), 2000); // Hide after 2 seconds
                                            console.log('Copied API Key:', randomApiKey);
                                        }}
                                    >
                                        Copy API Key
                                    </Button>
                                </Tooltip>
                            </Group>

                            <Space h="lg" />

                            <Space h="md" />

                            <Text>
                                <strong>Rate Limit:</strong> {api.rateLimit}
                            </Text>

                            {/* Documentation with Anchor */}
                            <Text>
                                <Anchor href={api.documentation} target="_blank" rel="noopener noreferrer">
                                    {api.documentation}
                                </Anchor>
                                [<i>{api.apiVersion}</i>]
                            </Text>
                        </Accordion.Panel>
                    </Accordion.Item>
                ))}
            </Accordion>

            <Text align="center" mt="lg" color="dimmed" size="sm">
                <i>Looking for More APIs? checkout our </i><Text color="blue"><Link href="/dashboard"><strong>MarketPlace</strong></Link></Text>
            </Text>
        </Box>
    );
};

export default UserProfilePage;
