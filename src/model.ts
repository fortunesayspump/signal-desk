export const states = ['draft','investigating','identified','monitoring','resolved','scheduled','complete'] as const;
export type State = typeof states[number];
export interface Notice { id:string; kind:'incident'|'change'; state:State; organization:string; title:string; summary:string; impact:string; action:string; nextUpdate:string|null; source:{label:string;url:string;historical:boolean}; events:{at:string;label:string;detail:string}[] }
export function parseNotice(input:unknown):Notice {
  if (!input || typeof input !== 'object') throw new Error('Notice must be a JSON object.');
  const n=input as Notice;
  for(const key of ['id','organization','title','summary','impact','action'] as const) if(typeof n[key]!=='string'||n[key].length>3000) throw new Error(`Invalid ${key}. Use text up to 3000 characters.`);
  if(n.impact.length>400||n.action.length>400)throw new Error('Impact and customer action are limited to 400 characters each.');
  if(n.title.length>100||n.summary.length>240||n.organization.length>100)throw new Error('Use at most 100 characters for title, 240 for summary, and 100 for organization.');
  if(n.id.length>80||!/^[a-z0-9-]+$/.test(n.id)) throw new Error('id must contain only lowercase letters, numbers and hyphens.');
  if(!states.includes(n.state)||!['incident','change'].includes(n.kind)) throw new Error('Unknown notice kind or state.');
  if(!n.source||typeof n.source.label!=='string'||typeof n.source.url!=='string'||typeof n.source.historical!=='boolean')throw new Error('A source object is required.');
  if(n.source.label.length>120||n.source.url.length>256)throw new Error('Source label is limited to 120 characters and URL to 256.');
  if(n.source.url){const u=new URL(n.source.url); if(u.protocol!=='https:')throw new Error('Source must be an HTTPS URL.');}
  if(n.state!=='draft'&&(!n.title.trim()||!n.summary.trim()||!n.source.url||!n.source.label.trim()))throw new Error('Non-draft notices need a title, summary and labeled source.');
  if(n.kind==='incident'&&['scheduled','complete'].includes(n.state))throw new Error('Use incident states for an incident.');
  if(n.kind==='change'&&!['draft','scheduled','complete'].includes(n.state))throw new Error('Changes use draft, scheduled or complete.');
  if(n.nextUpdate!==null&&(typeof n.nextUpdate!=='string'||!validDate(n.nextUpdate)))throw new Error('nextUpdate needs an ISO timestamp with timezone, or null.');
  if(!Array.isArray(n.events)||n.events.length>12)throw new Error('Provide up to 12 timeline events.');
  let prev=-Infinity;
  for(const e of n.events){if(!e||!validDate(e.at)||typeof e.label!=='string'||typeof e.detail!=='string'||e.label.length>120||e.detail.length>120)throw new Error('Invalid timeline event.'); const t=Date.parse(e.at);if(t<prev)throw new Error('Timeline must be chronological.');prev=t;}
  return n;
}
const validDate=(s:string)=>typeof s==='string'&&/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(Z|[+-]\d{2}:\d{2})$/.test(s)&&Number.isFinite(Date.parse(s));
export function stamp(s:string){return new Intl.DateTimeFormat('en-GB',{timeZone:'UTC',day:'2-digit',month:'short',year:'numeric',hour:'2-digit',minute:'2-digit',hour12:false}).format(new Date(s))+' UTC';}
export function nextUpdate(n:Notice){return n.source.historical?'Historical record · not a live status feed':n.nextUpdate?stamp(n.nextUpdate):n.state==='resolved'||n.state==='complete'?'Closed · no further update scheduled':'Not announced';}
export function missing(n:Notice){return ['organization','title','summary','impact','action'].filter(k=>!n[k as keyof Notice]);}
