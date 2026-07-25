# LifeOS — Guida alla migrazione Angular

> Progetto: migrazione del mock HTML statico a SPA Angular 22 + Tailwind CSS 4.
> Stato aggiornato automaticamente man mano che i task vengono completati.

---

## Legenda

- ✅ Completato
- 🔄 In lavorazione
- ⏳ In attesa
- ❌ Bloccato

---

## Fase 0 — Setup (già fatto)

- [✅] `ng new lifeos` con Angular 22
- [✅] Tailwind CSS 4 configurato (`@import 'tailwindcss'`)
- [✅] Router incluso
- [✅] Test runner Vitest configurato

---

## Fase 1 — Data Layer ✅

- [✅] Creare `src/app/models/` con tutte le interfacce TypeScript
- [✅] Creare `src/app/services/mock-data.service.ts` — porting di `mock-data.js`
- [✅] Creare `src/app/services/theme.service.ts` — dark mode con segnale + localStorage
- [✅] Creare `src/app/services/storage.service.ts` — persistenza dati in localStorage

## Fase 2 — Layout Base ✅

- [✅] Creare `src/app/layout/sidebar/` — componente sidebar navigabile
- [✅] Creare `src/app/layout/topbar/` — componente topbar con tema + avatar
- [✅] Creare `src/app/layout/mobile-nav/` — navigazione mobile funzionante
- [✅] Integrare layout in `App` con `<router-outlet>`

## Fase 3 — Routing ✅

- [✅] Definire tutte le route in `app.routes.ts` con lazy loading
- [✅] Aggiungere redirect `/` → dashboard

## Fase 4 — Pagine ✅

- [✅] `DashboardPage` — griglia con agenda, tasks, budget, scadenze, meal planner, documenti recenti, casa, salute, attività
- [✅] `AgendaPage` — timeline giornaliera, prossimi giorni, ricorrenze, promemoria, vista settimana
- [✅] `TasksPage` — nuova attività, oggi, inbox, prossimi, progetti, priorità, completati, statistiche
- [✅] `FinanzePage` — saldo, budget mese, obiettivi, conti, spese recenti, abbonamenti
- [✅] `DocumentiPage` — categorie, documenti recenti, scadenze, statistiche, upload
- [✅] `CasaPage` — stato casa, manutenzioni, stanze, garanzie, inventario, costi
- [✅] `CucinaPage` — meal planner, categorie, lista spesa, ricette preferite, ingredienti
- [✅] `SalutePage` — parametri, visite, esami, abitudini, promemoria, storico
- [✅] `ArchivioPage` — categorie, idee, libri, film, note, wishlist, cattura pensiero

## Fase 5 — Feature JavaScript ✅

- [✅] Toggle tema 🌙 / ☀️ con icona che cambia
- [✅] Checkbox tasks con persistenza localStorage
- [✅] Progress bar budget dinamica (calcolata da dati mock)
- [✅] Data generata dinamicamente (non hardcoded)
- [✅] Pulsante "+" task funzionante con input Invio
- [ ] Pulsanti "+" per evento, nota, ricetta, documento
- [ ] Ricerca 🔍 con filtro lato client
- [ ] Navigazione mobile funzionante (bottom nav con link) ✅ già fatta con routerLink

## Fase 6 — Mock → Dati Dinamici ✅

- [✅] Renderizzare `finances.balance` su `FinanzePage`
- [✅] Renderizzare `finances.accounts`, `finances.recentExpenses`, `finances.subscriptions`
- [✅] Renderizzare `documents[]` su `DocumentiPage`
- [✅] Renderizzare `recipes[]` su `CucinaPage`
- [✅] Renderizzare `meals` su Dashboard e `CucinaPage`
- [✅] Renderizzare `house.maintenance[]`, `house.warranties[]` su `CasaPage`
- [✅] Renderizzare `health` su `SalutePage`
- [✅] Renderizzare `activities[]` su Dashboard

## Fase 7 — Responsive ✅

- [✅] Sidebar collassabile/overlay su mobile (< 768px) — CSS già implementato
- [✅] Bottom navigation mobile funzionante — routerLink funzionante
- [✅] Pulsanti tema e ricerca visibili anche su mobile — tema sempre visibile
- [✅] Griglia dashboard a 1/2/3 colonne responsive — media query 1200px / 768px
- [ ] Test su viewport 375px, 768px, 1440px (manuale)

## Fase 8 — Accessibilità

- [✅] `aria-label` su pulsanti icona topbar
- [ ] Ruoli ARIA su navigazione (sidebar, mobile nav)
- [ ] `:focus-visible` su tutti gli elementi interattivi (anche in dark mode)
- [ ] Contrasto colori WCAG AA (dark mode)
- [ ] Skip-to-content link
- [ ] Heading gerarchici corretti

## Fase 9 — Polish

- [ ] Favicon 🧠
- [ ] `meta description` per ogni pagina (TitleService dinamico)
- [ ] Animazioni transizioni route
- [ ] Stato vuoto per sezioni senza dati ✅ già presenti nei template
- [ ] Unire e minificare asset per produzione (già fatto da Angular build)

## Fase 10 — Test

- [ ] Test unitari per services
- [ ] Test componenti pagine
- [ ] Test navigazione routing

## Fase 10 — Test

- [ ] Test unitari per services
- [ ] Test componenti pagine
- [ ] Test navigazione routing

---

## Milestones

| # | Milestone | Stato |
|---|-----------|-------|
| 1 | Setup e data layer | ✅ |
| 2 | Layout + routing funzionante | ✅ |
| 3 | DashboardPage completata | ✅ |
| 4 | Tutte le pagine renderizzate | ✅ |
| 5 | Feature dinamiche funzionanti | ✅ |
| 6 | Responsive + mobile ok | ✅ |
| 7 | Accessibilità WCAG AA | ⏳ |
| 8 | Test passano | ⏳ |
| 9 | Build produzione ok | ⏳ |
