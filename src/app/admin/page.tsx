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
        <Container className="w-[80vw] mt-[5vh]">
            <Title order={1} mt="lg">Marketplace</Title>
            <Space h="lg" />
            <Space h="lg" />
            <Space h="lg" />
            <Space h="lg" />
            <AreaChart
                h={300}
                w="1280"
                data={data}
                dataKey="date"
                series={[
                    { name: 'API1', color: 'indigo.6' },
                    { name: 'API2', color: 'blue.6' },
                    { name: 'API3', color: 'teal.6' },
                ]}
                curveType="monotone"
            />
        </Container>
    );
};

export default AdminsHome;
