class Box {
    locked = true;
    #content = [];
  
    unlock() { this.locked = false; }
    lock() { this.locked = true;  }
    get content() {
      if (this.locked) throw new Error("Locked!");
      return this.#content;
    }
  }
  
  function withBoxUnlocked(box, body) {
    let wasLocked = box.locked;
    box.unlock();
    try {
      body();
    } catch(e) {
      throw e;
    } finally {
      if (wasLocked) {
        box.lock();
      }
    }
  }
  
  function testBox(box) {
    withBoxUnlocked(box, () => {
        box.content.push("gold piece");
    });
    console.log(box.locked);
    // → true
    
    try {
        withBoxUnlocked(box, () => {
            throw new Error("Pirates on the horizon! Abort!");
        });
    } catch (e) {
        console.log("Error raised: " + e);
    }
    console.log(box.locked);
    // → Error: "Pirates on the horizon! Abort!"
    // → true
    withBoxUnlocked(box, () => {
        box.content.pop();
        box.content.push(new Box());
    });
    withBoxUnlocked(box, () => {
        console.log(box.content)
    });
    // → [{locked: true}]
    withBoxUnlocked(box, () => {
        innerBox = box.content[0]
        withBoxUnlocked(innerBox, () => {
            innerBox.content.push("gold piece");
        });
    });

    withBoxUnlocked(box, () => {
        withBoxUnlocked(box.content[0], () => {
            console.log(box.content[0].content)
        });
    });
    // → ["gold piece"]

    try {
        withBoxUnlocked(box, () => {
            withBoxUnlocked(box.content[0], () => {
                throw new Error("Nested pirates on the horizon! Abort!");
            });
        });
    } catch (e) {
        console.log("Error raised: " + e);
    }
    // → Error raised: Error: Nested pirates on the horizon! Abort!
  }
  testBox(new Box());