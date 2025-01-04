export type RouteParams = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export type RouteContext = {
  params: { [key: string]: string | string[] | undefined };
};
