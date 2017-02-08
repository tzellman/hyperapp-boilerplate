import {html} from 'hyperapp/hx';

const clickCount = clicks => {
    return clicks > 0 ? html`<div>You clicked ${clicks} time${clicks > 1 ? 's' : ''}</div>` : '';
};


const view = (model, msg) => (html`
  <div class="counter">
    <h1>Welcome to HyperApp!</h1>
    <hr class="line-break" />
    <section>
      <button
        class="add"
        onclick=${msg.add}
      >
        +
      </button>
      <h1>${model.num}</h1>
      <button
        class="sub"
        onclick=${msg.sub}
        disabled=${model.num <= 0}
      >
        -
      </button>
      ${clickCount(model.clicks)}
    </section>
  </div>
`);

export default view;
