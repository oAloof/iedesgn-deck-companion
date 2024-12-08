import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronDown, ChevronUp, Dices, Book, User, Swords, Trophy } from 'lucide-react';

const RuleSection = ({ title, icon: Icon, children, isOpen, onToggle }) => {
  return (
    <div className="border-b border-gray-200 last:border-0">
      <button
        onClick={onToggle}
        className="w-full px-4 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors duration-150"
      >
        <div className="flex items-center gap-3">
          <Icon size={24} className="text-blue-600" />
          <span className="font-semibold text-lg text-gray-800">{title}</span>
        </div>
        {isOpen ? (
          <ChevronUp size={20} className="text-gray-500" />
        ) : (
          <ChevronDown size={20} className="text-gray-500" />
        )}
      </button>
      {isOpen && (
        <div className="px-4 pb-4 pt-2 text-gray-600 space-y-3 animate-fadeIn">
          {children}
        </div>
      )}
    </div>
  );
};

const Rulebook = () => {
  const [openSections, setOpenSections] = useState(new Set(['gameSetup']));

  const toggleSection = (sectionId) => {
    setOpenSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(sectionId)) {
        newSet.delete(sectionId);
      } else {
        newSet.add(sectionId);
      }
      return newSet;
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Mobile-friendly header */}
      <header className="w-full bg-white shadow-sm p-4 flex items-center justify-between sticky top-0 z-10">
        <Link 
          to="/"
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
        >
          <ChevronLeft size={24} />
          <span className="text-lg font-medium">Back to Game</span>
        </Link>
        <div className="flex items-center gap-2 text-blue-600">
          <Book size={24} />
          <span className="text-lg font-medium">Rulebook</span>
        </div>
      </header>

      <div className="flex-1 max-w-2xl mx-auto w-full bg-white shadow-md my-4 rounded-lg overflow-hidden">
        {/* Quick nav buttons */}
        <div className="grid grid-cols-2 gap-2 p-4 bg-gray-50 border-b border-gray-200">
          <button
            onClick={() => setOpenSections(new Set(['gameSetup', 'basicRules', 'gameplay', 'winning']))}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
          >
            Expand All
          </button>
          <button
            onClick={() => setOpenSections(new Set())}
            className="px-4 py-2 rounded-lg bg-gray-600 text-white font-medium hover:bg-gray-700 transition-colors"
          >
            Collapse All
          </button>
        </div>

        {/* Rule sections */}
        <div className="divide-y divide-gray-200">
          <RuleSection 
            title="Game Setup" 
            icon={Dices}
            isOpen={openSections.has('gameSetup')}
            onToggle={() => toggleSection('gameSetup')}
          >
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>
            <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
          </RuleSection>

          <RuleSection 
            title="Basic Rules" 
            icon={Book}
            isOpen={openSections.has('basicRules')}
            onToggle={() => toggleSection('basicRules')}
          >
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Excepteur sint occaecat cupidatat non proident</li>
              <li>Sunt in culpa qui officia deserunt mollit</li>
              <li>Anim id est laborum et dolorum fuga</li>
            </ul>
          </RuleSection>

          <RuleSection 
            title="Gameplay" 
            icon={Swords}
            isOpen={openSections.has('gameplay')}
            onToggle={() => toggleSection('gameplay')}
          >
            <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis.</p>
            <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>
          </RuleSection>

          <RuleSection 
            title="Winning the Game" 
            icon={Trophy}
            isOpen={openSections.has('winning')}
            onToggle={() => toggleSection('winning')}
          >
            <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi.</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Sint occaecat cupidatat non proident</li>
              <li>Sunt in culpa qui officia deserunt</li>
            </ul>
          </RuleSection>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Rulebook;