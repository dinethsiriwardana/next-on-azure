# 🚀 NextAzure - Deploy Next.js to Azure Cloud

A beautiful landing page showcasing how to deploy your Next.js applications to Microsoft Azure. Built with Next.js 15, TypeScript, and Tailwind CSS.

## ✨ Features

- 🎨 Modern, responsive design with Azure-inspired branding
- 🌓 Dark mode support
- ⚡ Built with Next.js 15 and Turbopack
- 🎯 TypeScript for type safety
- 💅 Tailwind CSS for styling
- 📱 Mobile-first responsive design

## 🏃‍♂️ Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `src/app/page.tsx`. The page auto-updates as you edit the file.

## ☁️ Deploy to Azure

### Option 1: Azure App Service

1. Install Azure CLI:
```bash
brew install azure-cli
```

2. Login to Azure:
```bash
az login
```

3. Create and deploy your app:
```bash
az webapp up --name my-nextjs-app --runtime "NODE:20-lts" --sku B1
```

### Option 2: Azure Static Web Apps

1. Install the Azure Static Web Apps CLI:
```bash
npm install -g @azure/static-web-apps-cli
```

2. Build your app:
```bash
npm run build
```

3. Deploy to Azure:
```bash
swa deploy --app-location ./ --output-location .next
```

### Option 3: Azure Container Apps

1. Create a Dockerfile:
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

2. Build and push to Azure Container Registry:
```bash
az acr build --registry myregistry --image nextjs-app:latest .
```

3. Deploy to Container Apps:
```bash
az containerapp create \
  --name my-nextjs-app \
  --resource-group my-rg \
  --image myregistry.azurecr.io/nextjs-app:latest \
  --target-port 3000 \
  --ingress external
```

## 📚 Learn More

### Next.js Resources
- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial
- [Next.js GitHub repository](https://github.com/vercel/next.js)

### Azure Resources
- [Azure App Service Documentation](https://learn.microsoft.com/en-us/azure/app-service/)
- [Azure Static Web Apps Documentation](https://learn.microsoft.com/en-us/azure/static-web-apps/)
- [Azure Container Apps Documentation](https://learn.microsoft.com/en-us/azure/container-apps/)
- [Deploy Next.js to Azure](https://learn.microsoft.com/en-us/azure/static-web-apps/deploy-nextjs-hybrid)

## 🎨 Customization

This landing page features:
- Custom "NextAzure" branding with sparkle logo
- Azure-inspired color scheme (blues and cyans)
- Three deployment options clearly explained
- Quick start guide with CLI commands
- Comprehensive resource links

Feel free to customize the branding, colors, and content to match your needs!

## 📄 License

MIT License - feel free to use this project for your own purposes.
