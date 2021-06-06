# Users


Liste de tous les les points d'entrée lié à la gestion d'un utilisateur, ils commencent tous par `/users`.


### GET

-  `GET /users` : Retourne la liste et les informations de tous les utilisateurs

- Retour :
```json
[
{
	"groups": [],
	"_id": "60b639ee353fa2022687d0e5",
	"email": "test@gmail.com",
	"firstname": "firstname",
	"lastname": "lastname",
	"birthdate": "2000-01-01T00:00:00.000Z",
	"avatar": "avatar",
	"created_at": "2021-06-01T13:45:18.673Z",
	"updated_at": "2021-06-01T13:45:18.673Z",
	"__v": 0
},

{
	"groups": [],
	"_id": "60b63a34d4eab7023501221d",
	"email": "test2@gmail.com",
	"firstname": "firstname",
	"lastname": "lastname",
	"birthdate": "2000-01-01T00:00:00.000Z",
	"avatar": "avatar",
	"created_at": "2021-06-01T13:46:28.631Z",
	"updated_at": "2021-06-01T13:46:28.631Z",
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
	"_id": "60b639ee353fa2022687d0e5",
	"email": "test@gmail.com",
	"firstname": "firstname",
	"lastname": "lastname",
	"birthdate": "2000-01-01T00:00:00.000Z",
	"avatar": "avatar",
	"created_at": "2021-06-01T13:45:18.673Z",
	"updated_at": "2021-06-01T13:45:18.673Z",
	"__v": 0
}
```
  

### POST

  

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
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjBiNjM5ZWUzNTNmYTIwMjI2ODdkMGU1IiwiZW1haWwiOiJ0ZXN0QGdtYWlsLmNvbSJ9LCJpYXQiOjE2MjI1NTUzNzcsImV4cCI6MTYyNTE0NzM3N30.4sqMSNzR1IKv04erwkO9Hg8L-SLqgOlRBsmeAxRdYJk",
	"user": {
		"id": "60b639ee353fa2022687d0e5",
		"email": "test@gmail.com"
	}
}

```

  

-  `POST /users` : Inscription d'un utilisateur

	-  `email` : L'email de l'utilisateur (doit être unique, est vérifié sur le serveur)

	-  `password` : Le mot de passe

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
	"data": {
	"_id": "60b63cdd686dc90274f9a57e",
	"email": "test@gmail.com"
	},
	"message": "user test@gmail.com created"
}

```

  
  

### PUT
 

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
	"message": "user 60b63d400d353f02824ba07c updated",
	"user": {
		"groups": [],
		"_id": "60b63d400d353f02824ba07c",
		"email": "testupdate@gmail.com",
		"lastname": "test updating lastname",
		"avatar": "updating avatar"
	}
}
```

### DELETE

-  `DELETE /users/:id` : Suppression d'un utilisateur
	- Parametre dans l'URL :
		-  `id` : L'id de l'utilisateur
  

- Retour :

```json
{
	"message": "user 60b63d400d353f02824ba07c deleted"
}
```
