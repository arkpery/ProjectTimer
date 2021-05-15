# Documentation Project Timer Serveur

Dans ce document se trouve toutes les informations sur le fonctionnement et l'utilisation du serveur de Project Timer.

## API

L'API du serveur est au format REST et est disponible sur le port 8080. 
...

Les informations sur les points d'entrés de l'API sont trouvable dans les documents suivants : 
- [Utilisateur (`/users`)](./api/users.md) 
- [Groupes (`/groups`)](./api/groups.md) 

## Authentification

L'authentification est gérée par un JSON Web Token (ou JWT). Le principe est simple, l'utilisateur envoie son login et son mot de passe au serveur qui lui renvoie un token si l'authentification réussit. Ensuite le client envoie dans l'entête HTTP Authorization le token reçu pour prouver son authentification.

Pour plus d'information vous pouvez consulter les sites suivants :

- https://jwt.io
- https://medium.com/dev-bits/a-guide-for-adding-jwt-token-based-authentication-to-your-single-page-nodejs-applications-c403f7cf04f4
- https://github.com/jwtk/jjwt



## Erreurs

Voici la liste des erreurs et leurs codes pouvant être retournées par l'application. Si le code d'erreur correspond à un code de retour HTTP alors il sera utilisé, sinon c'est la code de retour 400 qui sera retourné.

- 00 : Erreur inconnue
- 01 : Impossible de se connecter
- 02 : Utilisateur déjà existant
- 03 : Impossible de récupèrer les données
- 400 : Requete invalide
- 401 : Non autorisé
- 403 : Interdit
- 404 : Ressource non trouvé

## Base de données

La base de données utilise ... (A définir une BD) dans un docker. 

## Configuration et gestion du projet

Pour les développeurs des informations sur la configuration et la gestion du projet sont trouvable dans le [document dev.md](./dev.md)