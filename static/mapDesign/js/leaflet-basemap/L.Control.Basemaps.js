L.Control.Basemaps = L.Control.extend({
  _map: null,
  /*includes: L.Mixin.Events,*/
  options: {
    position: 'topright',
    tileX: 0,
    tileY: 0,
    tileZ: 1
  },
  basemap: null,
  onAdd: function (map) {
    this._map = map;
    var container = L.DomUtil.create('div', 'basemaps leaflet-control closed');

    // disable events
    L.DomEvent.disableClickPropagation(container);
    if (!L.Browser.touch) {
      L.DomEvent.disableScrollPropagation(container);
    }

    this.options.basemaps.forEach(function(d, i){
      var basemapClass = 'basemap';

      if (i === 0) {
        this.basemap = d;
        this._map.addLayer(d);
        basemapClass += ' active';
        // class为.alt保证显示出当前的底图
        basemapClass += ' alt'
      }

      var coords = {x: this.options.tileX, y: this.options.tileY};

      var url = L.Util.template(d._url, L.extend({
        s: d._getSubdomain(coords),
        x: coords.x,
        // 如有错误请将此处还原
        /*y: d.options.tms ? d._globalTileRange.max.y - coords.y : coords.y,*/
        y: coords.y,
        z: this.options.tileZ
      }, d.options));

      var basemapNode = L.DomUtil.create('div', basemapClass, container);
      var imgNode = L.DomUtil.create('img', null, basemapNode);
      imgNode.src = url;
      if (d.options && d.options.label) {
        imgNode.title = d.options.label;
      }

      L.DomEvent.on(basemapNode, 'click', function() {
        //if different, remove previous basemap, and add new one

        if (d != this.basemap) {
          map.removeLayer(this.basemap);
          map.addLayer(d);
          //d.bringToBack();
          map.fire('baselayerchange', d);
          this.basemap = d;
          map.currentBasemap = this.basemap;  // 将当前的底图暴露给map对象,以便插件外使用当前底图

          L.DomUtil.removeClass(document.getElementsByClassName('basemap active')[0], 'active');
          L.DomUtil.removeClass(document.getElementsByClassName('basemap alt')[0], 'alt');
          //getElementsByClassName为H5新标签，兼容到IE9
          L.DomUtil.addClass(basemapNode, 'active');
          L.DomUtil.addClass(basemapNode, 'alt');
        }
      }, this);

    }, this);

    L.DomEvent.on(container, 'mouseenter', function() {
      L.DomUtil.removeClass(container, 'closed');
    }, this);

    L.DomEvent.on(container, 'mouseleave', function() {
      L.DomUtil.addClass(container, 'closed');
    }, this);

    this._container = container;
    return this._container;
  },
  onRemove: function (map) {
    map.removeLayer(this.basemap);
  }
});

L.control.basemaps = function (options) {
  return new L.Control.Basemaps(options);
};
