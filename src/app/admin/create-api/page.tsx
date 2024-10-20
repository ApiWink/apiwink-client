"use client";
import React, { useState } from "react";
import {
  TextInput,
  Textarea,
  MultiSelect,
  NumberInput,
  Button,
  Box,
  Title,
  Space,
} from "@mantine/core";
import { notifications } from '@mantine/notifications';

const CreateApiPage = () => {
  const [apiName, setApiName] = useState("");
  const [developerName, setDeveloperName] = useState("");
  const [version, setVersion] = useState("");
  const [requestMethod, setRequestMethod] = useState<string | null>(null);
  const [apiDescription, setApiDescription] = useState("");
  const [apiTags, setApiTags] = useState<string[]>([]);
  const [autoExpiry, setAutoExpiry] = useState(false);
  const [enableSessionKeys, setEnableSessionKeys] = useState(false);
  const [maxRateLimit, setMaxRateLimit] = useState<number | undefined>(undefined);
  const [schemaValue, setSchemaValue] = useState("");
  
  const [pricePairs, setPricePairs] = useState([
    { calls: "", price: "" },
    { calls: "", price: "" },
    { calls: "", price: "" },
  ]);

  const handlePriceChange = (
    index: number,
    field: "calls" | "price",
    value: string
  ) => {
    const updatedPairs = [...pricePairs];
    updatedPairs[index][field] = value;
    setPricePairs(updatedPairs);
  };

  const handleSubmit = async () => {
    const isAtLeastOneFilled = pricePairs.some(
      (pair) => pair.calls || pair.price
    );
    if (!isAtLeastOneFilled) {
      notifications.show({
        title: 'Error',
        message: 'Please fill at least one price entry for API calls.',
        color: 'red',
      });
      return;
    }
  
    // Prepare the data to send
    const values = {
      apiName,
      developerName,
      version,
      requestMethod,
      apiDescription,
      apiTags,
      autoExpiry,
      enableSessionKeys,
      maxRateLimit,
      pricePairs,
    };
  
    try {
      const response = await fetch('https://apiwink-backend.onrender.com/create_service', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const responseData = await response.json();
      console.log("Data submitted successfully:", responseData);
  
      // Clear all form fields
      setApiName("");
      setDeveloperName("");
      setVersion("");
      setRequestMethod(null);
      setApiDescription("");
      setApiTags([]);
      setAutoExpiry(false);
      setEnableSessionKeys(false);
      setMaxRateLimit(undefined);
      setSchemaValue("");
      setPricePairs([
        { calls: "", price: "" },
        { calls: "", price: "" },
        { calls: "", price: "" },
      ]);
  
      // Show success notification
      notifications.show({
        title: 'Success',
        message: 'Configuration created successfully!',
        color: 'green',
      });
    } catch (error) {
      console.error("Error submitting data:", error);
      notifications.show({
        title: 'Error',
        message: 'Failed to create configuration. Please try again.',
        color: 'red',
      });
    }
  };

  const handlePaste = (event: any) => {
    event.preventDefault();
    const pastedData = event.clipboardData.getData("text");

    const parsedTS = typeScriptToJson(pastedData);
    console.log(parsedTS, "parsedTS");

    try {
      const json = JSON.parse(parsedTS);
      setSchemaValue(JSON.stringify(json, undefined, 2));
    } catch (e) {
      console.error("Invalid JSON", pastedData, e);
    }
  };

  function typeScriptToJson(input: string): string {
    return input
      .replace(/(\w+): (\w+);/g, '"$1": "$2",')
      .replace(/,(\s*})/, "$1")
      .replace(/;$/, "");
  }

  const handleChange = (event: any) => {
    const value = event.target.value;

    try {
      const json = JSON.parse(value);
      setSchemaValue(JSON.stringify(json, undefined, 2));
    } catch (e) {
      console.log("Invalid JSON", value, e);
      setSchemaValue(value);
    }
  };

  return (
    <Box p="md" className="w-[80vw]">
      <Title order={2} mt="lg">
        Create API Configuration
      </Title>
      <Space h="sm" />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="flex flex-wrap w-full h-[60vh]"
      >
        <div className="w-full flex flex-wrap">
          {/* Left Column */}
          <div className="w-1/2 p-2">
            <TextInput
              label="API Name"
              placeholder="Enter API Name"
              required
              value={apiName}
              onChange={(event) => setApiName(event.currentTarget.value)}
            />
            <Space h="lg" />

            <TextInput
              label="Developer Name"
              placeholder="Enter Developer Name"
              required
              value={developerName}
              onChange={(event) => setDeveloperName(event.currentTarget.value)}
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
          </div>

          {/* Right Column */}
          <div className="w-1/2 p-2">
            <MultiSelect
              label="API Tags"
              placeholder="Select tags"
              data={["tag1", "tag2", "tag3"]}
              searchable
              value={apiTags}
              onChange={setApiTags}
            />
            <Space h="lg" />
            <TextInput
              label="Version"
              placeholder="Enter Version"
              required
              value={version}
              onChange={(event) => setVersion(event.currentTarget.value)}
            />
            <Space h="lg" />
            <Textarea
              label="Response preview"
              id="schema"
              placeholder="Response preview"
              onPaste={handlePaste}
              onChange={handleChange}
              value={schemaValue}
              autosize
              minRows={4}
            />
          </div>
        </div>

        {/* Price Input Section */}
        <div className="w-full p-2">
          <h3 className="font-bold">
            Price Configuration (Number of API Calls)
          </h3>
          {pricePairs.map((pair, index) => (
            <div key={index} className="flex space-x-2 mb-4">
              <NumberInput
                label={`Calls #${index + 1}`}
                placeholder="Enter number of calls"
                value={pair.calls}
                onChange={(value) =>
                  handlePriceChange(index, "calls", value?.toString() || "")
                }
              />
              <NumberInput
                label={`Price #${index + 1}`}
                placeholder="Enter price"
                value={pair.price}
                onChange={(value) =>
                  handlePriceChange(index, "price", value?.toString() || "")
                }
              />
            </div>
          ))}
        </div>

        {/* Button at the bottom left */}
        <div className="flex justify-start w-[1/2] space-x-2 p-2">
          <Button type="submit" className="w-full">
            Create Configuration
          </Button> 
        </div>
      </form>
    </Box>
  );
};

export default CreateApiPage;
