"use client"; // Add this line at the top
// Rename the Next.js Image import to avoid conflicts
import NextImage from "next/image";
import { useState, useRef } from "react";
import { FaBars, FaTimes, FaShoppingBag } from 'react-icons/fa';
import { FaUser } from "react-icons/fa6";
import { TbMessageChatbot } from "react-icons/tb";
import Link from "next/link";
export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [inputText, setInputText] = useState('');
  const [imageSrc, setImageSrc] = useState('');
  const [loading, setLoading] = useState(false);
  const [downloadFormat, setDownloadFormat] = useState('png');
  const [isChatbotOpen, setIsChatbotOpen] = useState(false); // State for chatbot modal
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const handleSubscribe = () => {
    alert(`Subscribed with ${email}`);
  };
  const generateImage = async () => {
    setLoading(true);
    const token = "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";
    try {
      const response = await fetch(
        "https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-dev",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({ "inputs": inputText }),
        }
      );
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, details: ${errorText}`);
      }
      const result = await response.blob();
      const objectURL = URL.createObjectURL(result);
      setImageSrc(objectURL);
    } finally {
      setLoading(false);
    }
  };
  const handleDownload = () => {
    if (!imageSrc) return;
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
    image.src = imageSrc;
  };
  const toggleChatbot = () => {
    setIsChatbotOpen(!isChatbotOpen);
  };
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-pink-100 to-white">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-50"
        style={{ backgroundImage: "url('/Images/mainbackground.png')" }}>
      </div>
      <div className="absolute inset-0 bg-black opacity-10"></div>

      <div className="m-10">
        <div className="flex flex-row justify-between z-10">
          <div className="text-black text-3xl flex flex-col font-serif z-10">
            Match Your FIT
            <div className="flex text-base gap-3 z-10">
              <a><p>Home</p></a>
              <p>Men</p>
              <p>Women</p>
              <p>Kids</p>
            </div>
          </div>
          <div className="flex items-center gap-5 z-10">
            <button onClick={toggleMenu} className="ml-4">
              {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
            <button onClick={toggleChatbot} className="flex">
              <TbMessageChatbot size={24} />
            </button>
            <button><FaShoppingBag /></button>
            <button><FaUser /></button>
          </div>
        </div>
        {isMenuOpen && (
          <div className="flex flex-col mt-4 bg-white p-4 shadow-lg z-10">
            <div className="mb-2 z-10">Men</div>
            <div className="mb-2 z-10">Women</div>
            <div className="mb-2 z-10">Kids</div>
            <div className="mb-2 z-10">Traditional</div>
            <div className="mb-2 z-10">Party</div>
          </div>
        )}
      </div>
      <div className="flex text-black align-middle justify-center mt-20 font-serif z-10">
        <div className="flex flex-col">
          <h1 className="text-5xl">All Your Fit Is Here</h1>
          <h6 className="flex align-middle justify-center mt-4 z-10">Your Outfit Speaks Stronger, Choose It Well !!!!!!</h6>
          <div className="flex align-middle justify-center mt-8 z-10">
            <Link href="/findfit">
              <button className="flex box-border box-content bg-black text-white text-sm py-2 px-12 z-10">
                Find Fit
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className="flex m-10 align-middle justify-center flex-grow z-10">
        <div className="flex flex-row bg-white shadow-lg rounded-lg p-2 h-64">
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-4">Welcome</h2>
            <p className="text-lg">Life is too short to wear boring clothes.</p>
          </div>
          <div className="flex-1 flex justify-center items-center">
            <NextImage src="/Images/fashion1.png" alt="Saturn" width={300} height={200} className="rounded-lg" />
          </div>
        </div>
      </div>
      <div className="flex m-7 mt-24 align-middle justify-center z-10">
        <h1 className="text-3xl">Grab the looks</h1>
      </div>
      <canvas ref={canvasRef} style={{ display: 'none' }} />
      {/* Chatbot Pop-up */}
      <div className={`fixed bottom-4 right-4 transition-transform duration-300 ${isChatbotOpen ? 'transform translate-y-0' : 'transform translate-y-full'} z-50`}>
        <button
          onClick={toggleChatbot}
          className="bg-blue-500 text-white p-3 rounded-full shadow-lg"
        >
          <TbMessageChatbot size={24} />
        </button>
        {isChatbotOpen && (
          <div className="bg-white shadow-lg z-10 rounded-lg mt-2 w-80 h-96 overflow-hidden">
            <iframe
              src="https://copilotstudio.microsoft.com/environments/3bd0c546-3479-ee37-947a-994cb68f12d3/bots/cre6d_copilot1/webchat?__version__=2"
              width="100%"
              height="100%"
              title="Chatbot"
              style={{ border: 'none' }}
            />
          </div>
        )}
      </div>
      <div className="flex align-middle justify-center m-5 mb-12 gap-5">
        <div className="text-center h-5">
          <NextImage src="/Images/blazer.png" alt="Blazer" width={200} height={100} className="rounded-sm" />
          <button className="bg-black text-white text-sm py-2 px-6 mt-2 ">BUY NOW</button>
        </div>
        <div className="text-center h-5">
          <NextImage src="/Images/skirt.png" alt="Skirt" width={200} height={100} className="rounded-sm" />
          <button className="bg-black text-white text-sm py-2 px-6 mt-2 ">BUY NOW</button>
        </div>
        <div className="text-center">
          <NextImage src="/Images/sherwani.png" alt="Sherwani" width={200} height={100} className="rounded-sm" />
          <button className="bg-black text-white text-sm py-2 px-6 mt-2 ">BUY NOW</button>
        </div>
        <div className="text-center">
          <NextImage src="/Images/girl.png" alt="Girl Outfit" width={200} height={100} className="rounded-sm" />
          <button className="bg-black text-white text-sm py-2 px-6 mt-2 ">BUY NOW</button>
        </div>
        <div className="text-center">
          <NextImage src="/Images/virat.png" alt="Girl Outfit" width={200} height={100} className="rounded-sm" />
          <button className="bg-black text-white text-sm py-2 px-6 mt-2 ">BUY NOW</button>
        </div>
        <div className="text-center">
          <NextImage src="/Images/blued.png" alt="Girl Outfit" width={200} height={100} className="rounded-sm h-72 w-60" />
          <button className="bg-black text-white text-sm py-2 px-6 mt-2 ">BUY NOW</button>
        </div>
      </div>
      <div className="flex mt-7 font-serif align-middle justify-center mb-9">
        <div className="flex flex-col text-2xl">
          Life isn&apos;t perfect,
          <span className="font-serif"> But your outfit can be</span>
        </div>
      </div>
      <div className="flex m-10 align-middle justify-center flex-grow">
        <div className="flex flex-row bg-white shadow-lg rounded-lg p-2 h-72">
          <div className="flex-1">
            <h2 className="text-2xl font-serif mb-4">Featured</h2>
            <p className="text-lg">Customize your outfit.</p>
          </div>
          <div className="flex-1 flex justify-center items-center">
            <NextImage src="/Images/featured.png" alt="Saturn" width={500} height={500} className="rounded-lg w-5px h-64" />
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center mt-10 p-8 border-4 border-yellow-500 rounded-lg shadow-2xl ">
        <h1 className="text-2xl font-serif mb-4">Generate Your Custom Outfit</h1>
        <h2 className="text-1xl font-serif mb-4">The best you give the prompt</h2>
        <h2 className="text-1xl font-serif mb-4">The best you get the result</h2>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Describe your outfit"
          className="w-96 p-2 border border-gray-400 rounded-md focus:outline-none font-serif"
        />
        <button
          onClick={generateImage}
          className="bg-black text-white text-sm py-2 px-6 mt-4"
        >
          Generate Image
        </button>
        {loading && <p className="mt-4 text-gray-500">Loading...</p>}
        {imageSrc && (
          <div className="mt-6">
            <NextImage src={imageSrc} alt="Generated Outfit" className="rounded-lg" width={300} height={300} />
            <div className="flex justify-center mt-4 gap-4">
              <button className="bg-gray-500 text-white text-sm py-2 px-6">
                Similar Items
              </button>
              <button className="bg-black text-white text-sm py-2 px-6">
                Buy Now
              </button>
            </div>
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
          </div>
        )}
        <canvas ref={canvasRef} width={500} height={200} className="border border-gray-400 hidden"></canvas>
      </div>
      <div className="footer mt-28 mb-9">
        <div className="flex justify-center items-center flex-col">
          <div className="flex flex-col text-center mb-4">
            <h2 className="text-1xl font-serif mb-4">Get 15% off on your next order</h2>
            <h2 className="text-1xl font-serif mb-4">Subscribe to our Newsletter</h2>
          </div>
          <div className="flex items-center font-serif">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email here"
              className="w-96 p-2 border border-gray-400 rounded-3xl-md focus:outline-none font-serif"
            />
            <button
              onClick={handleSubscribe}
              className="bg-black text-white p-2 w-32"
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>
      <div className="flex m-10 mb-20 align-bottom justify-center">
        <div className="flex flex-col text-center">
          <h2 className="text-2xl font-serif mb-4">Match Your FIT</h2>
          <p className="text-start">Ind</p>
        </div>
        <div className="flex flex-col ml-20">
          <h1 className="font-bold mb-6">Connect</h1>
          <p>Instagram</p>
          <p>Facebook</p>
          <p>X</p>
          <p>Whatsapp</p>
        </div>
        <div className="flex flex-col ml-20">
          <h1 className="font-bold mb-6">Resources</h1>
          <p>Return Policy</p>
          <p>Track Your Order</p>
          <p>FAQs</p>
          <p>Privacy Policy</p>
        </div>
        <div className="flex flex-col ml-20">
          <h1 className="font-bold mb-6">About</h1>
          <p>Our Story</p>
          <p>Careers</p>
          <p>Press</p>
        </div>
      </div>
    </div>
  );
}
