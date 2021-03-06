import {
  Connection,
  ConnectionOptions,
  createConnection,
  EntitySchema,
  getConnection,
} from 'typeorm';

/* eslint-disable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any, @typescript-eslint/ban-ts-comment */
const entitiesChanged = (
  prevEntities: (Function | string | EntitySchema<any>)[] | undefined,
  newEntities: (Function | string | EntitySchema<any>)[] | undefined
): boolean => {
  if (prevEntities?.length !== newEntities?.length) {
    return true;
  }

  if (prevEntities && newEntities) {
    for (let i = 0; i < prevEntities.length; i++) {
      if (prevEntities[i] !== newEntities[i]) {
        return true;
      }
    }
  }
  return false;
};

const updateConnectionEntities = async (
  connection: Connection,
  entities: (Function | string | EntitySchema<any>)[] | undefined
): Promise<undefined | void> => {
  if (!connection || !entitiesChanged(connection.options.entities, entities)) {
    return;
  }
  // @ts-ignore
  connection.options.entities = entities;

  // @ts-ignore
  connection.buildMetadatas();
  if (connection.options.synchronize) {
    await connection.synchronize();
  }
};

let connection: Connection | null = null;

export const connectTypeorm = async (connectionOptions: ConnectionOptions): Promise<void> => {
  async function _connect() {
    connection = getConnection(connectionOptions.name);

    if (!connection.isConnected) {
      connection = await connection.connect();
    }
  }

  if (!connection) {
    try {
      connection = await createConnection(connectionOptions);
    } catch (error) {
      if (error.name === 'AlreadyHasActiveConnectionError') {
        await _connect();
      } else {
        console.error('TYPEORM_CONNECTION_ERROR', error);
      }
    }
  } else {
    await _connect();
  }

  if (process.env.NODE_ENV !== 'production') {
    await updateConnectionEntities(connection!, connectionOptions.entities);
  }
};
/* eslint-enable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any, @typescript-eslint/ban-ts-comment */
