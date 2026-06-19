import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { EnvelopeReveal } from '@/components/letter/EnvelopeReveal';
import { ReactionBar } from '@/components/letter/ReactionBar';

interface Params {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const supabase = createClient();
  const { data: letter } = await supabase
    .from('letters')
    .select('to_name, from_name')
    .eq('id', params.id)
    .single();

  if (!letter) {
    return {
      title: 'Letter not found | Amora',
    };
  }

  return {
    title: `A digital bouquet for ${letter.to_name} | Amora`,
    description: `A custom flower-sealed letter created with love by ${letter.from_name}.`,
  };
}

export default async function LetterPage({ params }: Params) {
  const supabase = createClient();
  
  const { data: letter, error } = await supabase
    .from('letters')
    .select('*')
    .eq('id', params.id)
    .single();

  if (error || !letter) {
    notFound();
  }

  // Increment view count securely via database function
  const { error: viewError } = await supabase.rpc('increment_view', {
    letter_id: params.id,
  });
  if (viewError) {
    console.error('Failed to increment view:', viewError);
  }

  return (
    <main className="min-h-screen text-amora-ink font-ui flex flex-col items-center justify-between p-6">
      {/* Logo */}
      <header className="py-4 text-center">
        <Link href="/" className="flex items-center gap-3 font-heading font-bold text-xl tracking-widest uppercase hover:text-amora-rose transition-colors">
          <img src="/logo.svg" alt="Amora Logo" className="w-8 h-8" />
          <span>Amora</span>
        </Link>
      </header>

      {/* Main Envelope Reveal Animation */}
      <div className="flex-grow w-full flex items-center justify-center">
        <EnvelopeReveal
          toName={letter.to_name}
          fromName={letter.from_name}
          message={letter.message}
          paperStyle={letter.paper_style}
          fontFamily={letter.font_family}
          fontSize={letter.font_size}
          inkColor={letter.ink_color}
          stickers={letter.stickers}
          decorations={letter.decorations}
        />
      </div>

      {/* Reactions Overlay */}
      <footer className="py-6 z-50">
        <ReactionBar letterId={letter.id} initialReactions={letter.reactions} />
      </footer>
    </main>
  );
}
