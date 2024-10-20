// @ts-nocheck
"use client";
import { useRouter } from "next/router";
import { useRouter as useNavigationRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Container,
  Title,
  Text,
  Card,
  Group,
  Badge,
  Button,
  Space,
  Grid,
  Transition,
  SimpleGrid,
  Modal,
  Skeleton
} from "@mantine/core";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs";
import "prismjs/components/prism-json"; // Include JSON syntax highlighting
import { IconChevronLeft } from "@tabler/icons-react";

const TerminalModal = ({
  isOpen,
  onClose,
  curlRequest,
  setCurlRequest,
  handleRequest,
  curlResponse,
}) => {
  return (
    <Modal opened={isOpen} onClose={onClose} title="Terminal" size="lg">
      <textarea
        value={curlRequest}
        onChange={(e) => setCurlRequest(e.target.value)}
        placeholder="Enter your curl request here..."
        style={{
          width: "100%",
          height: "100px",
          backgroundColor: "#1e1e1e",
          color: "#fff",
          border: "none",
          padding: "10px",
          fontFamily: "monospace",
        }}
      />
      <Button mt="sm" onClick={handleRequest}>
        Run Request
      </Button>

      {/* Response Display */}
      {curlResponse && (
        <Card shadow="sm" padding="lg" radius="md" withBorder mt="md">
          {isValidJson(curlResponse) ? (
            <Editor
              value={curlResponse}
              highlight={(code) =>
                highlight(
                  JSON.stringify(JSON.parse(code), null, 2),
                  languages.json,
                  "json"
                )
              }
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 12,
                backgroundColor: "#f5f5f5",
                borderRadius: "5px",
                whiteSpace: "pre-wrap",
                wordWrap: "break-word",
              }}
            />
          ) : (
            <Text
              style={{
                whiteSpace: "pre-wrap",
                fontFamily: "monospace",
                color: "#f00",
              }}
            >
              {curlResponse} {/* Display error messages as plain text */}
            </Text>
          )}
        </Card>
      )}
    </Modal>
  );
};

const ApiDetails = () => {
  const pathname = usePathname();
  const id = pathname.split("/")[2];
  const [code, setCode] = useState("");
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [isTerminalOpen, setTerminalOpen] = useState(false);
  const [curlRequest, setCurlRequest] = useState("");
  const [curlResponse, setCurlResponse] = useState("");
  const navRouter = useNavigationRouter();

  useEffect(() => {
    const fetchData = async () => {
      if (data) return; // Avoid fetching if data is already present
      setLoading(true);
      try {
        const response = await fetch(`https://apiwink-backend.onrender.com/service/${id}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.statusText}`);
        }
        const json = await response.json();
        setData(json);
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, data]); // Add data to prevent re-fetching if it's already there


  console.log(data)

  const handleCurlRequest = async () => {
    try {
      // Parse the curl command
      const parsedRequest = parseCurlCommand(curlRequest);
      const { url, method, headers, body } = parsedRequest;

      const options = {
        method: method,
        headers: headers,
        ...(body && { body: JSON.stringify(body) }), // Only add body if it's not undefined
      };

      const response = await fetch(url, options);
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      setCurlResponse(JSON.stringify(data, null, 2)); // Format JSON response
    } catch (error) {
      setCurlResponse(`Error: ${error.message}`);
    }
  };

  // Simple parser for curl commands
  const parseCurlCommand = (curlCommand) => {
    const lines = curlCommand
      .split("\n")
      .filter((line) => line.trim().length > 0);
    let url = "";
    let method = "GET"; // Default method
    const headers = {};
    let body = null;

    lines.forEach((line) => {
      // Extract URL
      if (line.startsWith("curl")) {
        const parts = line.split(" ");
        const urlIndex = parts.findIndex((part) => part.startsWith("http"));
        if (urlIndex !== -1) {
          url = parts[urlIndex];
        }
      }

      // Extract method (GET, POST, etc.)
      if (line.includes("-X")) {
        const methodIndex = line.indexOf("-X") + 2;
        method = line.substring(methodIndex).trim().split(" ")[0]; // Get method following -X
      }

      // Extract headers
      if (line.includes("-H")) {
        const headerParts = line
          .split("-H")
          .map((part) => part.trim())
          .filter((part) => part);
        headerParts.forEach((header) => {
          const [key, value] = header.split(":").map((part) => part.trim());
          if (key && value) headers[key] = value;
        });
      }

      // Extract body for POST requests
      if (method.toUpperCase() === "POST" && line.includes("--data")) {
        const bodyIndex = line.indexOf("--data") + 7; // Length of '--data '
        body = line.substring(bodyIndex).trim();
      }
    });

    return { url, method, headers, body };
  };

  return (
    <Container className="w-[80vw] mt-[5vh]">
      <>
        <Grid>
          <Grid.Col span={10}>
            {loading ? (
              <>
                <Skeleton height={30} radius="md" mt="lg" />
                <Skeleton height={20} radius="md" mt="sm" />
                <Skeleton height={20} radius="md" mt="sm" />
                <Skeleton height={20} radius="md" mt="sm" />
                <Skeleton height={30} radius="md" mt="lg" />
              </>
            ) : (
              <>
                <Title order={2} mt="lg">
                  {data.serviceName}
                </Title>
                <Text color="dimmed" size="md">By {data.companyName}</Text>

                <Text color="dimmed" size="sm" mt="sm">
                  {data.description}
                </Text>

                <Space h="lg" />

                <Group>
                  {data.pricing.map((priceObj, index) => {
                    const calls = Object.keys(priceObj)[0];
                    const price = priceObj[calls];
                    return (
                      <Badge key={index} color="blue" variant="light">
                        {price}WKT/{calls} calls
                      </Badge>
                    );
                  })}
                </Group>


                <Group mt="sm">
                  {data.tags && data.tags.length > 0 ? (
                    data.tags.map((tag: string) => (
                      <Badge key={tag} color="green" variant="light">
                        {tag}
                      </Badge>
                    ))
                  ) : (
                    <Text size="sm" color="dimmed">
                      No tags available
                    </Text>
                  )}
                </Group>
                  <Text mt="sm"><i>Version: {data.version}</i></Text>
              </>
            )}

            <Space h="lg" />

            <Button
              variant="outline"
              onClick={() => navRouter.back()}
              leftSection={<IconChevronLeft />}
              mt="sm"
            >
              Back to Marketplace
            </Button>
          </Grid.Col>

          <Grid.Col span={14}>
            <Title order={4} mt="lg">
              API Response Preview:
            </Title>

            <Card shadow="sm" padding="lg" radius="md" withBorder mt="md">
              {loading ? (
                <Skeleton height={200} radius="md" />
              ) : (
                <Editor
                  value={data.reponsePreview}
                  onValueChange={(newCode) => setCode(newCode)}
                  highlight={(code) => {
                    try {
                      return highlight(
                        JSON.stringify(JSON.parse(code), null, 2),
                        languages.json,
                        "json"
                      );
                    } catch (error) {
                      console.error("Invalid JSON:", error);
                      return code;
                    }
                  }}
                  padding={10}
                  style={{
                    fontFamily: '"Fira code", "Fira Mono", monospace',
                    fontSize: 12,
                    backgroundColor: "#f5f5f5",
                    borderRadius: "5px",
                    whiteSpace: "pre-wrap",
                    wordWrap: "break-word",
                  }}
                />
              )}
            </Card>
          </Grid.Col>
        </Grid>

        <Button
          className="w-[80vw]"
          onClick={() => setTerminalOpen(!isTerminalOpen)}
          mt="xl"
          variant="default"
        >
          {isTerminalOpen ? "Close Terminal" : "Test In Terminal"}
        </Button>

        <TerminalModal
          isOpen={isTerminalOpen}
          onClose={() => setTerminalOpen(false)}
          curlRequest={curlRequest}
          setCurlRequest={setCurlRequest}
          handleRequest={handleCurlRequest}
          curlResponse={curlResponse}
        />
      </>
    </Container>
  );
};

export default ApiDetails;