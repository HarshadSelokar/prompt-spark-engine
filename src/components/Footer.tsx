
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-slate-200 dark:border-slate-800 mt-8">
      <div className="container mx-auto px-4 py-6">
        <div className="text-center text-sm text-gray-500 dark:text-gray-400">
          <p>© {new Date().getFullYear()} Prompt Spark Engine. All rights reserved.</p>
          <p className="mt-1">Crafted to enhance your interactions with large language models.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
