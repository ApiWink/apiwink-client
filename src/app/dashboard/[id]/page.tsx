// @ts-nocheck
"use client";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Container, Title, Text, Card, Group, Badge, Button, Space, Grid, Transition, Modal } from '@mantine/core';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs';
import 'prismjs/components/prism-json'; // Include JSON syntax highlighting
import { IconChevronLeft } from '@tabler/icons-react';

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

const TerminalModal = ({ isOpen, onClose, curlRequest, setCurlRequest, handleRequest, curlResponse }) => {
    return (
        <Modal opened={isOpen} onClose={onClose} title="Terminal" size="lg">
            <textarea
                value={curlRequest}
                onChange={(e) => setCurlRequest(e.target.value)}
                placeholder="Enter your curl request here..."
                style={{
                    width: '100%',
                    height: '100px',
                    backgroundColor: '#1e1e1e',
                    color: '#fff',
                    border: 'none',
                    padding: '10px',
                    fontFamily: 'monospace',
                }}
            />
            <Button mt="sm" onClick={handleRequest}>Run Request</Button>

            {/* Response Display */}
            {curlResponse && (
                <Card shadow="sm" padding="lg" radius="md" withBorder mt="md">
                    {isValidJson(curlResponse) ? (
                        <Editor
                            value={curlResponse}
                            highlight={(code) => highlight(JSON.stringify(JSON.parse(code), null, 2), languages.json, 'json')}
                            padding={10}
                            style={{
                                fontFamily: '"Fira code", "Fira Mono", monospace',
                                fontSize: 12,
                                backgroundColor: '#f5f5f5',
                                borderRadius: '5px',
                                whiteSpace: 'pre-wrap',
                                wordWrap: 'break-word',
                            }}
                        />
                    ) : (
                        <Text style={{ whiteSpace: 'pre-wrap', fontFamily: 'monospace', color: '#f00' }}>
                            {curlResponse} {/* Display error messages as plain text */}
                        </Text>
                    )}
                </Card>
            )}
        </Modal>
    );
};

const ApiDetails = () => {
    const router = useRouter();
    const id = router.query?.id;
    useEffect(() => {
        if (id) {
            const apiData = mockData.find((item) => item.id === parseInt(id));
            setApi(apiData);
            setCode(apiData?.response || '');
        }
    }, [id]); // Re-run the effect when `id` becomes available
    
    const [api, setApi] = useState(null);
    const [code, setCode] = useState('');
    const [isTerminalOpen, setTerminalOpen] = useState(false);
    const [curlRequest, setCurlRequest] = useState('');
    const [curlResponse, setCurlResponse] = useState('');

    const handleCurlRequest = async () => {
        try {
            // Parse the curl command
            const parsedRequest = parseCurlCommand(curlRequest);
            const { url, method, headers, body } = parsedRequest;

            const options = {
                method: method,
                headers: headers,
                ...(body && { body: JSON.stringify(body) }) // Only add body if it's not undefined
            };

            const response = await fetch(url, options);
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            setCurlResponse(JSON.stringify(data, null, 2)); // Format JSON response
        } catch (error) {
            setCurlResponse(`Error: ${error.message}`);
        }
    };

    // Simple parser for curl commands
    const parseCurlCommand = (curlCommand) => {
        const lines = curlCommand.split('\n').filter(line => line.trim().length > 0);
        let url = '';
        let method = 'GET'; // Default method
        const headers = {};
        let body = null;

        lines.forEach(line => {
            // Extract URL
            if (line.startsWith('curl')) {
                const parts = line.split(' ');
                const urlIndex = parts.findIndex(part => part.startsWith('http'));
                if (urlIndex !== -1) {
                    url = parts[urlIndex];
                }
            }

            // Extract method (GET, POST, etc.)
            if (line.includes('-X')) {
                const methodIndex = line.indexOf('-X') + 2;
                method = line.substring(methodIndex).trim().split(' ')[0]; // Get method following -X
            }

            // Extract headers
            if (line.includes('-H')) {
                const headerParts = line.split('-H').map(part => part.trim()).filter(part => part);
                headerParts.forEach(header => {
                    const [key, value] = header.split(':').map(part => part.trim());
                    if (key && value) headers[key] = value;
                });
            }

            // Extract body for POST requests
            if (method.toUpperCase() === 'POST' && line.includes('--data')) {
                const bodyIndex = line.indexOf('--data') + 7; // Length of '--data '
                body = line.substring(bodyIndex).trim();
            }
        });

        return { url, method, headers, body };
    };

    if (!api) {
        return <Text align="center">Loading API details...</Text>;
    }

    return (
        <Container>
            <Grid>
                {/* Left Half: API Details */}
                <Grid.Col span={6}>
                    <Title order={2} mt="lg">{api.title}</Title>
                    <Text color="dimmed" size="sm" mt="sm">{api.description}</Text>

                    <Group position="apart" mt="lg">
                        <Text>Company: {api.company}</Text>
                        <Badge color="blue" variant="light">{api.price}</Badge>
                    </Group>

                    <Text mt="sm">Version: {api.apiVersion}</Text>
                    <Text mt="sm">Contract Address: {api.contractAddress}</Text>
                    <Text mt="sm">Rate Limit: {api.rateLimit}</Text>

                    {/* Display multiple types/tags as Badges */}
                    <Group mt="sm">
                        {api.type.map((tag) => (
                            <Badge key={tag} color="green" variant="light">{tag}</Badge>
                        ))}
                    </Group>

                    <Space h="lg" />
                    <Button
                        variant="outline"
                        component="a"
                        href={api.documentation}
                        target="_blank"
                        mr={20}
                        mt="sm"
                    >
                        View API Documentation
                    </Button>

                    <Button
                        variant="transparent"
                        onClick={() => router.back()}
                        leftSection={<IconChevronLeft />}
                        mt="sm"
                    >
                        Back to Marketplace
                    </Button>
                </Grid.Col>

                {/* Right Half: Formatted JSON Response */}
                <Grid.Col span={6}>
                    <Title order={4} mt="lg">API Response Preview:</Title>
                    <Card shadow="sm" padding="lg" radius="md" withBorder mt="md">
                        <Editor
                            value={code}
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
                </Grid.Col>
            </Grid>

            <Button
                fullWidth
                onClick={() => setTerminalOpen(!isTerminalOpen)}
                mt="xl"
                size="md"
            >
                {isTerminalOpen ? 'Close Terminal' : 'Open Terminal'}
            </Button>

            <TerminalModal
                isOpen={isTerminalOpen}
                onClose={() => setTerminalOpen(false)}
                curlRequest={curlRequest}
                setCurlRequest={setCurlRequest}
                handleRequest={handleCurlRequest}
                curlResponse={curlResponse}
            />
        </Container>
    );
};

export default ApiDetails;