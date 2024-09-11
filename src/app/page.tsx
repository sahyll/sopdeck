"use client";
import React, { useState, useEffect } from 'react';
import DropCard from '@/components/Cards/DropCard';
import TextCard from '@/components/Cards/TextCard';
import { sopdecker } from '@/lib/sopdecker';

const HomePage = () => {
  const [texts, setTexts] = useState<Array<string>>([]);
  const [processedTexts, setProcessedTexts] = useState<Array<Array<string | number>>>([]);
  
  useEffect(() => {
    console.log("Updated texts array in page.tsx file is:", texts);
    const result = sopdecker(texts);
    setProcessedTexts(result); // Ensure this is a 1D array
  }, [texts]); 

  {console.log("Start of the application from page.tsx, where texts initially is: "+texts)}
  

  return (
    <div className="text-white">
      <DropCard setTexts={setTexts} />
      <div className='my-10 md:px-20 px-5 space-y-10'>
        <TextCard key={0} i={0} t={processedTexts} /> 
      </div>
    </div>
  );
};

export default HomePage;
