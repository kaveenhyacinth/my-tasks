#!/bin/bash

# Remove dist folder if it exists for api
if [ -d "api/dist" ]; then
  rm -rf api/dist
  echo "Removed api/dist directory."
fi

# Remove dist folder if it exists for client
if [ -d "client/dist" ]; then
  rm -rf client/dist
  echo "Removed client/dist directory."
fi

nvm use

npm install -g concurrently

# Use concurrently to build and start both api and client in parallel
concurrently "cd api && npm run build" "cd client && npm run build"

echo "Backend and client applications have been built"