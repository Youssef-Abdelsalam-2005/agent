"use client";

import type React from "react";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { User, Palette, Bot, Bell, Shield, LogOut } from "lucide-react";
import CustomInput from "@/components/custom-input";
import { useUser, useClerk } from "@clerk/nextjs";

export default function SettingsContent() {
  const { user, isLoaded } = useUser();
  const { signOut } = useClerk();
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [provider, setProvider] = useState("openai");
  const [model, setModel] = useState("gpt-4");

  const [displayName, setDisplayName] = useState("");
  const primaryEmail = user?.primaryEmailAddress?.emailAddress ?? "";
  const [savingAccount, setSavingAccount] = useState(false);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isLoaded && user) {
      const unsafe =
        (user.unsafeMetadata as Record<string, unknown> | undefined) || {};
      const metadataDisplayName =
        (unsafe["displayName"] as string | undefined) || undefined;
      const nameFromClerk =
        user.fullName ||
        [user.firstName, user.lastName].filter(Boolean).join(" ");
      setDisplayName(metadataDisplayName || nameFromClerk || "");
    }
  }, [isLoaded, user]);

  async function handleSaveAccount() {
    if (!user) return;
    setSavingAccount(true);
    try {
      const existing =
        (user.unsafeMetadata as Record<string, unknown> | undefined) || {};
      await user.update({ unsafeMetadata: { ...existing, displayName } });
    } finally {
      setSavingAccount(false);
    }
  }

  async function handleAvatarChange(file: File) {
    if (!user || !file) return;
    setIsUploadingAvatar(true);
    try {
      await user.setProfileImage({ file });
    } finally {
      setIsUploadingAvatar(false);
    }
  }

  async function handleDeleteAccount() {
    if (!user) return;
    await user.delete();
    await signOut({ redirectUrl: "/" });
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="space-y-8">
        {/* Account Settings (Clerk-powered) */}
        <SettingsSection
          icon={<User className="size-5" />}
          title="Account"
          description="Manage your profile and account information"
        >
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <button
                type="button"
                aria-label="Change profile photo"
                onClick={() => fileInputRef.current?.click()}
                className="group relative h-12 w-12 overflow-hidden rounded-full border border-white/10 focus:outline-none focus:ring-2 focus:ring-white/20 cursor-pointer"
                disabled={isUploadingAvatar}
              >
                {user?.imageUrl ? (
                  <img
                    src={user.imageUrl}
                    alt="Profile"
                    className="h-full w-full object-cover transition group-hover:opacity-90"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-zinc-800 text-xs text-zinc-300">
                    Upload
                  </div>
                )}
                <div className="pointer-events-none absolute inset-0 hidden items-center justify-center bg-black/30 opacity-0 transition group-hover:flex group-hover:opacity-100">
                  <span className="text-[10px] uppercase tracking-wide text-white">
                    {isUploadingAvatar ? "Uploading..." : "Change"}
                  </span>
                </div>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) void handleAvatarChange(f);
                }}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Display Name
              </label>
              <CustomInput
                placeholder="Your name"
                value={displayName}
                onChange={(e) => setDisplayName(e.currentTarget.value)}
                className="h-10 px-0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Email
              </label>
              <CustomInput
                placeholder="email"
                value={primaryEmail}
                readOnly
                className="h-10 px-0 opacity-80"
              />
            </div>
            <Button
              onClick={handleSaveAccount}
              disabled={savingAccount}
              className="bg-orange-500 text-black hover:bg-orange-400"
            >
              {savingAccount ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </SettingsSection>

        {/* Appearance */}
        <SettingsSection
          icon={<Palette className="size-5" />}
          title="Appearance"
          description="Customize the look and feel of your workspace"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-zinc-100 font-medium">Dark Mode</h4>
                <p className="text-sm text-zinc-400">
                  Use dark theme across the application
                </p>
              </div>
              <Switch checked={darkMode} onCheckedChange={setDarkMode} />
            </div>
          </div>
        </SettingsSection>

        {/* AI Agent */}
        <SettingsSection
          icon={<Bot className="size-5" />}
          title="AI Agent"
          description="Configure your AI assistant preferences"
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Provider
              </label>
              <Select value={provider} onValueChange={setProvider}>
                <SelectTrigger className="bg-transparent border-0 border-b border-white/40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-zinc-900 border-white/10">
                  <SelectItem value="openai">OpenAI</SelectItem>
                  <SelectItem value="anthropic">Anthropic</SelectItem>
                  <SelectItem value="xai">xAI (Grok)</SelectItem>
                  <SelectItem value="groq">Groq</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Model
              </label>
              <Select value={model} onValueChange={setModel}>
                <SelectTrigger className="bg-transparent border-0 border-b border-white/40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-zinc-900 border-white/10">
                  {provider === "openai" && (
                    <>
                      <SelectItem value="gpt-4">GPT-4</SelectItem>
                      <SelectItem value="gpt-4-turbo">GPT-4 Turbo</SelectItem>
                      <SelectItem value="gpt-3.5-turbo">
                        GPT-3.5 Turbo
                      </SelectItem>
                    </>
                  )}
                  {provider === "anthropic" && (
                    <>
                      <SelectItem value="claude-3-opus">
                        Claude 3 Opus
                      </SelectItem>
                      <SelectItem value="claude-3-sonnet">
                        Claude 3 Sonnet
                      </SelectItem>
                    </>
                  )}
                  {provider === "xai" && (
                    <SelectItem value="grok-3">Grok 3</SelectItem>
                  )}
                  {provider === "groq" && (
                    <>
                      <SelectItem value="llama-3-70b">Llama 3 70B</SelectItem>
                      <SelectItem value="mixtral-8x7b">Mixtral 8x7B</SelectItem>
                    </>
                  )}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Temperature
              </label>
              <CustomInput
                placeholder="0.7"
                defaultValue="0.7"
                className="h-10 px-0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Max Tokens
              </label>
              <CustomInput
                placeholder="2048"
                defaultValue="2048"
                className="h-10 px-0"
              />
            </div>
          </div>
        </SettingsSection>

        {/* Notifications */}
        <SettingsSection
          icon={<Bell className="size-5" />}
          title="Notifications"
          description="Control how you receive updates and alerts"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-zinc-100 font-medium">
                  Push Notifications
                </h4>
                <p className="text-sm text-zinc-400">
                  Receive notifications about uploads and processing
                </p>
              </div>
              <Switch
                checked={notifications}
                onCheckedChange={setNotifications}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-zinc-100 font-medium">Email Updates</h4>
                <p className="text-sm text-zinc-400">
                  Get weekly summaries of your activity
                </p>
              </div>
              <Switch defaultChecked={false} />
            </div>
          </div>
        </SettingsSection>

        {/* Privacy & Security */}
        <SettingsSection
          icon={<Shield className="size-5" />}
          title="Privacy & Security"
          description="Manage your data and security preferences"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-zinc-100 font-medium">Data Encryption</h4>
                <p className="text-sm text-zinc-400">
                  Encrypt all uploaded files and conversations
                </p>
              </div>
              <Switch defaultChecked={true} />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-zinc-100 font-medium">Analytics</h4>
                <p className="text-sm text-zinc-400">
                  Help improve the product with usage analytics
                </p>
              </div>
              <Switch defaultChecked={true} />
            </div>
            <div className="flex items-center gap-3">
              <Button
                onClick={() => signOut({ redirectUrl: "/" })}
                variant="outline"
                className="border-white/20 text-zinc-300 hover:bg-white/5 bg-transparent"
              >
                <LogOut className="mr-2 h-4 w-4" /> Sign out
              </Button>
              <Button
                onClick={handleDeleteAccount}
                variant="outline"
                className="border-red-500/50 text-red-400 hover:bg-red-500/10 bg-transparent"
              >
                Delete Account
              </Button>
            </div>
          </div>
        </SettingsSection>
        {/* You can add custom flows for email/password/MFA later using Clerk user APIs */}
      </div>
    </div>
  );
}

function SettingsSection({
  icon,
  title,
  description,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-black/20 backdrop-blur rounded-2xl p-6">
      <div className="flex items-start gap-4 mb-6">
        <div className="rounded-lg bg-orange-500/20 p-2 text-orange-400">
          {icon}
        </div>
        <div>
          <h3 className="font-display text-xl text-zinc-100">{title}</h3>
          <p className="text-zinc-400 text-sm mt-1">{description}</p>
        </div>
      </div>
      {children}
    </div>
  );
}
