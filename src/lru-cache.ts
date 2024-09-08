/**
 * https://github.com/rsms/js-lru/blob/v2/lru.js
 *
 * A doubly linked list-based Least Recently Used (LRU) cache. Will keep most
 * recently used items while discarding least recently used items when its limit
 * is reached.
 *
 * Licensed under MIT. Copyright (c) 2010 Rasmus Andersson <http://hunch.se/>
 * See README.md for details.
 *
 * Illustration of the design:
 *
 *       entry             entry             entry             entry
 *       ______            ______            ______            ______
 *      | head |.newer => |      |.newer => |      |.newer => | tail |
 *      |  A   |          |  B   |          |  C   |          |  D   |
 *      |______| <= older.|______| <= older.|______| <= older.|______|
 *
 *  removed  <--  <--  <--  <--  <--  <--  <--  <--  <--  <--  <--  added
 */

type Entry = {
  value: any;
  key: string;
  newer: Entry | undefined;
  older: Entry | undefined;
}

class LRUCache {
  size: number;
  limit: any;
  oldest: Entry | undefined;
  newest: Entry | undefined;
  _keymap: Record<string, any>;
  constructor(limit: number) {
    // Current size of the cache. (Read-only).
    this.size = 0;
    // Maximum number of items this cache can hold.
    this.limit = limit;
    this.oldest = this.newest = undefined;
    this._keymap = {};
  }
  _markEntryAsUsed(entry: any) {
    if (entry === this.newest) {
      // Already the most recenlty used entry, so no need to update the list
      return;
    }
    // HEAD--------------TAIL
    //   <.older   .newer>
    //  <--- add direction --
    //   A  B  C  <D>  E
    if (entry.newer) {
      if (entry === this.oldest) {
        this.oldest = entry.newer;
      }
      entry.newer.older = entry.older; // C <-- E.
    }
    if (entry.older) {
      entry.older.newer = entry.newer; // C. --> E
    }
    entry.newer = undefined; // D --x
    entry.older = this.newest; // D. --> E
    if (this.newest) {
      this.newest.newer = entry; // E. <-- D
    }
    this.newest = entry;
  }
  /**
   * Put <value> into the cache associated with <key>. Returns the entry which was
   * removed to make room for the new entry. Otherwise undefined is returned
   * (i.e. if there was enough room already).
   */
  put(key: string, value: any) {
    var entry = this._keymap[key];

    if (entry) {
      // update existing
      entry.value = value;
      this._markEntryAsUsed(entry);
      return;
    }

    // new entry
    this._keymap[key] = entry = { key: key, value: value, older: undefined, newer: undefined };

    if (this.newest) {
      // link previous tail to the new tail (entry)
      this.newest.newer = entry;
      entry.older = this.newest;
    } else {
      // we're first in -- yay
      this.oldest = entry;
    }

    // add new entry to the end of the linked list -- it's now the freshest entry.
    this.newest = entry;
    this.size++;
    if (this.size > this.limit) {
      // we hit the limit -- remove the head
      return this.shift();
    }
  }
  /**
   * Purge the least recently used (oldest) entry from the cache. Returns the
   * removed entry or undefined if the cache was empty.
   *
   * If you need to perform any form of finalization of purged items, this is a
   * good place to do it. Simply override/replace this function:
   *
   *   var c = new LRUCache(123);
   *   c.shift = function() {
   *     var entry = LRUCache.prototype.shift.call(this);
   *     doSomethingWith(entry);
   *     return entry;
   *   }
   */
  shift() {
    // todo: handle special case when limit == 1
    var entry = this.oldest;
    if (entry) {
      if (this.oldest?.newer) {
        // advance the list
        this.oldest = this.oldest.newer;
        this.oldest.older = undefined;
      } else {
        // the cache is exhausted
        this.oldest = undefined;
        this.newest = undefined;
      }
      // Remove last strong reference to <entry> and remove links from the purged
      // entry being returned:
      entry.newer = entry.older = undefined;
      // delete is slow, but we need to do this to avoid uncontrollable growth:
      delete this._keymap[entry.key];
      this.size--;
    }
    return entry;
  }
  /**
   * Get and register recent use of <key>. Returns the value associated with <key>
   * or undefined if not in cache.
   */
  get(key: string, returnEntry?: boolean) {
    // First, find our cache entry
    var entry = this._keymap[key];
    if (entry === undefined) return; // Not cached. Sorry.

    // As <key> was found in the cache, register it as being requested recently
    this._markEntryAsUsed(entry);
    return returnEntry ? entry : entry.value;
  }
  // ----------------------------------------------------------------------------
  // Following code is optional and can be removed without breaking the core
  // functionality.
  /**
   * Check if <key> is in the cache without registering recent use. Feasible if
   * you do not want to chage the state of the cache, but only "peek" at it.
   * Returns the entry associated with <key> if found, or undefined if not found.
   */
  find(key: string) {
    return this._keymap[key];
  }
  /**
   * Update the value of entry with <key>. Returns the old value, or undefined if
   * entry was not in the cache.
   */
  set(key: string, value: any) {
    var oldvalue, entry = this.get(key, true);
    if (entry) {
      oldvalue = entry.value;
      entry.value = value;
    } else {
      oldvalue = this.put(key, value);
      if (oldvalue) oldvalue = oldvalue.value;
    }
    return oldvalue;
  }
  /**
   * Remove entry <key> from cache and return its value. Returns undefined if not
   * found.
   */
  remove(key: string) {
    var entry = this._keymap[key];
    if (!entry) return;
    delete this._keymap[entry.key]; // need to do delete unfortunately
    if (entry.newer && entry.older) {
      // relink the older entry with the newer entry
      entry.older.newer = entry.newer;
      entry.newer.older = entry.older;
    } else if (entry.newer) {
      // remove the link to us
      entry.newer.older = undefined;
      // link the newer entry to head
      this.oldest = entry.newer;
    } else if (entry.older) {
      // remove the link to us
      entry.older.newer = undefined;
      // link the newer entry to head
      this.newest = entry.older;
    } else { // if(entry.older === undefined && entry.newer === undefined) {
      this.oldest = this.newest = undefined;
    }

    this.size--;
    return entry.value;
  }
  /** Removes all entries */
  removeAll() {
    // This should be safe, as we never expose strong refrences to the outside
    this.oldest = this.newest = undefined;
    this.size = 0;
    this._keymap = {};
  }

  /**
   * Return an array containing all keys of entries stored in the cache object, in
   * arbitrary order.
   */
  keys() {
    if (typeof Object.keys === 'function') {
      return Object.keys(this._keymap);
    } else {
      var keys: string[] = [];
      for (var k in this._keymap) {
        keys.push(k);
      }
      return keys;
    }
  }
  /**
   * Call `fun` for each entry. Starting with the newest entry if `desc` is a true
   * value, otherwise starts with the oldest (head) enrty and moves towards the
   * tail.
   *
   * `fun` is called with 3 arguments in the context `context`:
   *   `fun.call(context, Object key, Object value, LRUCache self)`
   */
  forEach<T>(fun: (this: T, key: string, value: any, cache: this) => void, context: T, desc: boolean): void;
  forEach<T>(fun: (this: undefined, key: string, value: any, cache: this) => void, context: true): void;
  forEach<T>(fun: (this: this, key: string, value: any, cache: this) => void, context?: false): void;
  forEach<T>(fun: (this: T | this | undefined, key: string, value: any, cache: this) => void, context?: T | this, desc?: boolean) {
    var entry;
    if (context === true) {
      desc = true;
      context = undefined;
    } else if (typeof context !== 'object') {
      context = this;
    }
    if (desc) {
      entry = this.newest;
      while (entry) {
        fun.call(context, entry.key, entry.value, this);
        entry = entry.older;
      }
    } else {
      entry = this.oldest;
      while (entry) {
        fun.call(context, entry.key, entry.value, this);
        entry = entry.newer;
      }
    }
  }
  /** Returns a JSON (array) representation */
  toJSON() {
    var s = new Array(this.size), i = 0, entry = this.oldest;
    while (entry) {
      s[i++] = { key: entry.key, value: entry.value };
      entry = entry.newer;
    }
    return s;
  }
  /** Returns a String representation */
  toString() {
    var s = '', entry = this.oldest;
    while (entry) {
      s += String(entry.key) + ':' + entry.value;
      entry = entry.newer;
      if (entry) {
        s += ' < ';
      }
    }
    return s;
  }
}

// Export ourselves
export default LRUCache;
