"use client"

import React from "react"
import {
  Package,
  BarChart3,
  Users,
  Shield,
  Zap,
  CheckCircle,
  ArrowRight,
  Star,
  Menu,
  X,
  ChevronDown,
  GlobeIcon,
} from "lucide-react"

const InventraLanding = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)

  const features = [
    {
      icon: <Package className="w-6 h-6" />,
      title: "Manajemen Stok Real-time",
      description:
        "Pantau stok produk secara real-time dengan notifikasi otomatis untuk stok menipis",
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Analytics & Reporting",
      description:
        "Dashboard analitik komprehensif dengan laporan penjualan dan performa inventori",
    },
    {
      icon: <GlobeIcon className="w-6 h-6" />,
      title: "Access Anywhere",
      description:
        "Kelola tim dengan berbagai tingkat akses dan permission yang dapat dikustomisasi",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Keamanan Data",
      description:
        "Enkripsi end-to-end dan backup otomatis untuk melindungi data bisnis Anda",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Automasi Workflow",
      description:
        "Otomatisasi proses pemesanan, restock, dan transfer antar gudang",
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: "Integrasi Mudah",
      description:
        "Integrasi seamless dengan platform e-commerce dan sistem akuntansi populer",
    },
  ]

  const testimonials = [
    {
      name: "Budi Santoso",
      company: "PT. Maju Bersama",
      text: "Inventra membantu kami mengurangi stok mati hingga 40% dan meningkatkan efisiensi operasional.",
      rating: 5,
    },
    {
      name: "Sari Wijaya",
      company: "Toko Elektronik Jaya",
      text: "Interface yang user-friendly dan fitur analytics yang powerful. Sangat recommended!",
      rating: 5,
    },
    {
      name: "Ahmad Rifai",
      company: "CV. Sentosa Makmur",
      text: "Customer support yang responsif dan sistem yang sangat reliable untuk bisnis kami.",
      rating: 5,
    },
  ]

  const pricingPlans = [
    {
      name: "Starter",
      price: "299,000",
      period: "per bulan",
      description: "Cocok untuk bisnis kecil",
      features: [
        "Hingga 1,000 produk",
        "2 lokasi gudang",
        "Basic analytics",
        "Email support",
        "Mobile app access",
      ],
      popular: false,
    },
    {
      name: "Professional",
      price: "799,000",
      period: "per bulan",
      description: "Untuk bisnis yang berkembang",
      features: [
        "Hingga 10,000 produk",
        "5 lokasi gudang",
        "Advanced analytics",
        "Priority support",
        "API access",
        "Custom reports",
        "Multi-user (10 users)",
      ],
      popular: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "hubungi kami",
      description: "Solusi untuk perusahaan besar",
      features: [
        "Unlimited produk",
        "Unlimited lokasi",
        "AI-powered insights",
        "24/7 phone support",
        "Custom integrations",
        "Dedicated account manager",
        "Unlimited users",
      ],
      popular: false,
    },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                Fitur
              </a>
              <a
                href="#pricing"
                className="text-foreground hover:text-primary transition-colors"
              >
                Harga
              </a>
              <a
                href="#testimonials"
                className="text-foreground hover:text-primary transition-colors"
              >
                Testimoni
              </a>
              <a
                href="#contact"
                className="text-foreground hover:text-primary transition-colors"
              >
                Kontak
              </a>
            </div>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <button className="text-foreground hover:text-primary transition-colors">
                Masuk
              </button>
              <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors">
                Coba Gratis
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-border">
              <div className="flex flex-col space-y-4">
                <a
                  href="#features"
                  className="text-foreground hover:text-primary transition-colors"
                >
                  Fitur
                </a>
                <a
                  href="#pricing"
                  className="text-foreground hover:text-primary transition-colors"
                >
                  Harga
                </a>
                <a
                  href="#testimonials"
                  className="text-foreground hover:text-primary transition-colors"
                >
                  Testimoni
                </a>
                <a
                  href="#contact"
                  className="text-foreground hover:text-primary transition-colors"
                >
                  Kontak
                </a>
                <div className="flex flex-col space-y-2 pt-4 border-t border-border">
                  <button className="text-left text-foreground hover:text-primary transition-colors">
                    Masuk
                  </button>
                  <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors text-left">
                    Coba Gratis
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
              Kelola Inventori dengan
              <span className="block text-primary">Mudah & Efisien</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Inventra adalah solusi SaaS inventory management yang membantu
              bisnis Anda mengelola stok, melacak penjualan, dan mengoptimalkan
              operasional dengan teknologi terdepan.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-primary text-primary-foreground px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary/90 transition-all transform hover:scale-105 flex items-center justify-center">
                Mulai Gratis 14 Hari
                <ArrowRight className="ml-2 w-5 h-5" />
              </button>
              <button className="border border-border px-8 py-4 rounded-lg text-lg font-semibold hover:bg-accent transition-colors">
                Lihat Demo
              </button>
            </div>
            <div className="mt-8 text-sm text-muted-foreground">
              ✓ Tidak perlu kartu kredit ✓ Setup dalam 5 menit ✓ Support 24/7
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Fitur Lengkap untuk Bisnis Modern
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Dapatkan semua tools yang Anda butuhkan untuk mengelola inventori
              dengan efisien
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
              <div className="text-muted-foreground">Bisnis Terdaftar</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">10M+</div>
              <div className="text-muted-foreground">Produk Dikelola</div>
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
              Dipercaya oleh Ribuan Bisnis
            </h2>
            <p className="text-xl text-muted-foreground">
              Lihat apa kata pengguna Inventra tentang pengalaman mereka
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
              Pilih Paket yang Tepat untuk Bisnis Anda
            </h2>
            <p className="text-xl text-muted-foreground">
              Mulai gratis dan upgrade sesuai kebutuhan bisnis Anda
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
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
                      Paling Populer
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
                  {plan.price === "Custom" ? "Hubungi Sales" : "Mulai Sekarang"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Siap untuk Mengoptimalkan Inventori Anda?
          </h2>
          <p className="text-xl opacity-90 mb-8">
            Bergabunglah dengan ribuan bisnis yang sudah merasakan manfaat
            Inventra. Coba gratis sekarang, tidak perlu kartu kredit.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-primary-foreground text-primary px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary-foreground/90 transition-colors">
              Mulai Gratis 14 Hari
            </button>
            <button className="border border-primary-foreground/20 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary-foreground/10 transition-colors">
              Hubungi Sales
            </button>
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
                Solusi inventory management terdepan untuk bisnis modern.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Produk</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Fitur
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
                    Integrasi
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Dokumentasi
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Tutorial
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Kontak
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Perusahaan</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Tentang Kami
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Karir
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
        </div>
      </footer>
    </div>
  )
}

export default InventraLanding
