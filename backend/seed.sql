
TRUNCATE TABLE audit_logs, proces_verbaux, main_courantes, plaintes, actes, enquetes, individus, users, workspaces, public.commissariats, public.grades RESTART IDENTITY CASCADE;


INSERT INTO public.grades (libelle) VALUES 
('Général de Police'),
('Colonel'),
('Commandant'),
('Capitaine'),
('Lieutenant'),
('Adjudant-chef'),
('Adjudant'),
('Sergent-chef'),
('Sergent'),
('Gardien de la paix');


INSERT INTO public.commissariats (nom, adresse, telephone) VALUES 
('Commissariat Central de Pointe-Noire', 'Avenue de l''Indépendance, Centre-ville', '+242 06 600 00 00');


INSERT INTO public.workspaces (nom, description, id_commissariat, type_brigade) VALUES 
('BSU - Permanence', 'Brigade de Sûreté Urbaine - Gestion des appels et des actes de la garde', 1, 'Sûreté Urbaine');


INSERT INTO public.users (nom, prenom, email, mot_de_passe, role, matricule, telephone, id_grade, id_workspace, id_commissariat) VALUES 
('BATANTOU', 'Messie', 'm.batantou@police.cg', 'Securite2026', 'Officier', 'PN-2026-044', '+242 05 555 12 34', 5, 1, 1);


INSERT INTO public.individus (nom, prenom, telephone, adresse) VALUES 
('MABIALA', 'Jean-Pierre', '+242 06 777 88 99', 'Quartier Tié-Tié, Rue Bouansa'),
('TCHICAYA', 'Grace', '+242 05 444 33 22', 'Quartier Mpaka, Case de Gaulle'),
('KOUMBA', 'Alphonse', NULL, 'Sans domicile fixe - Grand Marché');


INSERT INTO actes (numero_acte, type_acte, description, date_faits, heure_faits, quartier, urgence, statut, id_user, id_workspace) VALUES 
('PN-2026-001', 'Plainte', 'Vol à l''arraché d''un sac à main contenant des documents importants.', '2026-06-10', '14:15:00', 'Grand Marché', 'Moyenne', 'En cours', 1, 1),
('PN-2026-002', 'Main Courante', 'Nuisances sonores répétées provenant d''une église de réveil en pleine nuit.', '2026-06-11', '23:30:00', 'Mpaka', 'Faible', 'Clôturé', 1, 1);


ALTER TABLE plaintes ADD COLUMN IF NOT EXISTS id_acte INTEGER REFERENCES actes(id_acte);


INSERT INTO plaintes (qualification_penale, date_depot, description, nom_victime, nom_suspect, gravite_plainte, id_acte) VALUES 
('Vol simple aggravé par la fuite', '2026-06-10', 'Vol d''un sac à main au marché', 'TCHICAYA Grace', 'Inconnu (Fuyard)', 'Modérée', 1);


INSERT INTO main_courantes (date_debut, quatier, id_acte) VALUES 
('2026-06-11', 'Mpaka', 2);


INSERT INTO audit_logs (type_action, id_user) VALUES 
('Connexion de l''officier Messie BATANTOU sur le terminal de la BSU.', 1),
('Création de la plainte criminelle N° PN-2026-001 pour Vol au Grand Marché.', 1),
('Ouverture du registre numérique pour consultation des affaires de Mpaka.', 1);