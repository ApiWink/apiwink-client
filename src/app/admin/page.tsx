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
        <Container className="w-[100vw] mt-[5vh]">
            {/* <Title order={4} mt="lg">Hello there</Title> */}
            <Space h="lg" />

            <Group position="apart" spacing="md" w="1280">
                <Card
                    p={24}
                    py={32}
                    style={{
                        backgroundColor: '#FFEBE9',
                        color: '#FF6B6B',
                        borderRadius: '8px',
                        textAlign: 'center',
                        width: '23%',
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
                        width: '23%',
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
                        width: '23%',
                    }}
                >
                    <Text size="xl" weight={700}>
                        56k+
                    </Text>
                    <Text size="sm" color="dimmed">
                        APIs Subscribers
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
                        width: '23%',
                    }}
                >
                    <Text size="xl" weight={700}>
                        1200+
                    </Text>
                    <Text size="sm" color="dimmed">
                        New Users in past 24 hrs
                    </Text>
                </Card>
            </Group>
            <Space h="lg" />
            <Space h="lg" />


            <AreaChart
                h={300}
                w="1200"
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
