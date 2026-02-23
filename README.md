# 7-Axis Operational Stance Diagnosis

A minimal, non-ideological framework to map how a person *operates*
within political, economic, and philosophical systems.

This tool does not measure beliefs.
It measures **operational stance** — how you enforce rules,
how you treat irreversibility, how you position yourself
between real and narrative layers, and where you locate legitimacy.

---

## The 7 Axes

1. Individual ↔ Collective  
2. Rule of Law ↔ Force  
3. Centralization ↔ Decentralization  
4. Minimal ↔ Maximal Enforcement  
5. Irreversibility ↔ Technological Reset  
6. Real Axis ↔ Narrative Axis  
7. Elite ↔ Popular Legitimacy  

Each axis is answered with A / B / C:

- A = Left endpoint  
- B = Right endpoint  
- C = Middle / Context-dependent  

Your operational stance becomes a 7-letter string.

Example:  
`C A C A C C C`

---

## Historical Figures Dataset

- `historical_figures.csv` (English)
- `historical_figures_jp.csv` (Japanese)

Each figure is mapped to the 7 axes with values from -1 to +1.

---

## How to Use

1. Answer the 7 questions (A/B/C)  
2. Convert A/B/C to numeric values (-1 / 0 / +1)  
3. Compare your vector to historical figures  
4. Compute similarity (cosine or Euclidean)

---

See `examples/yamamoto_result.md` for a sample representation.

## License

MIT License
