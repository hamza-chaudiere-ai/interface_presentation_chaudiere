// 📌 Composants
const composantsData = {
  eco_bt: { def: "Économiseur BT : récupère la chaleur des gaz pour préchauffer l'eau d'alimentation.", img: "img/eco_bt.png" },
  eco_ht: { def: "Économiseur HT : augmente l'efficacité thermique en réduisant la température des fumées.", img: "img/eco_ht.png" },
  rch_bt: { def: "Réchauffeur BT : élève la température de l'eau de retour pour éviter les chocs thermiques.", img: "img/rch_bt.png" },
  rch_ht: { def: "Réchauffeur HT : préchauffage intensif de l'eau en circuit haute pression.", img: "img/rch_ht.png" },
  sur_bt: { def: "Surchauffeur BT : convertit la vapeur humide en vapeur sèche à basse pression.", img: "img/sur_bt.png" },
  sur_ht: { def: "Surchauffeur HT : produit de la vapeur surchauffée pour turbines haute pression.", img: "img/sur_ht.png" }
};

function showComposant(id) {
  const composant = composantsData[id];
  document.getElementById("composant_affichage").innerHTML = `
    <p><strong>${composant.def}</strong></p>
    <img src="${composant.img}" alt="${id}" style="max-width:600px; border-radius:8px;">
  `;
}

// 📌 Causes
const causeData = {
  humidite: { def: "Le taux d’humidité supérieur à 10% diminue l'efficacité de la combustion.", img: "", details: "- Humidité :\n• Diminution de l'efficacité\n• Corrosion échangeurs." },
  cendres: { def: "Un taux de cendres > 14% favorise l’érosion des tubes.", img: "", details: "- Cendres :\n• Erosion tubes\n• Slagging non homogène." },
  soufre: { def: "Une teneur en soufre > 1% génère des gaz acides.", img: "", details: "- Soufre :\n• Apparition gaz acide\n• Corrosion tubes." },
  hardgrove: { def: "Indice de broyabilité élevé favorise la formation de scories.", img: "", details: "- Hardgrove :\n• Apparition scories\n• Hausse température chaudière." },
  granulometrie: { def: "Granulométrie non adaptée altère la combustion.", img: "", details: "- Granulométrie :\n• Moindre contact charbon/combustion." },
  caustic: { def: "Attaque caustique par alcalinité excessive.", img: "img/im1.png", details: "- Caustic Attack :\n• Dépôts ➔ pH élevé ➔ corrosion localisée." },
  oxygen: { def: "Piqûres d'oxygène sur les échangeurs.", img: "img/im2.png", details: "- Oxygen Pitting :\n• Corrosion lors des arrêts ou mauvaise purge." },
  hydrogen: { def: "Dégradation intergranulaire par hydrogène.", img: "img/im3.png", details: "- Hydrogen Damage :\n• Fissures inter-granulaires par acidité dépôt." },
  acid: { def: "Attaque acide interne.", img: "img/im4.png", details: "- Acid Attack :\n• Mauvais nettoyage ➔ corrosion type fromage suisse." },
  scc: { def: "Fissuration sous contrainte corrosive (SCC).", img: "img/im5.png", details: "- SCC :\n• Fissures sur matériaux soumis à traction + corrosion." }
};

function showCause(id) {
  const cause = causeData[id];
  document.getElementById("cause_affichage").innerHTML = `
    <p><strong>${cause.def}</strong></p>
    ${cause.img ? `<img src="${cause.img}" alt="${id}" style="max-width:600px; border-radius:8px;">` : ""}
    <br><button onclick="openPopup('${id}', 'cause')" class="file-btn">➕ Plus de détails</button>
  `;
}

// 📌 Contrôles
const controlesData = {
  echangeur: { def: "Contrôle visuel + épaisseurs échangeurs chaudière.", img: "img/controle_echangeur.png", details: "- Contrôle visuel général.\n- Mesure épaisseurs zones critiques (coudes MER)." },
  bp: { def: "Contrôle BP/HP par courant de Foucault.", img: "img/controle_echangeur_bphp.png", details: "- Sonde ➔ détection défauts ➔ bouchage ou remplacement échangeur." },
  vertiscan: { def: "Verti-scan par champ lointain Foucault.", img: "img/controle_vertiscan.png", details: "- Détection corrosion / fissures ➔ champ profond." },
  soudures: { def: "Contrôle des soudures (Visuel + PAUT).", img: "img/controle_soudures.png", details: "- Contrôle visuel ➔ ressuage ➔ PAUT ➔ réparations." },
  structure: { def: "Analyse microstructurale (BCI).", img: "img/controle_structure.png", details: "- Découpe échantillon ➔ analyse microstructure métallique." },
  heps: { def: "Contrôle HEPS tubes HP.", img: "img/controle_heps.png", details: "- Suivi soudures critiques ➔ empreinte durée de vie tube." }
};

function showControle(id) {
  const controle = controlesData[id];
  document.getElementById("controle_affichage").innerHTML = `
    <p><strong>${controle.def}</strong></p>
    ${controle.img ? `<img src="${controle.img}" alt="${id}" style="max-width:600px; border-radius:8px;">` : ""}
    <br><button onclick="openPopup('${id}', 'controle')" class="file-btn">➕ Plus de détails</button>
  `;
}

// 📌 Popup (Causes + Contrôles)
function openPopup(id, type) {
  if (type === "cause") {
    document.getElementById('popup-text').innerText = causeData[id].details;
  } else if (type === "controle") {
    document.getElementById('popup-text').innerText = controlesData[id].details;
  }
  document.getElementById('popup').style.display = "block";
}

function closePopup() {
  document.getElementById('popup').style.display = "none";
}

// 📌 Changement de section
function showSection(id) {
  document.querySelectorAll(".section").forEach(sec => sec.classList.remove("active"));
  const section = document.getElementById(id);
  if (section) section.classList.add("active");
}

// 📌 Analyse AMDEC
function analyser() {
  fetch("output_amdec.json")
    .then(response => response.json())
    .then(data => afficherTableauAMDEC(data))
    .catch(error => console.error("Erreur chargement JSON:", error));
}

// 📌 Affichage Tableau AMDEC
function afficherTableauAMDEC(data) {
  const tbody = document.querySelector("#tableauAMDEC tbody");
  tbody.innerHTML = "";

  data.forEach(row => {
    const F = parseInt(row.f) || 1;
    const G = parseInt(row.g) || 1;
    const D = parseInt(row.d) || 1;
    const C = F * G * D;

    let criticiteClass = "";
    if (C >= 40) criticiteClass = "high";
    else if (C >= 20) criticiteClass = "medium";
    else criticiteClass = "low";

    const tr = document.createElement("tr");
    tr.setAttribute("data-criticite", criticiteClass);
    tr.innerHTML = `
      <td>${row.composant || ""}</td>
      <td>${row.sous || ""}</td>
      <td>${row.def || ""}</td>
      <td>${row.cause || ""}</td>
      <td>${row.effet || ""}</td>
      <td>${F}</td>
      <td>${G}</td>
      <td>${D}</td>
      <td>${C}</td>
      <td>${row.action || ""}</td>
    `;
    tbody.appendChild(tr);
  });
}

// 📌 Gestion de la page de garde (Cover)
function enterSite() {
  const cover = document.getElementById('cover');
  cover.classList.add('fade-out');
  setTimeout(() => {
    cover.style.display = "none";
  }, 1000); // correspond à 1s de transition
}
