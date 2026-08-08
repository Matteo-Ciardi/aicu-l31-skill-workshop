# L31 - Crea una skill dal tuo processo

Questo workshop non contiene una soluzione da copiare. Parti da un processo che ripeti davvero e costruisci con il tuo agente una skill locale utile a te.

## Requisiti locali

- Node.js 24, 25 o 26;
- pnpm 11.5.1;
- un harness che supporti Agent Skills, oppure un agente capace di leggere il file fallback incluso.

Non ci sono dipendenze da installare.

## Punto di partenza

Usa prima l'eventuale skill dedicata alla creazione di skill disponibile nel tuo harness. Se non e' disponibile o non viene rilevata, usa il fallback incluso nella repository.

La repository contiene:

- `.agents/skills/create-repository-skill/SKILL.md`: fallback portabile per creare una skill;
- `CONSEGNA.md`: attività essenziale;
- `pnpm validate:skill`: validatore locale e deterministico del formato minimo;
- `pnpm check`: verifica dello starter.

## Verifica iniziale

```bash
pnpm check
```

Quando hai creato la tua skill:

```bash
pnpm validate:skill
```

Puoi anche validare un percorso preciso:

```bash
pnpm validate:skill -- .agents/skills/nome-skill/SKILL.md
```

## Riferimenti

- [Agent Skills specification](https://agentskills.io/specification)
- [OpenCode Agent Skills](https://opencode.ai/docs/skills/)
