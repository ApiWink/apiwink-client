"use client";
import React, { useState } from 'react';
import { Table, Accordion, TextInput, Select } from '@mantine/core';

const dummyData = [
    {
        id: 1,
        title: 'Weather API',
        description: 'Provides real-time and forecasted weather information for any location worldwide. Access current conditions, hourly forecasts, and more.',
        price: '$10/month',
        company: 'Weather Co',
        type: ['Weather', 'Climate'],
        response: '{"location": "San Francisco", "temperature": "72°F"}',
        contractAddress: '0x1234567890abcdef1234567890abcdef12345678',
        apiVersion: 'v1.2',
        rateLimit: '1000 requests/day',
        documentation: 'https://weatherco.com/docs/weather-api',
        usage: 5000,
        activeCustomers: 200,
        totalRequests: 100000,
        requestsPast24hrs: 1500,
    },
    // Add more dummy data as needed
];

const ManageApiPage = () => {
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('');

    const filteredData = dummyData.filter((api) =>
        api.title.toLowerCase().includes(search.toLowerCase()) &&
        (filter ? api.type.includes(filter) : true)
    );

    return (
        <div>
            <TextInput
                placeholder="Search APIs"
                value={search}
                onChange={(event) => setSearch(event.currentTarget.value)}
            />
            <Select
                placeholder="Filter by type"
                data={['Weather', 'Climate']}
                value={filter}
                onChange={(value) => setFilter(value)}
            />
            <Table>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>Title</Table.Th>
                        <Table.Th>Usage</Table.Th>
                        <Table.Th>Active Customers</Table.Th>
                        <Table.Th>Total Requests</Table.Th>
                        <Table.Th>Requests in Past 24hrs</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    <Accordion>
                        {filteredData.map((api) => (
                            <Accordion.Item key={api.id} value={api.title}>
                                <Table.Tr>
                                    <Accordion.Control>
                                        <Table.Td>{api.title}</Table.Td>
                                        <Table.Td>{api.usage}</Table.Td>
                                        <Table.Td>{api.activeCustomers}</Table.Td>
                                        <Table.Td>{api.totalRequests}</Table.Td>
                                        <Table.Td>{api.requestsPast24hrs}</Table.Td>
                                    </Accordion.Control>
                                </Table.Tr>
                                <Accordion.Panel>
                                    <p>Description: {api.description}</p>
                                    <p>Price: {api.price}</p>
                                    <p>Company: {api.company}</p>
                                    <p>Type: {api.type.join(', ')}</p>
                                    <p>Response: {api.response}</p>
                                    <p>Contract Address: {api.contractAddress}</p>
                                    <p>API Version: {api.apiVersion}</p>
                                    <p>Rate Limit: {api.rateLimit}</p>
                                    <p>Documentation: <a href={api.documentation} target="_blank" rel="noopener noreferrer">{api.documentation}</a></p>
                                </Accordion.Panel>
                            </Accordion.Item>
                        ))}
                    </Accordion>
                </Table.Tbody>
            </Table>
        </div>
    );
};

export default ManageApiPage;