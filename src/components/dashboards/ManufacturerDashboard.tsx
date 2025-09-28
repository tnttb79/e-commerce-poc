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
  Package,
  MessageSquare,
  BarChart3,
  Plus,
  Edit3,
  Eye,
  Clock,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Users,
  Star,
  Building,
} from "lucide-react";
import {
  mockManufacturers,
  mockProducts,
  mockInquiries,
  mockUsers,
} from "@/lib/mock-data";
import { formatCurrency, formatDate } from "@/lib/utils";

export default function ManufacturerDashboard() {
  const [activeTab, setActiveTab] = useState<
    "dashboard" | "products" | "inquiries" | "profile"
  >("dashboard");

  const currentUser = mockUsers.find((u) => u.role === "manufacturer");
  const currentManufacturer = mockManufacturers.find(
    (m) => m.name === currentUser?.company
  );
  const manufacturerProducts = mockProducts.filter(
    (p) => p.manufacturerId === currentManufacturer?.id
  );
  const manufacturerInquiries = mockInquiries.filter(
    (i) => i.manufacturerId === currentManufacturer?.id
  );

  const stats = {
    totalProducts: manufacturerProducts.length,
    publishedProducts: manufacturerProducts.filter(
      (p) => p.status === "published"
    ).length,
    draftProducts: manufacturerProducts.filter((p) => p.status === "draft")
      .length,
    totalInquiries: manufacturerInquiries.length,
    openInquiries: manufacturerInquiries.filter((i) => i.status === "open")
      .length,
    respondedInquiries: manufacturerInquiries.filter(
      (i) => i.status === "responded"
    ).length,
    profileCompletion: 85,
    monthlyViews: 1247,
  };

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Navigation */}
      <div className='bg-white border-b'>
        <div className='container mx-auto px-4 py-4'>
          <nav className='flex space-x-8'>
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`pb-2 border-b-2 transition-colors ${
                activeTab === "dashboard"
                  ? "border-green-600 text-green-600 font-medium"
                  : "border-transparent text-gray-600 hover:text-gray-900"
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab("products")}
              className={`pb-2 border-b-2 transition-colors ${
                activeTab === "products"
                  ? "border-green-600 text-green-600 font-medium"
                  : "border-transparent text-gray-600 hover:text-gray-900"
              }`}
            >
              Products ({manufacturerProducts.length})
            </button>
            <button
              onClick={() => setActiveTab("inquiries")}
              className={`pb-2 border-b-2 transition-colors ${
                activeTab === "inquiries"
                  ? "border-green-600 text-green-600 font-medium"
                  : "border-transparent text-gray-600 hover:text-gray-900"
              }`}
            >
              Inquiries ({manufacturerInquiries.length})
            </button>
            <button
              onClick={() => setActiveTab("profile")}
              className={`pb-2 border-b-2 transition-colors ${
                activeTab === "profile"
                  ? "border-green-600 text-green-600 font-medium"
                  : "border-transparent text-gray-600 hover:text-gray-900"
              }`}
            >
              Company Profile
            </button>
          </nav>
        </div>
      </div>

      <div className='container mx-auto px-4 py-8'>
        {activeTab === "dashboard" && (
          <div>
            <div className='flex justify-between items-center mb-8'>
              <div>
                <h1 className='text-3xl font-bold text-gray-900'>
                  Welcome back, {currentManufacturer?.name}
                </h1>
                <p className='text-gray-600 mt-2'>
                  Here's what's happening with your business today
                </p>
              </div>
              <div className='flex items-center space-x-2'>
                {currentManufacturer?.verificationStatus === "verified" && (
                  <span className='px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full'>
                    ✓ Verified Business
                  </span>
                )}
              </div>
            </div>

            {/* KPI Cards */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
              <Card>
                <CardContent className='p-6'>
                  <div className='flex items-center justify-between'>
                    <div>
                      <p className='text-sm font-medium text-gray-600'>
                        Total Products
                      </p>
                      <p className='text-3xl font-bold text-gray-900'>
                        {stats.totalProducts}
                      </p>
                      <p className='text-sm text-green-600 flex items-center mt-1'>
                        <TrendingUp className='w-3 h-3 mr-1' />
                        {stats.publishedProducts} published
                      </p>
                    </div>
                    <Package className='w-8 h-8 text-green-600' />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className='p-6'>
                  <div className='flex items-center justify-between'>
                    <div>
                      <p className='text-sm font-medium text-gray-600'>
                        Open Inquiries
                      </p>
                      <p className='text-3xl font-bold text-gray-900'>
                        {stats.openInquiries}
                      </p>
                      <p className='text-sm text-blue-600 flex items-center mt-1'>
                        <Clock className='w-3 h-3 mr-1' />
                        Need response
                      </p>
                    </div>
                    <MessageSquare className='w-8 h-8 text-blue-600' />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className='p-6'>
                  <div className='flex items-center justify-between'>
                    <div>
                      <p className='text-sm font-medium text-gray-600'>
                        Profile Completion
                      </p>
                      <p className='text-3xl font-bold text-gray-900'>
                        {stats.profileCompletion}%
                      </p>
                      <p className='text-sm text-orange-600 flex items-center mt-1'>
                        <AlertCircle className='w-3 h-3 mr-1' />
                        15% remaining
                      </p>
                    </div>
                    <BarChart3 className='w-8 h-8 text-orange-600' />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className='p-6'>
                  <div className='flex items-center justify-between'>
                    <div>
                      <p className='text-sm font-medium text-gray-600'>
                        Monthly Views
                      </p>
                      <p className='text-3xl font-bold text-gray-900'>
                        {stats.monthlyViews.toLocaleString()}
                      </p>
                      <p className='text-sm text-green-600 flex items-center mt-1'>
                        <TrendingUp className='w-3 h-3 mr-1' />
                        +12% from last month
                      </p>
                    </div>
                    <Eye className='w-8 h-8 text-purple-600' />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
              <Card>
                <CardHeader>
                  <CardTitle>Recent Inquiries</CardTitle>
                  <CardDescription>
                    Latest buyer inquiries requiring your attention
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className='space-y-4'>
                    {manufacturerInquiries.slice(0, 3).map((inquiry) => (
                      <div
                        key={inquiry.id}
                        className='flex items-center justify-between p-3 bg-gray-50 rounded-lg'
                      >
                        <div>
                          <p className='font-medium text-gray-900'>
                            {inquiry.subject}
                          </p>
                          <p className='text-sm text-gray-600'>
                            {formatDate(inquiry.createdAt)}
                          </p>
                        </div>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
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
                    ))}
                  </div>
                  <Button variant='outline' className='w-full mt-4'>
                    View All Inquiries
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Product Performance</CardTitle>
                  <CardDescription>
                    Your top performing products this month
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className='space-y-4'>
                    {manufacturerProducts.slice(0, 3).map((product) => (
                      <div
                        key={product.id}
                        className='flex items-center justify-between p-3 bg-gray-50 rounded-lg'
                      >
                        <div>
                          <p className='font-medium text-gray-900'>
                            {product.name}
                          </p>
                          <p className='text-sm text-gray-600'>
                            {formatCurrency(product.priceRange.min)} -{" "}
                            {formatCurrency(product.priceRange.max)}
                          </p>
                        </div>
                        <div className='text-right'>
                          <p className='text-sm font-medium text-green-600'>
                            {Math.floor(Math.random() * 50) + 10} views
                          </p>
                          <p className='text-xs text-gray-500'>
                            {Math.floor(Math.random() * 5) + 1} inquiries
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button variant='outline' className='w-full mt-4'>
                    View All Products
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeTab === "products" && (
          <div>
            <div className='flex justify-between items-center mb-8'>
              <h1 className='text-3xl font-bold text-gray-900'>
                Product Catalog
              </h1>
              <Button className='flex items-center space-x-2'>
                <Plus className='w-4 h-4' />
                <span>Add New Product</span>
              </Button>
            </div>

            {/* Product Stats */}
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-6'>
              <Card>
                <CardContent className='p-4 text-center'>
                  <div className='text-2xl font-bold text-green-600'>
                    {stats.publishedProducts}
                  </div>
                  <div className='text-sm text-gray-600'>Published</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className='p-4 text-center'>
                  <div className='text-2xl font-bold text-orange-600'>
                    {stats.draftProducts}
                  </div>
                  <div className='text-sm text-gray-600'>Drafts</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className='p-4 text-center'>
                  <div className='text-2xl font-bold text-blue-600'>
                    {stats.totalProducts}
                  </div>
                  <div className='text-sm text-gray-600'>Total</div>
                </CardContent>
              </Card>
            </div>

            {/* Products List */}
            <div className='space-y-4'>
              {manufacturerProducts.map((product) => (
                <Card key={product.id}>
                  <CardContent className='p-6'>
                    <div className='flex items-start justify-between'>
                      <div className='flex items-start space-x-4'>
                        <div className='w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center'>
                          <Package className='w-6 h-6 text-gray-400' />
                        </div>
                        <div>
                          <div className='flex items-center space-x-2 mb-2'>
                            <h3 className='text-xl font-semibold text-gray-900'>
                              {product.name}
                            </h3>
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${
                                product.status === "published"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-orange-100 text-orange-800"
                              }`}
                            >
                              {product.status.charAt(0).toUpperCase() +
                                product.status.slice(1)}
                            </span>
                            {product.featured && (
                              <span className='px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full'>
                                Featured
                              </span>
                            )}
                          </div>
                          <p className='text-gray-600 mb-3 max-w-2xl'>
                            {product.description}
                          </p>
                          <div className='flex items-center space-x-6 text-sm text-gray-600'>
                            <span>
                              Category:{" "}
                              <span className='font-medium'>
                                {product.category}
                              </span>
                            </span>
                            <span>
                              Price:{" "}
                              <span className='font-medium'>
                                {formatCurrency(product.priceRange.min)} -{" "}
                                {formatCurrency(product.priceRange.max)}
                              </span>
                            </span>
                            <span>
                              MOQ:{" "}
                              <span className='font-medium'>
                                {product.moq} units
                              </span>
                            </span>
                            <span>
                              Lead Time:{" "}
                              <span className='font-medium'>
                                {product.leadTime} days
                              </span>
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className='flex items-center space-x-2'>
                        <Button variant='outline' size='sm'>
                          <Edit3 className='w-4 h-4 mr-1' />
                          Edit
                        </Button>
                        <Button variant='outline' size='sm'>
                          <Eye className='w-4 h-4 mr-1' />
                          View
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === "inquiries" && (
          <div>
            <h1 className='text-3xl font-bold text-gray-900 mb-8'>
              Buyer Inquiries
            </h1>

            {/* Inquiry Stats */}
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-6'>
              <Card>
                <CardContent className='p-4 text-center'>
                  <div className='text-2xl font-bold text-blue-600'>
                    {stats.openInquiries}
                  </div>
                  <div className='text-sm text-gray-600'>Open</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className='p-4 text-center'>
                  <div className='text-2xl font-bold text-green-600'>
                    {stats.respondedInquiries}
                  </div>
                  <div className='text-sm text-gray-600'>Responded</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className='p-4 text-center'>
                  <div className='text-2xl font-bold text-gray-600'>
                    {stats.totalInquiries}
                  </div>
                  <div className='text-sm text-gray-600'>Total</div>
                </CardContent>
              </Card>
            </div>

            {/* Inquiries List */}
            <div className='space-y-4'>
              {manufacturerInquiries.map((inquiry) => {
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
                          <div className='flex items-center space-x-4 text-sm text-gray-600 mb-3'>
                            <span>From: Buyer #{inquiry.buyerId}</span>
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

                      <p className='text-gray-700 mb-4'>{inquiry.message}</p>

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

                      <div className='flex items-center space-x-2'>
                        {inquiry.status === "open" ? (
                          <Button size='sm'>
                            <MessageSquare className='w-4 h-4 mr-1' />
                            Reply to Inquiry
                          </Button>
                        ) : (
                          <Button variant='outline' size='sm'>
                            View Conversation
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === "profile" && (
          <div>
            <h1 className='text-3xl font-bold text-gray-900 mb-8'>
              Company Profile
            </h1>

            {currentManufacturer && (
              <div className='space-y-6'>
                <Card>
                  <CardHeader>
                    <CardTitle>Basic Information</CardTitle>
                    <CardDescription>
                      Your company's public profile information
                    </CardDescription>
                  </CardHeader>
                  <CardContent className='space-y-4'>
                    <div className='flex items-center justify-between'>
                      <div className='flex items-center space-x-4'>
                        <div className='w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center'>
                          <Building className='w-8 h-8 text-gray-400' />
                        </div>
                        <div>
                          <h3 className='text-xl font-semibold'>
                            {currentManufacturer.name}
                          </h3>
                          <p className='text-gray-600'>
                            {currentManufacturer.location}
                          </p>
                        </div>
                      </div>
                      <Button variant='outline'>
                        <Edit3 className='w-4 h-4 mr-2' />
                        Edit Profile
                      </Button>
                    </div>

                    <div className='grid grid-cols-2 gap-4 pt-4 border-t'>
                      <div>
                        <label className='text-sm font-medium text-gray-600'>
                          Established
                        </label>
                        <p className='text-gray-900'>
                          {currentManufacturer.established}
                        </p>
                      </div>
                      <div>
                        <label className='text-sm font-medium text-gray-600'>
                          Employee Count
                        </label>
                        <p className='text-gray-900'>
                          {currentManufacturer.employeeCount}
                        </p>
                      </div>
                      <div>
                        <label className='text-sm font-medium text-gray-600'>
                          Rating
                        </label>
                        <div className='flex items-center space-x-1'>
                          <Star className='w-4 h-4 text-yellow-500 fill-current' />
                          <span className='text-gray-900'>
                            {currentManufacturer.rating}
                          </span>
                        </div>
                      </div>
                      <div>
                        <label className='text-sm font-medium text-gray-600'>
                          Verification Status
                        </label>
                        <span
                          className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                            currentManufacturer.verificationStatus ===
                            "verified"
                              ? "bg-green-100 text-green-800"
                              : currentManufacturer.verificationStatus ===
                                "under_review"
                              ? "bg-orange-100 text-orange-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {currentManufacturer.verificationStatus === "verified"
                            ? "✓ Verified"
                            : currentManufacturer.verificationStatus ===
                              "under_review"
                            ? "Under Review"
                            : "Not Verified"}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Company Description</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className='text-gray-700 mb-4'>
                      {currentManufacturer.description}
                    </p>
                    <div className='flex flex-wrap gap-2'>
                      {currentManufacturer.specialties.map(
                        (specialty, index) => (
                          <span
                            key={index}
                            className='px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full'
                          >
                            {specialty}
                          </span>
                        )
                      )}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Performance Metrics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                      <div className='text-center'>
                        <div className='text-2xl font-bold text-blue-600'>
                          {currentManufacturer.responseRate}%
                        </div>
                        <div className='text-sm text-gray-600'>
                          Response Rate
                        </div>
                      </div>
                      <div className='text-center'>
                        <div className='text-2xl font-bold text-blue-600'>
                          {currentManufacturer.responseTime}
                        </div>
                        <div className='text-sm text-gray-600'>
                          Response Time
                        </div>
                      </div>
                      <div className='text-center'>
                        <div className='text-2xl font-bold text-blue-600'>
                          {currentManufacturer.totalProducts}
                        </div>
                        <div className='text-sm text-gray-600'>
                          Total Products
                        </div>
                      </div>
                      <div className='text-center'>
                        <div className='text-2xl font-bold text-blue-600'>
                          {stats.monthlyViews}
                        </div>
                        <div className='text-sm text-gray-600'>
                          Monthly Views
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
