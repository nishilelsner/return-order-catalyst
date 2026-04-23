// ── Status options for the dropdown ──
export const STATUS_OPTIONS = [
    { value: "Pending", content: "Pending" },
    { value: "Received", content: "Received" },
    { value: "Return Authorized", content: "Return Authorized" },
    { value: "Item(s) Repaired", content: "Item(s) Repaired" },
    { value: "Item(s) Refunded", content: "Item(s) Refunded" },
    { value: "Request Rejected", content: "Request Rejected" },
    { value: "Cancelled", content: "Cancelled" },
];

// ── Sample return requests ──
export const SAMPLE_RETURNS = [
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
