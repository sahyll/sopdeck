
import React, { useRef, useState } from 'react';
import convertor from '@/lib/convertor';

interface DropCardProps {
  setTexts: React.Dispatch<React.SetStateAction<Array<string>>>;
}

const DropCard = ({ setTexts }: DropCardProps) => {
  const imgInputRef = useRef<HTMLInputElement>(null);
  const [processing, setProcessing] = useState<boolean>(false);

  const openBrowse = () => {
    imgInputRef.current?.click();
  };

  const convert = async (url: string) => {
    if (url) {
      setProcessing(true);
      const txt = await convertor(url);
      if (txt) {
        setTexts((prevTexts) => [...prevTexts, txt]);
        console.log("Second part of the code, wfrom convert function in DropCard.tsx: ", +txt)
      }
      setProcessing(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      convert(url);
    }
  };

  return (
    <div>
      <h2 className="px-5 pt-10 text-center md:text-6xl text-3xl font-[800]">
        Built with {""}
        <span className="bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text">
          Tesseract JS
        </span>
      </h2>
      <input
        type="file"
        ref={imgInputRef}
        required
        hidden
        onChange={handleFileChange}
      />
      <div onClick={openBrowse} className="w-full p-5 cursor-pointer bg-[#181818] min-h-[50vh] rounded-xl flex items-center justify-center">
        <div className="w-full mf:p-20 p-5 flex items-center justify-center">
          <div className="flex items-center justify-center">
            <p className="text-center text-4xl font-[700] text-[#525252]">
              {processing ? "Processing..." : "Click here and select your screenshot <3"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DropCard;
