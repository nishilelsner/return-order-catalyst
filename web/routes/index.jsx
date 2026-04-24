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
import { STATUS_OPTIONS, SAMPLE_RETURNS } from "../data/sampleReturns";

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
        (r.email && r.email.toLowerCase().includes(kw)) ||
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
      render: ({ customer, email }) => (
        <Box>
          <Link href="#" target="_blank">
            {customer}
          </Link>
          <Text color="secondary60" small>{email}</Text>
        </Box>
      ),
    },
    {
      header: "Date",
      hash: "date",
      render: ({ date }) => <Text>{date}</Text>,
    },
    {
      header: "Order Status",
      hash: "orderStatus",
      render: ({ orderStatus }) => (
        <Text bold color={orderStatus === "Shipped" ? "primary" : "success"}>
          {orderStatus}
        </Text>
      ),
    },
    {
      header: "Total",
      hash: "totalIncTax",
      render: ({ totalIncTax, currencyCode }) => (
        <Text>
          {currencyCode === "INR" ? "₹" : "$"}
          {parseFloat(totalIncTax).toFixed(2)}
        </Text>
      ),
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
