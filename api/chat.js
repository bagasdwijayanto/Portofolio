export const config = { runtime: 'edge' }

const SYSTEM_PROMPT = `Kamu adalah asisten virtual portfolio milik Bagas Dwijayanto.
Jawab pertanyaan pengunjung tentang Bagas secara ramah, singkat, dan informatif dalam Bahasa Indonesia.
Jika pertanyaan di luar konteks Bagas atau portofolionya, arahkan dengan sopan.

PROFIL: Bagas Dwijayanto, Fullstack Developer di Dinas Kominfotik Kota Metro, Lampung.
Alumni S1 Informatika Universitas Bandar Lampung (UBL) 2019.

SKILLS: PHP (90%), JavaScript (88%), Python (75%), C# (70%).
Framework: Laravel (90%), React (85%), Vue.js (82%), Tailwind CSS (92%).
Tools: MySQL, Git, Unity, Vuforia (AR).

PROJECTS:
- AR Lembah Hijau, AR Komponen Komputer, AR Alat Musik Tradisional (Unity & Vuforia)
- drive.metrokota.go.id, PPDB Kota Metro, Bank Sampah Yosodadi, Retribusi Sampah Kota Metro, Janji Jaga Polres Metro (Laravel/PHP)

KONTAK: LinkedIn linkedin.com/in/bagas-dwijayanto-192531256 | GitHub github.com/bagasdwijayanto | Form Contact di website.

Jawab santai tapi profesional. Maksimal 3-4 kalimat kecuali diminta detail.`

// ── Keyword-based static fallback ──────────────────────────────
const FAQ = [
  { keys: ['skill','keahlian','teknologi','stack','bahasa','bisa'],
    answer: 'Bagas menguasai PHP, JavaScript, Python, dan C#. Framework utamanya adalah Laravel, React, Vue.js, dan Tailwind CSS. Di AR ia menggunakan Unity & Vuforia.' },
  { keys: ['project','proyek','karya','pernah','buat'],
    answer: 'Bagas punya 8 project: 3 aplikasi AR (Lembah Hijau, Komponen Komputer, Alat Musik Tradisional) dan 5 sistem web pemerintahan (drive.metrokota.go.id, PPDB, Bank Sampah, Retribusi Sampah, Janji Jaga Polres).' },
  { keys: ['ar','augmented','reality','unity','vuforia'],
    answer: 'Bagas berpengalaman AR sejak 2021. Project AR-nya mencakup wisata Lembah Hijau, media pembelajaran SMKN 8 Bandar Lampung, dan pengenalan alat musik tradisional Lampung.' },
  { keys: ['kerja','kantor','instansi','dinas','kominfotik','metro'],
    answer: 'Bagas bekerja di Dinas Komunikasi, Informatika dan Statistik (Kominfotik) Kota Metro, Lampung — mengembangkan sistem digital untuk pelayanan publik.' },
  { keys: ['pendidikan','kuliah','kampus','universitas','ubl','informatika'],
    answer: 'Bagas alumni S1 Informatika Universitas Bandar Lampung (UBL), Fakultas Ilmu Komputer, mulai kuliah 2019.' },
  { keys: ['hubungi','kontak','contact','email','whatsapp','linkedin','github'],
    answer: 'Hubungi Bagas via form Contact di website, LinkedIn (linkedin.com/in/bagas-dwijayanto-192531256), atau GitHub (github.com/bagasdwijayanto).' },
  { keys: ['siapa','bagas','profil','tentang','about'],
    answer: 'Bagas Dwijayanto adalah Fullstack Developer dari Lampung. Bekerja di Kominfotik Kota Metro, ahli Web Development & AR, alumni S1 Informatika UBL 2019.' },
  { keys: ['lokasi','domisili','tinggal','lampung','asal'],
    answer: 'Bagas berdomisili di Lampung, Indonesia, dan bekerja di Kota Metro, Lampung.' },
  { keys: ['laravel','php','backend','web'],
    answer: 'Laravel adalah framework utama Bagas untuk backend (level 90%). Ia membangun beberapa sistem web pemerintahan dengan Laravel & MySQL.' },
  { keys: ['react','vue','frontend','javascript'],
    answer: 'Bagas menguasai React (85%) dan Vue.js (82%) untuk frontend, dengan Tailwind CSS (92%) untuk styling. Portfolio ini dibangun dengan React.' },
]

function staticFallback(msg) {
  const lower = (msg || '').toLowerCase()
  for (const f of FAQ) {
    if (f.keys.some(k => lower.includes(k))) return f.answer
  }
  return 'Untuk info lebih detail tentang Bagas, silakan lihat section About, Skills, dan Projects di website ini, atau hubungi via form Contact. 😊'
}

// ── Models — lite first (lower quota pressure) ─────────────────
const MODELS = [
  'gemini-2.0-flash-lite',
  'gemini-2.0-flash',
  'gemini-1.5-flash-8b',
]

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json',
}

export default async function handler(req) {
  if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers: CORS })
  if (req.method !== 'POST') return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405, headers: CORS })

  const apiKey = process.env.GEMINI_API_KEY

  let body
  try { body = await req.json() }
  catch { return new Response(JSON.stringify({ error: 'Invalid JSON' }), { status: 400, headers: CORS }) }

  const { messages } = body
  if (!Array.isArray(messages) || messages.length === 0) {
    return new Response(JSON.stringify({ error: 'messages required' }), { status: 400, headers: CORS })
  }

  const lastUserMsg = [...messages].reverse().find(m => m.role === 'user')?.content ?? ''

  // No API key → static immediately (no error thrown)
  if (!apiKey) {
    return new Response(JSON.stringify({ reply: staticFallback(lastUserMsg), source: 'static' }), { status: 200, headers: CORS })
  }

  // Build Gemini request
  const contents = messages.map(m => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }],
  }))

  const geminiBody = {
    system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
    contents,
    generationConfig: { temperature: 0.7, maxOutputTokens: 512 },
  }

  // Try each model — silently skip on 404/429, fall to static on all failure
  for (const model of MODELS) {
    let res
    try {
      res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
        { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(geminiBody) }
      )
    } catch { continue }

    if (res.status === 404 || res.status === 429) continue
    if (!res.ok) break  // other error → fall to static

    let data
    try { data = await res.json() } catch { continue }

    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text
    if (!text) continue

    return new Response(JSON.stringify({ reply: text, source: 'gemini', model }), { status: 200, headers: CORS })
  }

  // All models failed → static fallback (always 200, never error to client)
  return new Response(
    JSON.stringify({ reply: staticFallback(lastUserMsg), source: 'static' }),
    { status: 200, headers: CORS }
  )
}
