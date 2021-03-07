import Cors from 'cors';

export const cors = Cors({
  credentials: true,
  origin: [/localhost$/, /localhost:[0-9]+$/],
});
