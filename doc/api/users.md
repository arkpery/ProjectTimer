
# Users


Liste de tous les les points d'entrée lié à la gestion d'un utilisateur, ils commencent tous par `/users`.


### POST

  
-  `POST /users` : Inscription d'un utilisateur

	-  `email` (Obligatoire) : L'email de l'utilisateur (doit être unique, est vérifié sur le serveur)

	-  `password` (Obligatoire) : Le mot de passe

	-  `firstname` : Le prénom de l'utilisateur

	- `lastname` : Le nom de l'utilisateur

	-  `password` : Le mot de passe

	-   `birthdate` : La date de naissance
 
	-   `avatar` : L'avatar de l'utilisateur

	-   `groups` : L'ensemble des groupes dont l'utilisateur appartient

```json
{
	"email":"test@gmail.com",
	"firstname": "firstname",
	"lastname": "lastname",
	"password": "azerty",
	"birthdate" : "01-01-2000",
	"groups" : [],
	"avatar" : "avatar"
}
```

- Retour :

```json
{
	"accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjBiZTMyZWU0OWU5NDcwMDRlNTE2MmVhIiwiZW1haWwiOiJ0ZXN0QGdtYWlsLmNvbSJ9LCJpYXQiOjE2MjMwNzc2MTQsImV4cCI6MTYyNTY2OTYxNH0.0VmXohbso442putb9P3KA1agb4NjM9zc_1CBzir5WLo",
	"user": {
		"id": "60be32ee49e947004e5162ea",
		"email": "test@gmail.com"
	},
	"message": "User test@gmail.com created"
}
```

-  `POST /users/login` : Connexion d'un utilisateur

	-  `email` : L'email de l'utilisateur (doit être unique)

	-  `password` : Le mot de passe de l'utilisateur

  

```json

{
	"email": "test@gmail.com",
	"password" : "azerty"
}

```

  

- Retour :

  

```json
{
	"user": {
		"id": "60be2eb883eb7f003b27eb16",
		"email": "test@gmail.com",
		"accessToken":    
			"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjBiZTJlYjg4M2ViN2YwMDNiMjdlYjE2IiwiZW1haWwiOiJ0ZXN0QGdtYWlsLmNvbSJ9LCJpYXQiOjE2MjMwNzY1NzIsImV4cCI6MTYyNTY2ODU3Mn0.UD4ZJWAMsWGfaG-E_M1B60gWylMP-EaelUu-Vp2YCzM"
	}
}
```

 -  `POST /users/reset-password` : Réinitialiser le mot de passe d'un utilisateur 
	 - `email` : L'email de l'utilisateur 
```json
{
	"email": "test@gmail.com"
}
```
- Retour :
```json
{
    "message": "Reset Password successfully. An email sent you on test@gmail.com"
}
```
 Ici,  on  génère  un  Token  qui  sera  inclus  dans  une  URL  et  qui  sera  envoyé  par  email  à  l'utilisateur.

 -  `POST /users/valid-password-token` :  Validation du jeton (Token) envoyer par email.
```json
{
   "resettoken":"6c37eb0bba1e44a202ad8149d4e4dcda408d4f255b27d3efbf6f319b96d5e2a8"
}
```

- Retour :

```json
{
    "message": "Token verified successfully."
}
 ```
 
 -  `POST /users/ResetPassword` : Définition d'un nouveau mot de passe 

```json
{
    "resettoken":"6c37eb0bba1e44a202ad8149d4e4dcda408d4f255b27d3efbf6f319b96d5e2a8",
    "newPassword" : "newpassword"
}
 ```

- Retour :

```json
{
	"message": "Password reset successfully"
}
 ```
 - `POST /users/logout` : Déconnexion d'un utilisateur


```json
{
    "success": true,
    "message": "User Logged out"
}
 ```


### GET 
Pour toutes les méthodes Get, le Token est obligatoire.

-  `GET /users` : Retourne la liste et les informations de tous les utilisateurs, 

- Retour :
```json
[
    {
        "groups": [],
        "accessToken": null,
        "_id": "60be32ee49e947004e5162ea",
        "email": "test@gmail.com",
        "firstname": "firstname",
        "lastname": "lastname",
        "birthdate": "2000-01-01T00:00:00.000Z",
        "avatar": "avatar",
        "created_at": "2021-06-07T14:53:34.607Z",
        "updated_at": "2021-06-07T14:53:34.607Z",
        "__v": 0
    },
    {
        "groups": [],
        "accessToken": null,
        "_id": "60be341d49e947004e5162eb",
        "email": "test2@gmail.com",
        "firstname": "firstname2",
        "lastname": "lastname2",
        "birthdate": "2000-01-01T00:00:00.000Z",
        "avatar": "avatar2",
        "created_at": "2021-06-07T14:58:37.728Z",
        "updated_at": "2021-06-07T14:58:37.728Z",
        "__v": 0
    }
]
```

-  `GET /users/:id` : Retourne les informations d'un utilisateur

  

	- Parametre dans l'URL :

		-  `id` : L'id de l'utilisateur

  

- Retour :
```json
{
    "groups": [],
    "_id": "60be32ee49e947004e5162ea",
    "accessToken": null,
    "email": "test@gmail.com",
    "firstname": "firstname",
    "lastname": "lastname",
    "birthdate": "2000-01-01T00:00:00.000Z",
    "avatar": "avatar",
    "created_at": "2021-06-07T14:53:34.607Z",
    "updated_at": "2021-06-07T14:53:34.607Z",
    "__v": 0
}
```

### PUT
Pour  la méthode PUT, le Token est obligatoire. 

-  `PUT /users/:id` : Modification d'un utilisateur 

  
	- Parametre dans l'URL :
		-  `id` : L'id de l'utilisateur
		
	- Parametre dans la requete :
		- `email` (optionnel) : Le nouveau email de l'utilisateur (doit être unique, est vérifié sur le serveur)

		-  `password (optionnel)` : Le nouveau mot de passe

		-  `firstname (optionnel)` : Le nouveau prénom de l'utilisateur

		- `lastname (optionnel)` : Le nouveau nom de l'utilisateur

		-   `birthdate` : La nouvelle date de naissance
 
		-   `avatar` : La date de naissance
		
		-   `groups` : ajouter L'ensemble des groupes dont l'utilisateur appartient


```json
{
    "email" : "testupdate@gmail.com",
    "lastname": "test updating lastname",
    "avatar" : "updating avatar"
}
```

  

- Retour :

  

```json
{
    "message": "User testupdate@gmail.com updated",
    "user": {
        "groups": [],
        "accessToken": null,
        "_id": "60be32ee49e947004e5162ea",
        "email": "testupdate@gmail.com",
        "lastname": "test updating lastname",
        "avatar": "updating avatar"
    }
}
```

### DELETE
Pour la  méthode DELETE, le Token est obligatoire.

-  `DELETE /users/:id` : Suppression d'un utilisateur
	- Parametre dans l'URL :
		-  `id` : L'id de l'utilisateur
  

- Retour :

```json
{
	"message": "user 60b63d400d353f02824ba07c deleted"
}
```