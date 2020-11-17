"use strict";

class Material {
  constructor( type = "div", ...args ) {
    this.isMaterial = true;
    this.el = document.createElement( type );
    this.content( ...args )
  }

  render() {
    return this;
  }

  content( ...args ) {
    this.el.innerHTML = "";
    for( var i = 0; i < args.length; i++ ) {
      var arg = args[i];
      if( arg === null ) continue;
      if( typeof arg === "object" && arg.isMaterial === void(0) ) {
        this.setAttributes( arg );
      } else {
        this.append( arg );
      }
    }
  }

  append( content ) {
    if( content.isMaterial ) {
      content.render();
      this.el.insertAdjacentElement("beforeend", content.el );
    } else {
      if( content instanceof Element ) {
        this.el.insertAdjacentElement("beforeend", content );
      } else {
        this.el.appendChild( document.createTextNode( content ) );
      }
    }
  }

  setAttributes( attributes ) {
    const keys = Object.keys( attributes );
    for( var i = 0; i < keys.length; i++ ) {
      var key = keys[i];
      var val = attributes[key];
      this.el.setAttribute( key, val );
    }
    return this;
  }

  on( eventName, callback ) {
    this.el.addEventListener(eventName, callback);
    return this;
  }
}
const s = {
  tag: ( tagName, ...args ) => {
    return new Material( tagName, ...args );
  },

  div: ( ...args ) => {
    return new Material( "div", ...args );
  },

  p: (...args) => {
    return new Material("p", ...args);
  },

  span: ( ...args ) => {
    return new Material( "span", ...args );
  },

  ol: (...args) => {
    return new Material("ol", ...args);
  },

  ul: (...args) => {
    return new Material("ul", ...args);
  },

  li: (...args) => {
    return new Material("li", ...args);
  },

  a: ( ...args ) => {
    args.unshift({ href: "javascript:void(0)" });
    return new Material("a", ...args);
  },

  img: ( ...args ) => {
    args.unshift({ alt: "image" });
    return new Material("img", ...args);
  },

  input: ( ...args ) => {
    args.unshift({ type: "text" })
    return new Material("input", ...args);
  },
}


module.exports = { Material, ...s }
