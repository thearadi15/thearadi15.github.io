/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        // PRIMARY: Syncopate — geometric, futuristic, wide tracking (unused by most devs)
        display: ['Syncopate', 'sans-serif'],
        // SECONDARY: DM Mono — clean but characterful monospace
        mono: ['"DM Mono"', 'monospace'],
        // BODY: Syne — distinctive grotesque with personality
        body: ['Syne', 'sans-serif'],
        // ACCENT: Bebas Neue for big display numbers
        bebas: ['"Bebas Neue"', 'cursive'],
      },
      colors: {
        acid: '#C8FF00',       // acid lime — the PRIMARY accent
        void: '#0A0A0F',       // near-black background
        abyss: '#060609',      // deepest bg
        plasma: '#FF2D78',     // hot pink/magenta
        ion: '#00E5FF',        // electric cyan
        ghost: '#7B61FF',      // muted violet
        ember: '#FF6B1A',      // volcanic orange
        mist: 'rgba(200,255,0,0.06)',
      },
      backgroundImage: {
        'scanline': "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.04) 2px, rgba(0,0,0,0.04) 4px)",
        'dot-grid': "radial-gradient(circle, rgba(200,255,0,0.12) 1px, transparent 1px)",
        'hex': "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='104'%3E%3Cpath d='M30 4l26 15v30L30 64 4 49V19z' fill='none' stroke='%23C8FF00' stroke-width='0.3'/%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
}
