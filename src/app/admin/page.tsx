// @ts-ignore
"use client";
import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    TextInput,
    Card,
    Container,
    Title,
    Text,
    SimpleGrid,
    Group,
    Badge,
    Button,
    Space,
    Select,
    MultiSelect
} from '@mantine/core';
import { AreaChart } from '@mantine/charts';
import { data } from './data';

const AdminsHome = () => {
    return (
        <Container>
            <Title order={1} align="center" mt="lg">Marketplace</Title>
            <AreaChart
                h={300}
                data={data}
                dataKey="date"
                series={[
                    { name: 'Apples', color: 'indigo.6' },
                    { name: 'Oranges', color: 'blue.6' },
                    { name: 'Tomatoes', color: 'teal.6' },
                ]}
                curveType="monotone"
            />
        </Container>
    );
};

export default AdminsHome;
