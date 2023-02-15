export type IPaginatedQueryArguments = {
  offset: string;
  limit: number;
};

export type IPaginatedQuery<R extends unknown, T = IPaginatedQueryArguments> = (
  parent: null,
  args: T
) => Promise<R>;
