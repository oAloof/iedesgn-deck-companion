import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import frankensteinIcon from '../assets/frankenstein.png';
import madScientistIcon from '../assets/mad-scientist.png';
import skeletonIcon from '../assets/skeleton.png';
import witchIcon from '../assets/witch.png';
import pumpkinHeadIcon from '../assets/pumpkin-head.png';

const EffectCard = ({ description }) => (
  <div className="bg-blue-100 p-4 rounded-xl border-2 border-black 
    shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-black font-medium">
    {description}
  </div>
);

const SetEffect = ({ pieces, description }) => (
  <div className="flex items-start gap-3">
    <div className="flex-shrink-0 w-16 h-16 bg-red-400 rounded-full border-4 border-black
      shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] 
      flex items-center justify-center">
      <span className="font-bold text-black text-xl">{pieces}pc</span>
    </div>
    <div className="flex-1">
      <EffectCard description={description} />
    </div>
  </div>
);

const CharacterTab = ({ name, icon, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`flex flex-col items-center p-2 w-20 ${
      isActive 
        ? 'bg-yellow-300 border-black border-4 rounded-t-xl' 
        : 'bg-purple-300 border-black border-2 rounded-xl hover:bg-yellow-200'
    } transition-all duration-200`}
  >
    <div className={`w-12 h-12 rounded-full overflow-hidden border-2 border-black
      ${isActive ? 'shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]' : ''}`}>
      <img 
        src={icon} 
        alt={name}
        className="w-full h-full object-cover"
      />
    </div>
    <span className="text-xs font-bold text-black mt-1 line-clamp-2 text-center">
      {name}
    </span>
  </button>
);

const Sets = () => {
  const [activeSet, setActiveSet] = useState('Frankenstein');
  
  const archetypes = [
    {
      name: 'Frankenstein',
      icon: frankensteinIcon,
      setEffects: [
        {
          pieces: 2,
          description: "At the start of your turn, for every other body part that isn't frankenstein and unique from each other, draw those number of additional cards on your turn's draw phase (max 2)(must use digital companion to redraw)"
        },
        {
          pieces: 3,
          description: "At the start of your turn, For every other body part that isn't frankenstein and unique from each other, draw those number of additional cards on your turn's draw phase (max 3)"
        }
      ],
      armEffect: "Select 1 Action Card from the Discard Pile and use its corresponding card effect. Afterwards, discard 1 card from your hand."
    },
    {
      name: 'Mad Scientist',
      icon: madScientistIcon,
      setEffects: [
        {
          pieces: 2,
          description: "Whenever you use a chop card, flip a coin. If it lands on your chosen side, chop 2 parts instead of one (this chop still counts as one action). If it doesn't, reshuffle the chop card back into the deck."
        },
        {
          pieces: 3,
          description: "Whenever you use a chop card, flip a coin. If it lands on your chosen side, chop 2 parts instead of one (this chop still counts as one action). If it doesn't, return the card back to your hand."
        }
      ],
      armEffect: "Flip a coin. If Heads: chop an enemy body part. (Is not affected by set effect) If Tails: chop one of your own body parts."
    },
    {
      name: 'Skeleton',
      icon: skeletonIcon,
      setEffects: [
        {
          pieces: 2,
          description: "Strong Bones: Block 1 chop attempt on any bone part per rotation."
        },
        {
          pieces: 3,
          description: "Strong Body: Block 1 chop or swap attempt on any body part per rotation."
        }
      ],
      armEffect: "Select any one body part. Add a skeleton token. If a body part with a skeleton token is about to be chopped, remove 1 skeleton token instead. Skeleton tokens do not apply to swap or steal"
    },
    {
      name: 'Witch',
      icon: witchIcon,
      setEffects: [
        {
          pieces: 2,
          description: "If your character is targeted by an action card, you can redirect it to another player. You can only use this once per rotation."
        },
        {
          pieces: 3,
          description: "When you play an action card, you can use its effect again with no additional cost. This effect must be activated when you use the action card. You can only use this once per rotation."
        }
      ],
      armEffect: "Select 1 body part. If the corresponding body part's action is used or if its set effect passive is used, the owner must discard one card. Lasts 1 turn."
    },
    {
      name: 'Pumpkin Head',
      icon: pumpkinHeadIcon,
      setEffects: [
        {
          pieces: 1,
          description: "At the start of your turn, if your body is missing a limb, regenerate that part as a human limb. If you have multiple missing limbs, choose one of them to regenerate."
        },
        {
          pieces: 2,
          description: "At the start of your turn, if your body is missing a limb, regenerate that part as a human limb. If you have multiple missing limbs, choose two of them to regenerate."
        }
      ],
      armEffect: "Draw 1 card. If you have no missing limbs, draw 2 instead."
    }
  ];

  const activeArchetype = archetypes.find(a => a.name === activeSet);

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
        <span className="text-2xl font-bold text-black">Character Sets</span>
      </header>

      {/* Quick Navigation Tabs */}
      <div className="sticky top-0 z-10 bg-orange-100 border-b-4 border-black shadow-md">
        <div className="max-w-md mx-auto px-2 pt-2">
          <div className="flex justify-between gap-1 overflow-x-auto pb-2 scrollbar-hide">
            {archetypes.map((archetype) => (
              <CharacterTab
                key={archetype.name}
                name={archetype.name}
                icon={archetype.icon}
                isActive={activeSet === archetype.name}
                onClick={() => setActiveSet(archetype.name)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Active Character Content */}
      <div className="flex-1 max-w-md mx-auto w-full p-4">
        <div className="bg-yellow-300 p-6 rounded-3xl border-4 border-black 
          shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          
          <div className="text-center mb-6">
            <div className="w-32 h-32 rounded-full mx-auto mb-4 bg-purple-300 border-4 border-black
              shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
              <img 
                src={activeArchetype.icon} 
                alt={`${activeArchetype.name} icon`}
                className="w-full h-full object-cover object-center"
              />
            </div>
            <h2 className="text-3xl font-bold text-black">{activeArchetype.name}</h2>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-black">Set Effects</h3>
              <div className="space-y-4">
                {activeArchetype.setEffects.map((effect, index) => (
                  <SetEffect 
                    key={index}
                    pieces={effect.pieces}
                    description={effect.description}
                  />
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-4 text-black">Arm Effect</h3>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-16 h-16 bg-green-400 rounded-full border-4 border-black
                  shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                  flex items-center justify-center">
                  <span className="font-bold text-black">Arm</span>
                </div>
                <div className="flex-1">
                  <EffectCard description={activeArchetype.armEffect} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CSS for hiding scrollbar */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default Sets;