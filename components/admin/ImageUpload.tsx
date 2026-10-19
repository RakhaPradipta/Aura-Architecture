"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { authFetch } from "@/lib/auth";

interface UploadResponse {
  url: string;
  fileName: string;
  originalName: string;
  size: number;
  contentType: string;
}

interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
}

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  className?: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function ImageUpload({ value, onChange, label = "Image", className = "" }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpload = useCallback(async (file: File) => {
    setError("");
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch(`${API_BASE_URL}/api/upload/image`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("aura_admin_token")}`,
        },
        body: formData,
      });

      const json: ApiResponse<UploadResponse> = await res.json();

      if (!res.ok || !json.data) {
        throw new Error(json.message || "Upload failed");
      }

      onChange(json.data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }, [onChange]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleUpload(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      handleUpload(file);
    }
  };

  const handleRemove = () => {
    onChange("");
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className={className}>
      <label className="label-sm text-ink-600 mb-2 block">{label}</label>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-xs p-2 mb-3">
          {error}
        </div>
      )}

      {/* Preview */}
      {value && (
        <div className="relative mb-3">
          <div className="relative aspect-[16/10] w-full max-w-md overflow-hidden bg-ink-100 border border-ink-950/10">
            <Image
              src={value.startsWith("http") ? value : `${API_BASE_URL}${value}`}
              alt="Preview"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex items-center gap-3 mt-2">
            <span className="text-xs text-ink-500 truncate max-w-xs">{value}</span>
            <button
              type="button"
              onClick={handleRemove}
              className="text-xs text-red-500 hover:text-red-700 transition-colors"
            >
              Remove
            </button>
          </div>
        </div>
      )}

      {/* Upload area */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`border-2 border-dashed p-6 text-center cursor-pointer transition-all ${
          dragOver
            ? "border-blueprint-500 bg-blueprint-50"
            : "border-ink-950/10 hover:border-ink-400"
        }`}
      >
        {uploading ? (
          <div className="text-ink-500 text-sm">Uploading...</div>
        ) : (
          <div>
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              className="mx-auto mb-2 text-ink-300"
            >
              <path
                d="M16 20V8m0 0l-4 4m4-4l4 4M4 24h24"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p className="text-sm text-ink-500">
              Click or drag an image here to upload
            </p>
            <p className="text-xs text-ink-500 mt-1">
              JPG, PNG, WebP, AVIF, GIF — Max 10 MB
            </p>
          </div>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}
