
  

  

  

# Projects


Liste de tous  les points d'entrée lié à la gestion d'un projet, ils commencent tous par `/projects`. 
Ici le token est obligatoire pour toutes les méthodes CRUD.

  

  
  

### POST
  

-  `POST /projects` : Création  d'un nouveau projet

  
	-  `name` : Le nom du projet

	  

	-  `admin` : L'administrateur du projet

	  

	-  `groups` : L'ensemble des groupes qui sont autorisés à modifier le projet
	
	- `close` :  pour indiquer si le projet est clos  ou pas (True ou False)

```json
{
    "name" : "Projet NodeJS PMN",
    "admin" : "60bf3d0d714f66002c86b70f",
    "groups" : [
        "60bf3f45714f66002c86b714"
    ],
    "close" : "false"
}
```

  

- Retour :

  

```json
{
    "message": "Project created successfully",
    "created": {
        "groups": [
            {
                "members": [
                    {
                        "groups": [],
                        "_id": "60bf3d16714f66002c86b711",
                        "email": "test3@gmail.com",
                        "firstname": "firstname",
                        "lastname": "lastname",
                        "avatar": "avatar"
                    }
                ],
                "_id": "60bf3f45714f66002c86b714",
                "name": "CREATION d'un groupe 2",
                "admin": "60bf3d0d714f66002c86b70f"
            }
        ],
        "close": false,
        "_id": "60bf4022714f66002c86b71b",
        "name": "Projet NodeJS PMN",
        "admin": {
            "_id": "60bf3d0d714f66002c86b70f",
            "email": "test@gmail.com",
            "firstname": "firstname",
            "lastname": "lastname"
        },
        "created_at": "2021-06-08T10:02:10.495Z",
        "updated_at": "2021-06-08T10:02:10.495Z",
        "__v": 0
    }
}
```


### GET

  

-  `GET /projects` : Retourne la liste et les informations de tous les projets

  

- Retour :

```json
[
    {
        "groups": [
            {
                "members": [
                    "60bf3d12714f66002c86b710"
                ],
                "_id": "60bf3f2f714f66002c86b712",
                "name": "CREATION d'un groupe",
                "admin": "60bf3d0d714f66002c86b70f"
            }
        ],
        "close": false,
        "_id": "60bf3f69714f66002c86b715",
        "name": "Projet NodeJS",
        "admin": {
            "_id": "60bf3d0d714f66002c86b70f",
            "email": "test@gmail.com"
        },
        "created_at": "2021-06-08T09:59:05.397Z",
        "updated_at": "2021-06-08T09:59:05.397Z",
        "__v": 0
    },
    {
        "groups": [
            {
                "members": [
                    "60bf3d16714f66002c86b711"
                ],
                "_id": "60bf3f45714f66002c86b714",
                "name": "CREATION d'un groupe 2",
                "admin": "60bf3d0d714f66002c86b70f"
            }
        ],
        "close": false,
        "_id": "60bf3fb6714f66002c86b717",
        "name": "Projet NodeJS express",
        "admin": {
            "_id": "60bf3d0d714f66002c86b70f",
            "email": "test@gmail.com"
        },
        "created_at": "2021-06-08T10:00:22.950Z",
        "updated_at": "2021-06-08T10:00:22.950Z",
        "__v": 0
    },
    {
        "groups": [
            {
                "members": [
                    "60bf3d16714f66002c86b711"
                ],
                "_id": "60bf3f45714f66002c86b714",
                "name": "CREATION d'un groupe 2",
                "admin": "60bf3d0d714f66002c86b70f"
            }
        ],
        "close": true,
        "_id": "60bf3fca714f66002c86b719",
        "name": "Projet Front",
        "admin": {
            "_id": "60bf3d0d714f66002c86b70f",
            "email": "test@gmail.com"
        },
        "created_at": "2021-06-08T10:00:42.008Z",
        "updated_at": "2021-06-08T10:00:42.008Z",
        "__v": 0
    },
    {
        "groups": [
            {
                "members": [
                    "60bf3d16714f66002c86b711"
                ],
                "_id": "60bf3f45714f66002c86b714",
                "name": "CREATION d'un groupe 2",
                "admin": "60bf3d0d714f66002c86b70f"
            }
        ],
        "close": false,
        "_id": "60bf4022714f66002c86b71b",
        "name": "Projet NodeJS PMN",
        "admin": {
            "_id": "60bf3d0d714f66002c86b70f",
            "email": "test@gmail.com"
        },
        "created_at": "2021-06-08T10:02:10.495Z",
        "updated_at": "2021-06-08T10:02:10.495Z",
        "__v": 0
    }
]
```

  

-  `GET /groups/:id` : Retourne les informations d'un projet

  

  

	- Parametre dans l'URL :

  

		-  `projectId : L'id du projet

  

  

- Retour :

```json
{
    "groups": [
        {
            "members": [
                "60bf3d12714f66002c86b710"
            ],
            "_id": "60bf3f2f714f66002c86b712",
            "name": "CREATION d'un groupe",
            "admin": "60bf3d0d714f66002c86b70f"
        }
    ],
    "close": false,
    "_id": "60bf3f69714f66002c86b715",
    "name": "Projet NodeJS",
    "admin": {
        "_id": "60bf3d0d714f66002c86b70f",
        "email": "test@gmail.com"
    },
    "created_at": "2021-06-08T09:59:05.397Z",
    "updated_at": "2021-06-08T09:59:05.397Z",
    "__v": 0
}
```


  

### PUT

  

-  `PUT /projects/:projectId` : Modification d'un projet

  

- Paramètre dans l'URL :

	-  `projectId` : L'id du projet

- Paramètre dans la requête :

	-  `name` (obligatoire) : Le nouveau nom de projet
	-  `admin` (optionnel) : L'admin du projet 
	-  `groups` (obligatoire) :  L'ensemble des groupes qui ont accès à ce projet 
	- `close` (obligatoire) : pour indiquer si le projet est clos  ou pas (True ou False)
```json
{
    "close" : "false",
    "name" :"Update Project NodeJS",
    "groups" : [
        "60bf3f45714f66002c86b714"
    ]
}
```

- Retour :

```json
{
    "groups": [
        {
            "members": [
                "60bf3d16714f66002c86b711"
            ],
            "_id": "60bf3f45714f66002c86b714",
            "name": "CREATION d'un groupe 2",
            "admin": "60bf3d0d714f66002c86b70f"
        }
    ],
    "close": false,
    "_id": "60bf3f69714f66002c86b715",
    "name": "Update Project NodeJS",
    "admin": {
        "_id": "60bf3d0d714f66002c86b70f",
        "email": "test@gmail.com"
    },
    "created_at": "2021-06-08T09:59:05.397Z",
    "updated_at": "2021-06-08T10:12:28.358Z",
    "__v": 0
}
```

  

### DELETE

  

-  `DELETE /projects/:id` : Suppression d'un projet
	- C'est uniquement l'administrateur du groupe qui a le droit de supprimer le projet.
- Parametre dans l'URL :

	-  `projectId` : L'id du projet 

- Retour :
```json
{
    "message": "The project is deleted"
}
```



### GET

  

-  `GET /projects/:groupId/groups` : Liste des différents projet en fonction du groupe envoyé
	- Pour tous les utilisateurs
- Parametre dans l'URL :

	-  `groupId` : L'id du groupe 

- Retour :
```json
[{
    "groups": [
        {
            "members": [
                "60bf3d16714f66002c86b711"
            ],
            "_id": "60bf3f45714f66002c86b714",
            "name": "CREATION d'un groupe 2",
            "admin": "60bf3d0d714f66002c86b70f"
        }
    ],
    "close": false,
    "_id": "60bf3f69714f66002c86b715",
    "name": "Update Project NodeJS",
    "admin": {
        "_id": "60bf3d0d714f66002c86b70f",
        "email": "test@gmail.com"
    },
    "created_at": "2021-06-08T09:59:05.397Z",
    "updated_at": "2021-06-08T10:12:28.358Z",
    "__v": 0
}, ...]
```



### PUT

  

-  `PUT /projects/:projectId/close` : Fermeture du projet
	- Seul l'administrateur a le droit de fermer un projet
- Parametre dans l'URL :

	-  `projectId` : L'id du projet 

- Retour :
```json
{
    "message": "The project is closed"
}
```
