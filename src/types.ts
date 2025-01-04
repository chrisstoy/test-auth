export type RouteParams = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export type RouteContext = {
  params: Promise<{ [key: string]: string | string[] | undefined }>;
};
