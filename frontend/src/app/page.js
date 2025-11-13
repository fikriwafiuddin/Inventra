import { auth } from "@clerk/nextjs/server"

import {
  Package,
  BarChart3,
  Shield,
  Zap,
  CheckCircle,
  Star,
  GlobeIcon,
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import MobileNavigation from "@/components/MobileNavigation"

const features = [
  {
    icon: <Package className="w-6 h-6" />,
    title: "Real-time Stock Management",
    description:
      "Monitor product stock in real time and get automatic low-stock alerts",
  },
  {
    icon: <BarChart3 className="w-6 h-6" />,
    title: "Analytics & Reporting",
    description:
      "Comprehensive analytics dashboard with sales and inventory performance reports",
  },
  {
    icon: <GlobeIcon className="w-6 h-6" />,
    title: "Access Anywhere",
    description: "Manage and monitoring your business from anywhere",
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Data Security",
    description:
      "Encrypted storage and automated backups to protect your business data",
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Workflow Automation",
    description:
      "Automate purchase orders, restocking, and transfers between locations",
  },
  {
    icon: <CheckCircle className="w-6 h-6" />,
    title: "Easy Integrations",
    description:
      "Seamless integrations with popular e‑commerce platforms and accounting systems",
  },
]

const testimonials = [
  {
    name: "Budi Santoso",
    company: "PT. Maju Bersama",
    text: "Inventra helped us reduce dead stock by 40% and improved our operational efficiency.",
    rating: 5,
  },
  {
    name: "Sari Wijaya",
    company: "Toko Elektronik Jaya",
    text: "User-friendly interface and powerful analytics features. Highly recommended!",
    rating: 5,
  },
  {
    name: "Ahmad Rifai",
    company: "CV. Sentosa Makmur",
    text: "Responsive customer support and a very reliable system for our business.",
    rating: 5,
  },
]

const pricingPlans = [
  {
    name: "Starter",
    price: "299,000",
    period: "per month",
    description: "Good for small businesses",
    features: [
      "Up to 1,000 products",
      "2 warehouse locations",
      "Basic analytics",
      "Email support",
      "Mobile app access",
    ],
    popular: false,
  },
  {
    name: "Professional",
    price: "799,000",
    period: "per month",
    description: "For growing businesses",
    features: [
      "Up to 10,000 products",
      "5 warehouse locations",
      "Advanced analytics",
      "Priority support",
      "API access",
      "Custom reports",
      "Multi-user (up to 10 users)",
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "contact us",
    description: "Solutions for large organizations",
    features: [
      "Unlimited products",
      "Unlimited locations",
      "AI-powered insights",
      "24/7 phone support",
      "Custom integrations",
      "Dedicated account manager",
      "Unlimited users",
    ],
    popular: false,
  },
]

async function InventraLanding() {
  const { userId } = await auth()

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Package className="w-8 h-8 text-primary mr-2" />
              <span className="text-2xl font-bold text-primary">Inventra</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#features"
                className="text-foreground hover:text-primary transition-colors"
              >
                Features
              </a>
              <a
                href="#pricing"
                className="text-foreground hover:text-primary transition-colors"
              >
                Pricing
              </a>
              <a
                href="#testimonials"
                className="text-foreground hover:text-primary transition-colors"
              >
                Testimonials
              </a>
              <a
                href="#contact"
                className="text-foreground hover:text-primary transition-colors"
              >
                Contact
              </a>
            </div>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              {userId ? (
                <Link href="/dashboard" passHref>
                  <Button>Dashboard</Button>
                </Link>
              ) : (
                <>
                  <Link href="/auth/sign-up" passHref>
                    <Button variant="ghost">Sign-up</Button>
                  </Link>
                  <Link href="/auth/sign-in" passHref>
                    <Button>Sign-in</Button>
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <MobileNavigation />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
              Manage Inventory
              <span className="block text-primary">Easily & Efficiently</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Inventra is a straightforward inventory management app that helps
              small and medium businesses manage stock, track sales, and
              streamline operations — honestly presented and easy to use.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {userId ? (
                <Link href="/dashboard" passHref>
                  <Button size="lg" className="px-8 py-4 text-lg">
                    Dashboard
                  </Button>
                </Link>
              ) : (
                <>
                  <Link href="/auth/sign-up" passHref>
                    <Button
                      size="lg"
                      className="px-8 py-4 text-lg font-semibold"
                      variant="ghost"
                    >
                      Sign-up
                    </Button>
                  </Link>
                  <Link href="/auth/sign-in" passHref>
                    <Button
                      size="lg"
                      className="px-8 py-4 text-lg font-semibold"
                    >
                      Sign-in
                    </Button>
                  </Link>
                </>
              )}
            </div>
            <div className="mt-8 text-sm text-muted-foreground">
              ✓ No credit card required ✓ Setup in minutes ✓ 100% free to use
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Powerful Features for Modern Businesses
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Get the essential tools you need to manage inventory efficiently.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all hover:border-primary/20"
              >
                <div className="flex items-center mb-4">
                  <div className="bg-primary/10 text-primary p-3 rounded-lg mr-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">5000+</div>
              <div className="text-muted-foreground">Businesses Registered</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">10M+</div>
              <div className="text-muted-foreground">Products Managed</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">99.9%</div>
              <div className="text-muted-foreground">Uptime</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">24/7</div>
              <div className="text-muted-foreground">Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Trusted by Businesses
            </h2>
            <p className="text-xl text-muted-foreground">
              See what Inventra users say about their experience
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-xl p-6"
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-yellow-500 fill-current"
                    />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 italic">
                  &quot;{testimonial.text}&quot;
                </p>
                <div>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.company}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Choose the Right Plan
            </h2>
            <p className="text-xl text-muted-foreground">
              Start free — 100% free to use
            </p>
          </div>

          {/* <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <div
                key={index}
                className={`bg-card border rounded-xl p-8 relative ${
                  plan.popular
                    ? "border-primary shadow-lg scale-105"
                    : "border-border"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-muted-foreground mb-4">
                    {plan.description}
                  </p>
                  <div className="mb-4">
                    <span className="text-4xl font-bold">
                      {plan.price === "Custom" ? "Custom" : `Rp ${plan.price}`}
                    </span>
                    {plan.price !== "Custom" && (
                      <span className="text-muted-foreground">
                        {" "}
                        / {plan.period}
                      </span>
                    )}
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                    plan.popular
                      ? "bg-primary text-primary-foreground hover:bg-primary/90"
                      : "border border-border hover:bg-accent"
                  }`}
                >
                  {plan.price === "Custom" ? "Contact Sales" : "Get Started"}
                </button>
              </div>
            ))}
          </div> */}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Ready to Optimize Your Inventory?
          </h2>
          <p className="text-xl opacity-90 mb-8">
            Join thousands of businesses using Inventra. Try it now — 100% free
            to use, no credit card required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {userId ? (
              <Link href="/dashboard" passHref>
                <Button
                  variant="secondary"
                  size="lg"
                  className="px-8 py-4 text-lg"
                >
                  Dashboard
                </Button>
              </Link>
            ) : (
              <>
                <Link href="/auth/sign-up" passHref>
                  <Button
                    size="lg"
                    className="px-8 py-4 text-lg font-semibold"
                    variant="secondary"
                  >
                    Sign-up
                  </Button>
                </Link>
                <Link href="/auth/sign-in" passHref>
                  <Button
                    variant="secondary"
                    size="lg"
                    className="px-8 py-4 text-lg font-semibold"
                  >
                    Sign-in
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Package className="w-8 h-8 text-primary mr-2" />
                <span className="text-2xl font-bold text-primary">
                  Inventra
                </span>
              </div>
              <p className="text-muted-foreground mb-4">
                A straightforward inventory management solution for modern
                businesses.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    API
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Integrations
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Tutorials
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Press Kit
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center">
            <p className="text-muted-foreground text-sm">
              © 2025 Inventra. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 sm:mt-0">
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                Terms of Service
              </a>
            </div>
          </div>

          <p className="text-muted-foreground text-sm text-right">v1.0.0</p>
        </div>
      </footer>
    </div>
  )
}

export default InventraLanding
