Pour exécuter  l'application avec Docker Compose ou Docker Swarm, vous pouvez suivre les étapes suivantes :

## Docker Compose

- Naviguez vers le répertoire contenant le fichier `compose.yml`:

```sh
cd /chemin/vers/votre/dossier
```

- Exécutez l'application avec Docker Compose :

```sh
docker-compose -f compose.yml up
```

## Docker Swarm

- Initialisez Docker Swarm :

```sh
docker swarm init
```

- Naviguez vers le répertoire contenant le fichier `built-compose.yml`:

```sh
cd /chemin/vers/votre/dossier
```

- Déployez l'application avec Docker Swarm :

```sh
docker stack deploy -c built-compose.yml test
```

Notez que dans les deux cas, l'application sera accessible sur le port 3005 de la machine, comme défini dans les fichiers de configuration Docker Compose.