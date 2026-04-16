#!/usr/bin/env bash
# List Compute Engine VMs and external IPs for the PayRam host project.
# Requires: gcloud auth login (interactive, once per machine session)
#
# Usage:
#   GCP_PROJECT_ID=my-project ./scripts/list-gce-with-external-ip.sh
# Default project id is the one previously used on this machine's gcloud config.
set -euo pipefail
PROJECT="${GCP_PROJECT_ID:-payvantage-payram}"
echo "Project: $PROJECT  (set GCP_PROJECT_ID to override)"
gcloud config set project "$PROJECT" >/dev/null
gcloud compute instances list \
  --format="table(name,zone,status,networkInterfaces[0].accessConfigs[0].natIP)" \
  "$@"
