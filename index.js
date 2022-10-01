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
  instanciate: function (parentNode) {
    'use strict'
    const classOfParent = parentNode.getAttribute('class')
    if (classOfParent.indexOf('_im_widget_qrcode') < 0) {
      const sp = classOfParent.length == 0 ? '' : ' '
      parentNode.setAttribute('class', `${classOfParent}${sp}_im_widget_qrcode`)
      const node = document.createElement('CANVAS')
      node.setAttribute('data-im-control', 'enclosure')
      node.setAttribute('class', '_im_widget_qrcode_canvas')
      const newId = parentNode.getAttribute('id') + '-popupsel'
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
          QRCode.toCanvas(document.getElementById(theId), str, {errorCorrectionLevel: 'H'}, function (err, canvas) {
            if (err) throw err
          })
        }
      })()
    }
  },

  ids: [],

  finish: function () {
    'use strict'
  }
}
