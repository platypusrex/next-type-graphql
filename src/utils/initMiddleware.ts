import { NextApiRequest, NextApiResponse } from 'next';
import { MicroRequest } from 'apollo-server-micro/dist/types';
import { ServerResponse } from 'http';

// eslint-disable-next-line @typescript-eslint/ban-types
export const initMiddleware = (middleware: Function) => {
  return (
    req: NextApiRequest | MicroRequest,
    res: NextApiResponse | ServerResponse
  ): Promise<unknown> =>
    new Promise((resolve, reject) => {
      middleware(req, res, (result: unknown) => {
        if (result instanceof Error) {
          console.error(result); // eslint-disable-line no-console
          return reject(result);
        }
        return resolve(result);
      });
    });
};
