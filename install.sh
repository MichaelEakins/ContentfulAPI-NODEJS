#!/bin/bash

echo "Welcome to Contentful API Setup"
echo "This script will help you generate the .env file for your project."

# Prompt the user for Space ID
read -p "Enter your Contentful Space ID: " SPACE_ID

# Prompt the user for Content Delivery API (CDA) Token
read -p "Enter your Contentful CDA Access Token: " CDA_ACCESS_TOKEN

# Prompt the user for Content Management API (CMA) Token
read -p "Enter your Contentful CMA Access Token: " CMA_ACCESS_TOKEN

# Create the .env file
cat <<EOF > .env
SPACE_ID=$SPACE_ID
CDA_ACCESS_TOKEN=$CDA_ACCESS_TOKEN
CMA_ACCESS_TOKEN=$CMA_ACCESS_TOKEN
EOF

echo ".env file has been created successfully!"
echo "Here are the contents of your .env file:"
cat .env
