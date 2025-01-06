# Utilise une image Node.js pour le backend
FROM node:22.12.0

# Définit le répertoire de travail
WORKDIR /app

# Copie les fichiers package.json et installe les dépendances
COPY package*.json ./
RUN npm install

# Copie le reste des fichiers
COPY . .

# Expose le port 5000
EXPOSE 5000

# Commande pour démarrer le serveur
CMD ["npm", "start"]
