import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';
import * as relations from './relations';

declare global {
  interface GlobalThis {
    db?: ReturnType<typeof drizzle>;
  }
}

const queryClient = postgres(process.env.DATABASE_URL!, {
  max: 5,
});

export const db = drizzle(queryClient, {
  schema: {
    ...schema,
    ...relations,
  },
});

if (process.env.NODE_ENV !== 'production') (globalThis as GlobalThis).db = db;

// DO NOT DELETE THIS FOR THE TIME BEING!
// import { drizzle } from 'drizzle-orm/postgres-js';
// import postgres from 'postgres';
// import * as schema from './schema';
// import * as relations from './relations';

// const client = postgres(process.env.DATABASE_URL!);
// export const db = drizzle(client, {
//   schema: {
//     ...schema,
//     ...relations,
//   },
// });
