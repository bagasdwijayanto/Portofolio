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
- Email: (minta lewat form contact di website)
- WhatsApp: (minta lewat form contact di website)

Jawab dengan bahasa santai tapi profesional. Maksimal 3-4 kalimat per jawaban kecuali diminta detail.`

export default async function handler(req) {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    })
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 })
  }

  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'API key not configured' }), { status: 500 })
  }

  let body
  try {
    body = await req.json()
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), { status: 400 })
  }

  const { messages } = body
  if (!messages || !Array.isArray(messages)) {
    return new Response(JSON.stringify({ error: 'messages array required' }), { status: 400 })
  }

  // Convert messages to Gemini format
  const contents = messages.map(m => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }],
  }))

  const geminiBody = {
    system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
    contents,
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 512,
    },
  }

  const geminiRes = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(geminiBody),
    }
  )

  if (!geminiRes.ok) {
    const err = await geminiRes.text()
    return new Response(JSON.stringify({ error: 'Gemini error', detail: err }), {
      status: geminiRes.status,
      headers: { 'Access-Control-Allow-Origin': '*' },
    })
  }

  const data = await geminiRes.json()
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? 'Maaf, tidak ada respons.'

  return new Response(JSON.stringify({ reply: text }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  })
}
