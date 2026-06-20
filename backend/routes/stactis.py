from flask import Blueprint, jsonify
import database as db

stactis_bp = Blueprint('stactis', __name__)

@stactis_bp.route('/api/statistiques/actes-par-quartier', methods=['GET'])
def actes_par_quartier():
    """Donne le nombre d'actes par quartier"""
    try:
        sql = """
            SELECT quartier, COUNT(*) as nombre 
            FROM public.actes 
            GROUP BY quartier 
            ORDER BY nombre DESC;
        """
        resultat = db.executer_requete(sql, fetch=True)
        
        if resultat is None:
            return jsonify({"statut": "erreur", "message": "Impossible de charger les statistiques"}), 500
        return jsonify(resultat)
    except Exception as e:
        return jsonify({"statut": "erreur", "message": str(e)}), 500

@stactis_bp.route('/api/statistiques/actes-par-urgence', methods=['GET'])
def actes_par_urgence():
    """Donne le nombre d'actes par niveau d'urgence"""
    try:
        sql = """
            SELECT urgence, COUNT(*) as nombre 
            FROM public.actes 
            GROUP BY urgence 
            ORDER BY nombre DESC;
        """
        resultat = db.executer_requete(sql, fetch=True)
        
        if resultat is None:
            return jsonify({"statut": "erreur", "message": "Impossible de charger les statistiques"}), 500
        return jsonify(resultat)
    except Exception as e:
        return jsonify({"statut": "erreur", "message": str(e)}), 500

@stactis_bp.route('/api/statistiques/total-actes', methods=['GET'])
def total_actes():
    """Donne le nombre total d'actes"""
    try:
        sql = "SELECT COUNT(*) as total FROM public.actes;"
        resultat = db.executer_requete(sql, fetch=True)
        
        if resultat is None:
            return jsonify({"statut": "erreur", "message": "Impossible de charger les statistiques"}), 500
        return jsonify(resultat[0])
    except Exception as e:
        return jsonify({"statut": "erreur", "message": str(e)}), 500

@stactis_bp.route('/api/statistiques/actes-24h', methods=['GET'])
def actes_24h():
    """Donne le nombre d'actes des dernières 24 heures"""
    try:
        sql = """
            SELECT COUNT(*) as nombre 
            FROM public.actes 
            WHERE date_faits >= NOW() - INTERVAL '24 hours';
        """
        resultat = db.executer_requete(sql, fetch=True)
        
        if resultat is None:
            return jsonify({"statut": "erreur", "message": "Impossible de charger les statistiques"}), 500
        return jsonify(resultat[0])
    except Exception as e:
        return jsonify({"statut": "erreur", "message": str(e)}), 500
