from flask import Blueprint, request, jsonify
import database as db

actes_bp = Blueprint('actes', __name__)

@actes_bp.route('/api/actes', methods=['GET'])
def obtenir_tous_les_actes():
    """Récupère tous les actes de la base de données"""
    try:
        liste = db.recuperer_tous_les_actes()
        if liste is None:
            return jsonify({"statut": "erreur", "message": "Impossible de charger les données"}), 500
        return jsonify(liste)
    except Exception as e:
        return jsonify({"statut": "erreur", "message": str(e)}), 500

@actes_bp.route('/api/actes', methods=['POST'])
def creer_nouvel_acte():
    """Crée un nouvel acte dans la base de données"""
    try:
        donnees = request.json
        
        type_acte = donnees.get('type')
        description = donnees.get('description')
        quartier = donnees.get('quartier')
        urgence = donnees.get('urgence')
        
        if not type_acte or not description or not quartier:
            return jsonify({"statut": "erreur", "message": "Il manque des informations obligatoires"}), 400
        
        nouvel_acte = db.ajouter_nouvel_acte(type_acte, description, quartier, urgence)
        
        if nouvel_acte:
            return jsonify({
                "statut": "succes",
                "message": "Acte enregistré avec succès !",
                "numero_acte": nouvel_acte['numero_acte']
            }), 201
        else:
            return jsonify({"statut": "erreur", "message": "Échec de l'insertion en base"}), 500
            
    except Exception as e:
        return jsonify({"statut": "erreur", "message": str(e)}), 500

@actes_bp.route('/api/actes/<numero_acte>', methods=['DELETE'])
def supprimer_acte(numero_acte):
    """Supprime un acte par son numéro"""
    try:
        sql = "DELETE FROM public.actes WHERE numero_acte = %s;"
        resultat = db.executer_requete(sql, (numero_acte,))
        
        if resultat is not None:
            return jsonify({"statut": "succes", "message": f"Acte {numero_acte} supprimé"}), 200
        else:
            return jsonify({"statut": "erreur", "message": "Échec de la suppression"}), 500
            
    except Exception as e:
        return jsonify({"statut": "erreur", "message": str(e)}), 500
