interface IngressEntry {
  ingress: string;
  eventData: any;
}

const createIngressMap = () => {
  return new Map<string, IngressEntry>();
};

export { createIngressMap, IngressEntry };
