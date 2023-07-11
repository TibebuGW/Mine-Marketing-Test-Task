export interface QueryResult  {
    phoneCode: string,
    capitalCity: string,
    code: string,
    currencyCode: string[],
    name: string,
}


export interface QueryResultDatabase {
    userEmail: any;
    phoneCode: string;
    capitalCity: string;
    code: string;
    currencyCode: string[];
    name: string;
  }