# Utiliser une image Node.js comme étape de build
FROM node:lts AS build


# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers nécessaires
COPY package*.json ./
COPY . . 

# Installer les dépendances et construire l'application
RUN npm install
RUN npm run build

# Étape finale : Serveur Nginx pour servir les fichiers statiques
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html

# Exposer le port 80
EXPOSE 80

# Commande de démarrage
CMD ["nginx", "-g", "daemon off;"]
