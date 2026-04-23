import { useState, useMemo, useCallback } from "react";
import {
  Box,
  Panel,
  Table,
  Text,
  Input,
  Button,
  Select,
  Dropdown,
  Link,
  Flex,
  H1,
} from "@bigcommerce/big-design";
import { MoreHorizIcon } from "@bigcommerce/big-design-icons";
import { api } from "../api";

// ── Status options matching the screenshot dropdown ──
const STATUS_OPTIONS = [
  { value: "Pending", content: "Pending" },
  { value: "Received", content: "Received" },
  { value: "Return Authorized", content: "Return Authorized" },
  { value: "Item(s) Repaired", content: "Item(s) Repaired" },
  { value: "Item(s) Refunded", content: "Item(s) Refunded" },
  { value: "Request Rejected", content: "Request Rejected" },
  { value: "Cancelled", content: "Cancelled" },
];

// ── Sample data matching the screenshot ──
const SAMPLE_RETURNS = [
  {
    id: 4,
    returnedItem: "3 x [Sample] Utility Caddy",
    orderId: 262,
    customer: "John Doe",
    date: "23rd Apr 2026",
    status: "Pending",
  },
  {
    id: 3,
    returnedItem: "1 x [Sample] Dustpan & Brush",
    orderId: 258,
    customer: "Jane Smith",
    date: "22nd Apr 2026",
    status: "Received",
  },
  {
    id: 2,
    returnedItem: "2 x [Sample] Smith Journal 13",
    orderId: 245,
    customer: "Mike Johnson",
    date: "20th Apr 2026",
    status: "Return Authorized",
  },
  {
    id: 1,
    returnedItem: "1 x [Sample] Canvas Laundry Cart",
    orderId: 230,
    customer: "Sarah Williams",
    date: "18th Apr 2026",
    status: "Item(s) Refunded",
  },
  {
    id: 5,
    returnedItem: "2 x [Sample] Fog Linen Chambray Towel",
    orderId: 271,
    customer: "Emily Davis",
    date: "23rd Apr 2026",
    status: "Pending",
  },
];

export const IndexPage = () => {
  const [returns, setReturns] = useState(SAMPLE_RETURNS);
  const [selectedItems, setSelectedItems] = useState([]);
  const [filterKeyword, setFilterKeyword] = useState("");

  // ── Handlers ──
  const handleStatusChange = useCallback((returnId, newStatus) => {
    setReturns((prev) =>
      prev.map((r) => (r.id === returnId ? { ...r, status: newStatus } : r))
    );
  }, []);

  const handleIssueRefund = useCallback(
    (returnId) => {
      if (
        window.confirm(
          `Are you sure you want to issue a refund for Return #${returnId}?`
        )
      ) {
        handleStatusChange(returnId, "Item(s) Refunded");
      }
    },
    [handleStatusChange]
  );

  // ── Filter logic ──
  const filteredReturns = useMemo(() => {
    if (!filterKeyword.trim()) return returns;
    const kw = filterKeyword.toLowerCase();
    return returns.filter(
      (r) =>
        r.returnedItem.toLowerCase().includes(kw) ||
        r.customer.toLowerCase().includes(kw) ||
        String(r.orderId).includes(kw) ||
        String(r.id).includes(kw)
    );
  }, [returns, filterKeyword]);

  // ── Table columns ──
  const columns = [
    {
      header: "Return ID",
      hash: "id",
      render: ({ id }) => <Text bold>{id}</Text>,
      isSortable: true,
    },
    {
      header: "Returned Item",
      hash: "returnedItem",
      render: ({ returnedItem }) => (
        <Link href="#" target="_blank">
          {returnedItem}
        </Link>
      ),
    },
    {
      header: "Order #",
      hash: "orderId",
      render: ({ orderId }) => (
        <Link href="#" target="_blank">
          Order #{orderId}
        </Link>
      ),
    },
    {
      header: "Customer",
      hash: "customer",
      render: ({ customer }) => (
        <Link href="#" target="_blank">
          {customer}
        </Link>
      ),
    },
    {
      header: "Date",
      hash: "date",
      render: ({ date }) => <Text>{date}</Text>,
    },
    {
      header: "Status",
      hash: "status",
      render: ({ id, status }) => (
        <Box style={{ minWidth: "180px" }}>
          <Select
            options={STATUS_OPTIONS}
            value={status}
            onOptionChange={(val) => handleStatusChange(id, val)}
            placeholder="Select status"
          />
        </Box>
      ),
    },
    {
      header: "Action",
      hash: "action",
      render: ({ id, status }) => (
        <Dropdown
          items={[
            {
              content: "Issue Refund",
              onItemClick: () => handleIssueRefund(id),
              hash: "issue-refund",
              disabled: status === "Item(s) Refunded" || status === "Cancelled",
            },
          ]}
          toggle={<Button variant="subtle" iconOnly={<MoreHorizIcon />} />}
        />
      ),
    },
  ];

  return (
    <>
      <H1>Return Requests</H1>
      <Panel>
        {/* ── Filter Bar ── */}
        <Box marginBottom="medium">
          <Flex flexGap="1rem" alignItems="center">
            <Box style={{ maxWidth: "300px", flexGrow: 1 }}>
              <Input
                placeholder="Filter by Keyword"
                value={filterKeyword}
                onChange={(e) => setFilterKeyword(e.target.value)}
              />
            </Box>
            <Button variant="secondary">Filter</Button>
            <Link href="#">Advanced Search</Link>
          </Flex>
        </Box>

        {/* ── Return Requests Table ── */}
        <Table
          columns={columns}
          items={filteredReturns}
          itemName="Return Requests"
          stickyHeader
          selectable={{
            selectedItems,
            onSelectionChange: setSelectedItems,
          }}
        />
      </Panel>
    </>
  );
};
