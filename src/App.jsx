import React, { useState, useEffect } from "react";
import FilterBar from "./components/FilterBar";
import TicketList from "./components/TicketList";
import SearchBar from "./components/SearchBar";
import Pagination from "./components/Pagination";
import "./styles.css";
import "./App.css";

function App() {
  const [tickets, setTickets] = useState([]);
  const [filters, setFilters] = useState({ status: "", priority: "" });
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [ticketsPerPage] = useState(5);

  useEffect(() => {
    const fetchTickets = async () => {
      const data = [
        {
          id: "TKT-1001",
          title: "Login failure on Safari for SSO users",
          customer: "Acme Corp",
          customerEmail: "support@acmecorp.com",
          priority: "High",
          status: "Open",
          createdAt: "2025-05-01T10:15:00Z",
          updatedAt: "2025-05-01T14:30:00Z",
          description:
            "Users experiencing redirect loop during SSO login on Safari browsers.",
          category: "Authentication",
        },
        {
          id: "TKT-1002",
          title: "Dashboard data not refreshing",
          customer: "TechInnovate LLC",
          customerEmail: "help@techinnovate.com",
          priority: "Medium",
          status: "In Progress",
          createdAt: "2025-04-29T08:22:00Z",
          updatedAt: "2025-05-01T09:15:00Z",
          description: "Analytics dashboard data is stale and not updating.",
          category: "Dashboard",
        },
        {
          id: "TKT-1003",
          title: "Email notifications not being sent",
          customer: "QuickStart Inc",
          customerEmail: "support@quickstart.com",
          priority: "High",
          status: "Open",
          createdAt: "2025-04-30T07:00:00Z",
          updatedAt: "2025-04-30T12:45:00Z",
          description:
            "New user and password reset emails are not reaching recipients.",
          category: "Email",
        },
        {
          id: "TKT-1004",
          title: "Slow performance on mobile devices",
          customer: "MobilityX",
          customerEmail: "contact@mobilityx.io",
          priority: "Low",
          status: "Closed",
          createdAt: "2025-04-28T11:10:00Z",
          updatedAt: "2025-04-29T10:00:00Z",
          description: "App takes too long to load on certain Android phones.",
          category: "Performance",
        },
        {
          id: "TKT-1005",
          title: "Incorrect invoice generated",
          customer: "FinanceGo",
          customerEmail: "billing@financego.com",
          priority: "Medium",
          status: "In Progress",
          createdAt: "2025-04-27T09:40:00Z",
          updatedAt: "2025-05-01T16:00:00Z",
          description: "Customer received invoice for wrong billing cycle.",
          category: "Billing",
        },
        {
          id: "TKT-1006",
          title: "Broken link on Help Center page",
          customer: "SupportSuite",
          customerEmail: "webteam@supportsuite.com",
          priority: "Low",
          status: "Open",
          createdAt: "2025-05-01T06:00:00Z",
          updatedAt: "2025-05-01T06:45:00Z",
          description: "Link to 'How to reset password' leads to 404 page.",
          category: "Documentation",
        },
        {
          id: "TKT-1007",
          title: "Two-factor auth not working",
          customer: "CyberTrust",
          customerEmail: "admin@cybertrust.org",
          priority: "High",
          status: "In Progress",
          createdAt: "2025-04-25T13:00:00Z",
          updatedAt: "2025-04-30T14:22:00Z",
          description: "OTP codes are not being accepted, even when correct.",
          category: "Authentication",
        },
        {
          id: "TKT-1008",
          title: "Customer data mismatch in export",
          customer: "DataHive",
          customerEmail: "export@datahive.com",
          priority: "Medium",
          status: "Open",
          createdAt: "2025-04-26T14:30:00Z",
          updatedAt: "2025-04-30T11:00:00Z",
          description: "Exported CSV files contain incorrect customer details.",
          category: "Data Integrity",
        },
        {
          id: "TKT-1009",
          title: "User unable to cancel subscription",
          customer: "StreamNow",
          customerEmail: "help@streamnow.tv",
          priority: "High",
          status: "Closed",
          createdAt: "2025-04-20T09:10:00Z",
          updatedAt: "2025-04-25T17:00:00Z",
          description: "Cancel button not responding on account settings page.",
          category: "Subscription",
        },
        {
          id: "TKT-1010",
          title: "Monthly report email missing charts",
          customer: "Visualytics",
          customerEmail: "reports@visualytics.io",
          priority: "Low",
          status: "In Progress",
          createdAt: "2025-04-23T10:00:00Z",
          updatedAt: "2025-04-29T08:00:00Z",
          description: "Charts not rendering properly in emailed reports.",
          category: "Reporting",
        },
        {
          id: "TKT-1011",
          title: "App crash on file upload",
          customer: "CloudSafe",
          customerEmail: "dev@cloudsafe.com",
          priority: "High",
          status: "Open",
          createdAt: "2025-05-01T09:00:00Z",
          updatedAt: "2025-05-01T09:10:00Z",
          description:
            "Application crashes when uploading .zip files over 100MB.",
          category: "File Handling",
        },
        {
          id: "TKT-1012",
          title: "Dark mode toggle not saving",
          customer: "NeoUI",
          customerEmail: "feedback@neoui.io",
          priority: "Low",
          status: "Closed",
          createdAt: "2025-04-18T12:45:00Z",
          updatedAt: "2025-04-21T13:00:00Z",
          description: "UI theme resets to light mode on every refresh.",
          category: "UX/UI",
        },
      ];
      setTickets(data);
    };
    fetchTickets();
  }, []);



  const handleStatusUpdate = (ticketId, newStatus) => {
    setTickets(prev =>
      prev.map(ticket =>
        ticket.id === ticketId ? { ...ticket, status: newStatus } : ticket
      )
    );
  };


  const filteredTickets = tickets.filter((ticket) => {
    return (
      (filters.status ? ticket.status === filters.status : true) &&
      (filters.priority ? ticket.priority === filters.priority : true) &&
      (ticket.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ticket.customer.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });

  const indexOfLastTicket = currentPage * ticketsPerPage;
  const indexOfFirstTicket = indexOfLastTicket - ticketsPerPage;
  const currentTickets = filteredTickets.slice(
    indexOfFirstTicket,
    indexOfLastTicket
  );

  return (
    <div className="App">
      <h1>Support Ticket Dashboard</h1>
      <SearchBar setSearchQuery={setSearchQuery} />
      <FilterBar setFilters={setFilters} />
      <TicketList tickets={currentTickets} onStatusUpdate={handleStatusUpdate} />
      <Pagination
        currentPage={currentPage}
        totalTickets={filteredTickets.length}
        ticketsPerPage={ticketsPerPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}

export default App;
