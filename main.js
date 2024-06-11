import m from "mithril";
import tagl from "tagl-mithril";

const { div, h1, p, button, input, table, tr,td,br } = tagl(m);
const { random, floor, trunc, round, ceil, abs, min, max, pow, sqrt } = Math;
const use = (v, f) => f(v);
const muse = (v, f) => f(...v);

const randomInt = (min, max) => floor(random() * (max - min + 1)) + min;

const range = (n) => Array.from({ length: n }, (_, i) => i);

const generators = {
  "*": () =>
    muse([randomInt(0, 10), randomInt(0, 10)], (a, b) => ({
      op: "*",
      a,
      b,
      r: a * b,
    })),
};

const tasks = [];

m.mount(document.body, {
  view: (vnode) => [
    tasks.length === 0
      ? button({ onclick: () => tasks.push(generators["*"]()) }, "Start")
      : use(tasks[0], ({ op, a, b }) => [a, op, b, "=", br(),
        table(
            range(11).map(i=>tr(
                range(11).map(j=>td(button.solution[i===j?"middle":""]({onclick:()=>{},style:{cursor:"pointer"}},`${i * (j)}`)))
            ))
        )

      ]),
  ],
});
