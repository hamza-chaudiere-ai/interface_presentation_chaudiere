import pandas as pd
import json

# 1. Lire le fichier Excel brut
df = pd.read_excel("historique_simplifie.xlsx")

# 2. Renommer les colonnes pour correspondre aux clés du tableau AMDEC
df = df.rename(columns={
    "Sous-composant": "sous",
    "Mode de Défaillance": "def",
    "Cause": "cause",
    "Effet": "effet",
    "F": "f", "G": "g", "D": "d", "C": "c",
    "Actions Correctives": "action"
})

# 3. Convertir les colonnes F, G, D, C en entiers
df["f"] = pd.to_numeric(df["f"], errors="coerce").fillna(1).astype(int)
df["g"] = pd.to_numeric(df["g"], errors="coerce").fillna(1).astype(int)
df["d"] = pd.to_numeric(df["d"], errors="coerce").fillna(1).astype(int)
df["c"] = df["f"] * df["g"] * df["d"]

# 4. Exporter en JSON
data = df.to_dict(orient="records")
with open("output_amdec.json", "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print("✅ Fichier output_amdec.json généré avec succès.")
