export const config = { runtime: 'edge' }

const SYSTEM_PROMPT = `Kamu adalah asisten virtual portfolio milik Bagas Dwijayanto.
Jawab pertanyaan pengunjung tentang Bagas secara ramah, singkat, dan informatif dalam Bahasa Indonesia.
Jika pertanyaan di luar konteks Bagas atau portofolionya, arahkan dengan sopan.

== DATA BAGAS DWIJAYANTO ==

PROFIL:
- Nama: Bagas Dwijayanto
- Pekerjaan: Fullstack Developer di Dinas Komunikasi, Informatika dan Statistik (Kominfotik) Kota Metro, Lampung
- Lokasi: Lampung, Indonesia
- Pendidikan: S1 Informatika, Universitas Bandar Lampung (UBL), Fakultas Ilmu Komputer
- Keahlian utama: Web Development & Augmented Reality (AR)

SKILLS:
- Languages: PHP (90%), JavaScript (88%), Python (75%), C# (70%)
- Frameworks: Laravel (90%), React (85%), Vue.js (82%), Tailwind CSS (92%), Svelte (72%)
- Tools: MySQL (85%), Git (80%), Vanilla JS (88%), AR Development/Unity/Vuforia (78%)

PENGALAMAN & TIMELINE:
- 2019: Mulai kuliah S1 Informatika di UBL
- 2021: Project AR pertama — Aplikasi AR Lembah Hijau menggunakan Unity & Vuforia
- 2025: Bergabung di Dinas Kominfotik Kota Metro sebagai developer

PROJECTS:
1. AR Lembah Hijau — AR wisata dengan Unity & Vuforia, informasi interaktif & 3D overlay
2. AR Komponen Komputer — Media pembelajaran AR untuk SMKN 8 Bandar Lampung
3. AR Alat Musik Tradisional — Mengenalkan alat musik Lampung dengan audio & model 3D
4. drive.metrokota.go.id — Sistem manajemen file Pemerintah Kota Metro (Laravel, MySQL)
5. PPDB Kota Metro — Sistem pendaftaran sekolah online multi-sekolah (Laravel, MySQL)
6. Bank Sampah 21 Yosodadi — Manajemen transaksi sampah & poin nasabah (mutiara21.metrokota.go.id)
7. Retribusi Sampah Kota Metro — Sistem retribusi & laporan keuangan (retribusi.metrokota.go.id)
8. Janji Jaga Polres Metro — Manajemen jadwal personel Polres Metro Pusat

KONTAK:
- LinkedIn: linkedin.com/in/bagas-dwijayanto-192531256
- GitHub: github.com/bagasdwijayanto
- Email & WhatsApp: tersedia di form Contact di website

Jawab dengan bahasa santai tapi profesional. Maksimal 3-4 kalimat per jawaban kecuali diminta detail.`

// Models to try in order — fallback if one is unavailable
const MODELS = [
  'gemini-2.0-flash',
  'gemini-2.0-flash-lite',
  'gemini-1.5-flash-latest',
  'gemini-1.5-flash',
]

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

export default async function handler(req) {
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: CORS })
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405, headers: CORS })
  }

  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'API key not configured' }), {
      status: 500, headers: { ...CORS, 'Content-Type': 'application/json' },
    })
  }

  let body
  try {
    body = await req.json()
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), { status: 400, headers: CORS })
  }

  const { messages } = body
  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return new Response(JSON.stringify({ error: 'messages array required' }), { status: 400, headers: CORS })
  }

  // Convert to Gemini format — merge system prompt as first user turn if needed
  const contents = messages.map(m => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }],
  }))

  const geminiBody = {
    system_instruction: {
      parts: [{ text: SYSTEM_PROMPT }],
    },
    contents,
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 512,
    },
    safetySettings: [
      { category: 'HARM_CATEGORY_HARASSMENT',        threshold: 'BLOCK_NONE' },
      { category: 'HARM_CATEGORY_HATE_SPEECH',       threshold: 'BLOCK_NONE' },
      { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_NONE' },
      { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_NONE' },
    ],
  }

  // Try each model until one succeeds
  let lastError = ''
  for (const model of MODELS) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`

    let geminiRes
    try {
      geminiRes = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(geminiBody),
      })
    } catch (fetchErr) {
      lastError = `Fetch failed: ${fetchErr.message}`
      continue
    }

    if (!geminiRes.ok) {
      const errText = await geminiRes.text()
      lastError = `${model} → HTTP ${geminiRes.status}: ${errText.slice(0, 200)}`
      // 404 = model not found, 429 = quota exceeded → try next model
      if (geminiRes.status === 404 || geminiRes.status === 429) {
        continue
      }
      return new Response(
        JSON.stringify({ error: lastError }),
        { status: geminiRes.status, headers: { ...CORS, 'Content-Type': 'application/json' } }
      )
    }

    const data = await geminiRes.json()
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text

    if (!text) {
      lastError = `${model} → empty response: ${JSON.stringify(data).slice(0, 200)}`
      continue
    }

    return new Response(
      JSON.stringify({ reply: text }),
      { status: 200, headers: { ...CORS, 'Content-Type': 'application/json' } }
    )
  }

  // All models failed
  return new Response(
    JSON.stringify({ error: `All models failed. Last error: ${lastError}` }),
    { status: 502, headers: { ...CORS, 'Content-Type': 'application/json' } }
  )
}
