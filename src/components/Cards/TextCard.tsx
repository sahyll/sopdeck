import React from 'react';

interface TextCardProps {
  t: Array<string | number>; // Expect a 1D array
  i: number;
}

const TextCard: React.FC<TextCardProps> = ({ t, i }) => {
  const copyToClipBoard = (txt: string) => {
    navigator.clipboard.writeText(txt);
  };

  // Join array elements into a single string with line breaks
  const textContent = t.map(item => item.toString()).join('\n');

  return (
    <div className=''>
      <div className='flex w-full items-center justify-between mb-5 px-5'>
        <p className='text-xl font-[600]'>
          {`${i + 1}`} SOPs:
        </p>
        <button 
          onClick={() => copyToClipBoard(textContent)}
          className='bg-white text-black md:text-base text-sm rounded-md px-5 py-2 transition-all hover:bg-[#707070]'
        >
          Copy
        </button>
      </div>
      <textarea
        className='outline-none p-5 w-full min-h-[30vh] bg-[#181818] rounded-xl'
        defaultValue={textContent} // Display the text content in the textarea
      ></textarea>
    </div>
  );
};

export default TextCard;
