from flask import Flask
from flask_cors import CORS
from routes.actes import actes_bp
from routes.stactis import stactis_bp
from routes.workspaces import workspaces_bp

app = Flask(__name__)
CORS(app)

app.register_blueprint(actes_bp)
app.register_blueprint(stactis_bp)
app.register_blueprint(workspaces_bp)

if __name__ == '__main__':
    print("Moteur SecurePost en cours d'exécution sur http://localhost:5000")
    app.run(debug=True, port=5000)