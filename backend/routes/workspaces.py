from flask import Blueprint, request, jsonify
import database as db

workspaces_bp = Blueprint('workspaces', __name__)

@workspaces_bp.route('/api/login', methods=['POST'])
def login():
    """Vérifie les identifiants de l'agent et connecte l'utilisateur"""
    try:
        donnees = request.json
        
        matricule = donnees.get('matricule')
        mot_de_passe = donnees.get('password')
        
        if not matricule or not mot_de_passe:
            return jsonify({"statut": "erreur", "message": "Matricule et mot de passe obligatoires"}), 400
        
        utilisateur = db.verifier_connexion_officier(matricule, mot_de_passe)
        
        if utilisateur:
            return jsonify({
                "statut": "succes",
                "message": "Connexion réussie",
                "utilisateur": {
                    "id": utilisateur['id_user'],
                    "nom": utilisateur['nom'],
                    "prenom": utilisateur['prenom'],
                    "role": utilisateur['role'],
                    "matricule": utilisateur['matricule']
                }
            }), 200
        else:
            return jsonify({"statut": "erreur", "message": "Identifiants incorrects"}), 401
            
    except Exception as e:
        return jsonify({"statut": "erreur", "message": str(e)}), 500

@workspaces_bp.route('/api/utilisateur/<matricule>', methods=['GET'])
def obtenir_utilisateur(matricule):
    """Récupère les informations d'un utilisateur par son matricule"""
    try:
        sql = """
            SELECT id_user, nom, prenom, role, matricule, id_workspace 
            FROM public.users 
            WHERE matricule = %s;
        """
        resultat = db.executer_requete(sql, (matricule,), fetch=True)
        
        if resultat:
            return jsonify(resultat[0]), 200
        else:
            return jsonify({"statut": "erreur", "message": "Utilisateur non trouvé"}), 404
            
    except Exception as e:
        return jsonify({"statut": "erreur", "message": str(e)}), 500
