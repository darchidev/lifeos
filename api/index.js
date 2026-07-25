export default async function handler(req, res) {
  const mod = await import('../dist/lifeos/server/server.mjs');
  return mod.reqHandler(req, res);
}
