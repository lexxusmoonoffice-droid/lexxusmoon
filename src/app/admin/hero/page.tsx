"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import Image from "next/image";

interface HeroSection {
  _id: string;
  images: string[];
  intervalMs: number;
  isActive: boolean;
}

export default function HeroAdminPage() {
  const router = useRouter();
  const [heroSection, setHeroSection] = useState<HeroSection | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [newImageUrl, setNewImageUrl] = useState("");
  const [intervalMs, setIntervalMs] = useState(5000);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchHeroSection();
  }, []);

  const fetchHeroSection = async () => {
    try {
      setLoading(true);
      const response = await api.get("/hero");
      setHeroSection(response.data);
      setImages(response.data.images);
      setIntervalMs(response.data.intervalMs);
      setError("");
    } catch (err) {
      setError("Failed to fetch hero section data");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddImage = async () => {
    if (!newImageUrl.trim()) {
      setError("Please enter an image URL");
      return;
    }

    try {
      setError("");
      setSuccess("");
      await api.post("/hero/add-images", { images: [newImageUrl] });
      setImages([...images, newImageUrl]);
      setNewImageUrl("");
      setSuccess("Image added successfully!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to add image");
    }
  };

  const handleRemoveImage = async (imageUrl: string) => {
    try {
      setError("");
      setSuccess("");
      await api.post("/hero/remove-image", { imageUrl });
      setImages(images.filter((img) => img !== imageUrl));
      setSuccess("Image removed successfully!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to remove image");
    }
  };

  const handleUpdateInterval = async () => {
    try {
      setError("");
      setSuccess("");
      await api.put("/hero", { images, intervalMs });
      setSuccess("Interval updated successfully!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to update interval");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white">
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-[#D4A843]">Hero Section Management</h1>

        {/* Error and Success Messages */}
        {error && (
          <div className="mb-6 p-4 bg-red-600/20 border border-red-500 rounded-lg text-red-300">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-6 p-4 bg-green-600/20 border border-green-500 rounded-lg text-green-300">
            {success}
          </div>
        )}

        {/* Add New Image Section */}
        <div className="mb-10 p-6 bg-gray-900 rounded-lg border border-gray-700">
          <h2 className="text-2xl font-bold mb-4">Add New Image</h2>
          <div className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Enter image URL"
              value={newImageUrl}
              onChange={(e) => setNewImageUrl(e.target.value)}
              className="px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#D4A843]"
              onKeyPress={(e) => e.key === "Enter" && handleAddImage()}
            />
            <button
              onClick={handleAddImage}
              className="px-6 py-3 bg-[#D4A843] text-black font-semibold rounded-lg hover:bg-[#c9983a] transition-colors w-full"
            >
              Add Image
            </button>
          </div>
        </div>

        {/* Interval Control Section */}
        <div className="mb-10 p-6 bg-gray-900 rounded-lg border border-gray-700">
          <h2 className="text-2xl font-bold mb-4">Carousel Interval</h2>
          <div className="flex flex-col md:flex-row gap-4 items-end">
            <div className="flex-1">
              <label className="block text-sm font-semibold mb-2">Interval (milliseconds)</label>
              <input
                type="number"
                min="1000"
                step="1000"
                value={intervalMs}
                onChange={(e) => setIntervalMs(Number(e.target.value))}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-[#D4A843]"
              />
            </div>
            <button
              onClick={handleUpdateInterval}
              className="px-6 py-3 bg-[#D4A843] text-black font-semibold rounded-lg hover:bg-[#c9983a] transition-colors"
            >
              Update Interval
            </button>
          </div>
        </div>

        {/* Current Images Section */}
        <div className="p-6 bg-gray-900 rounded-lg border border-gray-700">
          <h2 className="text-2xl font-bold mb-6">Current Hero Images ({images.length})</h2>

          {images.length === 0 ? (
            <p className="text-gray-400">No images in hero carousel. Add some to get started!</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {images.map((img, idx) => (
                <div key={idx} className="group relative bg-gray-800 rounded-lg overflow-hidden">
                  <div className="relative w-full h-48">
                    <Image
                      src={img}
                      alt={`Hero image ${idx + 1}`}
                      fill
                      className="object-cover group-hover:opacity-75 transition-opacity"
                    />
                  </div>
                  <div className="p-4 flex flex-col gap-2">
                    <p className="text-sm text-gray-300 truncate">{img}</p>
                    <button
                      onClick={() => handleRemoveImage(img)}
                      className="px-4 py-2 bg-red-600/80 text-white font-semibold rounded-lg hover:bg-red-600 transition-colors text-sm"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
