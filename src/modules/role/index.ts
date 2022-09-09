import {exportModule} from '@elux/vue-web';
import {Model} from './model';
import main from './views/Main';

export default exportModule('role', Model, {main});
