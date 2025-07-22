"use client";

import { createClientSideSupabase } from "@/lib/supabase";

export async function uploadImageToSupabase(file: File): Promise<string> {
  const supabase = createClientSideSupabase();

  try {
    // Validate file
    if (!file) {
      throw new Error("No file provided");
    }

    // Validate file type
    if (!file.type.startsWith("image/")) {
      throw new Error("File must be an image");
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      throw new Error("File size must be less than 5MB");
    }

    // Generate a unique filename
    const fileExt = file.name.split(".").pop();
    const fileName = `${Math.random()
      .toString(36)
      .substring(2)}_${Date.now()}.${fileExt}`;
    const filePath = fileName; // Remove 'projects/' prefix as bucket name is already 'projects'

    console.log("Uploading file:", {
      fileName: file.name,
      size: file.size,
      type: file.type,
    });

    // Upload file to Supabase storage
    const { error } = await supabase.storage
      .from("projects")
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      console.error("Storage upload error:", error);
      throw new Error(`Upload failed: ${error.message}`);
    }

    // Get the public URL
    const {
      data: { publicUrl },
    } = supabase.storage.from("projects").getPublicUrl(filePath);

    console.log("Upload successful:", publicUrl);
    return publicUrl;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw new Error("Failed to upload image");
  }
}
