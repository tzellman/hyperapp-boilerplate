import {h} from 'hyperapp';

const clickCount = clicks => {
    return clicks > 0 ? <div>You clicked {clicks} time{clicks > 1 ? 's' : ''}</div> : '';
};

const Button = ({className, label, update, disabled}) => (
    <button class={className} onclick={update} disabled={disabled ? disabled : false}>
        {label}
    </button>
);

const view = (model, actions) => (
  <div class="counter">
    <h1>Welcome to HyperApp!</h1>
    <hr class="line-break" />
    <section>
      {Button({className: 'add', label: '+', update: actions.add})}
      <h1>{model.num}</h1>
      {Button({className: 'sub', label: '-', update: actions.sub, disabled: model.num <= 0})}
      {clickCount(model.clicks)}
    </section>
  </div>
);

export default view;
