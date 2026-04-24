// ── Status options for the return request dropdown ──
export const STATUS_OPTIONS = [
    { value: "Pending", content: "Pending" },
    { value: "Received", content: "Received" },
    { value: "Return Authorized", content: "Return Authorized" },
    { value: "Item(s) Repaired", content: "Item(s) Repaired" },
    { value: "Item(s) Refunded", content: "Item(s) Refunded" },
    { value: "Request Rejected", content: "Request Rejected" },
    { value: "Cancelled", content: "Cancelled" },
];

// ── Raw BigCommerce Order API response (sample) ──
export const SAMPLE_ORDER_RESPONSE = {
    order: {
        id: 263,
        customer_id: 6,
        date_created: "Thu, 23 Apr 2026 13:06:33 +0000",
        is_tax_inclusive_pricing: true,
        date_modified: "Thu, 23 Apr 2026 13:07:00 +0000",
        date_shipped: "Thu, 23 Apr 2026 13:07:00 +0000",
        status_id: 2,
        status: "Shipped",
        subtotal_ex_tax: "225.0000",
        subtotal_inc_tax: "225.0000",
        subtotal_tax: "0.0000",
        base_shipping_cost: "0.0000",
        shipping_cost_ex_tax: "0.0000",
        shipping_cost_inc_tax: "0.0000",
        shipping_cost_tax: "0.0000",
        shipping_cost_tax_class_id: 2,
        base_handling_cost: "0.0000",
        handling_cost_ex_tax: "0.0000",
        handling_cost_inc_tax: "0.0000",
        handling_cost_tax: "0.0000",
        handling_cost_tax_class_id: 2,
        base_wrapping_cost: "0.0000",
        wrapping_cost_ex_tax: "0.0000",
        wrapping_cost_inc_tax: "0.0000",
        wrapping_cost_tax: "0.0000",
        wrapping_cost_tax_class_id: 3,
        total_ex_tax: "225.0000",
        total_inc_tax: "225.0000",
        total_tax: "0.0000",
        items_total: 1,
        items_shipped: 0,
        payment_method: "Cash on delivery",
        payment_provider_id: null,
        payment_status: "",
        refunded_amount: "0.0000",
        order_is_digital: false,
        store_credit_amount: "0.0000",
        gift_certificate_amount: "0.0000",
        ip_address: "180.211.96.18",
        ip_address_v6: "",
        geoip_country: "India",
        geoip_country_iso2: "IN",
        currency_id: 1,
        currency_code: "INR",
        currency_exchange_rate: "1.0000000000",
        default_currency_id: 1,
        default_currency_code: "INR",
        staff_notes: "",
        customer_message: "",
        discount_amount: "0.0000",
        coupon_discount: "0.0000",
        shipping_address_count: 1,
        is_deleted: false,
        ebay_order_id: 0,
        cart_id: "26143e78-e6ce-4f43-8847-d6f88dafc6be",
        billing_address: {
            first_name: "John",
            last_name: "Doe",
            company: "",
            street_1: "a",
            street_2: "",
            city: "New York",
            state: "Kerala",
            zip: "070008",
            country: "India",
            country_iso2: "IN",
            phone: "",
            email: "john@gmail.com",
            form_fields: "",
        },
        is_email_opt_in: false,
        credit_card_type: null,
        order_source: "www",
        channel_id: 1,
        external_source: "",
        external_id: null,
        external_merchant_id: null,
        tax_provider_id: "BasicTaxProvider",
        customer_locale: "en",
        external_order_id: "",
        store_default_currency_code: "INR",
        store_default_to_transactional_exchange_rate: "1.0000000000",
        custom_status: "Shipped",
    },
};

// ── Sample order products (would come from /v2/orders/{id}/products) ──
export const SAMPLE_ORDER_PRODUCTS = [
    {
        id: 1,
        order_id: 263,
        product_id: 111,
        variant_id: 79,
        order_address_id: 1,
        name: "[Sample] Utility Caddy",
        quantity: 3,
        price_inc_tax: "45.9500",
        price_ex_tax: "45.9500",
        total_inc_tax: "137.8500",
        total_ex_tax: "137.8500",
    },
    {
        id: 2,
        order_id: 263,
        product_id: 93,
        variant_id: 66,
        order_address_id: 1,
        name: "[Sample] Dustpan & Brush",
        quantity: 1,
        price_inc_tax: "34.9500",
        price_ex_tax: "34.9500",
        total_inc_tax: "34.9500",
        total_ex_tax: "34.9500",
    },
    {
        id: 3,
        order_id: 263,
        product_id: 97,
        variant_id: 69,
        order_address_id: 1,
        name: "[Sample] Smith Journal 13",
        quantity: 1,
        price_inc_tax: "25.0000",
        price_ex_tax: "25.0000",
        total_inc_tax: "25.0000",
        total_ex_tax: "25.0000",
    },
];

// ── Helper: format BigCommerce date string to readable format ──
export function formatOrderDate(dateStr) {
    const date = new Date(dateStr);
    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "short" });
    const year = date.getFullYear();

    // Add ordinal suffix
    const suffix =
        day === 1 || day === 21 || day === 31
            ? "st"
            : day === 2 || day === 22
                ? "nd"
                : day === 3 || day === 23
                    ? "rd"
                    : "th";

    return `${day}${suffix} ${month} ${year}`;
}

// ── Helper: build a return item summary string from order products ──
export function buildReturnedItemSummary(products) {
    return products
        .map((p) => `${p.quantity} x ${p.name}`)
        .join(", ");
}

// ── Transform raw BigCommerce order data → return request rows ──
export function buildReturnFromOrder(order, products, returnId, status = "Pending") {
    const customer = `${order.billing_address.first_name} ${order.billing_address.last_name}`;
    const email = order.billing_address.email;

    return {
        id: returnId,
        orderId: order.id,
        customer,
        email,
        date: formatOrderDate(order.date_created),
        status,
        orderStatus: order.status,
        totalIncTax: order.total_inc_tax,
        currencyCode: order.currency_code,
        paymentMethod: order.payment_method,
        returnedItem: buildReturnedItemSummary(products),
        products, // keep the raw products for detail view
    };
}

// ── Sample return requests built from the BigCommerce API response ──
export const SAMPLE_RETURNS = [
    buildReturnFromOrder(
        SAMPLE_ORDER_RESPONSE.order,
        SAMPLE_ORDER_PRODUCTS,
        4,
        "Pending"
    ),
    buildReturnFromOrder(
        {
            ...SAMPLE_ORDER_RESPONSE.order,
            id: 258,
            date_created: "Tue, 22 Apr 2026 10:30:00 +0000",
            status: "Completed",
            status_id: 10,
            total_inc_tax: "34.9500",
            billing_address: {
                ...SAMPLE_ORDER_RESPONSE.order.billing_address,
                first_name: "Jane",
                last_name: "Smith",
                email: "jane@gmail.com",
            },
        },
        [
            {
                id: 4,
                order_id: 258,
                product_id: 93,
                variant_id: 66,
                order_address_id: 1,
                name: "[Sample] Dustpan & Brush",
                quantity: 1,
                price_inc_tax: "34.9500",
                price_ex_tax: "34.9500",
                total_inc_tax: "34.9500",
                total_ex_tax: "34.9500",
            },
        ],
        3,
        "Received"
    ),
    buildReturnFromOrder(
        {
            ...SAMPLE_ORDER_RESPONSE.order,
            id: 245,
            date_created: "Sun, 20 Apr 2026 08:15:00 +0000",
            status: "Shipped",
            status_id: 2,
            total_inc_tax: "50.0000",
            billing_address: {
                ...SAMPLE_ORDER_RESPONSE.order.billing_address,
                first_name: "Mike",
                last_name: "Johnson",
                email: "mike@gmail.com",
            },
        },
        [
            {
                id: 5,
                order_id: 245,
                product_id: 97,
                variant_id: 69,
                order_address_id: 1,
                name: "[Sample] Smith Journal 13",
                quantity: 2,
                price_inc_tax: "25.0000",
                price_ex_tax: "25.0000",
                total_inc_tax: "50.0000",
                total_ex_tax: "50.0000",
            },
        ],
        2,
        "Return Authorized"
    ),
    buildReturnFromOrder(
        {
            ...SAMPLE_ORDER_RESPONSE.order,
            id: 230,
            date_created: "Fri, 18 Apr 2026 14:45:00 +0000",
            status: "Completed",
            status_id: 10,
            total_inc_tax: "89.9500",
            billing_address: {
                ...SAMPLE_ORDER_RESPONSE.order.billing_address,
                first_name: "Sarah",
                last_name: "Williams",
                email: "sarah@gmail.com",
            },
        },
        [
            {
                id: 6,
                order_id: 230,
                product_id: 111,
                variant_id: 79,
                order_address_id: 1,
                name: "[Sample] Canvas Laundry Cart",
                quantity: 1,
                price_inc_tax: "89.9500",
                price_ex_tax: "89.9500",
                total_inc_tax: "89.9500",
                total_ex_tax: "89.9500",
            },
        ],
        1,
        "Item(s) Refunded"
    ),
];
