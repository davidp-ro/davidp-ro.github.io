var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, {get: all[name], enumerable: true});
};

// _snowpack/env.js
var env_exports = {};
__export(env_exports, {
  MODE: () => MODE,
  NODE_ENV: () => NODE_ENV,
  SSR: () => SSR
});
var MODE = "production";
var NODE_ENV = "production";
var SSR = false;

// _snowpack/pkg/common/index-6f2deb61.js
function noop() {
}
var identity = (x) => x;
function assign(tar, src) {
  for (const k in src)
    tar[k] = src[k];
  return tar;
}
function run(fn) {
  return fn();
}
function blank_object() {
  return Object.create(null);
}
function run_all(fns) {
  fns.forEach(run);
}
function is_function(thing) {
  return typeof thing === "function";
}
function safe_not_equal(a, b) {
  return a != a ? b == b : a !== b || (a && typeof a === "object" || typeof a === "function");
}
function is_empty(obj) {
  return Object.keys(obj).length === 0;
}
function subscribe(store, ...callbacks) {
  if (store == null) {
    return noop;
  }
  const unsub = store.subscribe(...callbacks);
  return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
}
function component_subscribe(component, store, callback) {
  component.$$.on_destroy.push(subscribe(store, callback));
}
function create_slot(definition, ctx, $$scope, fn) {
  if (definition) {
    const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
    return definition[0](slot_ctx);
  }
}
function get_slot_context(definition, ctx, $$scope, fn) {
  return definition[1] && fn ? assign($$scope.ctx.slice(), definition[1](fn(ctx))) : $$scope.ctx;
}
function get_slot_changes(definition, $$scope, dirty, fn) {
  if (definition[2] && fn) {
    const lets = definition[2](fn(dirty));
    if ($$scope.dirty === void 0) {
      return lets;
    }
    if (typeof lets === "object") {
      const merged = [];
      const len = Math.max($$scope.dirty.length, lets.length);
      for (let i = 0; i < len; i += 1) {
        merged[i] = $$scope.dirty[i] | lets[i];
      }
      return merged;
    }
    return $$scope.dirty | lets;
  }
  return $$scope.dirty;
}
function update_slot(slot, slot_definition, ctx, $$scope, dirty, get_slot_changes_fn, get_slot_context_fn) {
  const slot_changes = get_slot_changes(slot_definition, $$scope, dirty, get_slot_changes_fn);
  if (slot_changes) {
    const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
    slot.p(slot_context, slot_changes);
  }
}
var is_client = typeof window !== "undefined";
var now = is_client ? () => window.performance.now() : () => Date.now();
var raf = is_client ? (cb) => requestAnimationFrame(cb) : noop;
var tasks = new Set();
function run_tasks(now2) {
  tasks.forEach((task) => {
    if (!task.c(now2)) {
      tasks.delete(task);
      task.f();
    }
  });
  if (tasks.size !== 0)
    raf(run_tasks);
}
function loop(callback) {
  let task;
  if (tasks.size === 0)
    raf(run_tasks);
  return {
    promise: new Promise((fulfill) => {
      tasks.add(task = {c: callback, f: fulfill});
    }),
    abort() {
      tasks.delete(task);
    }
  };
}
function append(target, node) {
  target.appendChild(node);
}
function insert(target, node, anchor) {
  target.insertBefore(node, anchor || null);
}
function detach(node) {
  node.parentNode.removeChild(node);
}
function element(name) {
  return document.createElement(name);
}
function text(data) {
  return document.createTextNode(data);
}
function space() {
  return text(" ");
}
function empty() {
  return text("");
}
function listen(node, event, handler, options) {
  node.addEventListener(event, handler, options);
  return () => node.removeEventListener(event, handler, options);
}
function attr(node, attribute, value) {
  if (value == null)
    node.removeAttribute(attribute);
  else if (node.getAttribute(attribute) !== value)
    node.setAttribute(attribute, value);
}
function children(element2) {
  return Array.from(element2.childNodes);
}
function set_data(text2, data) {
  data = "" + data;
  if (text2.wholeText !== data)
    text2.data = data;
}
function set_style(node, key, value, important) {
  node.style.setProperty(key, value, important ? "important" : "");
}
function custom_event(type, detail) {
  const e = document.createEvent("CustomEvent");
  e.initCustomEvent(type, false, false, detail);
  return e;
}
var active_docs = new Set();
var active = 0;
function hash(str) {
  let hash2 = 5381;
  let i = str.length;
  while (i--)
    hash2 = (hash2 << 5) - hash2 ^ str.charCodeAt(i);
  return hash2 >>> 0;
}
function create_rule(node, a, b, duration, delay, ease, fn, uid = 0) {
  const step = 16.666 / duration;
  let keyframes = "{\n";
  for (let p = 0; p <= 1; p += step) {
    const t = a + (b - a) * ease(p);
    keyframes += p * 100 + `%{${fn(t, 1 - t)}}
`;
  }
  const rule = keyframes + `100% {${fn(b, 1 - b)}}
}`;
  const name = `__svelte_${hash(rule)}_${uid}`;
  const doc = node.ownerDocument;
  active_docs.add(doc);
  const stylesheet = doc.__svelte_stylesheet || (doc.__svelte_stylesheet = doc.head.appendChild(element("style")).sheet);
  const current_rules = doc.__svelte_rules || (doc.__svelte_rules = {});
  if (!current_rules[name]) {
    current_rules[name] = true;
    stylesheet.insertRule(`@keyframes ${name} ${rule}`, stylesheet.cssRules.length);
  }
  const animation = node.style.animation || "";
  node.style.animation = `${animation ? `${animation}, ` : ""}${name} ${duration}ms linear ${delay}ms 1 both`;
  active += 1;
  return name;
}
function delete_rule(node, name) {
  const previous = (node.style.animation || "").split(", ");
  const next = previous.filter(name ? (anim) => anim.indexOf(name) < 0 : (anim) => anim.indexOf("__svelte") === -1);
  const deleted = previous.length - next.length;
  if (deleted) {
    node.style.animation = next.join(", ");
    active -= deleted;
    if (!active)
      clear_rules();
  }
}
function clear_rules() {
  raf(() => {
    if (active)
      return;
    active_docs.forEach((doc) => {
      const stylesheet = doc.__svelte_stylesheet;
      let i = stylesheet.cssRules.length;
      while (i--)
        stylesheet.deleteRule(i);
      doc.__svelte_rules = {};
    });
    active_docs.clear();
  });
}
var current_component;
function set_current_component(component) {
  current_component = component;
}
function get_current_component() {
  if (!current_component)
    throw new Error("Function called outside component initialization");
  return current_component;
}
function onMount(fn) {
  get_current_component().$$.on_mount.push(fn);
}
var dirty_components = [];
var binding_callbacks = [];
var render_callbacks = [];
var flush_callbacks = [];
var resolved_promise = Promise.resolve();
var update_scheduled = false;
function schedule_update() {
  if (!update_scheduled) {
    update_scheduled = true;
    resolved_promise.then(flush);
  }
}
function add_render_callback(fn) {
  render_callbacks.push(fn);
}
var flushing = false;
var seen_callbacks = new Set();
function flush() {
  if (flushing)
    return;
  flushing = true;
  do {
    for (let i = 0; i < dirty_components.length; i += 1) {
      const component = dirty_components[i];
      set_current_component(component);
      update(component.$$);
    }
    set_current_component(null);
    dirty_components.length = 0;
    while (binding_callbacks.length)
      binding_callbacks.pop()();
    for (let i = 0; i < render_callbacks.length; i += 1) {
      const callback = render_callbacks[i];
      if (!seen_callbacks.has(callback)) {
        seen_callbacks.add(callback);
        callback();
      }
    }
    render_callbacks.length = 0;
  } while (dirty_components.length);
  while (flush_callbacks.length) {
    flush_callbacks.pop()();
  }
  update_scheduled = false;
  flushing = false;
  seen_callbacks.clear();
}
function update($$) {
  if ($$.fragment !== null) {
    $$.update();
    run_all($$.before_update);
    const dirty = $$.dirty;
    $$.dirty = [-1];
    $$.fragment && $$.fragment.p($$.ctx, dirty);
    $$.after_update.forEach(add_render_callback);
  }
}
var promise;
function wait() {
  if (!promise) {
    promise = Promise.resolve();
    promise.then(() => {
      promise = null;
    });
  }
  return promise;
}
function dispatch(node, direction, kind) {
  node.dispatchEvent(custom_event(`${direction ? "intro" : "outro"}${kind}`));
}
var outroing = new Set();
var outros;
function group_outros() {
  outros = {
    r: 0,
    c: [],
    p: outros
  };
}
function check_outros() {
  if (!outros.r) {
    run_all(outros.c);
  }
  outros = outros.p;
}
function transition_in(block, local) {
  if (block && block.i) {
    outroing.delete(block);
    block.i(local);
  }
}
function transition_out(block, local, detach2, callback) {
  if (block && block.o) {
    if (outroing.has(block))
      return;
    outroing.add(block);
    outros.c.push(() => {
      outroing.delete(block);
      if (callback) {
        if (detach2)
          block.d(1);
        callback();
      }
    });
    block.o(local);
  }
}
var null_transition = {duration: 0};
function create_bidirectional_transition(node, fn, params, intro) {
  let config = fn(node, params);
  let t = intro ? 0 : 1;
  let running_program = null;
  let pending_program = null;
  let animation_name = null;
  function clear_animation() {
    if (animation_name)
      delete_rule(node, animation_name);
  }
  function init2(program, duration) {
    const d = program.b - t;
    duration *= Math.abs(d);
    return {
      a: t,
      b: program.b,
      d,
      duration,
      start: program.start,
      end: program.start + duration,
      group: program.group
    };
  }
  function go(b) {
    const {delay = 0, duration = 300, easing = identity, tick = noop, css} = config || null_transition;
    const program = {
      start: now() + delay,
      b
    };
    if (!b) {
      program.group = outros;
      outros.r += 1;
    }
    if (running_program || pending_program) {
      pending_program = program;
    } else {
      if (css) {
        clear_animation();
        animation_name = create_rule(node, t, b, duration, delay, easing, css);
      }
      if (b)
        tick(0, 1);
      running_program = init2(program, duration);
      add_render_callback(() => dispatch(node, b, "start"));
      loop((now2) => {
        if (pending_program && now2 > pending_program.start) {
          running_program = init2(pending_program, duration);
          pending_program = null;
          dispatch(node, running_program.b, "start");
          if (css) {
            clear_animation();
            animation_name = create_rule(node, t, running_program.b, running_program.duration, 0, easing, config.css);
          }
        }
        if (running_program) {
          if (now2 >= running_program.end) {
            tick(t = running_program.b, 1 - t);
            dispatch(node, running_program.b, "end");
            if (!pending_program) {
              if (running_program.b) {
                clear_animation();
              } else {
                if (!--running_program.group.r)
                  run_all(running_program.group.c);
              }
            }
            running_program = null;
          } else if (now2 >= running_program.start) {
            const p = now2 - running_program.start;
            t = running_program.a + running_program.d * easing(p / running_program.duration);
            tick(t, 1 - t);
          }
        }
        return !!(running_program || pending_program);
      });
    }
  }
  return {
    run(b) {
      if (is_function(config)) {
        wait().then(() => {
          config = config();
          go(b);
        });
      } else {
        go(b);
      }
    },
    end() {
      clear_animation();
      running_program = pending_program = null;
    }
  };
}
function create_component(block) {
  block && block.c();
}
function mount_component(component, target, anchor) {
  const {fragment, on_mount, on_destroy, after_update} = component.$$;
  fragment && fragment.m(target, anchor);
  add_render_callback(() => {
    const new_on_destroy = on_mount.map(run).filter(is_function);
    if (on_destroy) {
      on_destroy.push(...new_on_destroy);
    } else {
      run_all(new_on_destroy);
    }
    component.$$.on_mount = [];
  });
  after_update.forEach(add_render_callback);
}
function destroy_component(component, detaching) {
  const $$ = component.$$;
  if ($$.fragment !== null) {
    run_all($$.on_destroy);
    $$.fragment && $$.fragment.d(detaching);
    $$.on_destroy = $$.fragment = null;
    $$.ctx = [];
  }
}
function make_dirty(component, i) {
  if (component.$$.dirty[0] === -1) {
    dirty_components.push(component);
    schedule_update();
    component.$$.dirty.fill(0);
  }
  component.$$.dirty[i / 31 | 0] |= 1 << i % 31;
}
function init(component, options, instance7, create_fragment10, not_equal, props, dirty = [-1]) {
  const parent_component = current_component;
  set_current_component(component);
  const $$ = component.$$ = {
    fragment: null,
    ctx: null,
    props,
    update: noop,
    not_equal,
    bound: blank_object(),
    on_mount: [],
    on_destroy: [],
    before_update: [],
    after_update: [],
    context: new Map(parent_component ? parent_component.$$.context : []),
    callbacks: blank_object(),
    dirty,
    skip_bound: false
  };
  let ready = false;
  $$.ctx = instance7 ? instance7(component, options.props || {}, (i, ret, ...rest) => {
    const value = rest.length ? rest[0] : ret;
    if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
      if (!$$.skip_bound && $$.bound[i])
        $$.bound[i](value);
      if (ready)
        make_dirty(component, i);
    }
    return ret;
  }) : [];
  $$.update();
  ready = true;
  run_all($$.before_update);
  $$.fragment = create_fragment10 ? create_fragment10($$.ctx) : false;
  if (options.target) {
    if (options.hydrate) {
      const nodes = children(options.target);
      $$.fragment && $$.fragment.l(nodes);
      nodes.forEach(detach);
    } else {
      $$.fragment && $$.fragment.c();
    }
    if (options.intro)
      transition_in(component.$$.fragment);
    mount_component(component, options.target, options.anchor);
    flush();
  }
  set_current_component(parent_component);
}
var SvelteComponent = class {
  $destroy() {
    destroy_component(this, 1);
    this.$destroy = noop;
  }
  $on(type, callback) {
    const callbacks = this.$$.callbacks[type] || (this.$$.callbacks[type] = []);
    callbacks.push(callback);
    return () => {
      const index = callbacks.indexOf(callback);
      if (index !== -1)
        callbacks.splice(index, 1);
    };
  }
  $set($$props) {
    if (this.$$set && !is_empty($$props)) {
      this.$$.skip_bound = true;
      this.$$set($$props);
      this.$$.skip_bound = false;
    }
  }
};

// _snowpack/pkg/svelte/store.js
var subscriber_queue = [];
function writable(value, start = noop) {
  let stop;
  const subscribers = [];
  function set(new_value) {
    if (safe_not_equal(value, new_value)) {
      value = new_value;
      if (stop) {
        const run_queue = !subscriber_queue.length;
        for (let i = 0; i < subscribers.length; i += 1) {
          const s = subscribers[i];
          s[1]();
          subscriber_queue.push(s, value);
        }
        if (run_queue) {
          for (let i = 0; i < subscriber_queue.length; i += 2) {
            subscriber_queue[i][0](subscriber_queue[i + 1]);
          }
          subscriber_queue.length = 0;
        }
      }
    }
  }
  function update2(fn) {
    set(fn(value));
  }
  function subscribe2(run2, invalidate = noop) {
    const subscriber = [run2, invalidate];
    subscribers.push(subscriber);
    if (subscribers.length === 1) {
      stop = start(set) || noop;
    }
    run2(value);
    return () => {
      const index = subscribers.indexOf(subscriber);
      if (index !== -1) {
        subscribers.splice(index, 1);
      }
      if (subscribers.length === 0) {
        stop();
        stop = null;
      }
    };
  }
  return {set, update: update2, subscribe: subscribe2};
}

// dist/stores.js
var page = writable("home");
var mediaQuery = writable("desktop");

// _snowpack/pkg/svelte/transition.js
function fade(node, {delay = 0, duration = 400, easing = identity} = {}) {
  const o = +getComputedStyle(node).opacity;
  return {
    delay,
    duration,
    easing,
    css: (t) => `opacity: ${t * o}`
  };
}

// dist/pages/components/home/Introduction.svelte.js
function create_if_block_3(ctx) {
  let div;
  return {
    c() {
      div = element("div");
      attr(div, "class", "column");
    },
    m(target, anchor) {
      insert(target, div, anchor);
    },
    d(detaching) {
      if (detaching)
        detach(div);
    }
  };
}
function create_if_block_2(ctx) {
  let br0;
  let t0;
  let br1;
  let t1;
  let h5;
  let t2;
  let h5_transition;
  let current;
  return {
    c() {
      br0 = element("br");
      t0 = space();
      br1 = element("br");
      t1 = space();
      h5 = element("h5");
      t2 = text(ctx[2]);
      attr(h5, "class", "is-size-5");
    },
    m(target, anchor) {
      insert(target, br0, anchor);
      insert(target, t0, anchor);
      insert(target, br1, anchor);
      insert(target, t1, anchor);
      insert(target, h5, anchor);
      append(h5, t2);
      current = true;
    },
    p(ctx2, dirty) {
      if (!current || dirty & 4)
        set_data(t2, ctx2[2]);
    },
    i(local) {
      if (current)
        return;
      add_render_callback(() => {
        if (!h5_transition)
          h5_transition = create_bidirectional_transition(h5, fade, {duration: 100}, true);
        h5_transition.run(1);
      });
      current = true;
    },
    o(local) {
      if (!h5_transition)
        h5_transition = create_bidirectional_transition(h5, fade, {duration: 100}, false);
      h5_transition.run(0);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(br0);
      if (detaching)
        detach(t0);
      if (detaching)
        detach(br1);
      if (detaching)
        detach(t1);
      if (detaching)
        detach(h5);
      if (detaching && h5_transition)
        h5_transition.end();
    }
  };
}
function create_if_block_1(ctx) {
  let h5;
  let t;
  return {
    c() {
      h5 = element("h5");
      t = text(ctx[2]);
      attr(h5, "class", "is-size-5 mt-4");
    },
    m(target, anchor) {
      insert(target, h5, anchor);
      append(h5, t);
    },
    p(ctx2, dirty) {
      if (dirty & 4)
        set_data(t, ctx2[2]);
    },
    d(detaching) {
      if (detaching)
        detach(h5);
    }
  };
}
function create_if_block(ctx) {
  let div;
  return {
    c() {
      div = element("div");
      attr(div, "class", "column");
    },
    m(target, anchor) {
      insert(target, div, anchor);
    },
    d(detaching) {
      if (detaching)
        detach(div);
    }
  };
}
function create_fragment(ctx) {
  let div2;
  let t0;
  let div0;
  let h3;
  let t2;
  let h1;
  let t4;
  let t5;
  let div1;
  let figure;
  let img;
  let img_src_value;
  let t6;
  let t7;
  let current;
  let mounted;
  let dispose;
  let if_block0 = ctx[3] === "desktop" && create_if_block_3(ctx);
  let if_block1 = ctx[0] && ctx[3] === "desktop" && create_if_block_2(ctx);
  let if_block2 = ctx[3] !== "desktop" && create_if_block_1(ctx);
  let if_block3 = ctx[3] === "desktop" && create_if_block(ctx);
  return {
    c() {
      div2 = element("div");
      if (if_block0)
        if_block0.c();
      t0 = space();
      div0 = element("div");
      h3 = element("h3");
      h3.textContent = "Hi! I'm";
      t2 = space();
      h1 = element("h1");
      h1.textContent = "David Pescariu";
      t4 = space();
      if (if_block1)
        if_block1.c();
      t5 = space();
      div1 = element("div");
      figure = element("figure");
      img = element("img");
      t6 = space();
      if (if_block2)
        if_block2.c();
      t7 = space();
      if (if_block3)
        if_block3.c();
      attr(h3, "class", "is-size-3 mt-5 mb-0");
      attr(h1, "class", "title is-size-1 my-0");
      attr(div0, "class", "column");
      attr(img, "class", "is-rounded svelte-1px73g6");
      if (img.src !== (img_src_value = "assets/profile.jpg"))
        attr(img, "src", img_src_value);
      attr(img, "alt", "Profile");
      attr(figure, "class", "image");
      attr(div1, "class", "column is-narrow-desktop");
      attr(div2, "class", "columns");
    },
    m(target, anchor) {
      insert(target, div2, anchor);
      if (if_block0)
        if_block0.m(div2, null);
      append(div2, t0);
      append(div2, div0);
      append(div0, h3);
      append(div0, t2);
      append(div0, h1);
      append(div0, t4);
      if (if_block1)
        if_block1.m(div0, null);
      append(div2, t5);
      append(div2, div1);
      append(div1, figure);
      append(figure, img);
      append(figure, t6);
      if (if_block2)
        if_block2.m(figure, null);
      append(div2, t7);
      if (if_block3)
        if_block3.m(div2, null);
      current = true;
      if (!mounted) {
        dispose = [
          listen(img, "mouseenter", ctx[5]),
          listen(img, "mouseout", ctx[6])
        ];
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      if (ctx2[3] === "desktop") {
        if (if_block0) {
        } else {
          if_block0 = create_if_block_3(ctx2);
          if_block0.c();
          if_block0.m(div2, t0);
        }
      } else if (if_block0) {
        if_block0.d(1);
        if_block0 = null;
      }
      if (ctx2[0] && ctx2[3] === "desktop") {
        if (if_block1) {
          if_block1.p(ctx2, dirty);
          if (dirty & 9) {
            transition_in(if_block1, 1);
          }
        } else {
          if_block1 = create_if_block_2(ctx2);
          if_block1.c();
          transition_in(if_block1, 1);
          if_block1.m(div0, null);
        }
      } else if (if_block1) {
        group_outros();
        transition_out(if_block1, 1, 1, () => {
          if_block1 = null;
        });
        check_outros();
      }
      if (ctx2[3] !== "desktop") {
        if (if_block2) {
          if_block2.p(ctx2, dirty);
        } else {
          if_block2 = create_if_block_1(ctx2);
          if_block2.c();
          if_block2.m(figure, null);
        }
      } else if (if_block2) {
        if_block2.d(1);
        if_block2 = null;
      }
      if (ctx2[3] === "desktop") {
        if (if_block3) {
        } else {
          if_block3 = create_if_block(ctx2);
          if_block3.c();
          if_block3.m(div2, null);
        }
      } else if (if_block3) {
        if_block3.d(1);
        if_block3 = null;
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(if_block1);
      current = true;
    },
    o(local) {
      transition_out(if_block1);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(div2);
      if (if_block0)
        if_block0.d();
      if (if_block1)
        if_block1.d();
      if (if_block2)
        if_block2.d();
      if (if_block3)
        if_block3.d();
      mounted = false;
      run_all(dispose);
    }
  };
}
function getRandomColor() {
  let color = randomColor({luminosity: "dark"});
  document.documentElement.style.setProperty("--imageShadowColor", `${color}cc`);
}
function instance($$self, $$props, $$invalidate) {
  let $mediaQuery;
  component_subscribe($$self, mediaQuery, ($$value) => $$invalidate(3, $mediaQuery = $$value));
  let isVisible = true;
  let hoverCounter = 0;
  let descText = "Student & Developer from Romania";
  if ($mediaQuery === "desktop") {
    document.getElementsByTagName("html")[0].classList.add("is-clipped");
  }
  function fadeInOut() {
    $$invalidate(0, isVisible = false);
    setTimeout(() => {
      $$invalidate(0, isVisible = true);
    }, 200);
  }
  const mouseenter_handler = () => {
    getRandomColor();
    fadeInOut();
    $$invalidate(1, hoverCounter++, hoverCounter);
    $$invalidate(2, descText = "Handsome lad eh?");
  };
  const mouseout_handler = () => {
    fadeInOut();
    if (hoverCounter % 5 === 0) {
      $$invalidate(2, descText = "Having fun? :)");
    } else {
      $$invalidate(2, descText = "Student & Developer from Romania");
    }
  };
  return [
    isVisible,
    hoverCounter,
    descText,
    $mediaQuery,
    fadeInOut,
    mouseenter_handler,
    mouseout_handler
  ];
}
var Introduction = class extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance, create_fragment, safe_not_equal, {});
  }
};
var Introduction_svelte_default = Introduction;

// dist/pages/components/home/Buttons.svelte.js
function create_if_block_12(ctx) {
  let div;
  return {
    c() {
      div = element("div");
      attr(div, "class", "column");
    },
    m(target, anchor) {
      insert(target, div, anchor);
    },
    d(detaching) {
      if (detaching)
        detach(div);
    }
  };
}
function create_if_block2(ctx) {
  let div;
  return {
    c() {
      div = element("div");
      attr(div, "class", "column");
    },
    m(target, anchor) {
      insert(target, div, anchor);
    },
    d(detaching) {
      if (detaching)
        detach(div);
    }
  };
}
function create_fragment2(ctx) {
  let div9;
  let t0;
  let div2;
  let a0;
  let t5;
  let div5;
  let a1;
  let t10;
  let div8;
  let t15;
  let mounted;
  let dispose;
  let if_block0 = ctx[0] === "desktop" && create_if_block_12(ctx);
  let if_block1 = ctx[0] === "desktop" && create_if_block2(ctx);
  return {
    c() {
      div9 = element("div");
      if (if_block0)
        if_block0.c();
      t0 = space();
      div2 = element("div");
      a0 = element("a");
      a0.innerHTML = `<div class="rnd svelte-1po05qo" style="background-color: #084c61"><svg aria-hidden="true" class="icon has-text-white" style="color: white; position: relative; width: 46px;top: 16px; left: 5px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M528 32H48A48 48 0 000 80v352a48 48 0 0048 48h480a48 48 0 0048-48V80a48 48 0 00-48-48zm0 400H48V80h480v352zM208 256a64 64 0 10-.1-128.1A64 64 0 00208 256zm-89.6 128h179.2c12.4 0 22.4-8.6 22.4-19.2v-19.2c0-31.8-30.1-57.6-67.2-57.6-10.8 0-18.7 8-44.8 8-26.9 0-33.4-8-44.8-8-37.1 0-67.2 25.8-67.2 57.6v19.2c0 10.6 10 19.2 22.4 19.2zM360 320h112a8 8 0 008-8v-16a8 8 0 00-8-8H360a8 8 0 00-8 8v16a8 8 0 008 8zm0-64h112a8 8 0 008-8v-16a8 8 0 00-8-8H360a8 8 0 00-8 8v16a8 8 0 008 8zm0-64h112a8 8 0 008-8v-16a8 8 0 00-8-8H360a8 8 0 00-8 8v16a8 8 0 008 8z"></path></svg></div> 
      <div class="content ml-1 mt-5"><h5 class="mt-2">About Me</h5> 
        <p>Who I am</p></div>`;
      t5 = space();
      div5 = element("div");
      a1 = element("a");
      a1.innerHTML = `<div class="rnd svelte-1po05qo" style="background-color: #e3b505"><svg aria-hidden="true" class="icon has-text-white" style="color: white; position: relative; width: 46px;top: 16px; left: 5px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="currentColor" d="M278.9 511.5l-61-17.7a12 12 0 01-8.2-14.9L346.2 8.7A12 12 0 01361.1.5l61 17.7a12 12 0 018.2 14.9L293.8 503.3a12 12 0 01-14.9 8.2zm-114-112.2l43.5-46.4a12 12 0 00-.8-17.2L117 256l90.6-79.7a12 12 0 00.8-17.2l-43.5-46.4a12 12 0 00-17-.5L3.8 247.2a12 12 0 000 17.5l144.1 135.1a12 12 0 0017-.5zm327.2.6l144.1-135.1a12 12 0 000-17.5L492.1 112.1a12.1 12.1 0 00-17 .5L431.6 159a12 12 0 00.8 17.2L523 256l-90.6 79.7a12 12 0 00-.8 17.2l43.5 46.4a12 12 0 0017 .6z"></path></svg></div> 
      <div class="content ml-1 mt-5"><h5 class="mt-2">My Work</h5> 
        <p>Projects &amp; Experience</p></div>`;
      t10 = space();
      div8 = element("div");
      div8.innerHTML = `<a class="box is-success mx-3"><div class="rnd svelte-1po05qo" style="background-color: #db504a"><svg aria-hidden="true" class="icon has-text-white" style="color: white; position: relative; width: 46px;top: 16px; left: 5px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 8C119 8 8 119 8 256a247.9 247.9 0 00383.4 207.8 24 24 0 005.6-35.4L386.8 416a24 24 0 00-31.4-5.2A184.2 184.2 0 0172 256c0-101.5 82.5-184 184-184 100.1 0 184 57.6 184 160 0 38.8-21 79.7-58.2 83.7-17.3-.5-16.9-12.9-13.4-30l23.4-121.1a24 24 0 00-23.6-28.6h-45a13.5 13.5 0 00-13.4 12c-14.7-17.8-40.4-21.7-60-21.7-74.5 0-137.8 62.2-137.8 151.5 0 65.3 36.8 105.8 96 105.8 27 0 57.4-15.6 75-38.3 9.5 34.1 40.6 34.1 70.7 34.1 109 0 150.3-71.6 150.3-147.4C504 95.7 394 8 256 8zm-21.7 304.4c-22.2 0-36-15.6-36-40.7 0-45 30.7-72.8 58.6-72.8 22.3 0 35.6 15.3 35.6 40.8 0 45-33.9 72.7-58.2 72.7z"></path></svg></div> 
      <div class="content ml-1 mt-5"><h5 class="mt-2">Contact Me</h5> 
        <p>Let&#39;s get in touch!</p></div></a>`;
      t15 = space();
      if (if_block1)
        if_block1.c();
      attr(a0, "class", "box is-success mx-3");
      attr(div2, "class", "column has-text-left");
      attr(a1, "class", "box is-success mx-3");
      attr(div5, "class", "column has-text-left");
      attr(div8, "class", "column has-text-left");
      attr(div9, "class", "columns has-text-centered");
    },
    m(target, anchor) {
      insert(target, div9, anchor);
      if (if_block0)
        if_block0.m(div9, null);
      append(div9, t0);
      append(div9, div2);
      append(div2, a0);
      append(div9, t5);
      append(div9, div5);
      append(div5, a1);
      append(div9, t10);
      append(div9, div8);
      append(div9, t15);
      if (if_block1)
        if_block1.m(div9, null);
      if (!mounted) {
        dispose = [
          listen(a0, "click", ctx[2]),
          listen(a1, "click", ctx[3]),
          listen(div8, "click", ctx[4])
        ];
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      if (ctx2[0] === "desktop") {
        if (if_block0) {
        } else {
          if_block0 = create_if_block_12(ctx2);
          if_block0.c();
          if_block0.m(div9, t0);
        }
      } else if (if_block0) {
        if_block0.d(1);
        if_block0 = null;
      }
      if (ctx2[0] === "desktop") {
        if (if_block1) {
        } else {
          if_block1 = create_if_block2(ctx2);
          if_block1.c();
          if_block1.m(div9, null);
        }
      } else if (if_block1) {
        if_block1.d(1);
        if_block1 = null;
      }
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching)
        detach(div9);
      if (if_block0)
        if_block0.d();
      if (if_block1)
        if_block1.d();
      mounted = false;
      run_all(dispose);
    }
  };
}
function instance2($$self, $$props, $$invalidate) {
  let $mediaQuery;
  component_subscribe($$self, mediaQuery, ($$value) => $$invalidate(0, $mediaQuery = $$value));
  function switchPage(newPage) {
    document.getElementsByTagName("html")[0].classList.remove("is-clipped");
    page.update((_) => newPage);
  }
  const click_handler = () => {
    switchPage("about");
  };
  const click_handler_1 = () => {
    switchPage("work");
  };
  const click_handler_2 = () => {
    switchPage("contact");
  };
  return [$mediaQuery, switchPage, click_handler, click_handler_1, click_handler_2];
}
var Buttons = class extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance2, create_fragment2, safe_not_equal, {});
  }
};
var Buttons_svelte_default = Buttons;

// dist/pages/Home.svelte.js
function create_if_block_13(ctx) {
  let div;
  return {
    c() {
      div = element("div");
      set_style(div, "height", "6.9rem");
    },
    m(target, anchor) {
      insert(target, div, anchor);
    },
    d(detaching) {
      if (detaching)
        detach(div);
    }
  };
}
function create_if_block3(ctx) {
  let div;
  return {
    c() {
      div = element("div");
      set_style(div, "height", "10rem");
    },
    m(target, anchor) {
      insert(target, div, anchor);
    },
    d(detaching) {
      if (detaching)
        detach(div);
    }
  };
}
function create_fragment3(ctx) {
  let section;
  let t0;
  let introduction;
  let t1;
  let t2;
  let buttons;
  let section_transition;
  let current;
  let if_block0 = ctx[0] === "desktop" && create_if_block_13(ctx);
  introduction = new Introduction_svelte_default({});
  let if_block1 = ctx[0] === "desktop" && create_if_block3(ctx);
  buttons = new Buttons_svelte_default({});
  return {
    c() {
      section = element("section");
      if (if_block0)
        if_block0.c();
      t0 = space();
      create_component(introduction.$$.fragment);
      t1 = space();
      if (if_block1)
        if_block1.c();
      t2 = space();
      create_component(buttons.$$.fragment);
      attr(section, "class", "content svelte-7henp0");
    },
    m(target, anchor) {
      insert(target, section, anchor);
      if (if_block0)
        if_block0.m(section, null);
      append(section, t0);
      mount_component(introduction, section, null);
      append(section, t1);
      if (if_block1)
        if_block1.m(section, null);
      append(section, t2);
      mount_component(buttons, section, null);
      current = true;
    },
    p(ctx2, [dirty]) {
      if (ctx2[0] === "desktop") {
        if (if_block0) {
        } else {
          if_block0 = create_if_block_13(ctx2);
          if_block0.c();
          if_block0.m(section, t0);
        }
      } else if (if_block0) {
        if_block0.d(1);
        if_block0 = null;
      }
      if (ctx2[0] === "desktop") {
        if (if_block1) {
        } else {
          if_block1 = create_if_block3(ctx2);
          if_block1.c();
          if_block1.m(section, t2);
        }
      } else if (if_block1) {
        if_block1.d(1);
        if_block1 = null;
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(introduction.$$.fragment, local);
      transition_in(buttons.$$.fragment, local);
      add_render_callback(() => {
        if (!section_transition)
          section_transition = create_bidirectional_transition(section, fade, {duration: 300}, true);
        section_transition.run(1);
      });
      current = true;
    },
    o(local) {
      transition_out(introduction.$$.fragment, local);
      transition_out(buttons.$$.fragment, local);
      if (!section_transition)
        section_transition = create_bidirectional_transition(section, fade, {duration: 300}, false);
      section_transition.run(0);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(section);
      if (if_block0)
        if_block0.d();
      destroy_component(introduction);
      if (if_block1)
        if_block1.d();
      destroy_component(buttons);
      if (detaching && section_transition)
        section_transition.end();
    }
  };
}
function instance3($$self, $$props, $$invalidate) {
  let $mediaQuery;
  component_subscribe($$self, mediaQuery, ($$value) => $$invalidate(0, $mediaQuery = $$value));
  return [$mediaQuery];
}
var Home = class extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance3, create_fragment3, safe_not_equal, {});
  }
};
var Home_svelte_default = Home;

// dist/pages/About.svelte.js
function create_fragment4(ctx) {
  let div;
  return {
    c() {
      div = element("div");
      div.innerHTML = `<h1>About - Work in progress</h1>`;
      attr(div, "class", "content has-text-centered");
    },
    m(target, anchor) {
      insert(target, div, anchor);
    },
    p: noop,
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching)
        detach(div);
    }
  };
}
var About = class extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, null, create_fragment4, safe_not_equal, {});
  }
};
var About_svelte_default = About;

// dist/pages/Work.svelte.js
function create_fragment5(ctx) {
  let div;
  return {
    c() {
      div = element("div");
      div.innerHTML = `<h1>Work - Work in progress</h1>`;
      attr(div, "class", "content has-text-centered");
    },
    m(target, anchor) {
      insert(target, div, anchor);
    },
    p: noop,
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching)
        detach(div);
    }
  };
}
var Work = class extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, null, create_fragment5, safe_not_equal, {});
  }
};
var Work_svelte_default = Work;

// dist/pages/Contact.svelte.js
function create_fragment6(ctx) {
  let div;
  return {
    c() {
      div = element("div");
      div.innerHTML = `<h1>Contact - Work in progress</h1>`;
      attr(div, "class", "content has-text-centered");
    },
    m(target, anchor) {
      insert(target, div, anchor);
    },
    p: noop,
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching)
        detach(div);
    }
  };
}
var Contact = class extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, null, create_fragment6, safe_not_equal, {});
  }
};
var Contact_svelte_default = Contact;

// dist/pages/components/Consent.svelte.js
function create_fragment7(ctx) {
  let article;
  return {
    c() {
      article = element("article");
      article.innerHTML = `<div class="message-body"><div class="columns is-vcentered"><div class="column is-three-quarters"><strong>Hey there!</strong> I would like to use some basic analytics to
    track traffic, so I need to store some cookies, 
    <a href="https://www.cookiesandyou.com/">what are cookies?</a>. Is that OK with you?</div> 
      <div class="column"><button class="button is-danger is-outlined">Nope</button> 
        <button class="button is-primary is-outlined">Sure!</button></div></div></div>`;
      attr(article, "class", "consent message is-danger svelte-1win8lw");
    },
    m(target, anchor) {
      insert(target, article, anchor);
    },
    p: noop,
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching)
        detach(article);
    }
  };
}
var Consent = class extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, null, create_fragment7, safe_not_equal, {});
  }
};
var Consent_svelte_default = Consent;

// dist/MediaQuery.svelte.js
var get_default_slot_changes = (dirty) => ({matches: dirty & 1});
var get_default_slot_context = (ctx) => ({matches: ctx[0]});
function create_fragment8(ctx) {
  let current;
  const default_slot_template = ctx[4].default;
  const default_slot = create_slot(default_slot_template, ctx, ctx[3], get_default_slot_context);
  return {
    c() {
      if (default_slot)
        default_slot.c();
    },
    m(target, anchor) {
      if (default_slot) {
        default_slot.m(target, anchor);
      }
      current = true;
    },
    p(ctx2, [dirty]) {
      if (default_slot) {
        if (default_slot.p && dirty & 9) {
          update_slot(default_slot, default_slot_template, ctx2, ctx2[3], dirty, get_default_slot_changes, get_default_slot_context);
        }
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(default_slot, local);
      current = true;
    },
    o(local) {
      transition_out(default_slot, local);
      current = false;
    },
    d(detaching) {
      if (default_slot)
        default_slot.d(detaching);
    }
  };
}
function instance4($$self, $$props, $$invalidate) {
  let {$$slots: slots = {}, $$scope} = $$props;
  let {query} = $$props;
  let mql;
  let mqlListener;
  let wasMounted = false;
  let matches = false;
  onMount(() => {
    $$invalidate(2, wasMounted = true);
    return () => {
      removeActiveListener();
    };
  });
  function addNewListener(query2) {
    mql = window.matchMedia(query2);
    mqlListener = (v) => $$invalidate(0, matches = v.matches);
    mql.addListener(mqlListener);
    $$invalidate(0, matches = mql.matches);
  }
  function removeActiveListener() {
    if (mql && mqlListener) {
      mql.removeListener(mqlListener);
    }
  }
  $$self.$$set = ($$props2) => {
    if ("query" in $$props2)
      $$invalidate(1, query = $$props2.query);
    if ("$$scope" in $$props2)
      $$invalidate(3, $$scope = $$props2.$$scope);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & 6) {
      $: {
        if (wasMounted) {
          removeActiveListener();
          addNewListener(query);
        }
      }
    }
  };
  return [matches, query, wasMounted, $$scope, slots];
}
var MediaQuery = class extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance4, create_fragment8, safe_not_equal, {query: 1});
  }
};
var MediaQuery_svelte_default = MediaQuery;

// dist/UpdateMQ.svelte.js
function instance5($$self, $$props, $$invalidate) {
  let {newMediaQuery} = $$props;
  console.debug(`MQ::Update -> ${newMediaQuery}`);
  mediaQuery.update((_) => newMediaQuery);
  $$self.$$set = ($$props2) => {
    if ("newMediaQuery" in $$props2)
      $$invalidate(0, newMediaQuery = $$props2.newMediaQuery);
  };
  return [newMediaQuery];
}
var UpdateMQ = class extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance5, null, safe_not_equal, {newMediaQuery: 0});
  }
};
var UpdateMQ_svelte_default = UpdateMQ;

// dist/App.svelte.js
function create_if_block_6(ctx) {
  let updatemq;
  let current;
  updatemq = new UpdateMQ_svelte_default({props: {newMediaQuery: "desktop"}});
  return {
    c() {
      create_component(updatemq.$$.fragment);
    },
    m(target, anchor) {
      mount_component(updatemq, target, anchor);
      current = true;
    },
    i(local) {
      if (current)
        return;
      transition_in(updatemq.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(updatemq.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(updatemq, detaching);
    }
  };
}
function create_default_slot_2(ctx) {
  let if_block_anchor;
  let current;
  let if_block = ctx[1] && create_if_block_6(ctx);
  return {
    c() {
      if (if_block)
        if_block.c();
      if_block_anchor = empty();
    },
    m(target, anchor) {
      if (if_block)
        if_block.m(target, anchor);
      insert(target, if_block_anchor, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      if (ctx2[1]) {
        if (if_block) {
          if (dirty & 2) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block_6(ctx2);
          if_block.c();
          transition_in(if_block, 1);
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        }
      } else if (if_block) {
        group_outros();
        transition_out(if_block, 1, 1, () => {
          if_block = null;
        });
        check_outros();
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(if_block);
      current = true;
    },
    o(local) {
      transition_out(if_block);
      current = false;
    },
    d(detaching) {
      if (if_block)
        if_block.d(detaching);
      if (detaching)
        detach(if_block_anchor);
    }
  };
}
function create_if_block_5(ctx) {
  let updatemq;
  let current;
  updatemq = new UpdateMQ_svelte_default({props: {newMediaQuery: "tablet"}});
  return {
    c() {
      create_component(updatemq.$$.fragment);
    },
    m(target, anchor) {
      mount_component(updatemq, target, anchor);
      current = true;
    },
    i(local) {
      if (current)
        return;
      transition_in(updatemq.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(updatemq.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(updatemq, detaching);
    }
  };
}
function create_default_slot_1(ctx) {
  let if_block_anchor;
  let current;
  let if_block = ctx[1] && create_if_block_5(ctx);
  return {
    c() {
      if (if_block)
        if_block.c();
      if_block_anchor = empty();
    },
    m(target, anchor) {
      if (if_block)
        if_block.m(target, anchor);
      insert(target, if_block_anchor, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      if (ctx2[1]) {
        if (if_block) {
          if (dirty & 2) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block_5(ctx2);
          if_block.c();
          transition_in(if_block, 1);
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        }
      } else if (if_block) {
        group_outros();
        transition_out(if_block, 1, 1, () => {
          if_block = null;
        });
        check_outros();
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(if_block);
      current = true;
    },
    o(local) {
      transition_out(if_block);
      current = false;
    },
    d(detaching) {
      if (if_block)
        if_block.d(detaching);
      if (detaching)
        detach(if_block_anchor);
    }
  };
}
function create_if_block_4(ctx) {
  let updatemq;
  let current;
  updatemq = new UpdateMQ_svelte_default({props: {newMediaQuery: "mobile"}});
  return {
    c() {
      create_component(updatemq.$$.fragment);
    },
    m(target, anchor) {
      mount_component(updatemq, target, anchor);
      current = true;
    },
    i(local) {
      if (current)
        return;
      transition_in(updatemq.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(updatemq.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(updatemq, detaching);
    }
  };
}
function create_default_slot(ctx) {
  let if_block_anchor;
  let current;
  let if_block = ctx[1] && create_if_block_4(ctx);
  return {
    c() {
      if (if_block)
        if_block.c();
      if_block_anchor = empty();
    },
    m(target, anchor) {
      if (if_block)
        if_block.m(target, anchor);
      insert(target, if_block_anchor, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      if (ctx2[1]) {
        if (if_block) {
          if (dirty & 2) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block_4(ctx2);
          if_block.c();
          transition_in(if_block, 1);
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        }
      } else if (if_block) {
        group_outros();
        transition_out(if_block, 1, 1, () => {
          if_block = null;
        });
        check_outros();
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(if_block);
      current = true;
    },
    o(local) {
      transition_out(if_block);
      current = false;
    },
    d(detaching) {
      if (if_block)
        if_block.d(detaching);
      if (detaching)
        detach(if_block_anchor);
    }
  };
}
function create_else_block(ctx) {
  let home;
  let current;
  home = new Home_svelte_default({});
  return {
    c() {
      create_component(home.$$.fragment);
    },
    m(target, anchor) {
      mount_component(home, target, anchor);
      current = true;
    },
    i(local) {
      if (current)
        return;
      transition_in(home.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(home.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(home, detaching);
    }
  };
}
function create_if_block_32(ctx) {
  let contact;
  let current;
  contact = new Contact_svelte_default({});
  return {
    c() {
      create_component(contact.$$.fragment);
    },
    m(target, anchor) {
      mount_component(contact, target, anchor);
      current = true;
    },
    i(local) {
      if (current)
        return;
      transition_in(contact.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(contact.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(contact, detaching);
    }
  };
}
function create_if_block_22(ctx) {
  let work;
  let current;
  work = new Work_svelte_default({});
  return {
    c() {
      create_component(work.$$.fragment);
    },
    m(target, anchor) {
      mount_component(work, target, anchor);
      current = true;
    },
    i(local) {
      if (current)
        return;
      transition_in(work.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(work.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(work, detaching);
    }
  };
}
function create_if_block_14(ctx) {
  let about;
  let current;
  about = new About_svelte_default({});
  return {
    c() {
      create_component(about.$$.fragment);
    },
    m(target, anchor) {
      mount_component(about, target, anchor);
      current = true;
    },
    i(local) {
      if (current)
        return;
      transition_in(about.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(about.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(about, detaching);
    }
  };
}
function create_if_block4(ctx) {
  let consent;
  let current;
  consent = new Consent_svelte_default({});
  return {
    c() {
      create_component(consent.$$.fragment);
    },
    m(target, anchor) {
      mount_component(consent, target, anchor);
      current = true;
    },
    i(local) {
      if (current)
        return;
      transition_in(consent.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(consent.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(consent, detaching);
    }
  };
}
function create_fragment9(ctx) {
  let div;
  let mediaquery0;
  let t0;
  let mediaquery1;
  let t1;
  let mediaquery2;
  let t2;
  let current_block_type_index;
  let if_block0;
  let t3;
  let current;
  mediaquery0 = new MediaQuery_svelte_default({
    props: {
      query: "(min-width: 1024px)",
      $$slots: {
        default: [
          create_default_slot_2,
          ({matches}) => ({1: matches}),
          ({matches}) => matches ? 2 : 0
        ]
      },
      $$scope: {ctx}
    }
  });
  mediaquery1 = new MediaQuery_svelte_default({
    props: {
      query: "(min-width: 769px) and (max-width: 1023px)",
      $$slots: {
        default: [
          create_default_slot_1,
          ({matches}) => ({1: matches}),
          ({matches}) => matches ? 2 : 0
        ]
      },
      $$scope: {ctx}
    }
  });
  mediaquery2 = new MediaQuery_svelte_default({
    props: {
      query: "(max-width: 768px)",
      $$slots: {
        default: [
          create_default_slot,
          ({matches}) => ({1: matches}),
          ({matches}) => matches ? 2 : 0
        ]
      },
      $$scope: {ctx}
    }
  });
  const if_block_creators = [create_if_block_14, create_if_block_22, create_if_block_32, create_else_block];
  const if_blocks = [];
  function select_block_type(ctx2, dirty) {
    if (ctx2[0] === "about")
      return 0;
    if (ctx2[0] === "work")
      return 1;
    if (ctx2[0] === "contact")
      return 2;
    return 3;
  }
  current_block_type_index = select_block_type(ctx, -1);
  if_block0 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  let if_block1 = showConsentPrompt && create_if_block4(ctx);
  return {
    c() {
      div = element("div");
      create_component(mediaquery0.$$.fragment);
      t0 = space();
      create_component(mediaquery1.$$.fragment);
      t1 = space();
      create_component(mediaquery2.$$.fragment);
      t2 = space();
      if_block0.c();
      t3 = space();
      if (if_block1)
        if_block1.c();
      attr(div, "class", "App");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      mount_component(mediaquery0, div, null);
      append(div, t0);
      mount_component(mediaquery1, div, null);
      append(div, t1);
      mount_component(mediaquery2, div, null);
      append(div, t2);
      if_blocks[current_block_type_index].m(div, null);
      append(div, t3);
      if (if_block1)
        if_block1.m(div, null);
      current = true;
    },
    p(ctx2, [dirty]) {
      const mediaquery0_changes = {};
      if (dirty & 6) {
        mediaquery0_changes.$$scope = {dirty, ctx: ctx2};
      }
      mediaquery0.$set(mediaquery0_changes);
      const mediaquery1_changes = {};
      if (dirty & 6) {
        mediaquery1_changes.$$scope = {dirty, ctx: ctx2};
      }
      mediaquery1.$set(mediaquery1_changes);
      const mediaquery2_changes = {};
      if (dirty & 6) {
        mediaquery2_changes.$$scope = {dirty, ctx: ctx2};
      }
      mediaquery2.$set(mediaquery2_changes);
      let previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type(ctx2, dirty);
      if (current_block_type_index !== previous_block_index) {
        group_outros();
        transition_out(if_blocks[previous_block_index], 1, 1, () => {
          if_blocks[previous_block_index] = null;
        });
        check_outros();
        if_block0 = if_blocks[current_block_type_index];
        if (!if_block0) {
          if_block0 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx2);
          if_block0.c();
        } else {
        }
        transition_in(if_block0, 1);
        if_block0.m(div, t3);
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(mediaquery0.$$.fragment, local);
      transition_in(mediaquery1.$$.fragment, local);
      transition_in(mediaquery2.$$.fragment, local);
      transition_in(if_block0);
      transition_in(if_block1);
      current = true;
    },
    o(local) {
      transition_out(mediaquery0.$$.fragment, local);
      transition_out(mediaquery1.$$.fragment, local);
      transition_out(mediaquery2.$$.fragment, local);
      transition_out(if_block0);
      transition_out(if_block1);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(div);
      destroy_component(mediaquery0);
      destroy_component(mediaquery1);
      destroy_component(mediaquery2);
      if_blocks[current_block_type_index].d();
      if (if_block1)
        if_block1.d();
    }
  };
}
var showConsentPrompt = false;
function instance6($$self, $$props, $$invalidate) {
  let $page;
  component_subscribe($$self, page, ($$value) => $$invalidate(0, $page = $$value));
  return [$page];
}
var App = class extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance6, create_fragment9, safe_not_equal, {});
  }
};
var App_svelte_default = App;

// dist/index.js
import.meta.env = env_exports;
var app = new App_svelte_default({
  target: document.body
});
var dist_default = app;
if (void 0) {
  (void 0).accept();
  (void 0).dispose(() => {
    app.$destroy();
  });
}
export {
  dist_default as default
};
