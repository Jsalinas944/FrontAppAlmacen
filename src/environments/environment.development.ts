export interface Environment {
  production: boolean;
  endpoint: string;

}

export const environment:Environment = {
  production: false,
  endpoint: 'http://localhost:3001/'
};


