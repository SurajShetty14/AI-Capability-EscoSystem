"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-1">Manage your account settings and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="pt-6">
              <nav className="space-y-2">
                <a href="#general" className="block px-3 py-2 rounded-lg bg-primary-50 text-primary-600 font-medium">
                  General
                </a>
                <a href="#profile" className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100">
                  Profile
                </a>
                <a href="#team" className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100">
                  Team
                </a>
                <a href="#notifications" className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100">
                  Notifications
                </a>
                <a href="#security" className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100">
                  Security
                </a>
              </nav>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* General Settings */}
          <Card id="general">
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Manage your organization settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="org-name">Organization Name</Label>
                <Input id="org-name" placeholder="Your Organization" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="timezone">Time Zone</Label>
                <Input id="timezone" placeholder="UTC" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="language">Language</Label>
                <Input id="language" placeholder="English" />
              </div>
              <Separator />
              <Button>Save Changes</Button>
            </CardContent>
          </Card>

          {/* Profile Settings */}
          <Card id="profile">
            <CardHeader>
              <CardTitle>Profile Settings</CardTitle>
              <CardDescription>Update your personal information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="John Doe" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="john@example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" placeholder="+1 (555) 123-4567" />
              </div>
              <Separator />
              <Button>Save Changes</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

