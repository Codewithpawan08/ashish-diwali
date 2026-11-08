import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'node:fs'

// Finds any audio file inside public/music (any file name) so it can be played.
const audioIn = (dir) => { try { return fs.readdirSync(dir).filter((f) => /\.(mp3|m4a|ogg|wav|aac)$/i.test(f)) } catch { return [] } }
const publicMusic = audioIn('public/music').map((f) => '/music/' + encodeURIComponent(f))

export default defineConfig({
  plugins: [react()],
  build: { assetsInlineLimit: 0 },
  define: { 'import.meta.env.VITE_MUSIC_LIST': JSON.stringify(JSON.stringify(publicMusic)) }
})
