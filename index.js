"use strict";

class Material {
  constructor( type = "div", ...args ) {
    this.isMaterial = true;
    this.componentEvents = {}
    this.el = document.createElement( type );
    this.instanceArguments = args;
    this.props = [];
  }

  render() {
    return this.content( ...this.instanceArguments )
  }

  content( ...args ) {
    this.el.innerHTML = "";
    for( var i = 0; i < args.length; i++ ) {
      var arg = args[i];
      if( arg === null ) continue;
      if( arg === void 0 ) continue;
      if( ( arg instanceof Element === false && typeof arg === "object" ) && arg.isMaterial === void(0) ) {
        this.setAttributes( arg );
      } else {
        this.append( arg );
      }
    }
    return this;
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

  setProps( props = {} ) {
    Object.assign( this.props, props );
    return this;
  }

  on( eventName, callback ) {
    this.el.addEventListener(eventName, callback);
    return this;
  }

  componentOn( name, fn ) {
    if( this.componentEvents[name] === void 0 ) {
      this.componentEvents[name] = []
    }
    this.componentEvents[name].push( fn )
  }

  componentEmit( name, ...args ) {
    if( this.componentEvents[name] === void 0 ) return;
    const events = this.componentEvents[name];
    for( var i = 0; i < events.length; i++ ) {
      const event = events[i]
      event( ...args )
    }
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

  label: ( ...args ) => {
    return new Material("label", ...args);
  },

  input: ( ...args ) => {
    args.unshift({ type: "text" })
    return new Material("input", ...args);
  },
  textarea: ( ...args ) => {
    return new Material("input", ...args);
  },
  select: ( ...args ) => {
    return new Material("select", ...args);
  },
  option: ( ...args ) => {
    return new Material("option", ...args);
  },
  table: ( ...args ) => {
    return new Material("table", ...args);
  },
  thead: ( ...args ) => {
    return new Material("thead", ...args);
  },
  tbody: ( ...args ) => {
    return new Material("tbody", ...args);
  },
  tfoot: ( ...args ) => {
    return new Material("tfoot", ...args);
  },
  tr: ( ...args ) => {
    return new Material("tr", ...args);
  },
  th: ( ...args ) => {
    return new Material("th", ...args);
  },
  td: ( ...args ) => {
    return new Material("td", ...args);
  },
}


module.exports = { Material, ...s }
