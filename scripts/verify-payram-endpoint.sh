#!/usr/bin/env bash
# Quick check that a self-hosted PayRam Core responds.
# Usage: ./scripts/verify-payram-endpoint.sh [BASE_URL]
# Default matches a typical GCE deployment (root = "Welcome to Payram Core").
set -euo pipefail
BASE="${1:-${PAYRAM_API_URL:-http://35.222.76.90:8080}}"
BASE="${BASE%/}"
echo "Root: $BASE/"
curl -fsS "$BASE/" || true
echo
echo "API (expect 401 without PAYRAM_API_KEY):"
code="$(curl -sS -o /dev/null -w "%{http_code}" -X POST "$BASE/api/v1/payment" \
  -H "Content-Type: application/json" -d '{}')"
echo "  POST $BASE/api/v1/payment -> HTTP $code"
