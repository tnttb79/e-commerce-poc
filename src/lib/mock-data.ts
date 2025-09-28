export interface User {
  id: string;
  name: string;
  email: string;
  role: "buyer" | "manufacturer" | "admin";
  avatar?: string;
  company?: string;
  location?: string;
}

export interface Manufacturer {
  id: string;
  name: string;
  logo?: string;
  description: string;
  location: string;
  established: number;
  employeeCount: string;
  verificationStatus: "verified" | "under_review" | "not_verified";
  rating: number;
  responseRate: number;
  responseTime: string;
  totalProducts: number;
  website?: string;
  specialties: string[];
}

export interface Product {
  id: string;
  manufacturerId: string;
  name: string;
  description: string;
  category: string;
  images: string[];
  priceRange: { min: number; max: number };
  moq: number;
  leadTime: number;
  specifications: Record<string, any>;
  featured: boolean;
}

export interface Inquiry {
  id: string;
  buyerId: string;
  manufacturerId: string;
  productId?: string;
  subject: string;
  message: string;
  status: "open" | "responded" | "closed";
  createdAt: string;
  updatedAt: string;
  quantity?: number;
  targetPrice?: number;
  requiredBy?: string;
}

export interface Message {
  id: string;
  inquiryId: string;
  senderId: string;
  message: string;
  timestamp: string;
  attachments?: string[];
}

// Mock Data
export const mockUsers: User[] = [
  {
    id: "1",
    name: "John Smith",
    email: "john@buyerco.com",
    role: "buyer",
    company: "TechCorp Inc.",
    location: "New York, USA",
  },
  {
    id: "2",
    name: "Zhang Wei",
    email: "zhang@manufacturer.com",
    role: "manufacturer",
    company: "Global Manufacturing Ltd.",
    location: "Guangzhou, China",
  },
  {
    id: "3",
    name: "Sarah Johnson",
    email: "sarah@admin.com",
    role: "admin",
    location: "San Francisco, USA",
  },
];

export const mockManufacturers: Manufacturer[] = [
  {
    id: "1",
    name: "TechFlow Manufacturing",
    description:
      "Leading manufacturer of electronic components and consumer electronics with 15+ years of experience.",
    location: "Shenzhen, China",
    established: 2008,
    employeeCount: "201-500",
    verificationStatus: "verified",
    rating: 4.8,
    responseRate: 95,
    responseTime: "< 2 hours",
    totalProducts: 156,
    website: "https://techflow.com",
    specialties: ["Electronics", "Consumer Goods", "IoT Devices"],
  },
  {
    id: "2",
    name: "Global Textiles Co.",
    description:
      "Premium textile manufacturer specializing in sustainable fabrics and custom manufacturing solutions.",
    location: "Ho Chi Minh City, Vietnam",
    established: 2012,
    employeeCount: "51-200",
    verificationStatus: "verified",
    rating: 4.6,
    responseRate: 88,
    responseTime: "< 4 hours",
    totalProducts: 89,
    specialties: ["Textiles", "Sustainable Materials", "Custom Manufacturing"],
  },
  {
    id: "3",
    name: "Precision Parts Ltd.",
    description:
      "High-precision manufacturing for automotive and aerospace industries with ISO 9001 certification.",
    location: "Mumbai, India",
    established: 2005,
    employeeCount: "101-200",
    verificationStatus: "under_review",
    rating: 4.4,
    responseRate: 92,
    responseTime: "< 6 hours",
    totalProducts: 234,
    specialties: ["Automotive", "Aerospace", "Precision Engineering"],
  },
  {
    id: "4",
    name: "EcoPackaging Solutions",
    description:
      "Sustainable packaging solutions for food and beverage industry.",
    location: "Bangkok, Thailand",
    established: 2015,
    employeeCount: "11-50",
    verificationStatus: "not_verified",
    rating: 4.2,
    responseRate: 78,
    responseTime: "< 12 hours",
    totalProducts: 67,
    specialties: ["Packaging", "Sustainable Solutions", "Food Grade"],
  },
];

export const mockProducts: Product[] = [
  {
    id: "1",
    manufacturerId: "1",
    name: "Wireless Bluetooth Speaker",
    description:
      "High-quality portable Bluetooth speaker with 20W power output and 12-hour battery life.",
    category: "Electronics",
    images: ["/api/placeholder/300/300"],
    priceRange: { min: 25, max: 45 },
    moq: 100,
    leadTime: 15,
    specifications: {
      power: "20W",
      battery: "12 hours",
      connectivity: "Bluetooth 5.0",
      waterproof: "IPX7",
    },
    featured: true,
  },
  {
    id: "2",
    manufacturerId: "1",
    name: "USB-C Fast Charger",
    description:
      "Universal USB-C charger with 65W power delivery and multiple safety protections.",
    category: "Electronics",
    images: ["/api/placeholder/300/300"],
    priceRange: { min: 8, max: 15 },
    moq: 500,
    leadTime: 10,
    specifications: {
      power: "65W",
      ports: "USB-C + USB-A",
      safety: "Over-voltage, Over-current protection",
    },
    featured: false,
  },
  {
    id: "3",
    manufacturerId: "2",
    name: "Organic Cotton T-Shirts",
    description:
      "Premium 100% organic cotton t-shirts available in various colors and sizes.",
    category: "Textiles",
    images: ["/api/placeholder/300/300"],
    priceRange: { min: 12, max: 18 },
    moq: 200,
    leadTime: 20,
    specifications: {
      material: "100% Organic Cotton",
      weight: "180 GSM",
      certification: "GOTS Certified",
    },
    featured: true,
  },
  {
    id: "4",
    manufacturerId: "3",
    name: "Precision CNC Machined Parts",
    description:
      "Custom CNC machined parts for automotive applications with tight tolerances.",
    category: "Automotive",
    images: ["/api/placeholder/300/300"],
    priceRange: { min: 50, max: 200 },
    moq: 50,
    leadTime: 25,
    specifications: {
      material: "Aluminum 6061-T6",
      tolerance: '±0.005"',
      finish: "Anodized",
    },
    featured: false,
  },
];

export const mockInquiries: Inquiry[] = [
  {
    id: "1",
    buyerId: "1",
    manufacturerId: "1",
    productId: "1",
    subject: "Bulk order inquiry for Bluetooth speakers",
    message:
      "Hi, I am interested in ordering 5000 units of your Bluetooth speakers. Can you provide a quote with shipping to New York?",
    status: "open",
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-15T10:30:00Z",
    quantity: 5000,
    targetPrice: 30,
    requiredBy: "2024-03-01",
  },
  {
    id: "2",
    buyerId: "1",
    manufacturerId: "2",
    subject: "Custom textile manufacturing",
    message:
      "Looking for a manufacturer for custom printed t-shirts for our company event.",
    status: "responded",
    createdAt: "2024-01-14T14:20:00Z",
    updatedAt: "2024-01-14T16:45:00Z",
    quantity: 1000,
  },
  {
    id: "3",
    buyerId: "1",
    manufacturerId: "3",
    productId: "4",
    subject: "Automotive parts quotation",
    message:
      "Need quotation for precision machined parts as per attached drawings.",
    status: "closed",
    createdAt: "2024-01-10T09:15:00Z",
    updatedAt: "2024-01-12T11:30:00Z",
    quantity: 500,
  },
];

export const mockMessages: Message[] = [
  {
    id: "1",
    inquiryId: "2",
    senderId: "2",
    message:
      "Thank you for your inquiry. We can definitely help with custom printed t-shirts. What design specifications do you have?",
    timestamp: "2024-01-14T16:45:00Z",
  },
  {
    id: "2",
    inquiryId: "3",
    senderId: "3",
    message:
      "We can manufacture these parts according to your specifications. Please find the detailed quotation attached.",
    timestamp: "2024-01-11T10:20:00Z",
  },
];
