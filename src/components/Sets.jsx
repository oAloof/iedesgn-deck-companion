import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import frankensteinIcon from '../assets/frankenstein.png';
import madScientistIcon from '../assets/mad-scientist.png';
import skeletonIcon from '../assets/skeleton.png';
import witchIcon from '../assets/witch.png';
import pumpkinHeadIcon from '../assets/pumpkin-head.png';

const EffectCard = ({ description }) => (
  <div className="bg-gray-100 p-3 rounded-md text-gray-700 text-sm leading-relaxed">
    {description}
  </div>
);

const SetEffect = ({ pieces, description }) => (
  <div className="flex items-start gap-3">
    <div className="flex-shrink-0 w-12 h-12 bg-red-400 rounded-full flex items-center justify-center">
      <span className="font-bold">{pieces}pc</span>
    </div>
    <EffectCard description={description} />
  </div>
);

const Archetype = ({ name, icon, setEffects, armEffect }) => (
  <div className="bg-slate-900 text-white p-6 rounded-xl shadow-lg mb-6">
    <div className="text-center mb-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-200">{name}</h2>
      <div className="w-32 h-32 rounded-full mx-auto mb-4 bg-red-400 overflow-hidden">
        <img 
          src={icon} 
          alt={`${name} icon`}
          className="w-full h-full object-cover object-center"
        />
      </div>
    </div>

    <div className="space-y-4">
      <h3 className="text-xl font-bold mb-3">Set Effects</h3>
      <div className="space-y-4">
        {setEffects.map((effect, index) => (
          <SetEffect 
            key={index}
            pieces={effect.pieces}
            description={effect.description}
          />
        ))}
      </div>

      <h3 className="text-xl font-bold mt-6 mb-3">Arm Effect</h3>
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-12 h-12 bg-red-400 rounded-full flex items-center justify-center">
          <span className="font-semibold">Arm</span>
        </div>
        <EffectCard description={armEffect} />
      </div>
    </div>
  </div>
);

const Sets = () => {
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

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="w-full bg-white shadow-sm p-4 flex items-center justify-between sticky top-0 z-10">
        <Link 
          to="/"
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
        >
          <ChevronLeft size={24} />
          <span className="text-lg font-medium">Back to Game</span>
        </Link>
        <span className="text-lg font-medium text-blue-600">Sets</span>
      </header>

      <div className="max-w-md mx-auto p-4 pb-8">
        <div className="space-y-6">
          {archetypes.map((archetype, index) => (
            <Archetype 
              key={index}
              name={archetype.name}
              icon={archetype.icon}
              setEffects={archetype.setEffects}
              armEffect={archetype.armEffect}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sets;