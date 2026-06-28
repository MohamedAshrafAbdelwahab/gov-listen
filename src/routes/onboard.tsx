import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { ArrowRight, Sparkles, User } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { useAppLang, useT } from "@/lib/use-lang";
import { getProfile, saveProfile } from "@/lib/storage";
import { getAllCountryCodes, AFRICAN_REGIONS } from "@/lib/country-codes";

export const Route = createFileRoute("/onboard")({
  head: () => ({ meta: [{ title: "Gov-Listen — Get started" }] }),
  component: OnboardPage,
});

function OnboardPage() {
  const [lang] = useAppLang();
  const t = useT(lang);
  const navigate = useNavigate();
  const profile = getProfile();

  const allCodes = useMemo(() => getAllCountryCodes(), []);

  const [name, setName] = useState(profile?.name ?? "");
  const [nameError, setNameError] = useState("");

  const parsePhone = (full: string | undefined): [string, string] => {
    if (!full) return ["+20", ""];
    const sorted = [...allCodes].sort((a, b) => b.code.length - a.code.length);
    for (const c of sorted) {
      if (full.startsWith(c.code)) return [c.code, full.slice(c.code.length)];
    }
    return ["+20", full];
  };

  const [countryCode, setCountryCode] = useState(parsePhone(profile?.phone)[0]);
  const [phoneNumber, setPhoneNumber] = useState(parsePhone(profile?.phone)[1]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();

    const normalizedName = name.trim();
    if (!normalizedName) {
      setNameError(t.nameRequired ?? "Name is required");
      return;
    }

    setNameError("");
    const normalizedPhone = phoneNumber.trim() ? `${countryCode}${phoneNumber.trim()}` : undefined;

    saveProfile({
      ...(profile ?? { lang, country: "", consented: true }),
      name: normalizedName,
      phone: normalizedPhone,
      lang,
      country: profile?.country ?? "",
      city: profile?.city,
      consented: profile?.consented ?? true,
    });

    navigate({ to: "/home" });
  };

  return (
    <AppShell dir={lang === "ar" ? "rtl" : "ltr"}>
      <form onSubmit={submit} className="flex-1 flex flex-col px-6 pt-12 pb-8">
        <div className="size-12 rounded-2xl bg-primary/10 grid place-items-center mb-6">
          <Sparkles className="size-6 text-primary" />
        </div>
        <h1 className="font-display text-2xl font-extrabold text-primary mb-2">{t.aboutTitle}</h1>
        <p className="text-muted-foreground text-[15px] leading-relaxed mb-8">{t.aboutBody}</p>

        <div className="card-soft p-5 mb-4">
          <label className="block text-[10px] font-bold tracking-[0.18em] text-muted-foreground uppercase mb-2">
            {t.yourName}
          </label>
          <div className="flex items-center gap-3">
            <User className="size-5 text-muted-foreground shrink-0" />
            <input
              autoFocus
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (nameError) setNameError("");
              }}
              placeholder={t.namePlaceholder}
              className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground font-medium"
              required
            />
          </div>
          {nameError ? <p className="mt-2 text-sm text-destructive">{nameError}</p> : null}
        </div>

        <div className="card-soft p-5 mb-8">
          <label className="block text-[10px] font-bold tracking-[0.18em] text-muted-foreground uppercase mb-2">
            {t.yourPhone}
          </label>
          <div className="flex items-center gap-2">
            <select
              value={countryCode}
              onChange={(e) => setCountryCode(e.target.value)}
              className="appearance-none bg-transparent text-foreground font-medium text-sm px-1 py-1.5 shrink-0 w-16"
            >
              {AFRICAN_REGIONS.map((region) => (
                <optgroup key={region.nameEn} label={region.nameEn}>
                  {region.countries.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.code}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ""))}
              placeholder={lang === "ar" ? "مثال 100 123 4567" : "e.g. 100 123 4567"}
              className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground font-medium"
              dir="ltr"
            />
          </div>
        </div>

        <div className="flex-1" />

        <button
          type="submit"
          className="w-full bg-primary text-primary-foreground rounded-2xl py-4 font-semibold flex items-center justify-center gap-2 shadow-soft active:scale-[0.98]"
        >
          {t.save}
          <ArrowRight className={`size-5 ${lang === "ar" ? "rotate-180" : ""}`} />
        </button>
      </form>
    </AppShell>
  );
}
