#!/bin/sh
# DEPRECATED: this script relied on `travis encrypt-file`, and Travis CI is no
# longer used. CI now runs on GitHub Actions (.github/workflows/build-release.yml);
# store credentials as GitHub Actions secrets instead of encrypted files.
# Kept for historical reference only.

cd test/resources
tar cvf secrets.tar auth.js # more files can be added here if necessary
cd ../..
travis encrypt-file test/resources/secrets.tar
