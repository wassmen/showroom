# Prompt pour agent IA — Tableau de bord admin du showroom

> Copie-colle le bloc ci-dessous dans ton agent IA. Il reprend le thème visuel déjà défini pour le site vitrine (thème sombre, accents or/bronze, interface en français) pour que le dashboard ait une cohérence visuelle avec le front-end.

---

## PROMPT

Tu es un développeur front-end/full-stack senior. Construis un **tableau de bord d'administration** pour le propriétaire d'un showroom automobile. Priorité absolue : **simplicité d'usage** — le propriétaire n'est pas à l'aise avec l'informatique, donc chaque action doit être évidente, sans jargon technique, avec des confirmations claires avant toute suppression ou modification importante.

### Charte graphique

- Reprend exactement le thème du site vitrine existant : **thème sombre, accents or/bronze**, interface entièrement en **français**.
- Typographie et espacements clairs, gros boutons lisibles, icônes explicites à côté du texte (pas d'icône seule sans label).
- Design **responsive** : utilisable aussi bien sur ordinateur que sur tablette ou téléphone (le propriétaire pourrait gérer son stock depuis son téléphone).

### 1. Écran de connexion

- Connexion simple et sécurisée (email + mot de passe) réservée au propriétaire / aux administrateurs.

### 2. Vue d'ensemble (page d'accueil du dashboard)

- Résumé visuel en un coup d'œil : nombre total de voitures en stock, nombre de voitures vendues/réservées, nombre de voitures disponibles, éventuellement les dernières réservations reçues via le site.
- Menu de navigation clair vers les sections ci-dessous (barre latérale ou barre en haut, selon la taille d'écran).

### 3. Gestion du stock / des voitures

- **Liste de toutes les voitures** avec photo miniature, nom/modèle, marque, prix, statut (disponible / réservé / vendu).
- **Ajouter une voiture** : formulaire simple avec upload de photos (glisser-déposer accepté), marque, modèle, année, prix, kilométrage, couleur(s) disponibles, description, statut.
- **Modifier une voiture** : mêmes champs pré-remplis, modifiables un par un.
- **Supprimer une voiture** : bouton clair avec **confirmation obligatoire** ("Es-tu sûr de vouloir supprimer cette voiture ? Cette action est irréversible") avant toute suppression définitive.
- **Changer le prix** rapidement, sans devoir rouvrir tout le formulaire (édition rapide en ligne dans le tableau).
- **Changer les images** d'une voiture existante (ajouter, remplacer, réordonner, supprimer une photo).
- Filtrage et recherche dans la liste (par marque, statut, prix).

### 4. Gestion du contenu du site

- **Section contact** : modifier l'email de contact et le numéro de téléphone affichés sur le site vitrine.
- **Localisation** : modifier l'adresse du showroom (et idéalement les coordonnées GPS si une carte est utilisée sur le site).
- Toute modification ici doit se refléter directement sur le site vitrine public, sans intervention technique.

### 5. Gestion des réservations (si applicable)

- Liste des réservations reçues depuis le site (nom du client, téléphone, email, voiture réservée, statut du paiement).
- Possibilité de marquer une réservation comme confirmée, annulée, ou terminée.

### Exigences générales

- Chaque action destructive ou importante (suppression, changement de prix) demande une **confirmation explicite**.
- Messages de succès/erreur clairs après chaque action ("Voiture ajoutée avec succès", "Erreur : merci de remplir tous les champs").
- Pas d'écran vide ou de jargon technique (pas de "404", pas de messages d'erreur en anglais ou en code) — toujours un message compréhensible en français.
- Sauvegarde automatique ou bouton "Enregistrer" bien visible, jamais de perte de données sans avertissement.
- Architecture pensée pour se connecter à la même base de données/API que le site vitrine, afin que les changements soient immédiats.

---

## Notes — précisions que j'ai ajoutées

- J'ai ajouté des **confirmations obligatoires avant suppression** et des **messages d'erreur en français simples**, car tu as insisté sur l'accessibilité pour les non-initiés — c'est ce qui évite les erreurs irréversibles.
- J'ai ajouté une **vue d'ensemble** (page d'accueil du dashboard) qui n'était pas explicitement demandée, mais qui aide un utilisateur non technique à comprendre l'état de son stock en un coup d'œil avant de plonger dans le détail.
- J'ai précisé que le dashboard doit utiliser **la même base de données/API** que le site vitrine, pour que les changements de prix, stock, contact et localisation soient reflétés immédiatement sur le site public.
