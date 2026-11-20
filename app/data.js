/* Données d'illustration : clients, créations, équipes et tournages inventés pour montrer le fonctionnement. */
window.P = {
  version: '2026-11-20d',
  today: '2026-11-20',
  semaine: ['2026-11-23', '2026-11-24', '2026-11-25', '2026-11-26', '2026-11-27', '2026-11-28'],
  clients: {
    LB: { nom: 'Lagune Banque', c: '#0F5C8C', cp: 'KA', contact: 'Responsable communication' },
    SB: { nom: 'Savane Boissons', c: '#D9731C', cp: 'RB', contact: 'Cheffe de marque' },
    NC: { nom: 'Nanan Cosmétiques', c: '#B0477A', cp: 'RB', contact: 'Directrice marketing' },
    EM: { nom: 'Ébène Mobile', c: '#3A3A9E', cp: 'KA', contact: 'Responsable digital' },
    AD: { nom: 'ADICOM Days 2026', c: '#964C97', cp: 'KA', contact: 'Comité d\'organisation' }
  },
  personnes: {
    MK: { nom: 'Mariam Koné', court: 'Mariam', role: 'Directrice artistique', c: '#141414' },
    KA: { nom: 'Kevin Assi', court: 'Kevin', role: 'Chef de projet', c: '#5B6B00' },
    RB: { nom: 'Ruth Bamba', court: 'Ruth', role: 'Cheffe de projet', c: '#0F5C8C' },
    HD: { nom: 'Hervé Dago', court: 'Hervé', role: 'Vidéaste', c: '#DD4549' },
    NT: { nom: 'Nadège Tanoh', court: 'Nadège', role: 'Graphiste', c: '#B0477A' },
    AK: { nom: 'Ange Kouadio', court: 'Ange', role: 'Motion designer', c: '#964C97' },
    KS: { nom: 'Kader Sylla', court: 'Kader', role: 'Monteur', c: '#D9731C' }
  },
  types: {
    post: { nom: 'Post', ic: 'image', ratio: '1/1' },
    video: { nom: 'Vidéo', ic: 'play', ratio: '16/9' },
    story: { nom: 'Story', ic: 'smartphone', ratio: '9/16' },
    banniere: { nom: 'Bannière', ic: 'monitor', ratio: '3/1' }
  },
  etapes: [
    { k: 'brief', nom: 'Brief reçu', court: 'Brief' },
    { k: 'prod', nom: 'En création', court: 'Création' },
    { k: 'da', nom: 'Validation DA', court: 'DA' },
    { k: 'cp', nom: 'Validation chef de projet', court: 'Chef de projet' },
    { k: 'client', nom: 'Chez le client', court: 'Client' },
    { k: 'livre', nom: 'Validée et livrée', court: 'Livrée' }
  ],
  imgs: ['DSC04101', 'DSC04028', 'DSC03990', 'DSC04018', 'DSC03911', 'adicom-scene', 'DSC03958'],
  /* e : étape ; v : version ; r : réalisateur ; du : livraison prévue ; env : envoyé au client le ; cu : tâche ClickUp ; h : historique */
  creas: [
    { id: 'C01', cl: 'LB', ty: 'video', t: 'Spot épargne 30 s', camp: 'Épargne de fin d\'année', e: 'client', v: 2, r: 'HD', du: '2026-11-24', env: '2026-11-17', cu: 'CU-4812', img: 4, pos: '50% 40%',
      h: [['2026-11-10', 'V1 déposée', 'HD'], ['2026-11-11', 'DA : retour, rythme trop lent au début', 'MK', 'r'], ['2026-11-14', 'V2 déposée', 'HD'], ['2026-11-14', 'DA : validé', 'MK', 'ok'], ['2026-11-17', 'Chef de projet : validé, envoyé au client', 'KA', 'ok']] },
    { id: 'C02', cl: 'LB', ty: 'post', t: 'Carrousel « 5 réflexes épargne »', camp: 'Épargne de fin d\'année', e: 'client', v: 1, r: 'NT', du: '2026-11-23', env: '2026-11-16', cu: 'CU-4813', img: 0, pos: '60% 30%',
      h: [['2026-11-13', 'V1 déposée', 'NT'], ['2026-11-13', 'DA : validé', 'MK', 'ok'], ['2026-11-16', 'Chef de projet : validé, envoyé au client', 'KA', 'ok']] },
    { id: 'C03', cl: 'LB', ty: 'story', t: 'Story agence du Plateau', camp: 'Épargne de fin d\'année', e: 'prod', v: 1, r: 'AK', du: '2026-11-26', cu: 'CU-4814', img: 2, pos: '50% 50%', h: [['2026-11-18', 'Brief reçu', 'KA']] },
    { id: 'C04', cl: 'LB', ty: 'banniere', t: 'Bannière site, offre jeunes', camp: 'Compte jeunes', e: 'livre', v: 3, r: 'NT', du: '2026-11-18', env: '2026-11-14', cu: 'CU-4790', img: 6, pos: '50% 35%',
      h: [['2026-11-10', 'V1 déposée', 'NT'], ['2026-11-10', 'DA : validé', 'MK', 'ok'], ['2026-11-11', 'Chef de projet : validé', 'KA', 'ok'], ['2026-11-12', 'Client : retour, changer l\'accroche', 'Client', 'r'], ['2026-11-13', 'V2 déposée et validée en interne', 'NT', 'ok'], ['2026-11-17', 'Client : validé, VFinale livrée', 'Client', 'ok']] },
    { id: 'C05', cl: 'SB', ty: 'video', t: 'Spot 15 s « Fraîcheur »', camp: 'Lancement saveur gingembre', e: 'brief', v: 1, r: 'HD', du: '2026-11-30', cu: 'CU-4840', img: 5, pos: '50% 50%', h: [['2026-11-19', 'Brief reçu, tournage le 23/11', 'RB']] },
    { id: 'C06', cl: 'SB', ty: 'post', t: 'Visuel produit, saveur gingembre', camp: 'Lancement saveur gingembre', e: 'da', v: 2, r: 'NT', du: '2026-11-24', cu: 'CU-4841', img: 3, pos: '40% 40%',
      h: [['2026-11-16', 'V1 déposée', 'NT'], ['2026-11-17', 'DA : retour, bouteille trop petite', 'MK', 'r'], ['2026-11-19', 'V2 déposée', 'NT']] },
    { id: 'C07', cl: 'SB', ty: 'story', t: 'Story jeu concours', camp: 'Lancement saveur gingembre', e: 'client', v: 1, r: 'AK', du: '2026-11-25', env: '2026-11-19', cu: 'CU-4842', img: 1, pos: '50% 40%',
      h: [['2026-11-17', 'V1 déposée', 'AK'], ['2026-11-18', 'DA : validé', 'MK', 'ok'], ['2026-11-19', 'Chef de projet : validé, envoyé au client', 'RB', 'ok']] },
    { id: 'C08', cl: 'SB', ty: 'banniere', t: 'Bannière e-commerce', camp: 'Lancement saveur gingembre', e: 'cp', v: 1, r: 'NT', du: '2026-11-25', cu: 'CU-4843', img: 6, pos: '50% 60%',
      h: [['2026-11-18', 'V1 déposée', 'NT'], ['2026-11-19', 'DA : validé', 'MK', 'ok']] },
    { id: 'C09', cl: 'SB', ty: 'post', t: 'Post recette cocktail', camp: 'Fêtes de fin d\'année', e: 'livre', v: 3, r: 'NT', du: '2026-11-17', env: '2026-11-12', cu: 'CU-4801', img: 3, pos: '60% 50%',
      h: [['2026-11-10', 'V1 déposée et validée en interne', 'NT', 'ok'], ['2026-11-12', 'Envoyé au client', 'RB', 'ok'], ['2026-11-13', 'Client : validé, VFinale livrée', 'Client', 'ok']] },
    { id: 'C10', cl: 'NC', ty: 'story', t: 'Routine beauté, épisode 1', camp: 'Gamme karité', e: 'client', v: 2, r: 'AK', du: '2026-11-21', env: '2026-11-13', cu: 'CU-4822', img: 0, pos: '30% 40%',
      h: [['2026-11-09', 'V1 déposée', 'AK'], ['2026-11-10', 'DA : validé', 'MK', 'ok'], ['2026-11-10', 'Chef de projet : retour, logo absent', 'RB', 'r'], ['2026-11-12', 'V2 déposée et validée en interne', 'AK', 'ok'], ['2026-11-13', 'Envoyé au client', 'RB', 'ok']] },
    { id: 'C11', cl: 'NC', ty: 'story', t: 'Routine beauté, épisode 2', camp: 'Gamme karité', e: 'client', v: 1, r: 'AK', du: '2026-11-24', env: '2026-11-18', cu: 'CU-4823', img: 2, pos: '50% 30%',
      h: [['2026-11-16', 'V1 déposée', 'AK'], ['2026-11-17', 'DA : validé', 'MK', 'ok'], ['2026-11-18', 'Chef de projet : validé, envoyé au client', 'RB', 'ok']] },
    { id: 'C12', cl: 'NC', ty: 'post', t: 'Visuel avant / après', camp: 'Gamme karité', e: 'prod', v: 2, r: 'NT', du: '2026-11-23', cu: 'CU-4824', img: 1, pos: '50% 50%',
      h: [['2026-11-16', 'V1 déposée', 'NT'], ['2026-11-18', 'DA : retour, lumière trop froide', 'MK', 'r']] },
    { id: 'C13', cl: 'NC', ty: 'video', t: 'Film influenceuse 45 s', camp: 'Gamme karité', e: 'brief', v: 1, r: 'HD', du: '2026-12-02', cu: 'CU-4825', img: 4, pos: '50% 50%', h: [['2026-11-20', 'Brief reçu, tournage le 24/11', 'RB']] },
    { id: 'C14', cl: 'EM', ty: 'video', t: 'Micro-trottoir « Mon forfait »', camp: 'Forfaits jeunes', e: 'brief', v: 1, r: 'HD', du: '2026-12-03', cu: 'CU-4860', img: 5, pos: '50% 60%', h: [['2026-11-19', 'Brief reçu, tournage le 26/11', 'KA']] },
    { id: 'C15', cl: 'EM', ty: 'banniere', t: 'Bannière application', camp: 'Forfaits jeunes', e: 'da', v: 1, r: 'NT', du: '2026-11-24', cu: 'CU-4861', img: 6, pos: '50% 50%', h: [['2026-11-20', 'V1 déposée', 'NT']] },
    { id: 'C16', cl: 'EM', ty: 'post', t: 'Post comparatif forfaits', camp: 'Forfaits jeunes', e: 'cp', v: 2, r: 'NT', du: '2026-11-23', cu: 'CU-4862', img: 0, pos: '70% 40%',
      h: [['2026-11-16', 'V1 déposée', 'NT'], ['2026-11-17', 'DA : retour, trop de texte', 'MK', 'r'], ['2026-11-19', 'V2 déposée', 'NT'], ['2026-11-19', 'DA : validé', 'MK', 'ok']] },
    { id: 'C17', cl: 'EM', ty: 'story', t: 'Story sondage', camp: 'Forfaits jeunes', e: 'livre', v: 3, r: 'AK', du: '2026-11-19', env: '2026-11-17', cu: 'CU-4850', img: 2, pos: '40% 50%',
      h: [['2026-11-14', 'V1 déposée et validée en interne', 'AK', 'ok'], ['2026-11-17', 'Envoyé au client', 'KA', 'ok'], ['2026-11-18', 'Client : validé, VFinale livrée', 'Client', 'ok']] },
    { id: 'C18', cl: 'EM', ty: 'video', t: 'Tutoriel recharge 20 s', camp: 'Forfaits jeunes', e: 'client', v: 1, r: 'KS', du: '2026-11-26', env: '2026-11-20', cu: 'CU-4863', img: 1, pos: '50% 40%',
      h: [['2026-11-18', 'V1 déposée', 'KS'], ['2026-11-19', 'DA : validé', 'MK', 'ok'], ['2026-11-20', 'Chef de projet : validé, envoyé au client', 'KA', 'ok']] },
    { id: 'C19', cl: 'AD', ty: 'video', t: 'Teaser 10e édition', camp: 'Annonce ADICOM Days', e: 'prod', v: 1, r: 'KS', du: '2026-11-27', cu: 'CU-4870', img: 5, pos: '50% 50%', h: [['2026-11-17', 'Brief reçu', 'KA']] },
    { id: 'C20', cl: 'AD', ty: 'post', t: 'Annonce des intervenants', camp: 'Annonce ADICOM Days', e: 'da', v: 1, r: 'NT', du: '2026-11-23', cu: 'CU-4871', img: 0, pos: '50% 50%', h: [['2026-11-19', 'V1 déposée', 'NT']] },
    { id: 'C21', cl: 'AD', ty: 'banniere', t: 'Bannière billetterie', camp: 'Annonce ADICOM Days', e: 'client', v: 2, r: 'NT', du: '2026-11-22', env: '2026-11-16', cu: 'CU-4872', img: 6, pos: '50% 40%',
      h: [['2026-11-12', 'V1 déposée', 'NT'], ['2026-11-13', 'DA : retour, date peu lisible', 'MK', 'r'], ['2026-11-14', 'V2 déposée et validée en interne', 'NT', 'ok'], ['2026-11-16', 'Envoyé au comité', 'KA', 'ok']] },
    { id: 'C22', cl: 'AD', ty: 'story', t: 'Compte à rebours J-30', camp: 'Annonce ADICOM Days', e: 'livre', v: 3, r: 'AK', du: '2026-11-18', env: '2026-11-16', cu: 'CU-4866', img: 3, pos: '50% 50%',
      h: [['2026-11-13', 'V1 déposée et validée en interne', 'AK', 'ok'], ['2026-11-16', 'Envoyé au comité', 'KA', 'ok'], ['2026-11-17', 'Comité : validé, VFinale livrée', 'Client', 'ok']] },
    { id: 'C23', cl: 'LB', ty: 'post', t: 'Post conseil budget', camp: 'Épargne de fin d\'année', e: 'cp', v: 1, r: 'NT', du: '2026-11-24', cu: 'CU-4815', img: 1, pos: '30% 50%', h: [['2026-11-18', 'V1 déposée', 'NT'], ['2026-11-19', 'DA : validé', 'MK', 'ok']] },
    { id: 'C24', cl: 'NC', ty: 'banniere', t: 'Bannière boutique en ligne', camp: 'Gamme karité', e: 'livre', v: 3, r: 'NT', du: '2026-11-16', env: '2026-11-11', cu: 'CU-4795', img: 2, pos: '60% 40%',
      h: [['2026-11-09', 'V1 déposée et validée en interne', 'NT', 'ok'], ['2026-11-11', 'Envoyé au client', 'RB', 'ok'], ['2026-11-12', 'Client : retour, prix à retirer', 'Client', 'r'], ['2026-11-13', 'V2 envoyée', 'NT', 'ok'], ['2026-11-14', 'Client : validé, VFinale livrée', 'Client', 'ok']] }
  ],
  materiel: {
    FX3: 'Caméra cinéma Sony FX3', A7: 'Hybride Sony A7 IV', DR: 'Drone DJI Mini 4', LUM: 'Kit lumière LED (3 panneaux)', HF: 'Micros sans fil (2 kits)', STAB: 'Stabilisateur DJI RS', PROMPT: 'Prompteur'
  },
  /* tournages de la semaine du 23 au 28 novembre */
  tournages: [
    { id: 'T1', d: '2026-11-23', h: ['09:00', '13:00'], cl: 'SB', t: 'Spot 15 s « Fraîcheur »', crea: 'C05', lieu: 'Studio de l\'agence', eq: ['HD', 'AK'], mat: ['FX3', 'LUM', 'STAB'], ok: { equipe: 1, lieu: 1, auto: null, client: 1 } },
    { id: 'T2', d: '2026-11-24', h: ['08:00', '12:00'], cl: 'LB', t: 'Témoignages clients', crea: 'C03', lieu: 'Agence du Plateau, chez le client', eq: ['HD', 'KS'], mat: ['FX3', 'HF', 'LUM'], ok: { equipe: 1, lieu: 1, auto: 1, client: 1 } },
    { id: 'T3', d: '2026-11-24', h: ['10:30', '14:00'], cl: 'NC', t: 'Film influenceuse 45 s', crea: 'C13', lieu: 'Studio de l\'agence', eq: ['AK', 'NT'], mat: ['FX3', 'LUM', 'PROMPT'], ok: { equipe: 1, lieu: 1, auto: null, client: 0 } },
    { id: 'T4', d: '2026-11-25', h: ['14:00', '18:00'], cl: 'AD', t: 'Interviews pour le teaser', crea: 'C19', lieu: '', eq: ['KS', 'HD'], mat: ['A7', 'HF', 'LUM'], ok: { equipe: 1, lieu: 0, auto: null, client: 1 } },
    { id: 'T5', d: '2026-11-26', h: ['07:30', '11:30'], cl: 'EM', t: 'Micro-trottoir « Mon forfait »', crea: 'C14', lieu: 'Yopougon, en extérieur', eq: ['HD', 'AK', 'KS'], mat: ['A7', 'HF', 'DR', 'STAB'], ok: { equipe: 1, lieu: 1, auto: 0, client: 1 } },
    { id: 'T6', d: '2026-11-27', h: ['09:00', '12:00'], cl: 'SB', t: 'Packshots bouteilles', crea: 'C06', lieu: 'Studio de l\'agence', eq: ['NT', 'HD'], mat: ['A7', 'LUM'], ok: { equipe: 1, lieu: 1, auto: null, client: 1 } }
  ]
};
