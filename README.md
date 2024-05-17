# Utilisation de l'API FitSync

1. Installer les dépendnaces:

```sh
   npm install
```

2. Créer la base de données sqitch :

```sql
-- se connecter en tant qu'utilisateur PostgreSQL
sudo -i -u postgres psql

-- Créer un utilisateur
CREATE USER nomDuLutilisateur WITH PASSWORD 'motDePasse';
CREATE USER trombi WITH PASSWORD 'trombi';

-- Créer la BDD
CREATE DATABASE nomDeLaBase OWNER nomDuLutilisateur;
CREATE DATABASE trombi OWNER trombi;

-- Tester la connexion
psql -U nomDeLutilisateur -d nomDeLaBase
psql -U trombi -d trombi
```

3. configurer `sqitch.conf`:

Copiez le fichier `sqitch.conf.example` et renommez-le en `sqitch.conf`. Assurez-vous que le contenu de `sqitch.conf` est correct pour votre environnement.

4. Déployer sqitch

```sh
sqitch deploy
```

5. Seed la BDD

```sh
psql -U nomDuLutilisateur -d nomDeLaBaseDeDonnes -f chemin/du/fichier.sql
```

6. Copiez le fichier `.env.development.example` et renommez-le en `.env.development`. Modifiez les valeurs en fonction de votre environnement.

7. Lancer l'Api: Démarrer l'application en mode développement :

```sh
npm run dev
```

Votre API devrait maintenant être fonctionnelle.
