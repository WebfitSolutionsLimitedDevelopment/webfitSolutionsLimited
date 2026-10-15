// Branded, paginated A4 agreement with an embedded company logo.
// Uses PDF native Helvetica fonts and JPEG XObject, no runtime PDF dependencies.
const ascii = s => String(s).normalize('NFKD').replace(/[^\x20-\x7E]/g, '-');
const esc = s => ascii(s).replace(/\\/g,'\\\\').replace(/\(/g,'\\(').replace(/\)/g,'\\)');
const rgb = (r,g,b) => [r,g,b].map(x=>(x/255).toFixed(3)).join(' ');
// Conservative font-width based wrapping, preserving the 45-550pt text area.
function wrap(text, limit=470, size=9.6) {
 const lines=[];
 for(const para of String(text).split('\n')){
  if(!para.trim()){lines.push('');continue;}
  let line='';
  for(const word of para.split(/\s+/)){
   const candidate=line?line+' '+word:word;
   // Helvetica glyph widths are variable. 0.56em is conservative for this prose.
   if(line && candidate.length*size*0.68>limit){lines.push(line);line=word;}
   else line=candidate;
  }
  if(line)lines.push(line);
 }
 return lines;
}
export async function signedAgreementPdf(document) {
 const { clauses, name, email, organisation, category, id, nzDate, utc, version }=document;
 const pages=[];let commands=[], y=0;
 const text=(s,x,yy,size=10,bold=false,color=[28,41,61])=>{
  commands.push(rgb(...color)+' rg BT /'+(bold?'F2':'F1')+' '+size+' Tf 1 0 0 1 '+x+' '+yy+' Tm ('+esc(s)+') Tj ET');
 };
 const rect=(x,yy,w,h,color)=>commands.push(rgb(...color)+' rg '+x+' '+yy+' '+w+' '+h+' re f');
 const newPage=()=>{if(commands.length)pages.push(commands);commands=[];y=716;
  rect(0,0,595,842,[255,255,255]);rect(0,824,595,18,[8,25,62]);
  text('WEBFIT SOLUTIONS LIMITED',129,789,14,true,[10,35,77]);
  text('CONFIDENTIALITY | MEDIA CONSENT | ENGAGEMENT',129,771,7.5,false,[72,89,113]);
  rect(45,747,505,1,[201,212,225]);
  text('info@webfitt.co.nz  |  Auckland, New Zealand',45,40,8,false,[88,102,121]);
  rect(45,54,505,1,[201,212,225]);
  if(logo)commands.push('q 49 0 0 49 48 767 cm /Im1 Do Q');
 };
 let logo=null;
 try {
  const response=await fetch('https://webfitt.com/webfit-logo.jpeg',{cache:'force-cache'});
  if(response.ok)logo=Buffer.from(await response.arrayBuffer());
 }catch{}
 newPage();
 text('ELECTRONIC LEGAL AGREEMENT',45,y,10,true,[28,96,171]);y-=25;
 text('Confidentiality, Media Consent',45,y,19,true,[10,35,77]);y-=24;
 text('& Engagement Agreement',45,y,19,true,[10,35,77]);y-=28;
 text('Agreement version: '+version+'  |  Governing law: New Zealand',45,y,9,false,[80,95,112]);y-=33;
 const paragraph=(s)=>{const lines=wrap(s,460,9.6);for(const line of lines){if(y<95)newPage();if(line)text(line,45,y,9.6,false);y-=15;}y-=13;};
 for(const [heading,body] of clauses){
  if(y<190)newPage();
  text(heading,45,y,11.5,true,[11,45,95]);y-=21;paragraph(body);
 }
 newPage(); // The execution certificate always begins on its own page.
 rect(45,y-11,505,30,[234,241,249]);text('ELECTRONIC EXECUTION CERTIFICATE',58,y,11,true,[10,35,77]);y-=40;
 const fields=[['Agreement reference',id],['Engagement type',category],['Signatory (electronic signature)',name],['Signatory email',email],['Organisation',organisation||'Not provided'],['Date signed in Auckland, New Zealand',nzDate],['UTC timestamp',utc],['Agreement version',version],['Company', 'WEBFIT SOLUTIONS LIMITED'],['Company representative','Sangita Gupta (identified representative)']];
 for(const [label,value] of fields){if(y<110)newPage();text(label+':',45,y,9,true);y-=13;for(const line of wrap(value,470,9.4)){text(line,58,y,9.4);y-=14;}y-=5;}
 if(y<120)newPage();
 text('Accepted electronically by the named signatory.',45,y,9.5,true,[9,78,53]);y-=16;
 text('Company contact: info@webfitt.co.nz',45,y,9);
 pages.push(commands);
 pages.forEach((page,i)=>page.push(rgb(88,102,121)+' rg BT /F1 8 Tf 1 0 0 1 485 40 Tm (Page '+(i+1)+' of '+pages.length+') Tj ET'));
 const objects=[null,null,null,null], pageIds=[];
 for(const cmd of pages){
  const pageId=objects.length+1,streamId=pageId+1;
  const stream=cmd.join('\n');
  objects.push('<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 3 0 R /F2 4 0 R >> '+(logo?'/XObject << /Im1 '+(pages.length*2+5)+' 0 R >> ':'')+'>> /Contents '+streamId+' 0 R >>');
  objects.push('<< /Length '+Buffer.byteLength(stream,'latin1')+' >>\nstream\n'+stream+'\nendstream');pageIds.push(pageId);
 }
 if(logo){
  // Existing website JPEG is used without modification, retaining its original branding.
  const width=800,height=800; // replaced below from JPEG SOF metadata
  let w=width,h=height;
  for(let i=2;i<logo.length-9;){if(logo[i]!==255){i++;continue;}const marker=logo[i+1],len=logo.readUInt16BE(i+2);if([0xC0,0xC1,0xC2,0xC3].includes(marker)){h=logo.readUInt16BE(i+5);w=logo.readUInt16BE(i+7);break;}i+=2+len;}
  objects.push(Buffer.concat([Buffer.from('<< /Type /XObject /Subtype /Image /Width '+w+' /Height '+h+' /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length '+logo.length+' >>\nstream\n','latin1'),logo,Buffer.from('\nendstream','latin1')]));
 }
 objects[0]='<< /Type /Catalog /Pages 2 0 R >>';
 objects[1]='<< /Type /Pages /Kids ['+pageIds.map(n=>n+' 0 R').join(' ')+'] /Count '+pages.length+' >>';
 objects[2]='<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>';
 objects[3]='<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>';
 let parts=[Buffer.from('%PDF-1.4\n','latin1')],offsets=[0],position=parts[0].length;
 objects.forEach((obj,i)=>{offsets.push(position);const body=Buffer.isBuffer(obj)?obj:Buffer.from(obj,'latin1');const part=Buffer.concat([Buffer.from((i+1)+' 0 obj\n','latin1'),body,Buffer.from('\nendobj\n','latin1')]);parts.push(part);position+=part.length;});
 const xref=position;let tail='xref\n0 '+(objects.length+1)+'\n0000000000 65535 f \n';
 for(const off of offsets.slice(1))tail+=String(off).padStart(10,'0')+' 00000 n \n';
 tail+='trailer\n<< /Size '+(objects.length+1)+' /Root 1 0 R >>\nstartxref\n'+xref+'\n%%EOF';
 parts.push(Buffer.from(tail,'latin1'));return Buffer.concat(parts);
}
