"use client";
import React, { useState } from "react";
import { Table, TextInput, Group, Box, Title, Space } from "@mantine/core";

const userData = [
    {
        id: 1,
        name: "Alice Smith",
        email: "alice.smith@example.com",
        totalCalls: 1500,
        callsPast24hrs: 30,
    },
    {
        id: 2,
        name: "Bob Johnson",
        email: "bob.johnson@example.com",
        totalCalls: 800,
        callsPast24hrs: 20,
    },
    {
        id: 3,
        name: "Charlie Brown",
        email: "charlie.brown@example.com",
        totalCalls: 1200,
        callsPast24hrs: 50,
    },
    {
        id: 4,
        name: "David Wilson",
        email: "david.wilson@example.com",
        totalCalls: 900,
        callsPast24hrs: 15,
    },
    // Add more user data as needed
];

const ManageUsersPage = () => {
    const [search, setSearch] = useState("");

    // Filter user data based on the search input
    const filteredData = userData.filter((user) =>
        user.name.toLowerCase().includes(search.toLowerCase())
    );

    const rows = filteredData.map((user) => (
        <Table.Tr key={user.id}>
            <Table.Td>{user.name}</Table.Td>
            <Table.Td>{user.email}</Table.Td>
            <Table.Td>{user.totalCalls}</Table.Td>
            <Table.Td>{user.callsPast24hrs}</Table.Td>
        </Table.Tr>
    ));

    return (
        <Box p="md" w="1200">
            <Title order={1} ta="left" mt="lg">Frequent Users</Title>
            <Space h="lg" />
            <Space h="lg" />
            <Group mb="lg">
                <TextInput
                    placeholder="Search Users"
                    w="100%"
                    value={search}
                    onChange={(event) => setSearch(event.currentTarget.value)}
                />
            </Group>

            {/* User Data Table */}
            <Table stickyHeader stickyHeaderOffset={60}>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>Name</Table.Th>
                        <Table.Th>Email</Table.Th>
                        <Table.Th>Total Calls</Table.Th>
                        <Table.Th>Calls in Past 24 hrs</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{rows}</Table.Tbody>
                {filteredData.length === 0 && (
                    <Table.Caption>No users found</Table.Caption>
                )}
            </Table>
        </Box>
    );
};

export default ManageUsersPage;
