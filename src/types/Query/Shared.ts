export type IPaginatedQueryArguments = {
  offset: string;
  limit: number;
};

export type IPaginatedQuery<R extends unknown> = (
  parent: null,
  args: IPaginatedQueryArguments
) => Promise<R>;
