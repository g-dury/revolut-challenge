#!/bin/bash

setup_git() {
  git config --global user.email "travis@travis-ci.org"
  git config --global user.name "Travis CI"
}

modify_files() {
  sed -i '' "s|image: gdury/revolut-app:*|image: gdury/revolut-app:$VERSION|" ./kubernetes/app-deployment.yaml
}

commit_files() {
  git checkout master
  dateAndMonth=`date "+%b %Y"`
  git add -f kubernetes/*.yaml
  # Create a new commit with a custom build message
  # with "[skip ci]" to avoid a build loop
  # and Travis build number for reference
  git commit -m "Travis update: $dateAndMonth (Build $TRAVIS_BUILD_NUMBER)" -m "[skip ci]"
}

upload_files() {
  # Remove existing "origin"
  git remote rm origin
  # Add new "origin" with access token in the git URL for authentication
  git remote add origin https://g-dury:${GITHUB_TOKEN}@github.com/g-dury/revolut-challenge.git > /dev/null 2>&1
  git push origin master --quiet > /dev/null 2>&1
}

setup_git

modify_files

commit_files

# Attempt to commit to git only if "git commit" succeeded
if [ $? -eq 0 ]; then
  echo "Uploading to GitHub"
  upload_files
else
  echo "No changes in yaml files. Nothing to do"
fi
