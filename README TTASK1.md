# RS School Caesar cipher CLI tool

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone {repository URL}
```

## Installing dependency

```
npm install
```
or 
```
yarn
```

## Running application

CLI tool should accept 5 options (short alias and full name):

1.  **-s, --shift**: a shift - number
2.  **-i, --input**: an input file, if missed - used console as an input source
3.  **-o, --output**: an output file, if missed - used console as an output source
4.  **-a, --action**: an action encode/decode
5. **-h, --help**: show help

Examples:
```
node task1 -h
```
```
node task1 -a encode -s 7 -i input.txt" -o output.txt
```
```
node task1 -a decode -s 5  -o output.txt
```
```
node task1 --action encode -s 4 --input input.txt
```
