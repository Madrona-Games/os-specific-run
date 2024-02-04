# os-specific-run

A github action for running a separate command based on the os

```yaml
- uses: Madrona-Games/os-specific-run@v2
  with:
    macos: echo "Hi from macos"
    linux: |
      echo "Hi from linux"
      echo "Hi from linux second line"
    windows: echo "Hi from windows"
```

## Parameters

### (optional) Command you wish to run

| os      | command value                           |
| ------- | --------------------------------------- |
| macos   | echo "No command specified for macos"   |
| linux   | echo "No command specified for linux"   |
| windows | echo "No command specified for windows" |

### (optional) Shell you wish to use

| os            | command value |
| ------------- | ------------- |
| macos-shell   | bash          |
| linux-shell   | bash          |
| windows-shell | pwsh          |

See https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions#using-a-specific-shell for more
details

## Full Example

```yaml
name: test

on:
  push:

jobs:
  build:
    runs-on: ${{ matrix.os }}
    strategy:
      matrix:
        os: ['ubuntu-latest', 'windows-latest', 'macos-latest']
    steps:
      - uses: actions/checkout@v4

      - uses: Madrona-Games/os-specific-run@v2
        with:
          macos: echo "Hi from macos"
          linux: |
            echo "Hi from linux"
            echo "Hi from linux second line"
          windows: echo "Hi from windows"
```

## Developer instructions

### Setup Environment

```shell
npm install
```

### Build project

```shell
npm run build
```
