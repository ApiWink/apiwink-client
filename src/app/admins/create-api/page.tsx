"use client";
import React, { useState } from 'react';
import { TextInput, Textarea, MultiSelect, Checkbox, NumberInput, Button, Container, Title, Space, Divider } from '@mantine/core';

const CreateApiPage = () => {
    const [apiName, setApiName] = useState('');
    const [apiDescription, setApiDescription] = useState('');
    const [apiTags, setApiTags] = useState<string[]>([]);
    const [autoExpiry, setAutoExpiry] = useState(false);
    const [enableSessionKeys, setEnableSessionKeys] = useState(false);
    const [maxRateLimit, setMaxRateLimit] = useState<number | undefined>(undefined);

    const handleSubmit = () => {
        const values = {
            apiName,
            apiDescription,
            apiTags,
            autoExpiry,
            enableSessionKeys,
            maxRateLimit,
        };
        console.log('Form values:', values);
        // Handle form submission logic here
    };

    return (
        <Container>
            <Title order={2} align="center" mt="lg">Create API Configuration</Title>
            <Space h="lg" />
            <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                <TextInput
                    label="API Name"
                    placeholder="Enter API Name"
                    required
                    value={apiName}
                    onChange={(event) => setApiName(event.currentTarget.value)}
                />
                <Space h="lg" />

                <Textarea
                    label="API Description"
                    placeholder="Enter API Description"
                    autosize
                    minRows={4}
                    value={apiDescription}
                    onChange={(event) => setApiDescription(event.currentTarget.value)}
                />
                <Space h="lg" />

                <MultiSelect
                    label="API Tags"
                    placeholder="Select tags"
                    data={['tag1', 'tag2', 'tag3']} // Replace with your tag options
                    searchable
                    value={apiTags}
                    onChange={setApiTags}
                />
                <Space h="lg" />

                <Checkbox
                    label="Set auto expiry time limit"
                    checked={autoExpiry}
                    onChange={(event) => setAutoExpiry(event.currentTarget.checked)}
                />
                <Space h="lg" />

                <Checkbox
                    label="Enable/Disable session keys"
                    checked={enableSessionKeys}
                    onChange={(event) => setEnableSessionKeys(event.currentTarget.checked)}
                />
                <Space h="lg" />

                <NumberInput
                    label="Max Rate Limit"
                    placeholder="Enter max rate limit"
                    value={maxRateLimit}
                    onChange={(value) => setMaxRateLimit(value)}
                />
                <Space h="lg" />
                <Space h="lg" />
                <Space h="lg" />

                <Button type="submit">Create Configuration</Button>
            </form>
        </Container>
    );
};

export default CreateApiPage;