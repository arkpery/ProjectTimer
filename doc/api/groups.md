
  

  

  

# Groups


Liste de tous  les points d'entrée lié à la gestion d'un groupe, ils commencent tous par `/groups`. 
Ici le token est obligatoire pour toutes les méthodes CRUD.

  

  
  

### POST
  

-  `POST /groups` : Création  d'un nouveau groupe

  
	-  `name` : Le nom du groupe

	  

	-  `admin` : L'administrateur du groupe

	  

	-  `members` : La liste des membres du groups

	  

```json
{
	"name" : "CREATION d'un groupe",
	"admin": "60be3b2e5940380186ff9e52",
	"members": [
	"60be341d49e947004e5162eb"
	]
}
```

  

- Retour :

  

```json
{
    "message": "Group CREATION d'un groupe created by : lastname firstname",
    "data": {
        "id": "60be75ad65e22602750e61f3",
        "name": "CREATION d'un groupe"
    }
}
```


### GET

  

-  `GET /groups` : Retourne la liste et les informations de tous les groups

  

- Retour :

```json

[
    {
        "members": [
            {
                "groups": [],
                "_id": "60be341d49e947004e5162eb",
                "email": "test2@gmail.com",
                "firstname": "firstname2",
                "lastname": "lastname2",
                "avatar": "avatar2"
            }
        ],
        "_id": "60be75ad65e22602750e61f3",
        "name": "CREATION d'un groupe",
        "admin": {
            "groups": [
                "60be75ad65e22602750e61f3",
                "60be76dd65e22602750e61f5"
            ],
            "_id": "60be3b2e5940380186ff9e52",
            "email": "test@gmail.com",
            "firstname": "firstname",
            "lastname": "lastname",
            "avatar": "avatar"
        },
        "created_at": "2021-06-07T19:38:21.526Z",
        "updated_at": "2021-06-07T19:38:21.526Z",
        "__v": 0
    },
    {
        "members": [
            {
                "groups": [],
                "_id": "60be341d49e947004e5162eb",
                "email": "test2@gmail.com",
                "firstname": "firstname2",
                "lastname": "lastname2",
                "avatar": "avatar2"
            }
        ],
        "_id": "60be76dd65e22602750e61f5",
        "name": "CREATION d'un groupe 2",
        "admin": {
            "groups": [
                "60be75ad65e22602750e61f3",
                "60be76dd65e22602750e61f5"
            ],
            "_id": "60be3b2e5940380186ff9e52",
            "email": "test@gmail.com",
            "firstname": "firstname",
            "lastname": "lastname",
            "avatar": "avatar"
        },
        "created_at": "2021-06-07T19:43:25.624Z",
        "updated_at": "2021-06-07T19:43:25.624Z",
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
            "_id": "60be341d49e947004e5162eb",
            "email": "test2@gmail.com",
            "firstname": "firstname2",
            "lastname": "lastname2",
            "avatar": "avatar2"
        }
    ],
    "_id": "60be75ad65e22602750e61f3",
    "name": "CREATION d'un groupe",
    "admin": {
        "groups": [
            {
                "members": [
                    "60be341d49e947004e5162eb"
                ],
                "_id": "60be75ad65e22602750e61f3",
                "name": "CREATION d'un groupe",
                "admin": "60be3b2e5940380186ff9e52",
                "created_at": "2021-06-07T19:38:21.526Z",
                "updated_at": "2021-06-07T19:38:21.526Z",
                "__v": 0
            },
            {
                "members": [
                    "60be341d49e947004e5162eb"
                ],
                "_id": "60be76dd65e22602750e61f5",
                "name": "CREATION d'un groupe 2",
                "admin": "60be3b2e5940380186ff9e52",
                "created_at": "2021-06-07T19:43:25.624Z",
                "updated_at": "2021-06-07T19:43:25.624Z",
                "__v": 0
            }
        ],
        "_id": "60be3b2e5940380186ff9e52",
        "email": "test@gmail.com",
        "firstname": "firstname",
        "lastname": "lastname",
        "avatar": "avatar"
    },
    "created_at": "2021-06-07T19:38:21.526Z",
    "updated_at": "2021-06-07T19:38:21.526Z",
    "__v": 0
}
```


  

### PUT

  

-  `PUT /groups/:id` : Modification d'un groupe

  

- Paramètre dans l'URL :

	-  `id` : L'id du groupe

- Paramètre dans la requête :

-  `name` (optionnel) : Le nouveau nom de groupe
-  `admin` (optionnel) : L'admin du groupe 
-  `members` (optionnel) : La liste des membres de ce groupe
```json
{
	"name" : "modification d'un groupe!"	
}
```

- Retour :

```json
{
    "message": "Group CREATION d'un groupe 2 updated",
    "group": {
        "members": [],
        "_id": "60be76dd65e22602750e61f5",
        "name": "modification d'un groupe!"
    }
}
```

  

### DELETE

  

-  `DELETE /groups/:id` : Suppression d'un groupe
	- C'est uniquement l'administrateur du groupe qui a le droit de supprimer le groupe.
	- Le groupe ne doit pas avoir de membres pour pouvoir le supprimer.
- Parametre dans l'URL :

	-  `id` : L'id de groupe 

- Retour :
```json
{
    "message": "Group CREATION d'un groupe deleted"
}
```
