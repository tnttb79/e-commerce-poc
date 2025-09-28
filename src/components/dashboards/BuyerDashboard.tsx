"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Search,
  Filter,
  MapPin,
  Star,
  Clock,
  Users,
  Building,
  Package,
  MessageSquare,
  Plus,
  Eye,
} from "lucide-react";
import {
  mockManufacturers,
  mockProducts,
  mockInquiries,
  mockUsers,
} from "@/lib/mock-data";
import { formatCurrency, formatDate } from "@/lib/utils";

export default function BuyerDashboard() {
  const [activeTab, setActiveTab] = useState<
    "discover" | "inquiries" | "messages"
  >("discover");
  const [selectedManufacturer, setSelectedManufacturer] = useState<
    string | null
  >(null);
  const [searchQuery, setSearchQuery] = useState("");

  const currentUser = mockUsers.find((u) => u.role === "buyer");
  const userInquiries = mockInquiries.filter(
    (i) => i.buyerId === currentUser?.id
  );

  const filteredManufacturers = mockManufacturers.filter(
    (manufacturer) =>
      manufacturer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      manufacturer.description
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      manufacturer.specialties.some((s) =>
        s.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Navigation */}
      <div className='bg-white border-b'>
        <div className='container mx-auto px-4 py-4'>
          <nav className='flex space-x-8'>
            <button
              onClick={() => setActiveTab("discover")}
              className={`pb-2 border-b-2 transition-colors ${
                activeTab === "discover"
                  ? "border-blue-600 text-blue-600 font-medium"
                  : "border-transparent text-gray-600 hover:text-gray-900"
              }`}
            >
              Discover & Search
            </button>
            <button
              onClick={() => setActiveTab("inquiries")}
              className={`pb-2 border-b-2 transition-colors ${
                activeTab === "inquiries"
                  ? "border-blue-600 text-blue-600 font-medium"
                  : "border-transparent text-gray-600 hover:text-gray-900"
              }`}
            >
              My Inquiries ({userInquiries.length})
            </button>
            <button
              onClick={() => setActiveTab("messages")}
              className={`pb-2 border-b-2 transition-colors ${
                activeTab === "messages"
                  ? "border-blue-600 text-blue-600 font-medium"
                  : "border-transparent text-gray-600 hover:text-gray-900"
              }`}
            >
              Messages
            </button>
          </nav>
        </div>
      </div>

      <div className='container mx-auto px-4 py-8'>
        {activeTab === "discover" && (
          <div>
            {/* Search Header */}
            <div className='mb-8'>
              <h1 className='text-3xl font-bold text-gray-900 mb-4'>
                Discover Manufacturers
              </h1>
              <div className='flex flex-col md:flex-row gap-4'>
                <div className='flex-1 relative'>
                  <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5' />
                  <input
                    type='text'
                    placeholder='Search manufacturers, products, or specialties...'
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                  />
                </div>
                <Button
                  variant='outline'
                  className='flex items-center space-x-2'
                >
                  <Filter className='w-4 h-4' />
                  <span>Filters</span>
                </Button>
              </div>
            </div>

            {selectedManufacturer ? (
              // Manufacturer Detail View
              <div>
                <Button
                  variant='outline'
                  onClick={() => setSelectedManufacturer(null)}
                  className='mb-6'
                >
                  ← Back to Search
                </Button>

                {(() => {
                  const manufacturer = mockManufacturers.find(
                    (m) => m.id === selectedManufacturer
                  )!;
                  const manufacturerProducts = mockProducts.filter(
                    (p) => p.manufacturerId === selectedManufacturer
                  );

                  return (
                    <div className='space-y-6'>
                      {/* Manufacturer Header */}
                      <Card>
                        <CardContent className='p-6'>
                          <div className='flex items-start justify-between'>
                            <div className='flex items-start space-x-4'>
                              <div className='w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center'>
                                <Building className='w-8 h-8 text-gray-400' />
                              </div>
                              <div>
                                <h1 className='text-3xl font-bold text-gray-900 mb-2'>
                                  {manufacturer.name}
                                </h1>
                                <div className='flex items-center space-x-4 text-gray-600 mb-3'>
                                  <div className='flex items-center space-x-1'>
                                    <MapPin className='w-4 h-4' />
                                    <span>{manufacturer.location}</span>
                                  </div>
                                  <div className='flex items-center space-x-1'>
                                    <Star className='w-4 h-4 text-yellow-500 fill-current' />
                                    <span>{manufacturer.rating}</span>
                                  </div>
                                  {manufacturer.verificationStatus ===
                                    "verified" && (
                                    <span className='px-2 py-1 bg-green-100 text-green-800 text-sm rounded-full'>
                                      ✓ Verified
                                    </span>
                                  )}
                                </div>
                                <p className='text-gray-700 max-w-2xl'>
                                  {manufacturer.description}
                                </p>
                              </div>
                            </div>
                            <Button
                              size='lg'
                              className='flex items-center space-x-2'
                            >
                              <MessageSquare className='w-4 h-4' />
                              <span>Send Inquiry</span>
                            </Button>
                          </div>

                          <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t'>
                            <div className='text-center'>
                              <div className='text-2xl font-bold text-blue-600'>
                                {manufacturer.totalProducts}
                              </div>
                              <div className='text-gray-600 text-sm'>
                                Products
                              </div>
                            </div>
                            <div className='text-center'>
                              <div className='text-2xl font-bold text-blue-600'>
                                {manufacturer.responseRate}%
                              </div>
                              <div className='text-gray-600 text-sm'>
                                Response Rate
                              </div>
                            </div>
                            <div className='text-center'>
                              <div className='text-2xl font-bold text-blue-600'>
                                {manufacturer.responseTime}
                              </div>
                              <div className='text-gray-600 text-sm'>
                                Response Time
                              </div>
                            </div>
                            <div className='text-center'>
                              <div className='text-2xl font-bold text-blue-600'>
                                {manufacturer.established}
                              </div>
                              <div className='text-gray-600 text-sm'>
                                Established
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Products */}
                      <Card>
                        <CardHeader>
                          <CardTitle>
                            Products ({manufacturerProducts.length})
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                            {manufacturerProducts.map((product) => (
                              <div
                                key={product.id}
                                className='border rounded-lg p-4'
                              >
                                <div className='w-full h-48 bg-gray-200 rounded-lg mb-4 flex items-center justify-center'>
                                  <Package className='w-12 h-12 text-gray-400' />
                                </div>
                                <h3 className='font-semibold text-gray-900 mb-2'>
                                  {product.name}
                                </h3>
                                <p className='text-gray-600 text-sm mb-3 line-clamp-2'>
                                  {product.description}
                                </p>
                                <div className='space-y-2 text-sm'>
                                  <div className='flex justify-between'>
                                    <span className='text-gray-600'>
                                      Price Range:
                                    </span>
                                    <span className='font-medium'>
                                      {formatCurrency(product.priceRange.min)} -{" "}
                                      {formatCurrency(product.priceRange.max)}
                                    </span>
                                  </div>
                                  <div className='flex justify-between'>
                                    <span className='text-gray-600'>MOQ:</span>
                                    <span className='font-medium'>
                                      {product.moq} units
                                    </span>
                                  </div>
                                  <div className='flex justify-between'>
                                    <span className='text-gray-600'>
                                      Lead Time:
                                    </span>
                                    <span className='font-medium'>
                                      {product.leadTime} days
                                    </span>
                                  </div>
                                </div>
                                <Button className='w-full mt-4' size='sm'>
                                  Inquire Now
                                </Button>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  );
                })()}
              </div>
            ) : (
              // Manufacturers Grid
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {filteredManufacturers.map((manufacturer) => (
                  <Card
                    key={manufacturer.id}
                    className='hover:shadow-lg transition-shadow cursor-pointer'
                  >
                    <CardContent className='p-6'>
                      <div className='flex items-start space-x-3 mb-4'>
                        <div className='w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0'>
                          <Building className='w-6 h-6 text-gray-400' />
                        </div>
                        <div className='min-w-0 flex-1'>
                          <h3 className='font-semibold text-gray-900 mb-1'>
                            {manufacturer.name}
                          </h3>
                          <div className='flex items-center space-x-2 text-sm text-gray-600 mb-2'>
                            <MapPin className='w-3 h-3' />
                            <span>{manufacturer.location}</span>
                            {manufacturer.verificationStatus === "verified" && (
                              <span className='px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full'>
                                ✓ Verified
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <p className='text-gray-600 text-sm mb-4 line-clamp-3'>
                        {manufacturer.description}
                      </p>

                      <div className='space-y-2 text-sm mb-4'>
                        <div className='flex justify-between'>
                          <span className='text-gray-600'>Products:</span>
                          <span className='font-medium'>
                            {manufacturer.totalProducts}
                          </span>
                        </div>
                        <div className='flex justify-between'>
                          <span className='text-gray-600'>Rating:</span>
                          <div className='flex items-center space-x-1'>
                            <Star className='w-3 h-3 text-yellow-500 fill-current' />
                            <span className='font-medium'>
                              {manufacturer.rating}
                            </span>
                          </div>
                        </div>
                        <div className='flex justify-between'>
                          <span className='text-gray-600'>Response Time:</span>
                          <span className='font-medium'>
                            {manufacturer.responseTime}
                          </span>
                        </div>
                      </div>

                      <div className='flex space-x-2'>
                        <Button
                          variant='outline'
                          size='sm'
                          className='flex-1'
                          onClick={() =>
                            setSelectedManufacturer(manufacturer.id)
                          }
                        >
                          <Eye className='w-3 h-3 mr-1' />
                          View Profile
                        </Button>
                        <Button size='sm' className='flex-1'>
                          <MessageSquare className='w-3 h-3 mr-1' />
                          Inquire
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "inquiries" && (
          <div>
            <div className='flex justify-between items-center mb-8'>
              <h1 className='text-3xl font-bold text-gray-900'>My Inquiries</h1>
              <Button className='flex items-center space-x-2'>
                <Plus className='w-4 h-4' />
                <span>New Inquiry</span>
              </Button>
            </div>

            <div className='space-y-4'>
              {userInquiries.map((inquiry) => {
                const manufacturer = mockManufacturers.find(
                  (m) => m.id === inquiry.manufacturerId
                );
                const product = inquiry.productId
                  ? mockProducts.find((p) => p.id === inquiry.productId)
                  : null;

                return (
                  <Card key={inquiry.id}>
                    <CardContent className='p-6'>
                      <div className='flex justify-between items-start mb-4'>
                        <div>
                          <h3 className='font-semibold text-gray-900 mb-2'>
                            {inquiry.subject}
                          </h3>
                          <div className='flex items-center space-x-4 text-sm text-gray-600'>
                            <span>To: {manufacturer?.name}</span>
                            {product && <span>Product: {product.name}</span>}
                            <span>{formatDate(inquiry.createdAt)}</span>
                          </div>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            inquiry.status === "open"
                              ? "bg-blue-100 text-blue-800"
                              : inquiry.status === "responded"
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {inquiry.status.charAt(0).toUpperCase() +
                            inquiry.status.slice(1)}
                        </span>
                      </div>

                      <p className='text-gray-700 mb-4 line-clamp-2'>
                        {inquiry.message}
                      </p>

                      {inquiry.quantity && (
                        <div className='flex items-center space-x-6 text-sm text-gray-600 mb-4'>
                          <span>
                            Quantity:{" "}
                            <span className='font-medium'>
                              {inquiry.quantity.toLocaleString()} units
                            </span>
                          </span>
                          {inquiry.targetPrice && (
                            <span>
                              Target Price:{" "}
                              <span className='font-medium'>
                                {formatCurrency(inquiry.targetPrice)}
                              </span>
                            </span>
                          )}
                          {inquiry.requiredBy && (
                            <span>
                              Required By:{" "}
                              <span className='font-medium'>
                                {formatDate(inquiry.requiredBy)}
                              </span>
                            </span>
                          )}
                        </div>
                      )}

                      <Button variant='outline' size='sm'>
                        View Details
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === "messages" && (
          <div>
            <h1 className='text-3xl font-bold text-gray-900 mb-8'>Messages</h1>

            <Card>
              <CardContent className='p-8 text-center'>
                <MessageSquare className='w-12 h-12 text-gray-400 mx-auto mb-4' />
                <h3 className='text-lg font-semibold text-gray-900 mb-2'>
                  No Messages Yet
                </h3>
                <p className='text-gray-600 mb-4'>
                  Your conversations with manufacturers will appear here
                </p>
                <Button>Start Your First Inquiry</Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
