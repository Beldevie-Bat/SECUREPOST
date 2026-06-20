from flask import Flask, request, jsonify
from flask_cors import CORS
import random 
import psycopg2
from psycopg2 import extras

app = Flask(__name__)
CORS(app)  



def initialiser_connexion():
    try:
        conn = psycopg2.connect(
            host="localhost",
            database="SECUREPOST",
            user="postgres",          
            password="postgre",    
            port="5432"
        )
        return conn
    except Exception as error:
        print("Erreur de connexion à la base de données :", error)
        return None

def executer_requete(sql, params=None, fetch=False):
    conn = initialiser_connexion()
    if conn is None:
        return None
    
    resultat = None
    try:
        with conn.cursor(cursor_factory=extras.RealDictCursor) as cur:
            cur.execute(sql, params)
            if fetch:
                resultat = cur.fetchall()
            else:
                resultat = True
            conn.commit()
    except Exception as error:
        print(f"Erreur d'exécution SQL : {error}")
        conn.rollback()
        resultat = None
    finally:
        conn.close()
        
    return resultat

def verifier_connexion_officier(matricule, mot_de_passe):
    sql = """
        SELECT id_user, nom, prenom, role, matricule, id_workspace, id_commissariat 
        FROM public.users 
        WHERE matricule = %s AND mot_de_passe = %s;
    """
    resultat = executer_requete(sql, (matricule, mot_de_passe), fetch=True)
    if resultat:
        return resultat[0] 
    return None

def ajouter_nouvel_acte(type_acte, description, quartier, urgence, id_user=1, id_workspace=1):
    num_aleatoire = random.randint(1000, 9999)
    numero_acte = f"PN-2026-{num_aleatoire}"
    
    sql = """
        INSERT INTO public.actes (numero_acte, type_acte, description, quartier, urgence, id_user, id_workspace)
        VALUES (%s, %s, %s, %s, %s, %s, %s)
        RETURNING numero_acte;
    """
    parametres = (numero_acte, type_acte, description, quartier, urgence, id_user, id_workspace)
    resultat = executer_requete(sql, parametres, fetch=True)
    if resultat:
        return {'numero_acte': numero_acte}
    return None

def recuperer_tous_les_actes():
    sql = """
        SELECT numero_acte, type_acte, description, date_faits, quartier, urgence, statut 
        FROM public.actes 
        ORDER BY date_faits DESC;
    """
    return executer_requete(sql, fetch=True)


@app.route('/api/login', methods=['POST'])
def login():
    donnees = request.json
    matricule = donnees.get('matricule')
    mot_de_passe = donnees.get('mot_de_passe')   
    
    
    officier = verifier_connexion_officier(matricule, mot_de_passe)
    
    if officier:
        return jsonify({
            "statut": "succes",
            "message": "Connexion réussie",
            "utilisateur": officier
        }), 200
    else:
        return jsonify({
            "statut": "erreur",
            "message": "Matricule ou mot de passe incorrect"
        }), 401

@app.route('/api/actes', methods=['GET'])
def obtenir_actes():
    liste = recuperer_tous_les_actes()
    return jsonify(liste)

@app.route('/api/actes', methods=['POST'])
def creer_acte():
    donnees = request.json
    type_acte = donnees.get('type')
    description = donnees.get('description')
    quartier = donnees.get('quartier')
    urgence = donnees.get('urgence')
    
    nouvel_acte = ajouter_nouvel_acte(type_acte, description, quartier, urgence)
    
    if nouvel_acte:
        return jsonify({"statut": "succes", "message": "Acte enregistré", "acte": nouvel_acte}), 201
    return jsonify({"statut": "erreur", "message": "Échec de l'insertion"}), 500

if __name__ == '__main__':
    
    app.run(debug=True, port=5000)