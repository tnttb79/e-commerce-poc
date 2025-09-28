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
  Building2,
  ShoppingCart,
  Shield,
  Globe,
  Users,
  Award,
} from "lucide-react";

// Import the different dashboard components (we'll create these next)
import BuyerDashboard from "@/components/dashboards/BuyerDashboard";
import ManufacturerDashboard from "@/components/dashboards/ManufacturerDashboard";
import AdminDashboard from "@/components/dashboards/AdminDashboard";

type UserRole = "buyer" | "manufacturer" | "admin" | null;

export default function Home() {
  const [selectedRole, setSelectedRole] = useState<UserRole>(null);

  if (selectedRole) {
    return (
      <div className='min-h-screen'>
        {/* Header with role switcher */}
        <header className='border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60'>
          <div className='container mx-auto px-4 py-4 flex items-center justify-between'>
            <div className='flex items-center space-x-3'>
              <Globe className='w-8 h-8 text-blue-600' />
              <h1 className='text-2xl font-bold text-gray-900'>
                Tuan Pham Logistic
              </h1>
            </div>
            <div className='flex items-center space-x-4'>
              <span className='text-sm text-gray-600'>Viewing as:</span>
              <div className='flex space-x-2'>
                <Button
                  variant={selectedRole === "buyer" ? "default" : "outline"}
                  size='sm'
                  onClick={() => setSelectedRole("buyer")}
                >
                  Buyer
                </Button>
                <Button
                  variant={
                    selectedRole === "manufacturer" ? "default" : "outline"
                  }
                  size='sm'
                  onClick={() => setSelectedRole("manufacturer")}
                >
                  Manufacturer
                </Button>
                <Button
                  variant={selectedRole === "admin" ? "default" : "outline"}
                  size='sm'
                  onClick={() => setSelectedRole("admin")}
                >
                  Admin
                </Button>
              </div>
              <Button
                variant='ghost'
                size='sm'
                onClick={() => setSelectedRole(null)}
              >
                Back to Home
              </Button>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main>
          {selectedRole === "buyer" && <BuyerDashboard />}
          {selectedRole === "manufacturer" && <ManufacturerDashboard />}
          {selectedRole === "admin" && <AdminDashboard />}
        </main>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50'>
      {/* Hero Section */}
      <div className='relative overflow-hidden'>
        <div className='absolute inset-0 bg-grid-pattern opacity-5'></div>
        <div className='relative container mx-auto px-4 py-20'>
          <div className='text-center max-w-4xl mx-auto'>
            <div className='flex justify-center mb-6'>
              <Globe className='w-16 h-16 text-blue-600' />
            </div>
            <h1 className='text-5xl md:text-6xl font-bold text-gray-900 mb-6'>
              Global Manufacturer
              <span className='text-blue-600'> Marketplace</span>
            </h1>
            <p className='text-xl text-gray-600 mb-12 leading-relaxed'>
              Connect buyers with verified manufacturers worldwide. Streamline
              sourcing, manage inquiries, and build trusted business
              relationships.
            </p>

            {/* Stats */}
            <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mb-16'>
              <div className='text-center'>
                <div className='text-3xl font-bold text-blue-600'>10K+</div>
                <div className='text-gray-600'>Verified Manufacturers</div>
              </div>
              <div className='text-center'>
                <div className='text-3xl font-bold text-blue-600'>500K+</div>
                <div className='text-gray-600'>Products Listed</div>
              </div>
              <div className='text-center'>
                <div className='text-3xl font-bold text-blue-600'>150+</div>
                <div className='text-gray-600'>Countries Served</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Role Selection Section */}
      <div className='container mx-auto px-4 py-16'>
        <div className='text-center mb-12'>
          <h2 className='text-3xl font-bold text-gray-900 mb-4'>
            Choose Your Role to Explore the Platform
          </h2>
          <p className='text-lg text-gray-600'>
            Experience the marketplace from different perspectives
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto'>
          {/* Buyer Card */}
          <Card className='relative overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 hover:border-blue-200'>
            <CardHeader className='pb-4'>
              <div className='w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto'>
                <ShoppingCart className='w-8 h-8 text-blue-600' />
              </div>
              <CardTitle className='text-center text-2xl'>
                Buyer Dashboard
              </CardTitle>
              <CardDescription className='text-center'>
                Discover and connect with manufacturers worldwide
              </CardDescription>
            </CardHeader>
            <CardContent className='pt-0'>
              <ul className='space-y-3 mb-6'>
                <li className='flex items-center text-sm text-gray-600'>
                  <div className='w-2 h-2 bg-blue-600 rounded-full mr-3'></div>
                  Search global manufacturers
                </li>
                <li className='flex items-center text-sm text-gray-600'>
                  <div className='w-2 h-2 bg-blue-600 rounded-full mr-3'></div>
                  Browse product catalogs
                </li>
                <li className='flex items-center text-sm text-gray-600'>
                  <div className='w-2 h-2 bg-blue-600 rounded-full mr-3'></div>
                  Send RFQ inquiries
                </li>
                <li className='flex items-center text-sm text-gray-600'>
                  <div className='w-2 h-2 bg-blue-600 rounded-full mr-3'></div>
                  Manage communications
                </li>
              </ul>
              <Button
                onClick={() => setSelectedRole("buyer")}
                className='w-full'
                size='lg'
              >
                Explore Buyer View
              </Button>
            </CardContent>
          </Card>

          {/* Manufacturer Card */}
          <Card className='relative overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 hover:border-green-200'>
            <CardHeader className='pb-4'>
              <div className='w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 mx-auto'>
                <Building2 className='w-8 h-8 text-green-600' />
              </div>
              <CardTitle className='text-center text-2xl'>
                Manufacturer Dashboard
              </CardTitle>
              <CardDescription className='text-center'>
                Showcase your products and manage business inquiries
              </CardDescription>
            </CardHeader>
            <CardContent className='pt-0'>
              <ul className='space-y-3 mb-6'>
                <li className='flex items-center text-sm text-gray-600'>
                  <div className='w-2 h-2 bg-green-600 rounded-full mr-3'></div>
                  Manage product catalog
                </li>
                <li className='flex items-center text-sm text-gray-600'>
                  <div className='w-2 h-2 bg-green-600 rounded-full mr-3'></div>
                  Handle buyer inquiries
                </li>
                <li className='flex items-center text-sm text-gray-600'>
                  <div className='w-2 h-2 bg-green-600 rounded-full mr-3'></div>
                  Track business metrics
                </li>
                <li className='flex items-center text-sm text-gray-600'>
                  <div className='w-2 h-2 bg-green-600 rounded-full mr-3'></div>
                  Build company profile
                </li>
              </ul>
              <Button
                onClick={() => setSelectedRole("manufacturer")}
                className='w-full bg-green-600 hover:bg-green-700'
                size='lg'
              >
                Explore Manufacturer View
              </Button>
            </CardContent>
          </Card>

          {/* Admin Card */}
          <Card className='relative overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 hover:border-purple-200'>
            <CardHeader className='pb-4'>
              <div className='w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4 mx-auto'>
                <Shield className='w-8 h-8 text-purple-600' />
              </div>
              <CardTitle className='text-center text-2xl'>
                Admin Dashboard
              </CardTitle>
              <CardDescription className='text-center'>
                Oversee platform operations and user management
              </CardDescription>
            </CardHeader>
            <CardContent className='pt-0'>
              <ul className='space-y-3 mb-6'>
                <li className='flex items-center text-sm text-gray-600'>
                  <div className='w-2 h-2 bg-purple-600 rounded-full mr-3'></div>
                  Manage user accounts
                </li>
                <li className='flex items-center text-sm text-gray-600'>
                  <div className='w-2 h-2 bg-purple-600 rounded-full mr-3'></div>
                  Verify manufacturers
                </li>
                <li className='flex items-center text-sm text-gray-600'>
                  <div className='w-2 h-2 bg-purple-600 rounded-full mr-3'></div>
                  Monitor platform metrics
                </li>
                <li className='flex items-center text-sm text-gray-600'>
                  <div className='w-2 h-2 bg-purple-600 rounded-full mr-3'></div>
                  Handle support issues
                </li>
              </ul>
              <Button
                onClick={() => setSelectedRole("admin")}
                className='w-full bg-purple-600 hover:bg-purple-700'
                size='lg'
              >
                Explore Admin View
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Features Section */}
      <div className='bg-white py-16'>
        <div className='container mx-auto px-4'>
          <div className='text-center mb-12'>
            <h3 className='text-3xl font-bold text-gray-900 mb-4'>
              Platform Features
            </h3>
            <p className='text-lg text-gray-600'>
              Everything you need for global trade
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            <div className='text-center'>
              <Users className='w-12 h-12 text-blue-600 mx-auto mb-4' />
              <h4 className='text-xl font-semibold mb-2'>Global Network</h4>
              <p className='text-gray-600'>
                Connect with verified manufacturers and buyers worldwide
              </p>
            </div>
            <div className='text-center'>
              <Award className='w-12 h-12 text-blue-600 mx-auto mb-4' />
              <h4 className='text-xl font-semibold mb-2'>Verified Partners</h4>
              <p className='text-gray-600'>
                All manufacturers go through rigorous verification process
              </p>
            </div>
            <div className='text-center'>
              <Shield className='w-12 h-12 text-blue-600 mx-auto mb-4' />
              <h4 className='text-xl font-semibold mb-2'>
                Secure Transactions
              </h4>
              <p className='text-gray-600'>
                Safe and secure platform for all your business needs
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className='bg-gray-900 text-white py-12'>
        <div className='container mx-auto px-4 text-center'>
          <div className='flex justify-center items-center mb-4'>
            <Globe className='w-8 h-8 text-blue-400 mr-3' />
            <span className='text-2xl font-bold'>Global Marketplace POC</span>
          </div>
          <p className='text-gray-400'>
            A proof of concept for connecting buyers and manufacturers worldwide
          </p>
        </div>
      </footer>
    </div>
  );
}
