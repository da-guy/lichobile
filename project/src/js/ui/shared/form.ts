import i18n from '../../i18n';
import redraw from '../../utils/redraw';
import * as m from 'mithril';

type SelectOption = string[]

function renderOption(label: string, value: string, storedValue: string, labelArg: string, labelArg2: string) {
  return m('option', {
    key: value,
    value: value,
    selected: storedValue === value
  }, i18n(label, labelArg, labelArg2));
}

export default {

  renderRadio(
    label: string,
    name: string,
    value: string,
    checked: boolean,
    onchange: (v: boolean) => void
  ) {
    const id = name + '_' + value;
    return [
      m('input.radio[type=radio]', {
        name,
        id,
        className: value,
        value,
        checked,
        onchange
      }),
      m('label', {
        'for': id
      }, i18n(label))
    ];
  },

  renderSelect(
    label: string,
    name: string,
    options: Array<SelectOption>,
    settingsProp: Prop<string>,
    isDisabled?: boolean,
    onChangeCallback?: (v: string) => void
  ) {
    const storedValue = settingsProp();
    const onChange = function(e: Event) {
      const val = (e.target as any).value;
      settingsProp(val);
      if (onChangeCallback) onChangeCallback(val);
      setTimeout(() => redraw(), 10);
    };
    return [
      m('label', {
        'for': 'select_' + name
      }, i18n(label)),
      m('select', {
        id: 'select_' + name,
        disabled: isDisabled,
        oncreate(vnode: Mithril.Vnode<any>) {
          vnode.dom.addEventListener('change', onChange, false);
        },
        onremove(vnode: Mithril.Vnode<any>) {
          vnode.dom.removeEventListener('change', onChange, false);
        }
      }, options.map(e => renderOption(e[0], e[1], storedValue, e[2], e[3])))
    ];
  },

  renderCheckbox(
    label: string,
    name:string,
    settingsProp: Prop<boolean>,
    callback: (v: boolean) => void,
    disabled: boolean
  ) {
    const isOn = settingsProp();
    return m('div.check_container', {
      className: disabled ? 'disabled' : ''
    }, [
      m('label', {
        'for': name
      }, label),
      m('input[type=checkbox]', {
        name: name,
        disabled,
        checked: isOn,
        onchange: function() {
          const newVal = !isOn;
          settingsProp(newVal);
          if (callback) callback(newVal);
          redraw();
        }
      })
    ]);
  }

};