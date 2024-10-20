"use client";
import React, { useState } from "react";
import { Badge, Accordion, TextInput, Select, Group, Text, Box, Anchor, Space, Card, Flex } from "@mantine/core";
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs';
import 'prismjs/components/prism-json';

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

const ManageApiPage = () => {
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("");
    const [code, setCode] = useState('');


    const filteredData = dummyData.filter(
        (api) =>
            api.title.toLowerCase().includes(search.toLowerCase()) &&
            (filter ? api.type.includes(filter) : true)
    );

    return (
        <Box p="md">
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
                            <Group>
                                <strong>{api.title}</strong> - Details

                                <Group justify="space-between">
                                    <Text size="sm" color="dimmed">
                                        {api.activeCustomers} active customers
                                    </Text>
                                    <Text size="sm" color="dimmed">
                                        <i>{api.requestsPast24hrs}+ requests in past 24 hrs</i>
                                    </Text>
                                    {api.type.map((type) => (
                                        <Badge key={type} color="green" variant="light">
                                            {type}
                                        </Badge>
                                    ))}
                                    <Text size="sm" color="blue" component="a" href="#">
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
                                            Revenue Generated
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
        </Box>
    );
};

export default ManageApiPage;
