import React from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { Button } from '@/components/ui/Button';

export const revalidate = 60; // Incremental Static Regeneration revalidation time in seconds

export default async function GardenPage() {
  const supabase = createClient();

  // Fetch public letters sorted by created_at DESC
  const { data: letters, error } = await supabase
    .from('letters')
    .select('*')
    .eq('is_public', true)
    .order('created_at', { ascending: false })
    .limit(30);

  return (
    <main className="min-h-screen bg-amora-cream text-amora-ink font-ui flex flex-col justify-between">
      {/* Header */}
      <header className="border-b border-amora-ink/5 bg-white/70 backdrop-blur px-6 py-4 flex items-center justify-between sticky top-0 z-40">
        <Link href="/" className="flex items-center gap-2 font-heading font-bold text-xl tracking-widest uppercase hover:text-amora-rose transition-colors">
          🌸 Amora
        </Link>
        <Link href="/editor">
          <Button variant="primary" size="sm">
            Write a Letter ✉
          </Button>
        </Link>
      </header>

      {/* Main Content */}
      <div className="flex-grow max-w-7xl mx-auto w-full px-6 py-12 space-y-8">
        <div className="text-center space-y-2">
          <h1 className="font-heading text-4xl md:text-5xl font-bold tracking-wide">The Public Garden</h1>
          <p className="text-sm text-amora-ink/60 max-w-md mx-auto">
            A beautiful collection of letters, bouquets, and heartfelt messages shared by creators in the community.
          </p>
        </div>

        {error || !letters || letters.length === 0 ? (
          <div className="text-center py-20 bg-white/40 border border-dashed border-amora-ink/10 rounded-2xl space-y-3">
            <span className="text-4xl block">🌿</span>
            <h3 className="font-heading text-xl font-bold">The garden is empty here</h3>
            <p className="text-xs text-amora-ink/50 max-w-xs mx-auto">
              Be the first to share a beautiful flower-sealed letter in the public garden gallery!
            </p>
            <div className="pt-2">
              <Link href="/editor">
                <Button variant="outline" size="sm">Create Letter</Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {letters.map((letter) => {
              // Calculate total reactions
              const totalReactions = Object.values(letter.reactions || {}).reduce(
                (sum: number, val) => sum + ((val as number) || 0),
                0
              );

              return (
                <div
                  key={letter.id}
                  className={`break-inside-avoid bg-white rounded-2xl border border-amora-ink/5 p-6 hover:shadow-lg transition-all duration-300 flex flex-col justify-between space-y-4`}
                >
                  <div className="space-y-2">
                    {/* Header Details */}
                    <div className="flex justify-between items-start text-xs font-semibold text-amora-ink/55 uppercase tracking-wider">
                      <span>To: {letter.to_name}</span>
                      <span>From: {letter.from_name}</span>
                    </div>

                    {/* Short Message Preview */}
                    <p className={`text-center font-heading text-lg italic text-amora-ink/80 py-4 border-y border-amora-ink/5 line-clamp-4 whitespace-pre-wrap`}>
                      &ldquo;{letter.message}&rdquo;
                    </p>
                  </div>

                  {/* Footer Metrics */}
                  <div className="flex justify-between items-center text-xs text-amora-ink/50 font-medium">
                    <div className="flex items-center gap-3">
                      <span title="Views">👁️ {letter.view_count || 0}</span>
                      <span title="Reactions">💖 {totalReactions}</span>
                    </div>

                    <Link href={`/letter/${letter.id}`}>
                      <span className="text-amora-rose hover:underline font-semibold cursor-pointer">
                        Open Letter ➔
                      </span>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-amora-ink/5 bg-white py-6">
        <div className="max-w-7xl mx-auto px-6 text-center text-xs text-amora-ink/50 font-medium">
          <p>© 2026 Amora. Built with love and flowers.</p>
        </div>
      </footer>
    </main>
  );
}
