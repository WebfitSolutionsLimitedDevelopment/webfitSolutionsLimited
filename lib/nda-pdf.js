// Dependency-free PDF writer for text-only signed agreement copies.
const clean = (s) => String(s).normalize('NFKD').replace(/[^\x20-\x7E\n]/g, '-');
const escapePdf = (s) => clean(s).replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)');
export function signedAgreementPdf(text) {
  const lines = [];
  for (const para of clean(text).split('\n')) {
    if (!para.trim()) { lines.push(''); continue; }
    let line = '';
    for (const word of para.split(/\s+/)) {
      if ((line + ' ' + word).length > 94) { lines.push(line); line = word; }
      else line = line ? line + ' ' + word : word;
    }
    if (line) lines.push(line);
  }
  const pages = [];
  for(let i=0;i<lines.length;i+=55) pages.push(lines.slice(i,i+55));
  const objects = [null, null, null];
  const pageIds = [];
  for (const page of pages) {
    const stream = 'BT /F1 9 Tf 46 795 Td 12 TL ' + page.map((l,i)=> (i?'T* ':'')+'('+escapePdf(l)+') Tj').join('\n') + ' ET';
    const pageId=objects.length+1, streamId=pageId+1;
    objects.push('<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 3 0 R >> >> /Contents '+streamId+' 0 R >>');
    objects.push('<< /Length '+Buffer.byteLength(stream,'latin1')+' >>\nstream\n'+stream+'\nendstream');
    pageIds.push(pageId);
  }
  objects[0]='<< /Type /Catalog /Pages 2 0 R >>';
  objects[1]='<< /Type /Pages /Kids ['+pageIds.map(id=>id+' 0 R').join(' ')+'] /Count '+pageIds.length+' >>';
  objects[2]='<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>';
  let out='%PDF-1.4\n', offsets=[0];
  for(let i=0;i<objects.length;i++){offsets.push(Buffer.byteLength(out,'latin1'));out+=(i+1)+' 0 obj\n'+objects[i]+'\nendobj\n';}
  const start=Buffer.byteLength(out,'latin1');
  out+='xref\n0 '+(objects.length+1)+'\n0000000000 65535 f \n';
  for(const offset of offsets.slice(1))out+=String(offset).padStart(10,'0')+' 00000 n \n';
  out+='trailer\n<< /Size '+(objects.length+1)+' /Root 1 0 R >>\nstartxref\n'+start+'\n%%EOF';
  return Buffer.from(out,'latin1');
}
