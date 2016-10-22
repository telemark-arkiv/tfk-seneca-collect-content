# tfk-seneca-collect-content
Seneca content collector

## Messages handled

### ```cmd: collect-info, type: user```

Collects content for a user and/or a user's roles

```JavaScript
seneca.act({cmd: 'collect-info', type:'user', user:user, roles:[roles]}, (error, data) => {})
```

## Messages emitted

### ```role: info, info: content-collected```

Contains collected info for user/role wrapped in the data property

```JavaScript
{
    system: 'systemname',
    type: 'news',
    user: user,
    data: [] //collected info
  }
```

## Example

```JavaScript
'use strict'

const seneca = require('seneca')()
const content = require('./index')
const options = {
  type: 'news',
  channelId: 'news',
  feedHostUrl: 'https://info.portalen.no/articles.json'
}

seneca.add('role: info, info: content-collected', (args, callback) => {
  console.log(args.data)
})

seneca.use(content, options)

seneca.act('cmd: collect-info, type: user', {user: 'gasg', roles: ['alle', 'administrasjonen']})
```

## License
[MIT](LICENSE)
