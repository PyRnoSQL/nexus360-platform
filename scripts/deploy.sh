#!/bin/bash
echo "Deploying NEXUS360 to Railway..."

# Install dependencies
pnpm install

# Build the application
pnpm build

echo "Build complete! Ready for deployment."
