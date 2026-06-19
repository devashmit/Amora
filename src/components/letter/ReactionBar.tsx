'use client';

import React, { useState } from 'react';

interface ReactionBarProps {
  letterId: string;
  initialReactions: Record<string, number>;
}

export const ReactionBar: React.FC<ReactionBarProps> = ({
  letterId,
  initialReactions,
}) => {
  const [reactions, setReactions] = useState<Record<string, number>>(initialReactions);
  const [loadingReaction, setLoadingReaction] = useState<string | null>(null);

  const emojiList = ['🌸', '🌺', '💐', '🌻', '❤️'];

  const handleReact = async (emoji: string) => {
    if (loadingReaction !== null) return;
    setLoadingReaction(emoji);

    try {
      const res = await fetch(`/api/letters/${letterId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reaction: emoji }),
      });

      if (!res.ok) {
        throw new Error('Failed to reaction');
      }

      const data = await res.json();
      if (data.reactions) {
        setReactions(data.reactions);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingReaction(null);
    }
  };

  return (
    <div className="flex items-center justify-center gap-3 bg-white/80 backdrop-blur border border-amora-ink/5 shadow-lg rounded-full px-6 py-3 select-none">
      <span className="text-xs uppercase tracking-wider font-semibold text-amora-ink/50 mr-2">React:</span>
      {emojiList.map((emoji) => (
        <button
          key={emoji}
          onClick={() => handleReact(emoji)}
          disabled={loadingReaction !== null}
          className="flex items-center gap-1.5 py-1.5 px-3 rounded-full hover:bg-amora-ink/5 active:scale-90 transition-all duration-300 font-medium"
        >
          <span className={`text-xl ${loadingReaction === emoji ? 'animate-bounce' : 'hover:scale-110'}`}>
            {emoji}
          </span>
          <span className="text-xs text-amora-ink/70">
            {reactions[emoji] || 0}
          </span>
        </button>
      ))}
    </div>
  );
};
