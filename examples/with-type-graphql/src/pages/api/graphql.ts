import { apolloServer } from '../../api';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default apolloServer.createHandler();
