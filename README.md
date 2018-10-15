[![npm version](https://badge.fury.io/js/js.inspect.svg)](https://badge.fury.io/js/js.inspect)

# Why JS.inspect()?

## JS.inspect was made to help inspect objects, strings, sql queries in any system that runs javascript when Debug is not available or is too much intrusive.

 - React Native
 - browser
 - Nodejs
 - NativeScript

## Demo
![JS.inspect Demo](https://raw.githubusercontent.com/rod-stuchi/JS-inspect/master/docs/js-inspect-demo.gif)

# How to install?

    yarn global add js.inspect 
    npm i -g js.inspect

# Usage

make a folder somewhere in your machine

```console
mkdir inspect
cd inspect
touch index.js package.json
```

1. put in `package.json` file this:
```text
{
  "name": "inspect",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT"
}
```

2. put in `index.js` file this content:

```text
const mkBody = (socket_id, title, obj, sql) => ({
  socket_id,
  title,
  lang: (sql ? "sql" : ""),
  obj,
});

const inspect = (id, title, obj, sql = false) => {
  const body = mkBody(id, title, obj, sql);
  fetch("http://{your_machine_ip}:8080/inspect", {
    method: "POST",
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(body)
  });
  return false;
}

module.exports = inspect;
```

3. replace `{your_machine_ip}` by your IP address, save the file.

4. still in same folder that has `index.js`, run:

```console
yarn link
```
 
5. to use in another project, inside its folder, run:

```console
yarn link inspect
```

6. if the project is **React Native**, usage:

```javascript
  require("inspect")("{ID}", "title", obj);
```

7. if the project is **Node**, usage:
```console
yarn add node-fetch
```

```javascript
  const fetch = require("node-fetch");
  require("inspect")("{ID}", "title", obj);
```

**Exemples**

**An object like this**

```javascript
  const obj = [
    {"id": 1, "name": "AAAAA"},
    {"id": 2, "name": "BBBBBB"},
    {"id": 3, "name": "CCCCCCC"},
    {"id": 4, "name": "DDDDDDD", "age": 20 },
    {"id": 4, "age": 33 }
  ];

  require("inspect")("04DF2iK4ghiAjqtaAAAA", "Random Object List", obj);
```
**Will be represented as**

![Result 01](https://raw.githubusercontent.com/rod-stuchi/JS-inspect/master/docs/image01.png)

**String SQL Query**

```javascript
  const query = "select id, name, age from table_name where id > 5 and id < 9";
  require("inspect")("04DF2iK4ghiAjqtaAAAA", "SQL formatted", query, true);
```

**will be represented as**

![Result 02](https://raw.githubusercontent.com/rod-stuchi/JS-inspect/master/docs/image02.png)

[Demo YouTube](https://www.youtube.com/watch?v=Cl-B5XdSCIY)
