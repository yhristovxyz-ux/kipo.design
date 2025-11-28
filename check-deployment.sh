#!/bin/bash

# Deployment Status Checker
# Usage: ./check-deployment.sh <backend-url> <frontend-url>

BACKEND_URL=$1
FRONTEND_URL=$2

if [ -z "$BACKEND_URL" ] || [ -z "$FRONTEND_URL" ]; then
    echo "Usage: ./check-deployment.sh <backend-url> <frontend-url>"
    echo "Example: ./check-deployment.sh https://kipo-backend.railway.app https://kipo-design.vercel.app"
    exit 1
fi

echo "🔍 Checking Deployment Status..."
echo "================================"
echo ""

# Check Backend Health
echo "📡 Backend Health Check..."
HEALTH_RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" "$BACKEND_URL/api/health")

if [ "$HEALTH_RESPONSE" = "200" ]; then
    echo "✅ Backend is healthy (HTTP $HEALTH_RESPONSE)"
    HEALTH_DATA=$(curl -s "$BACKEND_URL/api/health")
    echo "   Response: $HEALTH_DATA"
else
    echo "❌ Backend health check failed (HTTP $HEALTH_RESPONSE)"
fi

echo ""

# Check Backend Sections Endpoint
echo "📄 Backend Sections Endpoint..."
SECTIONS_RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" "$BACKEND_URL/api/sections")

if [ "$SECTIONS_RESPONSE" = "200" ]; then
    echo "✅ Sections endpoint working (HTTP $SECTIONS_RESPONSE)"
else
    echo "❌ Sections endpoint failed (HTTP $SECTIONS_RESPONSE)"
fi

echo ""

# Check Backend Projects Endpoint
echo "📁 Backend Projects Endpoint..."
PROJECTS_RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" "$BACKEND_URL/api/projects")

if [ "$PROJECTS_RESPONSE" = "200" ]; then
    echo "✅ Projects endpoint working (HTTP $PROJECTS_RESPONSE)"
else
    echo "❌ Projects endpoint failed (HTTP $PROJECTS_RESPONSE)"
fi

echo ""

# Check Frontend
echo "🌐 Frontend Check..."
FRONTEND_RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" "$FRONTEND_URL")

if [ "$FRONTEND_RESPONSE" = "200" ]; then
    echo "✅ Frontend is accessible (HTTP $FRONTEND_RESPONSE)"
else
    echo "❌ Frontend check failed (HTTP $FRONTEND_RESPONSE)"
fi

echo ""

# Check CORS
echo "🔒 CORS Check..."
CORS_RESPONSE=$(curl -s -H "Origin: $FRONTEND_URL" -H "Access-Control-Request-Method: GET" -X OPTIONS "$BACKEND_URL/api/health" -o /dev/null -w "%{http_code}")

if [ "$CORS_RESPONSE" = "204" ] || [ "$CORS_RESPONSE" = "200" ]; then
    echo "✅ CORS configured correctly (HTTP $CORS_RESPONSE)"
else
    echo "⚠️  CORS might need configuration (HTTP $CORS_RESPONSE)"
fi

echo ""
echo "================================"
echo "📊 Summary"
echo "================================"
echo "Backend URL:  $BACKEND_URL"
echo "Frontend URL: $FRONTEND_URL"
echo ""

# Overall status
if [ "$HEALTH_RESPONSE" = "200" ] && [ "$FRONTEND_RESPONSE" = "200" ]; then
    echo "✅ Deployment looks good!"
    echo ""
    echo "Next steps:"
    echo "1. Visit $FRONTEND_URL"
    echo "2. Click 'Edit' button"
    echo "3. Test editing features"
    echo "4. Try managing projects"
else
    echo "❌ Deployment has issues"
    echo ""
    echo "Troubleshooting:"
    echo "1. Check deployment logs"
    echo "2. Verify environment variables"
    echo "3. Check CORS configuration"
fi

echo ""
