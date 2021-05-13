
# Utilisateur

Liste de tous les les points d'entrée lié à la gestion d'un utilisateur, ils commencent tous par `/users`.

### GET

- `GET /users/{id}` : Retourne les informations d'un utilisateur

  - Parametre dans l'URL :

    - `id` : L'id de l'utilisateur

  - Retour :
... ( A compélter)

### POST

- `POST /users/login` : Connexion d'un utilisateur

  - Parametre dans la requete HTTP :

    - `login` : L'email de l'utilisateur (doit être unique), :question: possibilité plus tard de prendre un autre identifiant unique.
    - `password` : Le mot de passe de l'utilisateur 

    ```json
    {
        "login": "test@email.com",
        "password": "azerty"
    }
    ```

  - Retour :

    ```json
    {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.e06MJM0W2IGKwyOzwQEgNhrXgSi3envVExGR9uoKplQ",
        "user": {
            "id": 6,
            "name": "John Doe",
            "email": "test@email.com",
            ...
        }
    }
    ```

- `POST /users` : Inscription d'un utilisateur

  - Parametre dans la requete HTTP :

    - `name` : Le nom de l'utilisateur
    - `email` : L'email de l'utilisateur (doit être unique, est vérifié sur le serveur)
    - `password` : Le mot de passe
    - ..

    ```json
    {
        "name": "John Doe",
        "email": "test@email.com",
        "password": "azerty"
    }
    ```


### PUT

- `PUT /users/refresh` : Actualise le token de l'utilisateur connecté pour prolonger sa validité en générant un nouveau token

    - Retour :
      
          ```json
          {
              "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.e06MJM0W2IGKwyOzwQEgNhrXgSi3envVExGR9uoKplQ",
          }
          ```

- `PUT /users` : Modification de l'utilisateur connecté (une erreur si aucun utilisateur n'est connecté)

  - Parametre dans la requete HTTP :

    - `name (optionnel)` : Le nouveau nom de l'utilisateur
    - `email (optionnel)` : Le nouvelle email de l'utilisateur (doit être unique, est vérifié sur le serveur)
    - `password (optionnel)` : Le nouveau mot de passe

    ```json
    {
        "name": "John Doe",
        "email": "test@email.com",
        "password": "azerty"
    }
    ```

  - Retour :

    ```json
    {
    	"id": 6,
        "name": "John Doe",
        "email": "test@email.com",
        "tag": "John_Doe#08520"
    }
    ```
