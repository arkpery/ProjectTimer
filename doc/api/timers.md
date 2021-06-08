
  

  

  

# Timers


Liste de tous  les points d'entrée lié à la gestion d'un timer, ils commencent tous par `/timers`. 
Ici le token est obligatoire pour toutes les méthodes CRUD.

  

  
  

### POST

-  `POST /timers` : Création  d'un nouveau timer
  
	-  `description` : La description  du timer

	-  `taskType` : Le type de la tâche

	-  `user` : L'utilisateur qui crée le timer
	
	- `startTime` :  L'heure de début (par défaut c'est l'heure actuel ) 
	- 	`duration` :  La durée du timer 
	-  `project` :  Le projet où en crée ce timer


```json
{
    "description" : "description de la tache",
    "taskType" : "tache 1",
    "user" : "60bf3d16714f66002c86b711",
    "project" : "60bf3fca714f66002c86b719"
}
```

  

- Retour :

  

```json
{
    "message": "timer created successfully",
    "created": {
        "startTime": "2021-06-08T12:27:24.149Z",
        "_id": "60bf6465b2891a012ba8c5d7",
        "description": "description de la tache",
        "taskType": "tache 1",
        "user": {
            "groups": [],
            "_id": "60bf3d16714f66002c86b711",
            "email": "test3@gmail.com",
            "firstname": "firstname"
        },
        "project": {
            "groups": [
                "60bf3f45714f66002c86b714"
            ],
            "close": true,
            "_id": "60bf3fca714f66002c86b719",
            "name": "Projet Front",
            "admin": "60bf3d0d714f66002c86b70f",
            "created_at": "2021-06-08T10:00:42.008Z",
            "updated_at": "2021-06-08T10:00:42.008Z",
            "__v": 0
        },
        "duration": 0,
        "created_at": "2021-06-08T12:36:53.401Z",
        "updated_at": "2021-06-08T12:36:53.401Z",
        "__v": 0
    }
}
```
-  `POST /timers/:projectId/start` : Démarrer   un nouveau timer
	 - Paramètre dans l'URL :
		-  `projectId : L'id du projet
		
- Retour :

```json
{
    "message": "timer created successfully",
    "created": {
        "startTime": "2021-06-08T12:58:39.989Z",
        "_id": "60bf697fb7ed80013adb5e8b",
        "duration": 0,
        "project": {
            "groups": [
                "60bf3f45714f66002c86b714"
            ],
            "close": false,
            "_id": "60bf4022714f66002c86b71b",
            "name": "Projet NodeJS PMN",
            "admin": "60bf3d0d714f66002c86b70f",
            "created_at": "2021-06-08T10:02:10.495Z",
            "updated_at": "2021-06-08T10:02:10.495Z",
            "__v": 0
        },
        "created_at": "2021-06-08T12:58:40.012Z",
        "updated_at": "2021-06-08T12:58:40.012Z",
        "__v": 0
    }
}
```

### GET

  

-  `GET /timers/project/:projectId` : Retourne la liste des timers par projet

  	- Parametre dans l'URL :

  

		-  `projectId : L'id du projet

- Retour :

```json
[
    {
        "startTime": "2021-06-08T10:16:42.332Z",
        "_id": "60bf474ba6c0d1003bf5cc1e",
        "description": "description tache 1",
        "taskType": "tache 1",
        "user": {
            "_id": "60bf3d16714f66002c86b711",
            "email": "test3@gmail.com"
        },
        "project": {
            "_id": "60bf3fca714f66002c86b719",
            "name": "Projet Front"
        },
        "duration": 0,
        "created_at": "2021-06-08T10:32:43.800Z",
        "updated_at": "2021-06-08T10:32:43.800Z",
        "__v": 0
    },
    {
        "startTime": "2021-06-08T10:37:56.665Z",
        "_id": "60bf48930f0cf500496d4c9e",
        "description": "description tache 2",
        "taskType": "tache 2",
        "user": {
            "_id": "60bf3d16714f66002c86b711",
            "email": "test3@gmail.com"
        },
        "project": {
            "_id": "60bf3fca714f66002c86b719",
            "name": "Projet Front"
        },
        "duration": 0,
        "created_at": "2021-06-08T10:38:11.591Z",
        "updated_at": "2021-06-08T10:38:11.591Z",
        "__v": 0
    }
]
```
-  `GET /timers/user/:userId` : Retourne la liste des timers par utilisateur
	- Parametre dans l'URL :

  

		-  `userId : L'id de l'utilisateur
  ```json
  [
    {
        "startTime": "2021-06-08T16:08:37.463Z",
        "_id": "60bf96260c467803e6080af6",
        "description": "description de la tache",
        "taskType": "tache 1",
        "user": {
            "_id": "60bf888637d8d6002cfcb69f",
            "email": "test@gmail.com"
        },
        "project": {
            "_id": "60bf927c36f6cf030059aec7",
            "name": "Projet NodeSs"
        },
        "duration": 0,
        "created_at": "2021-06-08T16:09:10.672Z",
        "updated_at": "2021-06-08T16:09:10.672Z",
        "__v": 0
    },
    {
        "startTime": "2021-06-08T16:08:37.463Z",
        "_id": "60bf96b30c467803e6080af9",
        "description": "description de la tache 2",
        "taskType": "tache 2",
        "user": {
            "_id": "60bf888637d8d6002cfcb69f",
            "email": "test@gmail.com"
        },
        "project": {
            "_id": "60bf96820c467803e6080af7",
            "name": "Projet NodeJS PMN"
        },
        "duration": 0,
        "created_at": "2021-06-08T16:11:31.022Z",
        "updated_at": "2021-06-08T16:11:31.022Z",
        "__v": 0
    }
]
  ```

-  `GET /groups/:id` : Retourne les informations d'un projet

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

  

-  `PUT /timers/:timerId` : Modification d'un timer

  

	- Paramètre dans l'URL :

		-  `timerId` : L'id de timer

- Paramètre dans la requête :
	-  `description`(Optionnel) : La description  du timer

	-  `taskType`(Optionnel) : Le type de la tâche

	-  `user`(Optionnel) : L'utilisateur qui crée le timer
	
	- `startTime`(Optionnel)  :  L'heure de début (par défaut c'est l'heure actuel ) 
	- 	`duration`(Optionnel)  :  La durée du timer 
	-  `project` (Optionnel) :  Le projet où en crée ce timer
```json
{
    "description" : "modification de la description de la tache 1",
    "taskType" : "tache 1 modifiée",
    "user" : "60bf3d12714f66002c86b710",  
    "project" : "60bf4022714f66002c86b71b"
}
```

- Retour :

```json
{
    "startTime": "2021-06-01T00:00:00.000Z",
    "_id": "60bf474ba6c0d1003bf5cc1e",
    "description": "modification de la description de la tache 1",
    "taskType": "tache 1 modifiée",
    "user": {
        "groups": [],
        "_id": "60bf3d12714f66002c86b710",
        "email": "test2@gmail.com"
    },
    "project": {
        "groups": [
            "60bf3f45714f66002c86b714"
        ],
        "close": false,
        "_id": "60bf4022714f66002c86b71b",
        "name": "Projet NodeJS PMN",
        "admin": "60bf3d0d714f66002c86b70f",
        "created_at": "2021-06-08T10:02:10.495Z",
        "updated_at": "2021-06-08T10:02:10.495Z",
        "__v": 0
    },
    "duration": 20,
    "created_at": "2021-06-08T10:32:43.800Z",
    "updated_at": "2021-06-08T12:55:53.387Z",
    "__v": 0
}
```

  -  `PUT /timers/:projectId/stop/:id` : Stopper un timer
		- Paramètre dans l'URL :
			- `projectId` : L'id du projet qui contient le timer
			-  `id` : L'id de timer
	- Retour :

```json
{
    "message": "timer stopped successfully",
    "result": {
        "startTime": "2021-06-08T12:58:39.989Z",
        "_id": "60bf697fb7ed80013adb5e8b",
        "duration": 970556,
        "project": {
            "groups": [
                "60bf3f45714f66002c86b714"
            ],
            "close": false,
            "_id": "60bf4022714f66002c86b71b",
            "name": "Projet NodeJS PMN",
            "admin": "60bf3d0d714f66002c86b70f",
            "created_at": "2021-06-08T10:02:10.495Z",
            "updated_at": "2021-06-08T10:02:10.495Z",
            "__v": 0
        },
        "created_at": "2021-06-08T12:58:40.012Z",
        "updated_at": "2021-06-08T13:14:50.561Z",
        "__v": 0
    }
}
```

### DELETE

  

-  `DELETE /timers/:timerId` : Suppression d'un timer
	- C'est uniquement l'administrateur de timer qui a le droit de supprimer le timer.
- Parametre dans l'URL :

	-  `timerId` : L'id de timer 

- Retour :
```json
{
    "message": "timer successfully removed"
}
```