# ============================================
# Stage 1: Builder
# ============================================
FROM node:20-slim AS builder

WORKDIR /app

# Install dependencies
COPY package.json ./
RUN npm install

# Copy source code
COPY . .

# ============================================
# Stage 2: Production
# ============================================
FROM node:20-slim

WORKDIR /app
ENV NODE_ENV=production

# Install only production dependencies
COPY package.json ./
RUN npm install --omit=dev

# Copy application from builder stage
COPY --from=builder /app .

# Add startup script
RUN chmod +x start.sh

# Setup security
RUN groupadd -r appgroup && useradd -r -g appgroup appuser
RUN chown -R appuser:appgroup /app

USER appuser

EXPOSE 3000

# Démarrage de l'application avec seeder
CMD ["./start.sh"]
