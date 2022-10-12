/*
 * INTER-Mediator
 * Copyright (c) INTER-Mediator Directive Committee (http://inter-mediator.org)
 * This project started at the end of 2009 by Masayuki Nii msyk@msyk.net.
 *
 * INTER-Mediator is supplied under MIT License.
 * Please see the full license for details:
 * https://github.com/INTER-Mediator/INTER-Mediator/blob/master/dist-docs/License.txt
 */
IMParts_Catalog.qrcode = {
  // Using https://github.com/soldair/node-qrcode
  options: {
    color: {
      dark: '#00F',  // Blue dots
      light: '#0000' // Transparent background
    }
  },

  instanciate: function (parentNode) {
    'use strict'
    const classOfParent = parentNode.getAttribute('class')
    if (!classOfParent || classOfParent.length == 0 || classOfParent.indexOf('_im_widget_qrcode') < 0) {
      const sp = (classOfParent && classOfParent.length > 0) ? ' ' : ''
      parentNode.setAttribute('class', `${classOfParent}${sp}_im_widget_qrcode`)
      const node = document.createElement('CANVAS')
      node.setAttribute('class', '_im_widget_qrcode_canvas')
      const newId = parentNode.getAttribute('id') + '-qrcode'
      node.setAttribute('id', newId)
      parentNode.appendChild(node)
      IMParts_Catalog.qrcode.ids.push(newId)

      parentNode._im_getComponentId = (function () {
        const theId = newId
        return function () {
          return theId
        }
      })()

      parentNode._im_setValue = (function () {
        const theId = newId
        return function (str) {
          IMParts_Catalog.qrcode.values[theId] = str
        }
      })()
    }
  },

  ids: [],
  values: [],

  finish: function () {
    'use strict'
    for (const id in IMParts_Catalog.qrcode.values) {
      QRCode.toCanvas(document.getElementById(id), IMParts_Catalog.qrcode.values[id], IMParts_Catalog.qrcode.options,
        function (err, canvas) {
          if (err) {
            console.log(err)
            //throw err
          }
        })
    }
  }
}
