# Consegna - Una skill dal tuo processo

## Obiettivo

Trasforma un processo che ripeti davvero in una skill locale per il tuo agente.

Non devi replicare la skill mostrata dal docente. Scegli qualcosa che abbia valore nel tuo modo di lavorare, per esempio:

- preparare una demo prima di una lezione o di una presentazione;
- verificare una chiamata API che sta fallendo;
- controllare accessibilita' e stati di una pagina;
- preparare una consegna tecnica chiara;
- analizzare un errore prima di proporre una modifica.

## Procedura

1. Descrivi all'agente il processo scelto in poche frasi.
2. Chiedi di usare la skill-creator disponibile nel tuo harness. Se non esiste o non viene rilevata, usa `create-repository-skill`.
3. Rispondi alle sue domande sul tuo processo.
4. Fagli creare una sola skill in `.agents/skills/<nome>/SKILL.md`.
5. Valida il file con `pnpm validate:skill`.
6. Invoca esplicitamente la nuova skill su un caso piccolo e realistico.
7. Correggi un solo elemento che durante la prova si e' rivelato ambiguo o inutile.

Prompt di partenza:

```txt
Usa la skill dedicata alla creazione di skill disponibile nel tuo harness. Se non ne hai una, usa create-repository-skill.

Voglio trasformare questo mio processo ricorrente in una skill locale:
[descrivi qui il processo e quando lo usi]

Fammi al massimo tre domande, una alla volta. Poi crea una sola skill minima e aiutami a verificarla su un caso piccolo. Non aggiungere script o documenti se non sono indispensabili.
```

## Output

- una skill custom diversa dall'esempio docente;
- un `SKILL.md` che supera `pnpm validate:skill`;
- una prova esplicita della skill;
- una sola revisione successiva alla prova.

Non serve una relazione e non serve completare altre feature.
