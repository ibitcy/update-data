"use strict";
/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
function __spreadArrays(){for(var r=0,e=0,t=arguments.length;e<t;e++)r+=arguments[e].length;var a=Array(r),n=0;for(e=0;e<t;e++)for(var s=arguments[e],u=0,o=s.length;u<o;u++,n++)a[n]=s[u];return a}function updateList(r,e,t,a){var n=__spreadArrays(r);return e.forEach((function(e){var s=r.findIndex((function(r){return t(r,e)}));s>=0?a&&!a(r[s],e)||(n[s]=e):n.push(e)})),__spreadArrays(n)}Object.defineProperty(exports,"__esModule",{value:!0}),exports.updateList=updateList;
