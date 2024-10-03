# Confy Manager: TypeScript Configuration Manager

_____  ____  _   _ ______ __   __
 / ____|/ __ \| \ | |  ____\ \ / /
| |    | |  | |  \| | |__   \ V / 
| |    | |  | | . ` |  __|   > <  
| |____| |__| | |\  | |     / . \ 
 \_____\____/|_| \_|_|    /_/ \_\

Confy Manager is a flexible and type-safe configuration management library for TypeScript projects. It supports environment variables, default values, and strong typing to make managing your application's configuration easy and reliable.

## Features

- Type-safe configuration values
- Support for environment variables
- Default values
- Easy integration with TypeScript projects
- Lightweight with no external dependencies

## Installation

Install Confy Manager using npm:

```bash
npm install confy-manager
```

Or using yarn:

```bash
yarn add confy-manager
```

## Usage

Here's a basic example of how to use Confy Manager:

```ts

import { createConfig, Field } from 'confy';

const config = createConfig({
  PORT: new Field(3000, Number, 'PORT'),
  DATABASE_URL: new Field('mongodb://localhost:27017', String, 'DATABASE_URL'),
  DEBUG: new Field(false, Boolean, 'DEBUG'),
});

// Access your configuration values
const port = config.get('PORT');
const databaseUrl = config.get('DATABASE_URL');
const debug = config.get('DEBUG');

console.log(`Server running on port ${port}`);
console.log(`Connected to database at ${databaseUrl}`);
console.log(`Debug mode: ${debug}`);
```

## API

`Field<T>`

Creates a new configuration field.

```ts
new Field<T>(defaultValue: T, type: FieldType, envVar: string)
```

`defaultValue`: The default value if no environment variable is set.
`type`: The type of the field (String, Number, or Boolean).
`envVar`: The name of the environment variable to check.

`createConfig`

Creates a new configuration object.

```ts
createConfig(configDefinition: { [key: string]: Field<any> })
```

`configDefinition`: An object where keys are configuration keys and values are Field instances.

`Config`
The configuration object returned by `createConfig`.

`get<T>(key: string): T`: Get the value of a configuration key.

## Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

## License
This project is licensed under the MIT License.