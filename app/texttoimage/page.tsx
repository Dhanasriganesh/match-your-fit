"use client"; // Mark the component as a Client Component

import Image from "next/image";
import { useState, useRef } from "react";
import { FaBars, FaTimes, FaShoppingBag } from 'react-icons/fa';
import { FaHeart, FaUser } from "react-icons/fa6";

async function query(data: any) {
  const response = await fetch(
    "https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-dev",
    {
      headers: {
        "Authorization": "Bearer hf_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    }
  );
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const result = await response.blob();
  return result;
}

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [userText, setUserText] = useState('');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [downloadFormat, setDownloadFormat] = useState('png'); // Added for format selection
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSubscribe = () => {
    alert(`Subscribed with ${email}`);
  };

  const handleTextToImage = async () => {
    setLoading(true);
    setError(null);
    setImageUrl(null);

    try {
      const response = await query({ "inputs": userText });
      const url = URL.createObjectURL(response);
      setImageUrl(url);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!imageUrl) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const image = new Image();
    image.crossOrigin = 'anonymous';
    image.onload = () => {
      canvas.width = image.width;
      canvas.height = image.height;
      ctx.drawImage(image, 0, 0);

      // Download the image in the selected format
      const link = document.createElement('a');
      link.href = canvas.toDataURL(`image/${downloadFormat}`);
      link.download = `generated-image.${downloadFormat}`;
      link.click();
    };
    image.src = imageUrl;
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-pink-100 to-white">
      {/* Your existing layout and other elements here */}

      <div className="flex m-10 align-middle justify-center flex-grow">
        <div className="flex flex-row bg-white shadow-lg rounded-lg p-2 max-w-lg w-full">
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-4">Welcome</h2>
            <p className="text-lg">Life is too short to wear boring clothes.</p>
          </div>
          <div className="flex-1 flex justify-center items-center">
            <Image src="/Images/fashion1.png" alt="Saturn" width={300} height={200} className="rounded-lg" />
          </div>
        </div>
      </div>

      {/* Add the Text-to-Image section here */}
      <div className="flex m-10 align-middle justify-center flex-grow">
        <div className="flex flex-col">
          <input
            type="text"
            value={userText}
            onChange={(e) => setUserText(e.target.value)}
            placeholder="Enter text to convert to image"
            className="w-full p-2 border border-gray-400 rounded-md mb-4"
          />
          <button
            onClick={handleTextToImage}
            className="bg-black text-white p-2 mb-4"
          >
            Convert to Image
          </button>
          {loading && <p>Loading...</p>}
          {error && <p>Error: {error}</p>}
          {imageUrl && (
            <>
              <Image src={imageUrl} alt="Generated" width={500} height={300} />
              <div className="mt-4">
                <label htmlFor="format" className="mr-2">Choose format:</label>
                <select
                  id="format"
                  value={downloadFormat}
                  onChange={(e) => setDownloadFormat(e.target.value)}
                  className="p-2 border border-gray-400 rounded-md mb-4"
                >
                  <option value="png">PNG</option>
                  <option value="jpeg">JPG</option>
                </select>
                <button
                  onClick={handleDownload}
                  className="bg-blue-500 text-white p-2 rounded-md ml-2"
                >
                  Download Image
                </button>
              </div>
            </>
          )}
          <canvas ref={canvasRef} width={500} height={200} className="border border-gray-400 hidden"></canvas>
        </div>
      </div>

      {/* Your existing footer and other elements here */}
    </div>
  );
}
