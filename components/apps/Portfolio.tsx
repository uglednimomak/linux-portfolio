import React, { useState } from 'react';
import { User, Code2, FolderGit2, Mail, Server, Database, Monitor } from 'lucide-react';

export const PortfolioApp: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'about' | 'skills' | 'projects' | 'contact'>('about');

  const renderContent = () => {
    switch (activeTab) {
      case 'about':
        return (
          <div className="p-8 space-y-4">
             <h2 className="text-3xl font-bold text-gray-800 mb-6">/home/user/about_me.txt</h2>
             <div className="bg-white p-6 rounded shadow-sm border border-gray-200 font-mono text-sm leading-relaxed text-gray-700">
                <p className="mb-4">{`> Hello World!`}</p>
                <p className="mb-4">
                  I am a passionate Full Stack Engineer specializing in modern web technologies.
                  Just like this desktop simulation, I enjoy building complex, interactive interfaces
                  that delight users.
                </p>
                <p>
                  When I'm not coding, I'm likely exploring new Linux distros, contributing to open source,
                  or optimizing my ZSH configuration.
                </p>
             </div>
          </div>
        );
      case 'skills':
        return (
          <div className="p-8 h-full overflow-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Technology Stack</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Frontend Card */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 flex flex-col">
                <div className="flex items-center space-x-3 mb-4 text-[#E95420]">
                  <Monitor size={24} />
                  <h3 className="text-xl font-bold">Frontend</h3>
                </div>
                <ul className="space-y-2 text-gray-600 list-disc list-inside">
                  <li>React / Next.js</li>
                  <li>TypeScript</li>
                  <li>Tailwind CSS</li>
                  <li>Angular</li>
                  <li>Three.js / D3</li>
                </ul>
              </div>

              {/* Backend Card */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 flex flex-col">
                <div className="flex items-center space-x-3 mb-4 text-[#E95420]">
                  <Server size={24} />
                  <h3 className="text-xl font-bold">Backend</h3>
                </div>
                <ul className="space-y-2 text-gray-600 list-disc list-inside">
                  <li>Node.js (Express/Nest)</li>
                  <li>Python (Django/Flask)</li>
                  <li>GoLang</li>
                  <li>REST & GraphQL APIs</li>
                  <li>Microservices</li>
                </ul>
              </div>

              {/* Database & DevOps Card */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 flex flex-col">
                <div className="flex items-center space-x-3 mb-4 text-[#E95420]">
                  <Database size={24} />
                  <h3 className="text-xl font-bold">Data & DevOps</h3>
                </div>
                <ul className="space-y-2 text-gray-600 list-disc list-inside">
                  <li>PostgreSQL, MongoDB</li>
                  <li>Docker & Kubernetes</li>
                  <li>AWS / Google Cloud</li>
                  <li>CI/CD Pipelines</li>
                  <li>Terraform</li>
                </ul>
              </div>

            </div>
          </div>
        );
      case 'projects':
        return (
           <div className="p-8 h-full overflow-auto">
             <h2 className="text-3xl font-bold text-gray-800 mb-6">~/Projects</h2>
             <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-start p-4 bg-white rounded border border-gray-200 hover:border-[#E95420] transition-colors cursor-pointer group">
                    <div className="bg-gray-100 p-3 rounded mr-4">
                      <FolderGit2 className="text-gray-600 group-hover:text-[#E95420]" size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">Project_Alpha_v{i}.0</h3>
                      <p className="text-gray-500 text-sm">A high-performance web application built with scalable architecture in mind.</p>
                      <div className="mt-2 flex gap-2">
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">React</span>
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">Node</span>
                      </div>
                    </div>
                  </div>
                ))}
             </div>
           </div>
        );
      case 'contact':
        return (
          <div className="p-8 h-full">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Connect</h2>
             <div className="bg-white p-6 rounded shadow-sm border border-gray-200 max-w-md">
                <p className="text-gray-600 mb-6">Send a signal through the network.</p>
                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <input type="email" className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-[#E95420] focus:border-transparent outline-none" placeholder="user@example.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                    <textarea className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-[#E95420] focus:border-transparent outline-none h-32" placeholder="Start typing..." />
                  </div>
                  <button className="w-full bg-[#E95420] text-white py-2 rounded hover:bg-[#d84615] transition-colors font-medium">
                    Send Packet
                  </button>
                </form>
             </div>
          </div>
        );
    }
  };

  return (
    <div className="flex h-full font-sans text-gray-900 bg-[#f7f7f7]">
      {/* Sidebar - mimicking GNOME settings/Nautilus sidebar */}
      <div className="w-64 bg-[#f0f0f0] border-r border-gray-300 flex flex-col py-4">
        <div className="px-4 mb-6">
           <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Places</div>
        </div>
        
        <nav className="space-y-1">
          <button
            onClick={() => setActiveTab('about')}
            className={`w-full flex items-center px-6 py-2 text-sm font-medium transition-colors ${
              activeTab === 'about' ? 'bg-[#E95420] text-white' : 'text-gray-700 hover:bg-gray-200'
            }`}
          >
            <User size={18} className="mr-3" />
            About Me
          </button>
          <button
            onClick={() => setActiveTab('skills')}
            className={`w-full flex items-center px-6 py-2 text-sm font-medium transition-colors ${
              activeTab === 'skills' ? 'bg-[#E95420] text-white' : 'text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Code2 size={18} className="mr-3" />
            Core Skills
          </button>
          <button
            onClick={() => setActiveTab('projects')}
            className={`w-full flex items-center px-6 py-2 text-sm font-medium transition-colors ${
              activeTab === 'projects' ? 'bg-[#E95420] text-white' : 'text-gray-700 hover:bg-gray-200'
            }`}
          >
            <FolderGit2 size={18} className="mr-3" />
            Projects
          </button>
          <button
            onClick={() => setActiveTab('contact')}
            className={`w-full flex items-center px-6 py-2 text-sm font-medium transition-colors ${
              activeTab === 'contact' ? 'bg-[#E95420] text-white' : 'text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Mail size={18} className="mr-3" />
            Contact
          </button>
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-hidden bg-slate-50">
        {renderContent()}
      </div>
    </div>
  );
};
