import psycopg2
from psycopg2 import extras

def initialiser_connexion():
    """
    Établit la connexion avec la base de données PostgreSQL 'SECUREPOST'.
    """
    try:
        conn = psycopg2.connect(
            host="localhost",
            database="SECUREPOST",
            user="postgres",          
            password="postgre",    
            port="5432"
        )
        print("Connexion à la base de données SECUREPOST réussie !")
        return conn
    except Exception as error:
        print("VRAI MESSAGE D'ERREUR INTERCEPTÉ ")
        try:
            
            if hasattr(error, 'cursor') and error.cursor and error.cursor.statusmessage:
                print(error.cursor.statusmessage)
            elif hasattr(error, 'pgerror') and error.pgerror:
                print(error.pgerror.encode('utf-8', errors='ignore').decode('cp1252', errors='ignore'))
            else:
                
                for arg in error.args:
                    if isinstance(arg, bytes):
                        print(arg.decode('cp1252', errors='ignore'))
                    elif isinstance(arg, str):
                        print(arg.encode('utf-8', errors='ignore').decode('cp1252', errors='ignore'))
        except Exception as e:
            print("Impossible de décoder le texte, voici l'objet brut :", repr(error))
        print("*****")
        return None

def executer_requete(sql, params=None, fetch=False):
    """
    Fonction utilitaire pour exécuter des requêtes SQL facilement.
    """
    conn = initialiser_connexion()
    if conn is None:
        return None
    
    resultat = None
    try:
        with conn.cursor(cursor_factory=extras.RealDictCursor) as cur:
            cur.execute(sql, params)
            if fetch:
                resultat = cur.fetchall()
            conn.commit()
    except Exception as error:
        print(f"Erreur d'exécution SQL : {error}")
        conn.rollback()
    finally:
        conn.close()
        
    return resultat


if __name__ == "__main__":
    print("Test de la connexion...")
    test = executer_requete("SELECT * FROM public.grades LIMIT 1;", fetch=True)
    print("Résultat du test :", test)
    

# pour la recuperation des actes
def recuperer_tous_les_actes():
    """
    Va chercher tous les actes enregistrés dans la base de données,
    triés du plus récent au plus ancien.
    """
    sql = """
        SELECT numero_acte, type_acte, description, date_faits, quartier, urgence, statut 
        FROM public.actes 
        ORDER BY date_faits DESC;
    """
    return executer_requete(sql, fetch=True)





if __name__ == "__main__":
    print("--- TEST : Récupération des données du Commissariat ---")
    
    
    liste_actes = recuperer_tous_les_actes()
    
    print(f"\nNombre d'actes trouvés : {len(liste_actes) if liste_actes else 0}")
    print("Détails des actes en base de données :")
    if liste_actes:
        for acte in liste_actes:
            print(f"- [{acte['numero_acte']}] {acte['type_acte']} à {acte['quartier']} (Urgence: {acte['urgence']})")
    else:
        print("Aucun acte trouvé. Si tu as vidé ta base, réexécute ton fichier seed.sql avant.")