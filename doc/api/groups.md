
  
  

  

# Groups

  

  

Liste de tous les les points d'entrée lié à la gestion d'un groupe, ils commencent tous par `/groups`.

  

  

### GET

  

-  `GET /groups` : Retourne la liste et les informations de tous les groups

  

- Retour :

```json

[
	{
		"members": [
			{
			"groups": [],
			"_id": "60bcd12c0397ef00d81e1ac1",
			"email": "test2@gmail.com",
			"firstname": "firstname2",
			"lastname": "lastname2",
			"avatar": "avatar2"
			}
		],
		"created_at": "2021-06-06T13:37:37.448Z",
		"updated_at": "2021-06-06T13:37:37.448Z",
		"_id": "60bcd13c0397ef00d81e1ac2",
		"name": "Test de groupe",
		"admin": {
			"groups": [
				"60bcd13c0397ef00d81e1ac2",
				"60bcd32a0397ef00d81e1ac4"
			],
		"_id": "60bcd0b50397ef00d81e1ac0",
		"email": "test@gmail.com",
		"firstname": "firstname",
		"lastname": "lastname",
		"avatar": "avatar"
		},
	"__v": 0
	},
	{
		"members": [],
		"created_at": "2021-06-06T13:37:37.448Z",
		"updated_at": "2021-06-06T13:37:37.448Z",
		"_id": "60bcd32a0397ef00d81e1ac4",
		"name": "Test de groupe 2",
		"admin": {
			"groups": [
				"60bcd13c0397ef00d81e1ac2",
				"60bcd32a0397ef00d81e1ac4"
			],
			"_id": "60bcd0b50397ef00d81e1ac0",
			"email": "test@gmail.com",
			"firstname": "firstname",
			"lastname": "lastname",
			"avatar": "avatar"
	},
	"__v": 0
}
]

```

  

-  `GET /groups/:id` : Retourne les informations d'un groupe

  

  

	- Parametre dans l'URL :

  

		-  `id` : L'id du groupe

  

  

- Retour :

```json
{
	"members": [
		{
		"groups": [],
		"_id": "60bcd12c0397ef00d81e1ac1",
		"email": "test2@gmail.com",
		"firstname": "firstname2",
		"lastname": "lastname2",
		"avatar": "avatar2"
		}
	],
	"created_at": "2021-06-06T13:37:37.448Z",
	"updated_at": "2021-06-06T13:37:37.448Z",
	"_id": "60bcd13c0397ef00d81e1ac2",
	"name": "Test de groupe",
	"admin": {
		"groups": [
			{
				"members": [
				"60bcd12c0397ef00d81e1ac1"
				],
				"created_at": "2021-06-06T13:37:37.448Z",
				"updated_at": "2021-06-06T13:37:37.448Z",
				"_id": "60bcd13c0397ef00d81e1ac2",
				"name": "Test de groupe",
				"admin": "60bcd0b50397ef00d81e1ac0",
				"__v": 0
			}
		],
		"_id": "60bcd0b50397ef00d81e1ac0",
		"email": "test@gmail.com",
		"firstname": "firstname",
		"lastname": "lastname",
		"avatar": "avatar"
		},
	"__v": 0
}
```

  

### POST
  

-  `POST /groups` : Création  d'un nouveau groupe

  
	-  `name` : Le nom du groupe

	  

	-  `admin` : L'administrateur du groupe

	  

	-  `members` : La liste des membres du groups

	  

```json
{
	"name" : "Test de groupe",
	"admin": "60bcd0b50397ef00d81e1ac0",
	"members": [
	"60bcd12c0397ef00d81e1ac1"
	]
}
```

  

- Retour :

  

```json
{
	"message": "group Test de groupe created by : lastname firstname ",
	"data": {
	"id": "60bcd13c0397ef00d81e1ac2",
	"name": "Test de groupe"
	}
}
```

  

### PUT

  

-  `PUT /groups/:id` : Modification d'un groupe

  

- Parametre dans l'URL :

	-  `id` : L'id du groupe

- Parametre dans la requete :

-  `name` (optionnel) : Le nouveau nom de groupe
-  `admin` (optionnel) : L'admin du groupe 
-  `members` (optionnel) : La liste des membres de ce groupe
```json
{
	"name" : "test de modification d'un groupe!",
	"admin": "60bcd12c0397ef00d81e1ac1",
	"members" : [
		"60bcd0b50397ef00d81e1ac0",
		"60bcd12c0397ef00d81e1ac1"
	]
}
```

- Retour :

```json
{
	"message": "group test de modification d'un groupe! updated",
	"updated": {
		"members": [
			"60bcd0b50397ef00d81e1ac0",
			"60bcd12c0397ef00d81e1ac1"
		],
		"created_at": "2021-06-06T13:37:37.448Z",
		"updated_at": "2021-06-06T14:20:32.581Z",
		"_id": "60bcd13c0397ef00d81e1ac2",
		"name": "test de modification d'un groupe!",
		"admin": "60bcd12c0397ef00d81e1ac1",
		"__v": 0
	}
}
```

  

### DELETE

  

-  `DELETE /users/:id` : Suppression d'un utilisateur

- Parametre dans l'URL :

	-  `id` : L'id de l'utilisateur 
- Le groupe ne doit pas avoir de membres pour pouvoir le supprimer

  

- Retour :
```json
{
	"message": "group Test de groupe deleted"
}
```