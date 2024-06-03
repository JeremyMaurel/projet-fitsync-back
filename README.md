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
exemple : CREATE USER trombi WITH PASSWORD 'trombi';

-- Créer la BDD
CREATE DATABASE nomDeLaBase OWNER nomDuLutilisateur;
exemple : CREATE DATABASE trombi OWNER trombi;

-- Tester la connexion
psql -U nomDeLutilisateur -d nomDeLaBase
exemple : psql -U trombi -d trombi
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
   Pour utiliser les routes POST requestPassword et POST resetPassword, vous devrez configurer les valeurs correspondantes dans votre .env (vous pouvez utiliser Mailtrap, Gmail, MailGun ou encore SendGrid )

7. Lancer l'Api: Démarrer l'application en mode développement :

```sh
npm run dev
```

Votre API devrait maintenant être fonctionnelle.

8. Générer la documentation JSDoc

```sh
# installer JSDoc si ce n'est pas déjà le cas
npm i jsdoc
# pour vérifier l'installation
jsdoc --version
# créer la documentation
npx jsdoc -c jsdoc.json
```

9. Générer la documentation Swagger.

Se rendre sur localhost:PORT/api-docs.
Pour les routes protégées, il faut générer un token (Insomnia, Curl etc) et le copier dans l'encart Authorize.
 
10. Gestion des tests unitaires
```sh
#installer jest si ce n'est pas déjà le cas
npm install --save-dev @jest/globals
#Comme on est en ECM6, lancer cette commande au lieu de passer par 'npm test' (sinon erreur au niveau des modules)
node --experimental-vm-modules node_modules/jest/bin/jest.js
```