import { Box, Heading, Text, Button, Image, Flex, Input, Table, Thead, Tbody, Tr, Th, Td, useToast, VStack, HStack, IconButton } from "@chakra-ui/react";
import { FaPlus, FaSearch, FaWrench, FaFileInvoice, FaComments, FaClock, FaDownload } from "react-icons/fa";
import { useState, useEffect } from "react";
import InvoiceGenerator from "../components/InvoiceGenerator";
import TaskManager from "../components/TaskManager";
import Chat from "../components/Chat";
import EmployeeHoursTracker from "../components/EmployeeHoursTracker";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderContent = () => {
    switch (activeTab) {
      case "invoices":
        return <InvoicesTab />;
      case "estimates":
        return <EstimatesTab />;
      case "tasks":
        return <TasksTab />;
      case "chat":
        return <ChatTab />;
      case "timesheet":
        return <TimesheetTab />;
      case "lookup":
        return <LookupTab />;
      default:
        return <DashboardTab />;
    }
  };

  return (
    <Box>
      <Flex bg="gray.100" p={4} align="center">
        <Image src="https://images.unsplash.com/photo-1554294314-80a5fb7e6bd5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxhdXRvJTIwcmVwYWlyJTIwc2hvcCUyMGxvZ298ZW58MHx8fHwxNzEyNTM1Mzg4fDA&ixlib=rb-4.0.3&q=80&w=1080" alt="Logo" h={8} mr={4} />
        <Heading size="lg">Automotive CRM</Heading>
        <Input ml="auto" placeholder="Search" maxW={300} />
        <Button ml={3} colorScheme="blue">
          Create <FaPlus />
        </Button>
      </Flex>

      <Flex>
        <VStack bg="gray.50" w={200} p={4} spacing={2} align="stretch">
          <Button leftIcon={<FaWrench />} justifyContent="flex-start" colorScheme="blue" variant={activeTab === "dashboard" ? "solid" : "ghost"} onClick={() => setActiveTab("dashboard")}>
            Dashboard
          </Button>
          <Button leftIcon={<FaFileInvoice />} justifyContent="flex-start" colorScheme="blue" variant={activeTab === "invoices" ? "solid" : "ghost"} onClick={() => setActiveTab("invoices")}>
            Invoices
          </Button>
          <Button leftIcon={<FaSearch />} justifyContent="flex-start" colorScheme="blue" variant={activeTab === "estimates" ? "solid" : "ghost"} onClick={() => setActiveTab("estimates")}>
            Estimates
          </Button>
          <Button leftIcon={<FaWrench />} justifyContent="flex-start" colorScheme="blue" variant={activeTab === "tasks" ? "solid" : "ghost"} onClick={() => setActiveTab("tasks")}>
            Tasks
          </Button>
          <Button leftIcon={<FaComments />} justifyContent="flex-start" colorScheme="blue" variant={activeTab === "chat" ? "solid" : "ghost"} onClick={() => setActiveTab("chat")}>
            Team Chat
          </Button>
          <Button leftIcon={<FaClock />} justifyContent="flex-start" colorScheme="blue" variant={activeTab === "timesheet" ? "solid" : "ghost"} onClick={() => setActiveTab("timesheet")}>
            Timesheets
          </Button>
          <Button leftIcon={<FaSearch />} justifyContent="flex-start" colorScheme="blue" variant={activeTab === "lookup" ? "solid" : "ghost"} onClick={() => setActiveTab("lookup")}>
            Parts Lookup
          </Button>
        </VStack>

        <Box flex={1} p={8}>
          {renderContent()}
        </Box>
      </Flex>
    </Box>
  );
};

const DashboardTab = () => (
  <Box>
    <Heading size="xl" mb={4}>
      Dashboard
    </Heading>
    {/* Add dashboard content */}
    <Text>Welcome to the automotive repair shop CRM dashboard!</Text>
  </Box>
);

const InvoicesTab = () => {
  const toast = useToast();

  const handleInvoiceGenerated = () => {
    toast({
      title: "Invoice Generated",
      description: "The invoice has been successfully generated and is ready for download.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box>
      <Heading size="xl" mb={4}>
        Invoices
      </Heading>
      <InvoiceGenerator onInvoiceGenerated={handleInvoiceGenerated} />
      <Button leftIcon={<FaDownload />} colorScheme="blue" mt={4}>
        Download Invoice
      </Button>
    </Box>
  );
};

const EstimatesTab = () => {
  const [estimates, setEstimates] = useState([]);

  useEffect(() => {
   
    const fetchEstimates = async () => {
      const response = await fetch("/api/estimates");
      const data = await response.json();
      setEstimates(data);
    };

    fetchEstimates();
  }, []);

  return (
    <Box>
      <Heading size="xl" mb={4}>
        Estimates
      </Heading>
      {estimates.length === 0 ? (
        <Text>No estimates found.</Text>
      ) : (
        <Table>
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Customer</Th>
              <Th>Total</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {estimates.map((estimate) => (
              <Tr key={estimate.id}>
                <Td>{estimate.id}</Td>
                <Td>{estimate.customer}</Td>
                <Td>${estimate.total}</Td>
                <Td>
                  <HStack>
                    <IconButton icon={<FaSearch />} aria-label="View" />
                    <IconButton icon={<FaDownload />} aria-label="Download" />
                  </HStack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
    </Box>
  );
};

const TasksTab = () => {
  return (
    <Box>
      <Heading size="xl" mb={4}>
        Tasks
      </Heading>
      <TaskManager />
    </Box>
  );
};

const ChatTab = () => {
  return (
    <Box>
      <Heading size="xl" mb={4}>
        Team Chat
      </Heading>
      <Chat />
    </Box>
  );
};

const TimesheetTab = () => {
  return (
    <Box>
      <Heading size="xl" mb={4}>
        Timesheets
      </Heading>
      <EmployeeHoursTracker />
    </Box>
  );
};

const LookupTab = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [parts, setParts] = useState([]);

  const handleSearch = async () => {
    const response = await fetch(`/api/parts?search=${searchTerm}`);
    const data = await response.json();
    setParts(data);
  };

  return (
    <Box>
      <Heading size="xl" mb={4}>
        Parts Lookup
      </Heading>
      <HStack mb={4}>
        <Input
          placeholder="Search parts"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button onClick={handleSearch}>Search</Button>
      </HStack>
      {parts.length === 0 ? (
        <Text>No parts found.</Text>
      ) : (
        <Table>
          <Thead>
            <Tr>
              <Th>Part Number</Th>
              <Th>Description</Th>
              <Th>Price</Th>
            </Tr>
          </Thead>
          <Tbody>
            {parts.map((part) => (
              <Tr key={part.id}>
                <Td>{part.partNumber}</Td>
                <Td>{part.description}</Td>
                <Td>${part.price}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
    </Box>
  );
};

export default Index;
