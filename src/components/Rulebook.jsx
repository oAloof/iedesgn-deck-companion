import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ChevronLeft, 
  ChevronDown, 
  ChevronUp, 
  Swords, 
  Trophy, 
  Scroll,
  Sparkles,
  Scissors,
  Users,
  Brain
} from 'lucide-react';

const RuleSection = ({ title, icon: Icon, children, isOpen, onToggle }) => {
  return (
    <div className="mb-4">
      <button
        onClick={onToggle}
        className="w-full px-6 py-4 bg-yellow-300 rounded-2xl border-4 border-black 
          shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]
          transition-all duration-150 flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <Icon size={24} className="text-black" />
          <span className="font-bold text-xl text-black">{title}</span>
        </div>
        {isOpen ? (
          <ChevronUp size={24} className="text-black" />
        ) : (
          <ChevronDown size={24} className="text-black" />
        )}
      </button>
      {isOpen && (
        <div className="mt-3 p-6 bg-blue-100 rounded-2xl border-4 border-black 
          shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] animate-fadeIn">
          <div className="space-y-4 text-black">
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

const Rulebook = () => {
  const [openSections, setOpenSections] = useState(new Set(['gameIntro']));

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
    <div className="min-h-screen flex flex-col bg-orange-100">
      {/* Header */}
      <header className="w-full bg-purple-300 p-4 flex items-center justify-between border-b-4 border-black">
        <Link 
          to="/"
          className="flex items-center gap-2 text-black hover:text-blue-600 transition-colors"
        >
          <ChevronLeft size={24} className="font-bold" />
          <span className="text-lg font-bold">Back to Game</span>
        </Link>
        <span className="text-2xl font-bold text-black">Rulebook</span>
      </header>

      <div className="flex-1 max-w-2xl mx-auto w-full p-4">
        {/* Quick nav buttons */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <button
            onClick={() => setOpenSections(new Set(['gameIntro', 'gameLoop', 'gameplay', 'mechanics', 'strategy', 'victory']))}
            className="px-4 py-3 rounded-xl bg-green-400 text-black font-bold border-4 border-black
              shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]
              transition-all duration-150"
          >
            Expand All
          </button>
          <button
            onClick={() => setOpenSections(new Set())}
            className="px-4 py-3 rounded-xl bg-red-400 text-black font-bold border-4 border-black
              shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]
              transition-all duration-150"
          >
            Collapse All
          </button>
        </div>

        {/* Rule sections */}
        <div className="space-y-6">
          <RuleSection 
            title="Game Loop & Actions" 
            icon={Users}
            isOpen={openSections.has('gameLoop')}
            onToggle={() => toggleSection('gameLoop')}
          >
            <div className="space-y-4">
              <div className="bg-yellow-300 rounded-xl p-4 border-2 border-black">
                <p className="font-bold text-lg">Each Turn Consists Of:</p>
                <ol className="list-decimal list-inside mt-2 space-y-2">
                  <li>Draw Phase: Draw 2 cards using the digital companion</li>
                  <li>Action Phase: You have 3 actions per turn</li>
                  <li>End Phase: Discard down to 7 cards if needed</li>
                </ol>
              </div>
              
              <div className="mt-6">
                <p className="font-bold text-lg mb-2">Actions (3 per turn):</p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Play an action card (counts as 1 action)</li>
                  <li>Use a body part's ability (counts as 1 action)</li>
                  <li>Use a set effect (counts as 1 action unless specified otherwise)</li>
                </ul>
              </div>
              
              <div className="bg-purple-300 rounded-xl p-4 border-2 border-black mt-4">
                <p className="font-bold">Important Rules:</p>
                <ul className="list-disc list-inside mt-2 space-y-2">
                  <li>You must draw both cards before taking any actions</li>
                  <li>Unused actions do not carry over to next turn</li>
                  <li>Some cards or abilities might grant extra actions</li>
                  <li>Hand limit of 7 cards at end of turn</li>
                </ul>
              </div>
            </div>
          </RuleSection>

          <RuleSection 
            title="What is LIMBo?" 
            icon={Scroll}
            isOpen={openSections.has('gameIntro')}
            onToggle={() => toggleSection('gameIntro')}
          >
            <p className="font-bold text-lg mb-4">Welcome to the world of LIMBo!</p>
            <p>LIMBo is a semi-competitive party card game where you compete to be the last player standing - quite literally! The game features 5 unique body archetypes inspired by fantasy elements, each with their own special abilities and strategies.</p>
            <p className="mt-4">In this turn-based adventure, you'll use a combination of action cards and body parts to outmaneuver your opponents. Will you be the aggressor, the defender, or perhaps form temporary alliances? The choice is yours!</p>
          </RuleSection>

          <RuleSection 
            title="Core Mechanics" 
            icon={Scissors}
            isOpen={openSections.has('mechanics')}
            onToggle={() => toggleSection('mechanics')}
          >
            <div className="space-y-4">
              <p className="font-bold text-lg">The Chop Mechanic</p>
              <p>The main mechanic in LIMBo is the chop action card. When used, it immediately removes a body part from the field. After use, the card is reshuffled back into the deck - meaning the longer the game goes, the more frequent chop cards become!</p>
              
              <p className="font-bold text-lg mt-6">Body Parts & Powers</p>
              <p>Each body part you possess grants you special powers. Use these abilities strategically to gain advantages throughout the game. Different combinations of parts can create powerful synergies!</p>
            </div>
          </RuleSection>

          <RuleSection 
            title="Gameplay Example" 
            icon={Swords}
            isOpen={openSections.has('gameplay')}
            onToggle={() => toggleSection('gameplay')}
          >
            <p className="italic">Here's a quick example of how a turn might play out:</p>
            <div className="bg-white/50 rounded-xl p-4 mt-3 border-2 border-black">
              <p>On your turn, you decide to chop your opponent's left arm off. They try to stop you with a "Just Say No" card, but you're not done yet! You still have 2 actions remaining.</p>
              <p className="mt-2">You bind 2 of their body parts together and follow up with another chop card. Success! You've removed 2 of their limbs. But watch out - the next player might have plans for your limbs too...</p>
            </div>
          </RuleSection>

          <RuleSection 
            title="Winning Strategies" 
            icon={Brain}
            isOpen={openSections.has('strategy')}
            onToggle={() => toggleSection('strategy')}
          >
            <div className="space-y-4">
              <p className="font-bold">The Aggressor</p>
              <p>Attack frequently with chop cards and debuff other players to gain advantages.</p>
              
              <p className="font-bold">The Defender</p>
              <p>Focus on protecting your parts and collecting chop cards for the perfect moment.</p>
              
              <p className="font-bold">The Diplomat</p>
              <p>Form temporary alliances to take down stronger players - just don't trust anyone too much!</p>
            </div>
          </RuleSection>

          <RuleSection 
            title="Victory & Goals" 
            icon={Trophy}
            isOpen={openSections.has('victory')}
            onToggle={() => toggleSection('victory')}
          >
            <p>To win LIMBo, you must be the last player standing! Use your cards wisely, time your attacks carefully, and make (or break) alliances as needed.</p>
            <p className="mt-4">Remember: The game is designed for light-hearted fun and friendly competition. Strategy is important, but the main goal is to create memorable moments with friends!</p>
          </RuleSection>
        </div>
      </div>

      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeIn {
            animation: fadeIn 0.2s ease-out forwards;
          }
        `}
      </style>
    </div>
  );
};

export default Rulebook;