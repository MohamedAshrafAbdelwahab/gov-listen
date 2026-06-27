import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/transcribe")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const key = process.env.GEMINI_API_KEY;
        if (!key) return new Response("Missing GEMINI_API_KEY", { status: 500 });

        const form = await request.formData();
        const file = form.get("file");
        const lang = (form.get("lang") as string | null) ?? undefined;
        if (!(file instanceof File)) {
          return new Response("Missing audio file", { status: 400 });
        }

        const upstream = new FormData();
        upstream.append("file", file, file.name || "recording.webm");
        upstream.append("model", "gemini-3.5-flash");
        if (lang) upstream.append("language", lang);

        const res = await fetch("https://generativelanguage.googleapis.com/v1beta/openai/audio/transcriptions", {
          method: "POST",
          headers: { Authorization: `Bearer ${key}` },
          body: upstream,
        });

        if (!res.ok) {
          const txt = await res.text().catch(() => "");
          return new Response(txt || `Transcription failed (${res.status})`, { status: res.status });
        }
        const data = (await res.json()) as { text?: string };
        return Response.json({ text: data.text ?? "" });
      },
    },
  },
});
