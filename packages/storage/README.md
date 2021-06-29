# storage
seeing the name of a thing one thinks of its function o(´^｀)o

## Basic Usage

```bash
# if you use npm
npm install @pinkbin/storage --save-dev
# or if you use yarn
yarn add @pinbin/storage
```

### Get Start

```js
import storage from '@pinkbin/storage'

storage.local.set('name', 'your value')

storage.session.set('name', 'your value')

// cookie api is the same as 'js-cookie'
storage.cookie.set('name', 'your value')

```
