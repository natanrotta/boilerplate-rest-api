#!/bin/bash
echo "🛑 Parando todos os containers..."
docker stop $(docker ps -aq) 2>/dev/null

echo "🗑️ Removendo todos os containers..."
docker rm $(docker ps -aq) 2>/dev/null

echo "🖼️ Removendo todas as imagens..."
docker rmi -f $(docker images -q) 2>/dev/null

echo "📦 Removendo todos os volumes..."
docker volume rm $(docker volume ls -q) 2>/dev/null

echo "♻️  Limpando tudo com prune..."
docker system prune -a --volumes -f

echo "✅ Docker limpo com sucesso!"
