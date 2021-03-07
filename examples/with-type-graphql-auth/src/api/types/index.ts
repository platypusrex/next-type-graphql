import { NextApiRequest, NextApiResponse } from 'next';

interface Session {
  session: {
    userId?: number;
  };
}

export interface Context {
  req: NextApiRequest & Session;
  res: NextApiResponse;
}
