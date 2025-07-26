const purchases = [
  {
    _id: "1",
    fracture: "TRX-001",
    date: "01/07/2025",
    supplier: {
      _id: "1",
      name: "TechnoSupply Corp",
      email: "john@technosupply.com",
      phone: "+1-555-0123",
      address: "123 Business St",
    },
    items: [
      {
        product: {
          _id: "12",
          name: "Corsair CV55 550 Watt 80 Plus",
          sku: "PSU-001",
        },
        quantity: 10,
        price: 300000,
        subtotal: 3000000,
      },
      {
        product: {
          _id: "13",
          sku: "MOB-001",
          name: "TUF GAMING Z690-PLUS WIFI D4",
        },
        quantity: 1,
        price: 200000,
        subtotal: 200000,
      },
      {
        product: {
          _id: "14",
          sku: "GPU-001",
          name: "GeForce RTX™ 3060 VENTUS 2X 12G OC",
        },
        quantity: 2,
        price: 1500000,
        subtotal: 3000000,
      },
    ],
    total: 6200000,
  },
  {
    _id: "2",
    fracture: "TRX-002",
    date: "01/07/2025",
    supplier: {
      _id: "1",
      name: "TechnoSupply Corp",
      contactName: "John Smith",
      email: "john@technosupply.com",
      phone: "+1-555-0123",
      address: "123 Business St",
    },
    items: [
      {
        product: {
          _id: "12",
          name: "Corsair CV55 550 Watt 80 Plus",
          sku: "PSU-001",
        },
        quantity: 10,
        price: 300000,
        subtotal: 3000000,
      },
      {
        product: {
          _id: "13",
          sku: "MOB-001",
          name: "TUF GAMING Z690-PLUS WIFI D4",
        },
        quantity: 1,
        price: 200000,
        subtotal: 200000,
      },
      {
        product: {
          _id: "14",
          sku: "GPU-001",
          name: "GeForce RTX™ 3060 VENTUS 2X 12G OC",
        },
        quantity: 2,
        price: 1500000,
        subtotal: 3000000,
      },
    ],
    totalPurchase: 0,
  },
  {
    _id: "3",
    fracture: "TRX-003",
    date: "01/07/2025",
    supplier: {
      _id: "1",
      name: "TechnoSupply Corp",
      contactName: "John Smith",
      email: "john@technosupply.com",
      phone: "+1-555-0123",
      address: "123 Business St",
    },
    items: [
      {
        product: {
          _id: "12",
          name: "Corsair CV55 550 Watt 80 Plus",
          sku: "PSU-001",
        },
        quantity: 10,
        price: 300000,
        subtotal: 3000000,
      },
      {
        product: {
          _id: "13",
          sku: "MOB-001",
          name: "TUF GAMING Z690-PLUS WIFI D4",
        },
        quantity: 1,
        price: 200000,
        subtotal: 200000,
      },
      {
        product: {
          _id: "14",
          sku: "GPU-001",
          name: "GeForce RTX™ 3060 VENTUS 2X 12G OC",
        },
        quantity: 2,
        price: 1500000,
        subtotal: 3000000,
      },
    ],
    totalPurchase: 0,
  },
]

export default purchases
