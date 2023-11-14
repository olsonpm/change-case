#! /usr/bin/env sh

cd packages/change-case
npm run build
cd ../sponge-case
npm run build
cd ../swap-case
npm run build
cd ../title-case
npm run build

