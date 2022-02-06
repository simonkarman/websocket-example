import { APIError } from '../utils/ResponseUtils';
import { MongoClient } from 'mongodb';

export interface UserSessionDetails {
  username: string;
};

export interface User {
  username: string;
  password: string;
};

abstract class BaseUserService {
  public abstract findByUsername(username: string): Promise<User | undefined>;
  public async getByUsername(username: string): Promise<User> {
    const user = await this.findByUsername(username);
    if (user === undefined) {
      throw new APIError({
        statusCode: 404,
        body: {
          code: 'USER_NOT_FOUND',
          message: `A user with username '${username}' does not exist.`,
          type: 'user',
          id: username,
        },
      });
    }
    return user;
  }

  public toSessionDetails(user: User): UserSessionDetails {
    return { username: user.username };
  }
}

export class InMemoryUserService extends BaseUserService {
  private static readonly users: User[] = [
    { username: 'simon', password: '123simon' }, // TODO: improve salt using bcrypt?
    { username: 'rik', password: '456rik' },
  ];

  async findByUsername(username: string): Promise<User | undefined> {
    return InMemoryUserService.users.find(user => user.username.toLowerCase() === username.toLowerCase());
  }
}

const {
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT,
  DB_NAME,
// eslint-disable-next-line no-process-env
} = process.env;

export class MongoDBUserService extends BaseUserService {
  private readonly client = new MongoClient(`mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`);;
  private readonly users = this.client.db('example').collection<User>('users');

  async findByUsername(username: string): Promise<User | undefined> {
    await this.client.connect();
    console.info(username);
    const user = await this.users.findOne({ username });
    console.info(user);
    return user || undefined;
  }
}

// eslint-disable-next-line no-process-env
export const userService = process.env.DB === 'mongodb' ? new MongoDBUserService() : new InMemoryUserService();
