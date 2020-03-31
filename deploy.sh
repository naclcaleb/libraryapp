#!/usr/bin/env sh
npm run build
git add dist && git commit -m "Updating Github pages"
git subtree push --prefix dist origin gh-pages