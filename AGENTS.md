# Indicazioni per l'agente

Questa repository serve a creare una skill custom a partire dal processo reale dello studente.

## Come lavorare

- Quando viene chiesto di creare una skill, usa la skill-creator nativa dell'harness se disponibile; altrimenti usa `.agents/skills/create-repository-skill/SKILL.md`.
- Fai al massimo tre domande, una alla volta, solo se cambiano davvero il risultato.
- Crea una sola directory `.agents/skills/<nome>/` e un solo `SKILL.md` minimo.
- Non copiare una skill di code review o l'esempio del docente.
- Non aggiungere script, reference o asset senza una necessita' concreta.
- Non modificare la skill fallback `create-repository-skill`.
- Non leggere o creare secret, credential o file di ambiente.
- Dopo la creazione, esegui `pnpm validate:skill` e riporta il risultato.
- Quando serve produrre un messaggio di commit, usa la skill `.agents/skills/generate-commit-message/SKILL.md` e mostra il messaggio; esegui `git commit` solo se l'utente lo chiede esplicitamente.
- Prova la nuova skill una volta prima di considerare concluso il lavoro.

## Compatibilita'

Mantieni il formato Agent Skills standard e usa `.agents/skills` per la portabilita' tra harness compatibili.
