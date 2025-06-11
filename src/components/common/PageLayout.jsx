import React, { Suspense } from "react";

const PageLayout = ({ header: Header, main: Main, footer: Footer }) => {
  return (
    <div className="absolute top-2 bottom-2 left-2 right-2 flex flex-col">
      <header className="p-4 bg-white/70 backdrop-blur-md border border-white shadow-sm text-xl font-semibold text-gray-800 rounded-t-md text-center">
        <Suspense fallback={<div>Loading header...</div>}>{Header}</Suspense>
      </header>
      <div className="flex-1 bg-white/70 backdrop-blur-md border border-white  overflow-y-auto my-0.5">
        <main className="py-4 px-4 space-y-4 text-gray-700">
          <Suspense fallback={<div>Loading content...</div>}>{Main}</Suspense>
        </main>
      </div>

      <footer className="p-2 bg-white/70 backdrop-blur-md border border-white text-center text-gray-800 rounded-b-md flex items-center justify-around">
        <Suspense fallback={<div>Loading footer...</div>}>{Footer}</Suspense>
      </footer>
    </div>
  );
};

export default PageLayout;
