import { create as createJss } from 'jss';
import { create as createInjectSheet } from 'react-jss';

// jss plugins
import vendorPrefixer from 'jss-vendor-prefixer';
import camelCase from 'jss-camel-case';
import nested from 'jss-nested';
import extend from 'jss-extend';

const jss = createJss();
jss.use(camelCase());
jss.use(extend());
jss.use(nested());
jss.use(vendorPrefixer());

export const injectSheet = createInjectSheet(jss);
