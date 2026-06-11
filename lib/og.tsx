import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';

/**
 * Branded Open Graph card: deep navy stage, tracked-caps wordmark, gold
 * hairline, Spectral headline, quiet kicker. Used by every route's
 * opengraph-image.tsx — this card is the first thing anyone sees when the
 * link is shared, so it carries the brand before the site ever loads.
 */

export const OG_SIZE = { width: 1200, height: 630 };

// Satori needs raw font data (ttf — not woff2). The binaries are vendored in
// lib/fonts/ and read from disk so card generation never touches the network:
// build-time font fetches hang or fail in restricted environments.
async function loadFont(file: string): Promise<ArrayBuffer> {
  const buf = await readFile(join(process.cwd(), 'lib', 'fonts', file));
  return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength) as ArrayBuffer;
}

export async function ogCard(title: string, kicker?: string): Promise<ImageResponse> {
  const [spectral, hanken] = await Promise.all([
    loadFont('Spectral-Light.ttf'),
    loadFont('HankenGrotesk-SemiBold.ttf'),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#0A1B33',
          padding: '64px 72px',
        }}
      >
        <div
          style={{
            display: 'flex',
            fontFamily: 'Hanken',
            fontSize: 26,
            fontWeight: 600,
            letterSpacing: '0.22em',
            color: '#FAF7F0',
          }}
        >
          MAS ALPHA SECURITIES
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>
          <div style={{ display: 'flex', width: 96, height: 1, background: '#C2A36B' }} />
          <div
            style={{
              display: 'flex',
              fontFamily: 'Spectral',
              fontSize: 84,
              fontWeight: 300,
              lineHeight: 1.1,
              letterSpacing: '-0.015em',
              color: '#FAF7F0',
              maxWidth: 980,
            }}
          >
            {title}
          </div>
          {kicker ? (
            <div
              style={{
                display: 'flex',
                fontFamily: 'Hanken',
                fontSize: 22,
                fontWeight: 600,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: '#C2A36B',
              }}
            >
              {kicker}
            </div>
          ) : null}
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [
        { name: 'Spectral', data: spectral, weight: 300, style: 'normal' },
        { name: 'Hanken', data: hanken, weight: 600, style: 'normal' },
      ],
    },
  );
}
