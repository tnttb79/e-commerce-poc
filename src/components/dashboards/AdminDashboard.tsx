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
  Users,
  Building2,
  FileCheck,
  BarChart3,
  Search,
  Filter,
  MoreHorizontal,
  Check,
  X,
  AlertCircle,
  TrendingUp,
  TrendingDown,
  Clock,
  Shield,
  MessageSquare,
  Package,
  Eye,
} from "lucide-react";
import {
  mockManufacturers,
  mockProducts,
  mockInquiries,
  mockUsers,
} from "@/lib/mock-data";
import { formatDate } from "@/lib/utils";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<
    "overview" | "users" | "verification" | "analytics"
  >("overview");
  const [userSearchQuery, setUserSearchQuery] = useState("");

  // Calculate platform statistics
  const stats = {
    totalUsers: mockUsers.length,
    totalManufacturers: mockManufacturers.length,
    verifiedManufacturers: mockManufacturers.filter(
      (m) => m.verificationStatus === "verified"
    ).length,
    pendingVerification: mockManufacturers.filter(
      (m) => m.verificationStatus === "under_review"
    ).length,
    totalProducts: mockProducts.length,
    publishedProducts: mockProducts.filter((p) => p.status === "published")
      .length,
    totalInquiries: mockInquiries.length,
    openInquiries: mockInquiries.filter((i) => i.status === "open").length,
    monthlyGrowth: 12.5,
  };

  const filteredUsers = mockUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(userSearchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(userSearchQuery.toLowerCase()) ||
      (user.company &&
        user.company.toLowerCase().includes(userSearchQuery.toLowerCase()))
  );

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Navigation */}
      <div className='bg-white border-b'>
        <div className='container mx-auto px-4 py-4'>
          <nav className='flex space-x-8'>
            <button
              onClick={() => setActiveTab("overview")}
              className={`pb-2 border-b-2 transition-colors ${
                activeTab === "overview"
                  ? "border-purple-600 text-purple-600 font-medium"
                  : "border-transparent text-gray-600 hover:text-gray-900"
              }`}
            >
              Platform Overview
            </button>
            <button
              onClick={() => setActiveTab("users")}
              className={`pb-2 border-b-2 transition-colors ${
                activeTab === "users"
                  ? "border-purple-600 text-purple-600 font-medium"
                  : "border-transparent text-gray-600 hover:text-gray-900"
              }`}
            >
              User Management
            </button>
            <button
              onClick={() => setActiveTab("verification")}
              className={`pb-2 border-b-2 transition-colors ${
                activeTab === "verification"
                  ? "border-purple-600 text-purple-600 font-medium"
                  : "border-transparent text-gray-600 hover:text-gray-900"
              }`}
            >
              Verification Queue ({stats.pendingVerification})
            </button>
            <button
              onClick={() => setActiveTab("analytics")}
              className={`pb-2 border-b-2 transition-colors ${
                activeTab === "analytics"
                  ? "border-purple-600 text-purple-600 font-medium"
                  : "border-transparent text-gray-600 hover:text-gray-900"
              }`}
            >
              Analytics & Reports
            </button>
          </nav>
        </div>
      </div>

      <div className='container mx-auto px-4 py-8'>
        {activeTab === "overview" && (
          <div>
            <h1 className='text-3xl font-bold text-gray-900 mb-8'>
              Platform Overview
            </h1>

            {/* Key Metrics */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
              <Card>
                <CardContent className='p-6'>
                  <div className='flex items-center justify-between'>
                    <div>
                      <p className='text-sm font-medium text-gray-600'>
                        Total Users
                      </p>
                      <p className='text-3xl font-bold text-gray-900'>
                        {stats.totalUsers}
                      </p>
                      <p className='text-sm text-green-600 flex items-center mt-1'>
                        <TrendingUp className='w-3 h-3 mr-1' />+
                        {stats.monthlyGrowth}% this month
                      </p>
                    </div>
                    <Users className='w-8 h-8 text-blue-600' />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className='p-6'>
                  <div className='flex items-center justify-between'>
                    <div>
                      <p className='text-sm font-medium text-gray-600'>
                        Manufacturers
                      </p>
                      <p className='text-3xl font-bold text-gray-900'>
                        {stats.totalManufacturers}
                      </p>
                      <p className='text-sm text-green-600 flex items-center mt-1'>
                        <Shield className='w-3 h-3 mr-1' />
                        {stats.verifiedManufacturers} verified
                      </p>
                    </div>
                    <Building2 className='w-8 h-8 text-green-600' />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className='p-6'>
                  <div className='flex items-center justify-between'>
                    <div>
                      <p className='text-sm font-medium text-gray-600'>
                        Products Listed
                      </p>
                      <p className='text-3xl font-bold text-gray-900'>
                        {stats.totalProducts}
                      </p>
                      <p className='text-sm text-blue-600 flex items-center mt-1'>
                        <Package className='w-3 h-3 mr-1' />
                        {stats.publishedProducts} published
                      </p>
                    </div>
                    <Package className='w-8 h-8 text-purple-600' />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className='p-6'>
                  <div className='flex items-center justify-between'>
                    <div>
                      <p className='text-sm font-medium text-gray-600'>
                        Active Inquiries
                      </p>
                      <p className='text-3xl font-bold text-gray-900'>
                        {stats.totalInquiries}
                      </p>
                      <p className='text-sm text-orange-600 flex items-center mt-1'>
                        <Clock className='w-3 h-3 mr-1' />
                        {stats.openInquiries} open
                      </p>
                    </div>
                    <MessageSquare className='w-8 h-8 text-orange-600' />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
              <Card>
                <CardHeader>
                  <CardTitle>Recent User Registrations</CardTitle>
                  <CardDescription>
                    Latest users who joined the platform
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className='space-y-3'>
                    {mockUsers.slice(0, 4).map((user) => (
                      <div
                        key={user.id}
                        className='flex items-center justify-between p-3 bg-gray-50 rounded-lg'
                      >
                        <div>
                          <p className='font-medium text-gray-900'>
                            {user.name}
                          </p>
                          <p className='text-sm text-gray-600'>
                            {user.email} • {user.role}
                          </p>
                        </div>
                        <div className='text-right'>
                          {user.company && (
                            <p className='text-sm text-gray-600'>
                              {user.company}
                            </p>
                          )}
                          <p className='text-xs text-gray-500'>
                            {user.location}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Pending Verifications</CardTitle>
                  <CardDescription>
                    Manufacturers awaiting verification
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className='space-y-3'>
                    {mockManufacturers
                      .filter((m) => m.verificationStatus === "under_review")
                      .slice(0, 4)
                      .map((manufacturer) => (
                        <div
                          key={manufacturer.id}
                          className='flex items-center justify-between p-3 bg-orange-50 rounded-lg'
                        >
                          <div>
                            <p className='font-medium text-gray-900'>
                              {manufacturer.name}
                            </p>
                            <p className='text-sm text-gray-600'>
                              {manufacturer.location}
                            </p>
                          </div>
                          <div className='flex items-center space-x-2'>
                            <span className='px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full'>
                              Under Review
                            </span>
                            <Button size='sm'>Review</Button>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeTab === "users" && (
          <div>
            <div className='flex justify-between items-center mb-8'>
              <h1 className='text-3xl font-bold text-gray-900'>
                User Management
              </h1>
              <div className='flex items-center space-x-4'>
                <div className='relative'>
                  <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5' />
                  <input
                    type='text'
                    placeholder='Search users...'
                    value={userSearchQuery}
                    onChange={(e) => setUserSearchQuery(e.target.value)}
                    className='pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent'
                  />
                </div>
                <Button variant='outline'>
                  <Filter className='w-4 h-4 mr-2' />
                  Filters
                </Button>
              </div>
            </div>

            {/* User Stats */}
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-6'>
              {["buyer", "manufacturer", "admin"].map((role) => {
                const count = mockUsers.filter((u) => u.role === role).length;
                return (
                  <Card key={role}>
                    <CardContent className='p-4 text-center'>
                      <div className='text-2xl font-bold text-purple-600'>
                        {count}
                      </div>
                      <div className='text-sm text-gray-600 capitalize'>
                        {role}s
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Users Table */}
            <Card>
              <CardHeader>
                <CardTitle>All Users ({filteredUsers.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className='space-y-3'>
                  {filteredUsers.map((user) => (
                    <div
                      key={user.id}
                      className='flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50'
                    >
                      <div className='flex items-center space-x-4'>
                        <div className='w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center'>
                          <Users className='w-5 h-5 text-gray-400' />
                        </div>
                        <div>
                          <p className='font-medium text-gray-900'>
                            {user.name}
                          </p>
                          <p className='text-sm text-gray-600'>{user.email}</p>
                        </div>
                      </div>
                      <div className='flex items-center space-x-6 text-sm'>
                        <div>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              user.role === "buyer"
                                ? "bg-blue-100 text-blue-800"
                                : user.role === "manufacturer"
                                ? "bg-green-100 text-green-800"
                                : "bg-purple-100 text-purple-800"
                            }`}
                          >
                            {user.role.charAt(0).toUpperCase() +
                              user.role.slice(1)}
                          </span>
                        </div>
                        <div className='text-gray-600'>
                          {user.company && <span>{user.company}</span>}
                          {user.location && <span> • {user.location}</span>}
                        </div>
                        <Button variant='outline' size='sm'>
                          <MoreHorizontal className='w-4 h-4' />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "verification" && (
          <div>
            <h1 className='text-3xl font-bold text-gray-900 mb-8'>
              Verification Queue
            </h1>

            {/* Verification Stats */}
            <div className='grid grid-cols-1 md:grid-cols-4 gap-4 mb-6'>
              <Card>
                <CardContent className='p-4 text-center'>
                  <div className='text-2xl font-bold text-orange-600'>
                    {stats.pendingVerification}
                  </div>
                  <div className='text-sm text-gray-600'>Pending Review</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className='p-4 text-center'>
                  <div className='text-2xl font-bold text-green-600'>
                    {stats.verifiedManufacturers}
                  </div>
                  <div className='text-sm text-gray-600'>Verified</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className='p-4 text-center'>
                  <div className='text-2xl font-bold text-red-600'>
                    {
                      mockManufacturers.filter(
                        (m) => m.verificationStatus === "not_verified"
                      ).length
                    }
                  </div>
                  <div className='text-sm text-gray-600'>Not Verified</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className='p-4 text-center'>
                  <div className='text-2xl font-bold text-gray-600'>
                    {stats.totalManufacturers}
                  </div>
                  <div className='text-sm text-gray-600'>Total</div>
                </CardContent>
              </Card>
            </div>

            {/* Pending Verifications */}
            <Card>
              <CardHeader>
                <CardTitle>Pending Manufacturer Verifications</CardTitle>
                <CardDescription>
                  Review and approve manufacturer applications
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className='space-y-4'>
                  {mockManufacturers
                    .filter((m) => m.verificationStatus === "under_review")
                    .map((manufacturer) => (
                      <div
                        key={manufacturer.id}
                        className='border rounded-lg p-6'
                      >
                        <div className='flex items-start justify-between mb-4'>
                          <div className='flex items-start space-x-4'>
                            <div className='w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center'>
                              <Building2 className='w-8 h-8 text-gray-400' />
                            </div>
                            <div>
                              <h3 className='text-xl font-semibold text-gray-900'>
                                {manufacturer.name}
                              </h3>
                              <p className='text-gray-600 mb-2'>
                                {manufacturer.location}
                              </p>
                              <p className='text-gray-700 max-w-2xl'>
                                {manufacturer.description}
                              </p>
                            </div>
                          </div>
                          <span className='px-3 py-1 bg-orange-100 text-orange-800 text-sm rounded-full'>
                            Under Review
                          </span>
                        </div>

                        <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 pt-4 border-t'>
                          <div>
                            <label className='text-sm font-medium text-gray-600'>
                              Established
                            </label>
                            <p className='text-gray-900'>
                              {manufacturer.established}
                            </p>
                          </div>
                          <div>
                            <label className='text-sm font-medium text-gray-600'>
                              Employee Count
                            </label>
                            <p className='text-gray-900'>
                              {manufacturer.employeeCount}
                            </p>
                          </div>
                          <div>
                            <label className='text-sm font-medium text-gray-600'>
                              Products
                            </label>
                            <p className='text-gray-900'>
                              {manufacturer.totalProducts}
                            </p>
                          </div>
                          <div>
                            <label className='text-sm font-medium text-gray-600'>
                              Specialties
                            </label>
                            <div className='flex flex-wrap gap-1 mt-1'>
                              {manufacturer.specialties
                                .slice(0, 2)
                                .map((specialty, index) => (
                                  <span
                                    key={index}
                                    className='px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded'
                                  >
                                    {specialty}
                                  </span>
                                ))}
                            </div>
                          </div>
                        </div>

                        <div className='flex items-center space-x-3'>
                          <Button
                            size='sm'
                            className='bg-green-600 hover:bg-green-700'
                          >
                            <Check className='w-4 h-4 mr-1' />
                            Approve
                          </Button>
                          <Button
                            variant='outline'
                            size='sm'
                            className='text-red-600 border-red-300 hover:bg-red-50'
                          >
                            <X className='w-4 h-4 mr-1' />
                            Reject
                          </Button>
                          <Button variant='outline' size='sm'>
                            <Eye className='w-4 h-4 mr-1' />
                            Review Documents
                          </Button>
                          <Button variant='outline' size='sm'>
                            <MessageSquare className='w-4 h-4 mr-1' />
                            Request More Info
                          </Button>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "analytics" && (
          <div>
            <h1 className='text-3xl font-bold text-gray-900 mb-8'>
              Analytics & Reports
            </h1>

            {/* Growth Metrics */}
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
              <Card>
                <CardHeader>
                  <CardTitle className='flex items-center space-x-2'>
                    <TrendingUp className='w-5 h-5 text-green-600' />
                    <span>User Growth</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='text-3xl font-bold text-green-600 mb-2'>
                    +{stats.monthlyGrowth}%
                  </div>
                  <p className='text-gray-600'>This month vs last month</p>
                  <div className='mt-4 space-y-2'>
                    <div className='flex justify-between text-sm'>
                      <span>New Buyers:</span>
                      <span className='font-medium'>+23</span>
                    </div>
                    <div className='flex justify-between text-sm'>
                      <span>New Manufacturers:</span>
                      <span className='font-medium'>+12</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className='flex items-center space-x-2'>
                    <MessageSquare className='w-5 h-5 text-blue-600' />
                    <span>Platform Activity</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='text-3xl font-bold text-blue-600 mb-2'>
                    {stats.totalInquiries}
                  </div>
                  <p className='text-gray-600'>Total inquiries sent</p>
                  <div className='mt-4 space-y-2'>
                    <div className='flex justify-between text-sm'>
                      <span>This Week:</span>
                      <span className='font-medium'>47</span>
                    </div>
                    <div className='flex justify-between text-sm'>
                      <span>Avg. Response Time:</span>
                      <span className='font-medium'>4.2 hours</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className='flex items-center space-x-2'>
                    <Package className='w-5 h-5 text-purple-600' />
                    <span>Product Catalog</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='text-3xl font-bold text-purple-600 mb-2'>
                    {stats.totalProducts}
                  </div>
                  <p className='text-gray-600'>Products listed</p>
                  <div className='mt-4 space-y-2'>
                    <div className='flex justify-between text-sm'>
                      <span>Published:</span>
                      <span className='font-medium'>
                        {stats.publishedProducts}
                      </span>
                    </div>
                    <div className='flex justify-between text-sm'>
                      <span>New This Month:</span>
                      <span className='font-medium'>156</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Geographic Distribution */}
            <Card className='mb-6'>
              <CardHeader>
                <CardTitle>Geographic Distribution</CardTitle>
                <CardDescription>
                  Where our manufacturers are located
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                  {[
                    { country: "China", count: 45, percentage: 38 },
                    { country: "India", count: 32, percentage: 27 },
                    { country: "Vietnam", count: 18, percentage: 15 },
                    { country: "Thailand", count: 12, percentage: 10 },
                    { country: "Others", count: 12, percentage: 10 },
                  ].map((item) => (
                    <div key={item.country} className='text-center'>
                      <div className='text-2xl font-bold text-gray-900'>
                        {item.count}
                      </div>
                      <div className='text-sm text-gray-600'>
                        {item.country}
                      </div>
                      <div className='text-xs text-blue-600'>
                        {item.percentage}%
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Category Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle>Product Categories</CardTitle>
                <CardDescription>
                  Distribution of products by category
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
                  {[
                    { category: "Electronics", count: 156, percentage: 42 },
                    { category: "Textiles", count: 89, percentage: 24 },
                    { category: "Automotive", count: 67, percentage: 18 },
                    { category: "Packaging", count: 34, percentage: 9 },
                    { category: "Industrial", count: 23, percentage: 6 },
                    { category: "Others", count: 5, percentage: 1 },
                  ].map((item) => (
                    <div
                      key={item.category}
                      className='flex justify-between items-center p-3 bg-gray-50 rounded-lg'
                    >
                      <div>
                        <p className='font-medium text-gray-900'>
                          {item.category}
                        </p>
                        <p className='text-sm text-gray-600'>
                          {item.count} products
                        </p>
                      </div>
                      <div className='text-right'>
                        <p className='text-lg font-bold text-blue-600'>
                          {item.percentage}%
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
