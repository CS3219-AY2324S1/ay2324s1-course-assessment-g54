#!/bin/bash

cd users-service
test_files=("signUp.test.js" "login.test.js" "delete.test.js" "update.test.js")
for file in "${test_files[@]}"; do
  yarn jest "$file"
done
