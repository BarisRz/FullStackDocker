# Étape de build avec Node.js
FROM node:lts AS build

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers nécessaires
COPY package*.json ./
COPY . .

# Installer les dépendances
RUN npm install

# Récupérer la variable d'environnement au moment du build
ARG VITE_BACKEND_URL
ENV VITE_BACKEND_URL=$VITE_BACKEND_URL

# Construire l'application (Vite va maintenant voir VITE_BACKEND_URL)
RUN npm run build

# Étape finale : Serveur Nginx pour servir les fichiers statiques
FROM nginx:alpine

# Copier la configuration personnalisée de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copier les fichiers build de React
COPY --from=build /app/dist /usr/share/nginx/html

# Exposer le port 80
EXPOSE 80

# Commande de démarrage
CMD ["nginx", "-g", "daemon off;"]