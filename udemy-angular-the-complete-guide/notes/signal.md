zone.js: change detection automatically. UI update automatically.
signal: no automatic change detection. 

// init
counter = signal<number>(0);

// update
this.counter.set(this.counter()+1)
this.counter.update(old=>old.push('new one'))
this.counter.mutate(old=>[...old, 'new one'])

// read
counter()

computed()
effect(()=>console.log(this.counter())); // if signal changes