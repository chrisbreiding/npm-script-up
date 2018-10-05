# script-up

> Finds and runs an npm script in `package.json` from the parent directory up to the git root

In a monorepo, instead of duplicating dependencies and scripts among packages, you can call up to a parent/ancestor npm script.

## Install

```sh
npm install --save-dev script-up
```

## Usage

```json
{
  "scripts": {
    "test": "script-up test"
  }
}
```

If you have a file structure like this:

```
/ root
  - package.json
  / packages
    / app
      - package.json
    / lib
      - package.json
```

Using the above in the `package.json` for `app` and `lib` will call the `test` script in the `root` `package.json`.

## License

The MIT License (MIT)

Copyright (c) 2017 Chris Breiding

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.