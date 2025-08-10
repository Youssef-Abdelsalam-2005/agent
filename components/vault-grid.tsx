"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Upload, Plus, FileText, LinkIcon, File } from "lucide-react";
import Image from "next/image";
import CustomInput from "@/components/custom-input";

type VaultItem = {
  id: string;
  name: string;
  type: "image" | "pdf" | "link" | "document" | "other";
  url?: string;
  uploadedAt: Date;
  note?: string;
  preview?: string;
  size?: string;
};

export default function VaultGrid() {
  const [items, setItems] = useState<VaultItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [uploadType, setUploadType] = useState<"file" | "link" | null>(null);
  const [linkUrl, setLinkUrl] = useState("");

  useEffect(() => {
    // Mock vault items with different types
    const mockItems: VaultItem[] = [
      {
        id: "1",
        name: "Project Proposal",
        type: "pdf",
        uploadedAt: new Date(Date.now() - 1000 * 60 * 30),
        note: "Q4 planning document with budget breakdown",
        size: "2.4 MB",
      },
      {
        id: "2",
        name: "Design System",
        type: "image",
        url: "/placeholder.svg?height=400&width=600&text=Design+System+Mockup",
        uploadedAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
        note: "Updated component library mockups",
        size: "1.8 MB",
      },
      {
        id: "3",
        name: "Vercel AI SDK",
        type: "link",
        url: "https://sdk.vercel.ai",
        preview:
          "/placeholder.svg?height=200&width=400&text=Vercel+AI+SDK+Documentation",
        uploadedAt: new Date(Date.now() - 1000 * 60 * 60 * 4),
        note: "AI SDK documentation for reference",
      },
      {
        id: "4",
        name: "Meeting Notes",
        type: "document",
        uploadedAt: new Date(Date.now() - 1000 * 60 * 60 * 6),
        note: "Weekly team sync notes and action items",
        size: "45 KB",
      },
      {
        id: "5",
        name: "Brand Guidelines",
        type: "image",
        url: "/placeholder.svg?height=400&width=600&text=Brand+Guidelines",
        uploadedAt: new Date(Date.now() - 1000 * 60 * 60 * 12),
        note: "Company brand identity and usage guidelines",
        size: "3.2 MB",
      },
      {
        id: "6",
        name: "GitHub Repository",
        type: "link",
        url: "https://github.com/vercel/next.js",
        preview:
          "/placeholder.svg?height=200&width=400&text=Next.js+GitHub+Repository",
        uploadedAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
        note: "Next.js framework repository",
      },
    ];
    setItems(mockItems);
  }, []);

  const filteredItems = items.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.note?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleFileUpload = (files: FileList | null) => {
    if (!files || !files.length) return;

    const newItems: VaultItem[] = Array.from(files).map((file) => {
      const ext = file.name.toLowerCase().split(".").pop() || "";
      const isImage = ["png", "jpg", "jpeg", "gif", "webp", "svg"].includes(
        ext
      );
      const isPdf = ext === "pdf";
      const isDoc = ["doc", "docx", "txt", "md"].includes(ext);

      return {
        id: crypto.randomUUID(),
        name: file.name.replace(/\.[^/.]+$/, ""),
        type: isImage ? "image" : isPdf ? "pdf" : isDoc ? "document" : "other",
        url: isImage ? URL.createObjectURL(file) : undefined,
        uploadedAt: new Date(),
        size: formatFileSize(file.size),
        note: `Uploaded ${file.type || "file"}`,
      };
    });

    setItems((prev) => [...newItems, ...prev]);
    setUploadType(null);
  };

  const handleLinkUpload = () => {
    if (!linkUrl.trim()) return;

    const newItem: VaultItem = {
      id: crypto.randomUUID(),
      name: linkUrl.replace(/^https?:\/\//, "").split("/")[0],
      type: "link",
      url: linkUrl,
      preview: `/placeholder.svg?height=200&width=400&text=${encodeURIComponent(
        linkUrl.split("/")[2] || "Website"
      )}`,
      uploadedAt: new Date(),
      note: "Saved link",
    };

    setItems((prev) => [newItem, ...prev]);
    setLinkUrl("");
    setUploadType(null);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex-1 max-w-2xl">
          <div className="relative">
            {/* <Search className="absolute left-0 top-1/2 -translate-y-1/2 size-5 text-zinc-400" /> */}
            <CustomInput
              placeholder="Search your vault..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className=" h-12 text-lg"
            />
          </div>
        </div>

        <Dialog
          open={uploadType !== null}
          onOpenChange={() => setUploadType(null)}
        >
          <DialogTrigger asChild>
            <Button
              onClick={() => setUploadType("file")}
              className="ml-4 bg-orange-500 text-black hover:bg-orange-400 h-12 px-6"
            >
              <Plus className="mr-2 size-4" />
              Upload
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-zinc-900/95 backdrop-blur border-white/10 text-zinc-100">
            <DialogHeader>
              <DialogTitle className="font-display">
                Upload to Vault
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Button
                  variant="outline"
                  className="h-20 flex-col gap-2 border-white/10 hover:bg-zinc-800/60 bg-transparent"
                  onClick={() => setUploadType("file")}
                >
                  <Upload className="size-6" />
                  Upload Files
                </Button>
                <Button
                  variant="outline"
                  className="h-20 flex-col gap-2 border-white/10 hover:bg-zinc-800/60 bg-transparent"
                  onClick={() => setUploadType("link")}
                >
                  <LinkIcon className="size-6" />
                  Save Link
                </Button>
              </div>

              {uploadType === "file" && (
                <div>
                  <input
                    type="file"
                    multiple
                    onChange={(e) => handleFileUpload(e.target.files)}
                    className="w-full p-3 bg-zinc-800/60 border border-white/10 rounded-lg text-zinc-100"
                  />
                </div>
              )}

              {uploadType === "link" && (
                <div className="space-y-3">
                  <CustomInput
                    placeholder="https://example.com"
                    value={linkUrl}
                    onChange={(e) => setLinkUrl(e.target.value)}
                    className="h-10"
                  />
                  <Button
                    onClick={handleLinkUpload}
                    className="w-full bg-orange-500 text-black hover:bg-orange-400"
                  >
                    Save Link
                  </Button>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Grid */}
      <div className="flex-1 overflow-auto">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
          {filteredItems.map((item) => (
            <VaultItemCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

function VaultItemCard({ item }: { item: VaultItem }) {
  return (
    <div className="group relative overflow-hidden rounded-xl bg-black/20 backdrop-blur hover:bg-black/30 transition-all cursor-pointer">
      <div className="relative aspect-square w-full bg-zinc-900/20 flex items-center justify-center">
        {item.type === "image" && item.url ? (
          <Image
            src={item.url || "/placeholder.svg"}
            alt={item.name}
            fill
            className="object-cover"
          />
        ) : item.type === "link" && item.preview ? (
          <div className="relative w-full h-full">
            <Image
              src={item.preview || "/placeholder.svg"}
              alt={item.name}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <LinkIcon className="size-8 text-white" />
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-zinc-400">
            {item.type === "pdf" ? (
              <FileText className="size-12 mb-2" />
            ) : item.type === "document" ? (
              <File className="size-12 mb-2" />
            ) : (
              <File className="size-12 mb-2" />
            )}
          </div>
        )}
      </div>

      <div className="p-3">
        <h3 className="font-medium text-zinc-100 truncate text-sm">
          {item.name}
        </h3>
        <div className="flex items-center justify-between mt-1">
          <span className="text-xs text-zinc-500 capitalize">{item.type}</span>
          {item.size && (
            <span className="text-xs text-zinc-500">{item.size}</span>
          )}
        </div>
        {item.note && (
          <p className="text-xs text-zinc-400 mt-1 line-clamp-2">{item.note}</p>
        )}
      </div>
    </div>
  );
}

function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return (
    Number.parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i]
  );
}
