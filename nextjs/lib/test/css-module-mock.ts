const handler = {
  get(_target: Record<string, string>, prop: string) {
    return prop;
  },
};

export default new Proxy({} as Record<string, string>, handler);
