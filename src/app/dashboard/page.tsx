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

const mockData = [
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
        documentation: 'https://weatherco.com/docs/weather-api'
    },
    {
        id: 2,
        title: 'Payment Processing API',
        description: 'A secure API for integrating payment processing into web and mobile applications. Supports multiple currencies and payment methods.',
        price: '$50/month',
        company: 'FinPay Solutions',
        type: ['Finance', 'Transactions', 'E-commerce'],
        response: '{"payment_status": "success", "transaction_id": "123456789"}',
        contractAddress: '0xabcd1234567890abcdef1234567890abcdef1234',
        apiVersion: 'v2.0',
        rateLimit: '500 transactions/day',
        documentation: 'https://finpay.com/docs/payment-api'
    },
    {
        id: 3,
        title: 'Location API',
        description: 'Provides accurate geolocation data including latitude, longitude, and address based on IP or GPS coordinates. Ideal for mapping and navigation apps.',
        price: '$20/month',
        company: 'GeoFind',
        type: ['Mapping', 'Geolocation'],
        response: '{"latitude": "37.7749", "longitude": "-122.4194"}',
        contractAddress: '0x9876543210abcdef9876543210abcdef98765432',
        apiVersion: 'v3.1',
        rateLimit: '2000 requests/day',
        documentation: 'https://geofind.com/docs/location-api'
    },
    {
        id: 4,
        title: 'Stock Market Data API',
        description: 'Get real-time stock market data, historical data, and financial information. Supports major global stock exchanges.',
        price: '$30/month',
        company: 'StockWatch',
        type: ['Finance', 'Market Data', 'Analytics'],
        response: '{"symbol": "AAPL", "price": "150.25", "change": "+0.75%"}',
        contractAddress: '0xc0ffee1234567890abcdef1234567890abcdefabcd',
        apiVersion: 'v1.5',
        rateLimit: '1500 requests/day',
        documentation: 'https://stockwatch.com/docs/market-api'
    },
    {
        id: 5,
        title: 'Crypto Prices API',
        description: 'Get up-to-date cryptocurrency prices and market data from top exchanges. Supports Bitcoin, Ethereum, and more.',
        price: '$40/month',
        company: 'CryptoTrack',
        type: ['Crypto', 'Market Data', 'Blockchain'],
        response: '{"symbol": "BTC", "price": "48000.50", "24h_change": "-1.25%"}',
        contractAddress: '0xdeadbeef9876543210abcdef9876543210abcdef',
        apiVersion: 'v4.0',
        rateLimit: '2500 requests/day',
        documentation: 'https://cryptotrack.com/docs/crypto-api'
    },
    {
        id: 6,
        title: 'Email Validation API',
        description: 'Validate email addresses in real-time to ensure deliverability. Helps to prevent fake or mistyped email registrations.',
        price: '$15/month',
        company: 'EmailVerify',
        type: ['Communication', 'Validation', 'Data Quality'],
        response: '{"email": "test@example.com", "valid": true}',
        contractAddress: '0xcafe1234567890abcdef1234567890abcdef9876',
        apiVersion: 'v2.3',
        rateLimit: '10000 validations/day',
        documentation: 'https://emailverify.com/docs/validation-api'
    },
    {
        id: 7,
        title: 'SMS Messaging API',
        description: 'Send and receive SMS messages worldwide. Supports two-factor authentication, notifications, and promotional messages.',
        price: '$25/month',
        company: 'TextPro',
        type: ['Communication', 'Messaging', 'Notifications'],
        response: '{"message_status": "sent", "message_id": "987654321"}',
        contractAddress: '0xbeef1234567890abcdef1234567890abcdef1234',
        apiVersion: 'v1.9',
        rateLimit: '5000 messages/day',
        documentation: 'https://textpro.com/docs/sms-api'
    },
    {
        id: 8,
        title: 'Machine Learning API',
        description: 'Access pre-trained machine learning models for image recognition, natural language processing, and more. Easy-to-use endpoints for ML applications.',
        price: '$100/month',
        company: 'AIML Corp',
        type: ['AI/ML', 'Data Analysis', 'Image Recognition'],
        response: '{"prediction": "cat", "confidence": "95%"}',
        contractAddress: '0xabcdef1234567890abcdef1234567890abcdef12',
        apiVersion: 'v5.0',
        rateLimit: '1000 predictions/day',
        documentation: 'https://aimlcorp.com/docs/ml-api'
    },
    {
        id: 9,
        title: 'Blockchain Explorer API',
        description: 'Explore blockchain transactions, addresses, and blocks in real-time. Supports multiple blockchains including Ethereum and Bitcoin.',
        price: '$60/month',
        company: 'BlockExplorer',
        type: ['Blockchain', 'Exploration', 'Data Retrieval'],
        response: '{"block_number": "123456", "transactions": ["tx1", "tx2", "tx3"]}',
        contractAddress: '0x1234deadbeef9876543210abcdef9876543210ab',
        apiVersion: 'v3.2',
        rateLimit: '2000 requests/day',
        documentation: 'https://blockexplorer.com/docs/explorer-api'
    },
    {
        id: 10,
        title: 'Social Media Analytics API',
        description: 'Analyze social media platforms for engagement metrics, audience demographics, and sentiment analysis. Supports Twitter, Facebook, and Instagram.',
        price: '$80/month',
        company: 'SocialInsight',
        type: ['Analytics', 'Social Media', 'Sentiment Analysis'],
        response: '{"platform": "Twitter", "mentions": "500", "positive_sentiment": "80%"}',
        contractAddress: '0xfeedcafe1234567890abcdef1234567890abcdef',
        apiVersion: 'v2.8',
        rateLimit: '3000 requests/day',
        documentation: 'https://socialinsight.com/docs/analytics-api'
    }
];

const Marketplace = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCompany, setSelectedCompany] = useState(null);
    const [selectedType, setSelectedType] = useState([]);
    const [selectedPriceRange, setSelectedPriceRange] = useState(null);
    const router = useRouter(); // Router for navigation

    const handleViewDetails = (id: any) => {
        router.push(`/dashboard/${id}`); // Navigate to the details page
    };

    // Extract unique companies, types, and price ranges from the mockData
    const uniqueCompanies = useMemo(() => {
        return Array.from(new Set(mockData.map(item => item.company)));
    }, [mockData]);

    const uniqueTypes = useMemo(() => {
        // Flatten the type arrays to get unique values
        return Array.from(new Set(mockData.flatMap(item => item.type)));
    }, [mockData]);

    const uniquePriceRanges = useMemo(() => {
        const prices = mockData.map(item => parseFloat(item.price.replace('$', '').replace('/month', '')));
        const minPrice = Math.min(...prices);
        const maxPrice = Math.max(...prices);

        return [
            { value: 'low', label: `Below $20` },
            { value: 'high', label: `$20 and above` }
        ];
    }, [mockData]);

    // Filter the mockData based on selected filters
    const filteredData = useMemo(() => {
        return mockData.filter(item => {
            const matchesSearchTerm = searchTerm ? item.title.toLowerCase().includes(searchTerm.toLowerCase()) : true;
            const matchesCompany = selectedCompany ? item.company === selectedCompany : true;
            const matchesType = selectedType.length ? item.type.some(type => selectedType.includes(type)) : true;
            const matchesPrice = selectedPriceRange === 'low' ? parseFloat(item.price.replace('$', '').replace('/month', '')) < 20
                : selectedPriceRange === 'high' ? parseFloat(item.price.replace('$', '').replace('/month', '')) >= 20
                    : true;

            return matchesSearchTerm && matchesCompany && matchesType && matchesPrice;
        });
    }, [searchTerm, selectedCompany, selectedType, selectedPriceRange]);

    return (
        <Container>
            <Title order={1} align="center" mt="lg">Marketplace</Title>
            <Text align="center" color="dimmed" size="md" mt="sm">
                Discover and purchase APIs for your applications
            </Text>

            <TextInput
                type="text"
                placeholder="Search APIs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                mt="lg"
                size="md"
            />

            <Space h="lg" />
            <Group grow>
                {/* Filters Section */}
                <Select
                    label="Filter by Company"
                    placeholder="Pick a company"
                    value={selectedCompany}
                    onChange={setSelectedCompany}
                    data={uniqueCompanies}
                    searchable
                    clearable
                />

                {/* Filter by Type */}
                <MultiSelect
                    label="Filter by Type"
                    placeholder="Select API types"
                    value={selectedType}
                    onChange={setSelectedType}
                    data={uniqueTypes}
                    searchable
                    clearable
                />

                {/* Filter by Price */}
                <Select
                    label="Filter by Price"
                    placeholder="Select price range"
                    value={selectedPriceRange}
                    onChange={setSelectedPriceRange}
                    data={uniquePriceRanges}
                />
            </Group>

            <Space h="md" />

            {/* Cards Section */}
            <SimpleGrid cols={3} breakpoints={[{ maxWidth: 768, cols: 1 }]}>
                {filteredData.map((item) => (
                    <Card key={item.id} shadow="sm" padding="lg" radius="md" withBorder>
                        <Group position="apart" style={{ marginBottom: 5 }}>
                            <Title order={3}>{item.title}</Title>
                            <Badge color="blue" variant="light">{item.price}</Badge>
                        </Group>

                        <Text size="sm" color="dimmed" truncate="end">
                            {item.description}
                        </Text>

                        <Text mt="sm" color="dark">Company: {item.company}</Text>
                        <Group mt="sm">
                            {item.type.map((tag) => (
                                <Badge key={tag} color="green" variant="light">{tag}</Badge>
                            ))}
                        </Group>

                        <Space h="md" />

                        <Button
                            variant="outline"
                            color="blue"
                            fullWidth
                            mt="auto"
                            onClick={() => handleViewDetails(item.id)}
                        >
                            View Details
                        </Button>
                    </Card>
                ))}
            </SimpleGrid>
        </Container>
    );
};

export default Marketplace;
