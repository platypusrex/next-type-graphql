import { NextApiRequest, NextApiResponse } from 'next';

interface Session {
  session: {
    userId?: number;
  };
}

type NextApiRequestWithSession = NextApiRequest & Session;

export interface Context {
  req: NextApiRequestWithSession;
  res: NextApiResponse;
}
