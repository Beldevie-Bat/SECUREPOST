# SECUREPOST
"SecurePost" - Système de Numérisation Sécurisé de Main Courante et Gestion de  Commissariat


# PRESENTATION
SECUREPOST est une application web full-stack conçue pour numeriser et moderniser la gestion d'un commissariat de police, il remplace les registres en papier traditionnels par une solution numérique plus sécurisée:

- L'enregistrement des mains courantes
- La gestion des plaintes
- La rédaction des procès-verbaux (PV)
- Le suivi des enquêtes
- et La traçabilité  des agents

## Objectifs du projet

- sécurisé les donnees,
-facilité le travail des agents,
reduire les erreurs liés aux registres en papier;
-produire des statistique d'aide pour des decision 

# comment sera construit le projet:

## Frontend

* HTML5
* CSS3
* JavaScript Vanilla

## Backend

* Python
* Flask
* Flask-SQLAlchemy

## Base de données

* PostgreSQL

LES FONCTIONNALITES:
-Connexion sécurisée
- Gestion des rôles (fonction)
- Protection des routes
- Création,consultation , la modification et la recherche de mains couarantes
- Enregistrement des plaintes 
-cloture de dossier
-la creation des proces-verbaux,
les statistiques(nombre de plaintes ,evolution de la criminalité)...

## structure du projet


SECUREPOST/
│
├── backend/
│   ├── routes/
│   │   ├── actes.py
│   │   ├── stactis.py
│   │   └── workspaces.py
│   ├── app.py
│   ├── configuration.py
│   └── database.py
│
├── Frontend/
│   ├── assets/
│   │   ├── images/
│   │   └── videos/
│   ├── CSS/
│   │   ├── dashbord.css
│   │   ├── style.css
│   │   └── variable.css
│   ├── Html/
│   │   ├── dashbord.html
│   │   ├── formulaire.html
│   │   ├── index.html
│   │   └── login.html
│   └── SCRIPT/
│       ├── api.js
│       ├── auth.js
│       ├── dashboard.js
│       └── statistique.js
│
├── Secure.mdj
└── README.md


# Equipe Projet
ce projet est réalisé dans un cadre du cours en base de données

MOA(Maître d'Ouvrage)
- Porteur du projet: Mr MITHOU Webster
but: Améliorer la gestion des commissariat

MOE(Maître d'Œuvre)
- Développeur: BATANTOU Beldevie Messie. 

# Note sur le developpement du projet

La structure et l'architecture de SecurePost pourront faire l'objet de modifications au fur et à mesure de l'avancer du projet. le développement de ce projet est susceptible d'avoir un certain retard en raison de l'aprentissage et de la  construction simultanée, Afin de terminer ou d'avancer dans ce projet je signale l'accompagement d'IA en t'en 
# assistante et conseillère., le code ne sera en aucun cas generé par elle.

