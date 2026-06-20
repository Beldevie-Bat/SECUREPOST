const API_URL = 'http://localhost:5000';

async function appelAPI(url, method = 'GET', data = null) {
    try {
        const options = {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            }
        };
        
        if (data) {
            options.body = JSON.stringify(data);
        }
        
        const reponse = await fetch(url, options);
        const resultat = await reponse.json();
        
        if (!reponse.ok) {
            return { erreur: true, message: resultat.message || 'Erreur API' };
        }
        
        return { erreur: false, donnees: resultat };
    } catch (erreur) {
        return { erreur: true, message: 'Erreur de connexion au serveur' };
    }
}

async function connexion(matricule, motDePasse) {
    return await appelAPI(`${API_URL}/api/login`, 'POST', {
        matricule: matricule,
        password: motDePasse
    });
}

async function recupererActes() {
    return await appelAPI(`${API_URL}/api/actes`, 'GET');
}

async function creerActe(type, description, quartier, urgence) {
    return await appelAPI(`${API_URL}/api/actes`, 'POST', {
        type: type,
        description: description,
        quartier: quartier,
        urgence: urgence
    });
}

async function supprimerActe(numeroActe) {
    return await appelAPI(`${API_URL}/api/actes/${numeroActe}`, 'DELETE');
}

async function getStatistiquesActesParQuartier() {
    return await appelAPI(`${API_URL}/api/statistiques/actes-par-quartier`, 'GET');
}

async function getStatistiquesActesParUrgence() {
    return await appelAPI(`${API_URL}/api/statistiques/actes-par-urgence`, 'GET');
}

async function getTotalActes() {
    return await appelAPI(`${API_URL}/api/statistiques/total-actes`, 'GET');
}

async function getActes24h() {
    return await appelAPI(`${API_URL}/api/statistiques/actes-24h`, 'GET');
}
