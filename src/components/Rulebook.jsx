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
  Brain,
  HandMetal
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
        <div className="grid grid-cols-2 gap-4 mb-6">
          <button
            onClick={() => setOpenSections(new Set(['gameIntro', 'gameSetup', 'gameLoop', 'gameplay', 'mechanics', 'strategy', 'victory']))}
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

        <div className="space-y-6">
          <RuleSection 
            title="What is LIMBo?" 
            icon={Scroll}
            isOpen={openSections.has('gameIntro')}
            onToggle={() => toggleSection('gameIntro')}
          >
            <div className="space-y-4">
              <p className="font-bold text-lg">Welcome to the world of LIMBo!</p>
              <p>LIMBo is a semi-competitive party card game where you compete to be the last player standing - quite literally! You'll need to outmaneuver, outthink, and sometimes team up with other players to survive.</p>
              
              <div className="bg-yellow-200 rounded-xl p-4 border-2 border-black mt-4">
                <p className="font-bold">Game Overview:</p>
                <ul className="list-disc list-inside mt-2 space-y-2">
                  <li>Semi-competitive party card game</li>
                  <li>Features 5 unique fantasy-themed body archetypes</li>
                  <li>Turn-based gameplay with strategic choices</li>
                  <li>Mix of action cards and body parts</li>
                  <li>Last player with any body parts remaining wins!</li>
                </ul>
              </div>
            </div>
          </RuleSection>

          <RuleSection 
            title="Game Setup" 
            icon={HandMetal}
            isOpen={openSections.has('gameSetup')}
            onToggle={() => toggleSection('gameSetup')}
          >
            <div className="space-y-4">
              <p>Before starting the game:</p>
              <ol className="list-decimal list-inside space-y-2">
                <li>Players sit in a circle for smooth gameplay flow</li>
                <li>Sort cards into two decks:
                  <ul className="list-disc ml-6 mt-1">
                    <li>Action Cards Deck</li>
                    <li>Body Parts Deck</li>
                  </ul>
                </li>
                <li>Each player draws their starting hand:
                  <ul className="list-disc ml-6 mt-1">
                    <li>3 cards from Action Cards Deck</li>
                    <li>2 cards from Body Parts Deck</li>
                  </ul>
                </li>
                <li>Choose first player and turn order direction</li>
              </ol>
            </div>
          </RuleSection>

          <RuleSection 
            title="Game Loop & Actions" 
            icon={Users}
            isOpen={openSections.has('gameLoop')}
            onToggle={() => toggleSection('gameLoop')}
          >
            <div className="space-y-4">
              <div className="bg-yellow-300 rounded-xl p-4 border-2 border-black">
                <p className="font-bold text-lg">Turn Phases:</p>
                <ol className="list-decimal list-inside mt-2 space-y-2">
                  <li>Draw Phase:
                    <ul className="list-disc ml-6 mt-1">
                      <li>Draw 2 cards using the digital companion</li>
                      <li>Digital companion decides which deck(s) you draw from</li>
                      <li>Must complete both draws before taking actions</li>
                    </ul>
                  </li>
                  <li>Action Phase: 3 actions available</li>
                  <li>End Phase: Discard down to 7 cards if needed</li>
                </ol>
              </div>
              
              <div className="bg-green-200 rounded-xl p-4 border-2 border-black">
                <p className="font-bold text-lg">Available Actions (3 per turn):</p>
                <ul className="list-disc list-inside mt-2">
                  <li>Play an action card from your hand (costs 1 action)</li>
                  <li>Activate an arm effect (costs 1 action - can be used even with just one arm of that archetype)</li>
                </ul>
              </div>

              <div className="bg-blue-200 rounded-xl p-4 border-2 border-black">
                <p className="font-bold text-lg mb-2">Set Effects:</p>
                <p>Set effects are automatic passive abilities that trigger when conditions are met:</p>
                <ul className="list-disc list-inside mt-2">
                  <li>Do not use action points</li>
                  <li>Trigger automatically when conditions are met</li>
                  <li>Active as long as you have the required body parts</li>
                  <li>Different for each archetype</li>
                </ul>
              </div>
            </div>
          </RuleSection>

          <RuleSection 
            title="Core Mechanics" 
            icon={Scissors}
            isOpen={openSections.has('mechanics')}
            onToggle={() => toggleSection('mechanics')}
          >
            <div className="space-y-4">
              <div className="bg-red-200 rounded-xl p-4 border-2 border-black">
                <p className="font-bold text-lg">The Chop Mechanic</p>
                <p>The main mechanic in LIMBo is the chop action card:</p>
                <ul className="list-disc list-inside mt-2">
                  <li>Immediately removes a target body part</li>
                  <li>Card is reshuffled back into deck after use</li>
                  <li>Chop cards become more frequent as game progresses</li>
                  <li>Players must plan around increasing chop frequency</li>
                </ul>
              </div>
              
              <div className="bg-yellow-200 rounded-xl p-4 border-2 border-black">
                <p className="font-bold text-lg">Body Parts & Abilities</p>
                <p className="mt-2">The game features two types of abilities:</p>
                <ul className="list-disc list-inside mt-2">
                  <li className="font-bold">Arm Effects (Active)
                    <ul className="list-disc ml-6 mt-1">
                      <li className="font-normal">Uses 1 action point</li>
                      <li className="font-normal">Can be used with just one matching arm</li>
                      <li className="font-normal">Each archetype has unique effects</li>
                    </ul>
                  </li>
                  <li className="font-bold mt-3">Set Effects (Passive)
                    <ul className="list-disc ml-6 mt-1">
                      <li className="font-normal">No action cost</li>
                      <li className="font-normal">Triggers automatically</li>
                      <li className="font-normal">Requires specific body part combinations</li>
                      <li className="font-normal">Different effects per archetype</li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </RuleSection>

          <RuleSection 
            title="Strategy & Survival" 
            icon={Brain}
            isOpen={openSections.has('strategy')}
            onToggle={() => toggleSection('strategy')}
          >
            <div className="space-y-4">
              <p>Players can adopt various strategies to survive:</p>
              
              <div className="bg-purple-200 rounded-xl p-4 border-2 border-black">
                <p className="font-bold mb-2">Offensive Strategies:</p>
                <ul className="list-disc list-inside">
                  <li>Aggressive use of chop cards</li>
                  <li>Using debuff cards on stronger players</li>
                  <li>Coordinating attacks with other players</li>
                </ul>
              </div>

              <div className="bg-blue-200 rounded-xl p-4 border-2 border-black">
                <p className="font-bold mb-2">Defensive Strategies:</p>
                <ul className="list-disc list-inside">
                  <li>Saving "Just Say No" cards for protection</li>
                  <li>Building strong set effects for defense</li>
                  <li>Strategic use of protective arm effects</li>
                </ul>
              </div>

              <div className="bg-green-200 rounded-xl p-4 border-2 border-black">
                <p className="font-bold mb-2">Social Strategies:</p>
                <ul className="list-disc list-inside">
                  <li>Forming temporary alliances</li>
                  <li>Coordinating to take down leading players</li>
                  <li>Negotiating and making deals</li>
                </ul>
              </div>
            </div>
          </RuleSection>

          <RuleSection 
            title="Victory & Defeat" 
            icon={Trophy}
            isOpen={openSections.has('victory')}
            onToggle={() => toggleSection('victory')}
          >
            <div className="space-y-4">
              <div className="bg-yellow-300 rounded-xl p-4 border-2 border-black">
                <p className="font-bold">Winning:</p>
                <p>Be the last player with any body parts remaining! Even a single limb is enough to claim victory.</p>
              </div>

              <div className="bg-red-200 rounded-xl p-4 border-2 border-black">
                <p className="font-bold">Losing:</p>
                <ul className="list-disc list-inside mt-2">
                  <li>Lose all body parts</li>
                  <li>No replacement parts available on your turn</li>
                  <li>All cards in hand go to discard pile</li>
                </ul>
              </div>

              <div className="bg-purple-200 rounded-xl p-4 border-2 border-black">
                <p className="font-bold">Remember:</p>
                <p>LIMBo is designed for light-hearted fun and friendly competition. Strategy is important, but the main goal is to create memorable moments with friends!</p>
              </div>
            </div>
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