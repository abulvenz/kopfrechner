import m from "mithril";
import tagl from "tagl-mithril";

const {select,option, div, h1, p, button, input, table, tr, td, br } = tagl(m);
const { random, floor, trunc, round, ceil, abs, min, max, pow, sqrt } = Math;
const { keys ,values} = Object;
const use = (v, f) => f(v);
const muse = (v, f) => f(...v);

const randomInt = (min, max) => floor(random() * (max - min + 1)) + min;

const range = (n) => Array.from({ length: n }, (_, i) => i);

const generators = {
  "×": () =>
    muse([randomInt(0, 10), randomInt(0, 10)], (a, b) => ({
      op: "×",
      a,
      b,
      r: a * b,
      f: (i, j) => i * j,
    })),
  "+": () =>
    muse([randomInt(0, 10), randomInt(0, 10)], (a, b) => ({
      op: "+",
      a,
      b,
      r: a + b,
      f: (i, j) => i + j,
    })),
};

const tasks = [];
let operator = "×";

m.mount(document.body, {
  view: (vnode) => [
    tasks.length === 0
      ? [
          select({              onchange: (e) =>console.log(e.target.value)|| (operator = e.target.value),
          },
          keys(generators).map((op) =>
            option({
              value: op,
            },op)
          )),
          button(
            {
              onclick: () =>
                range(5).forEach((e) => tasks.push(generators[operator]())),
            },
            "Start"
          ),
        ]
      : use(tasks[0], ({ op, a, b, r, f }) => [
          div.task(a, " ", op, " ", b, " = "),
          table(
            range(100).map((i) =>
              tr(
                range(10).map((j) =>
                  td(
                    button.solution[i === j ? "middle" : ""](
                      {
                        onclick: () => {
                          if (r === i * 10 + j) {
                            tasks.shift();
                          } else {
                            tasks.push(tasks.shift());
                          }
                        },
                        style: { cursor: "pointer" },
                      },
                      `${i * 10 + j}`
                    )
                  )
                )
              )
            )
          ),
          div.task(tasks.length, " Aufgaben"),
        ]),
  ],
});
