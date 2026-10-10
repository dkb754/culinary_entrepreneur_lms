// A tiny stand-in for Resend used only by the CI backend tests. It records every POST /emails so the tests can prove what
// the enrollment function sent. GET /captured lists them; POST /reset clears the list. Never used outside CI.
import http from 'node:http';
const PORT = Number(process.env.MOCK_RESEND_PORT || 8788);
let captured = [];
http.createServer((req, res) => {
  let body = '';
  req.on('data', c => { body += c; });
  req.on('end', () => {
    const send = (code, obj) => { res.writeHead(code, { 'content-type': 'application/json' }); res.end(JSON.stringify(obj)); };
    if (req.method === 'POST' && req.url === '/emails') {
      try { captured.push({ auth: req.headers.authorization || '', ...JSON.parse(body) }); } catch { return send(400, { error: 'bad json' }); }
      return send(200, { id: 'mock-' + captured.length });
    }
    if (req.method === 'GET' && req.url === '/captured') return send(200, captured);
    if (req.method === 'POST' && req.url === '/reset') { captured = []; return send(200, { ok: true }); }
    send(404, { error: 'not found' });
  });
}).listen(PORT, '0.0.0.0', () => console.log('mock resend on ' + PORT));
