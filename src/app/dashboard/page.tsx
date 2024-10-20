// @ts-ignore
"use client";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
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
  MultiSelect,
  Skeleton,
} from "@mantine/core";

const Marketplace = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [selectedType, setSelectedType] = useState([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter(); // Router for navigation

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch("https://apiwink-backend.onrender.com/services");
        const json = await response.json();
        setData(json.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  const handleViewDetails = (id: any) => {
    router.push(`/dashboard/${id}`); // Navigate to the details page
  };

  const uniqueCompanies = useMemo(() => {
    return Array.from(new Set(data.map((item: any) => item.companyName)));
  }, [data]);

  const uniqueTypes = useMemo(() => {
    return Array.from(new Set(data.flatMap((item: any) => item.tags)));
  }, [data]);

  const uniquePriceRanges = useMemo(() => {
    const prices = data.flatMap((item: any) =>
      item.pricing.map((p: any) => parseFloat(p[1]))
    );
    return [
      { value: "low", label: `Below 20WKT` },
      { value: "high", label: `20WKT and above` },
    ];
  }, [data]);

  // Filter the data based on search term and selected filters
  const filteredData = useMemo(() => {
    return data.filter((item: any) => {
      const matchesSearchTerm = searchTerm
        ? item.serviceName.toLowerCase().includes(searchTerm.toLowerCase())
        : true;
      const matchesCompany = selectedCompany
        ? item.companyName === selectedCompany
        : true;
      const matchesType = selectedType.length
        ? item.tags.some((type: any) => selectedType.includes(type))
        : true;
      const matchesPrice =
        selectedPriceRange === "low"
          ? item.pricing.some((p: any) => parseFloat(p[1]) < 20)
          : selectedPriceRange === "high"
            ? item.pricing.some((p: any) => parseFloat(p[1]) >= 20)
            : true;

      return matchesSearchTerm && matchesCompany && matchesType && matchesPrice;
    });
  }, [searchTerm, selectedCompany, selectedType, selectedPriceRange, data]);

  return (
    <Container className="w-[80vw] mt-[5vh]">
      <Title order={1} ta="left" mt="lg">
        Marketplace
      </Title>
      <Text ta="left" color="dimmed" size="md" mt="sm">
        Discover and purchase APIs for your applications
      </Text>

      <TextInput
        type="text"
        placeholder="Search APIs..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        mt="lg"
        size="sm"
        className="w-[80vw]"
      />

      <Space h="lg" />
      <Group grow className="w-[80vw]">
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
      {loading ? (
        <SimpleGrid
          cols={3}
          breakpoints={[{ maxWidth: 768, cols: 1 }]}
          className="w-[80vw]"
        >
          {/* Show skeletons while loading */}
          {[...Array(6)].map((_, index) => (
            <Card key={index} shadow="sm" padding="lg" radius="md" withBorder>
              <Skeleton height={30} />
              <Skeleton height={20} mt="sm" />
              <Skeleton height={50} mt="sm" />
              <Skeleton height={30} mt="sm" />
              <Skeleton height={40} mt="sm" />
            </Card>
          ))}
        </SimpleGrid>
      ) : (
        <SimpleGrid
          cols={3}
          breakpoints={[{ maxWidth: 768, cols: 1 }]}
          className="w-[80vw]"
        >
          {filteredData.map((item: any) => (
            <Card key={item._id} shadow="sm" padding="lg" radius="md" withBorder>
              <Title order={3}>{item.serviceName}</Title>
              <Space h="sm" />
              <Badge color="blue" variant="light">
                {Object.values(item.pricing[0])[0]}WKT/{Object.keys(item.pricing[0])[0]} calls
              </Badge>
              <Space h="md" />

              <Text size="sm" color="dimmed" truncate="end">
                {item.description}
              </Text>

              <Text mt="sm" color="dark">
                Company: {item.companyName}
              </Text>
              <Group mt="sm">
                {item.tags && item.tags.length > 0 ? (
                  item.tags.map((tag: string) => (
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

              <Space h="md" />

              <Button
                variant="outline"
                color="blue"
                fullWidth
                mt="auto"
                onClick={() => handleViewDetails(item._id)}
              >
                View Details
              </Button>
            </Card>
          ))}
        </SimpleGrid>
      )}
    </Container>
  );
};

export default Marketplace;
