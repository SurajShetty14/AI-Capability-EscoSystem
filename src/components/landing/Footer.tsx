"use client"

import Link from "next/link"

const footerLinks = {
  Product: [
    { name: "Assessment Builder", href: "#" },
    { name: "DSA Coding Tests", href: "#" },
    { name: "Cloud Labs", href: "#" },
    { name: "AI/ML Challenges", href: "#" },
  ],
  Solutions: [
    { name: "For Recruiters", href: "#" },
    { name: "For Engineering Teams", href: "#" },
    { name: "For HR Departments", href: "#" },
    { name: "For Enterprises", href: "#" },
  ],
  Resources: [
    { name: "Documentation", href: "#" },
    { name: "API Reference", href: "#" },
    { name: "Blog", href: "#" },
    { name: "Case Studies", href: "#" },
  ],
  Company: [
    { name: "About Us", href: "#" },
    { name: "Careers", href: "#" },
    { name: "Contact", href: "#" },
    { name: "Privacy Policy", href: "#" },
    { name: "Terms of Service", href: "#" },
  ],
}

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Logo and Description */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">AI</span>
              </div>
              <span className="font-bold text-xl text-white">AssessAI</span>
            </div>
            <p className="text-sm text-gray-400">
              AI-powered technical assessments for modern teams.
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-white font-semibold mb-4">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-400 hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} AssessAI. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a
              href="#"
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              Twitter
            </a>
            <a
              href="#"
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="#"
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

