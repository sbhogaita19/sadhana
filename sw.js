// Old Sadhana address. The app now lives at /prakash/.
// This worker replaces any old Sadhana worker, moves open windows to Prakash,
// removes only old Sadhana caches, then unregisters itself.
// It never touches localStorage or IndexedDB, so all logs are kept.
self.addEventListener('install',e=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil((async()=>{
  const ks=await caches.keys();
  await Promise.all(ks.filter(k=>/^sadhana-/.test(k)).map(k=>caches.delete(k)));
  await self.clients.claim();
  const cs=await self.clients.matchAll({type:'window'});
  await self.registration.unregister();
  cs.forEach(c=>{try{c.navigate('https://sbhogaita19.github.io/prakash/')}catch(_){}});
})()));
self.addEventListener('fetch',e=>{
  if(e.request.mode==='navigate') e.respondWith(Response.redirect('https://sbhogaita19.github.io/prakash/',302));
});
