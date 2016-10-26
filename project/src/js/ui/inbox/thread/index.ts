import * as helper from '../../helper';
import oninit from './threadCtrl';
import view from './threadView';

export default {
  oncreate: helper.viewFadeIn,
  oninit,
  onremove() {
    window.removeEventListener('native.keyboardshow', this.onKeyboardShow);
    window.removeEventListener('native.keyboardhide', helper.onKeyboardHide);
  },
  view
};