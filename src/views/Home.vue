<template>
    <div>
      <app-header 
        @onLoadItems="onLoadItems" 
        @onLoadDat="onLoadDat" 
        @onSaveItems="onSaveItems"
        @onSaveItemsAs="onSaveItemsAs"
      ></app-header>
      <app-body :items="items"></app-body>
    </div>
</template>
<script>
import AppHeader from "./components/AppHeader";
import AppBody from "./components/AppBody";
import YAML from "yaml"

export default {
  name: "Home",
  components: {
    AppHeader,
    AppBody
  },
  data() {
    return {
      items: [],
      path: "",
      offset: 12,
      properties: {
          0:  'ground',
          1:  'ground_border',
          2:  'on_bottom',
          3:  'on_top',
          4:  'container',
          5:  'stackable',
          6:  'force_use',
          7:  'multiuse',
          8:  'writable',
          9:  'Writable_once',
          10: 'fuild_container',
          11: 'fluid',
          12: 'not_walkable',
          13: 'not_movable',
          14: 'block_projectile',
          15: 'not_pathable',
          16: 'dont_change_animation',
          17: 'pickupable',
          18: 'hangable',
          19: 'hook_south',
          20: 'hook_east',
          21: 'rotatable',
          23: 'dont_hide',
          24: 'translucent',
          27: 'lying_corpse',
          28: 'useable',
          29: 'minimap_color',
          30: 'lens_help',
          31: 'full_ground',
          32: 'ignore_look',
          33: 'slot',
          35: 'action',
          36: 'wrapable',
          37: 'unwrapable',
          38: 'top_effect'
      }
    }
  },
  methods: {
    onLoadItems(file) {
      let reader  = new FileReader()
      reader.readAsText(file, 'utf-8')

      this.path = file.path

      reader.onloadend = () => {
        this.items = YAML.parse(reader.result, { prettyErrors: true })
      }
    },
    onLoadDat(file) {
      let reader  = new FileReader()
      reader.readAsArrayBuffer(file)

      reader.onloadend = () => {
        this.parseItems(reader.result)
      }
    },
    onSaveItems() {      
      if (this.path === "") {
        return this.onSaveItemsAs()
      }

      for (let item in this.items) {
        for (let propertie in this.items[item].properties) {
          if (this.items[item].properties[propertie] === null ||
              this.items[item].properties[propertie] === undefined ||
              this.items[item].properties[propertie] === false) {
            delete this.items[item].properties[propertie]
          }
        }
      }

      const file = YAML.stringify(this.items)
      var fs = require('fs');
      fs.writeFile(this.path, file, (err) => {})
    },
    onSaveItemsAs() {
      for (let item in this.items) {
        for (let propertie in this.items[item].properties) {
          if (this.items[item].properties[propertie] === null ||
              this.items[item].properties[propertie] === undefined ||
              this.items[item].properties[propertie] === false) {
            delete this.items[item].properties[propertie]
          }
        }
      }

      const file = YAML.stringify(this.items)
      const link = document.createElement('a')
      link.setAttribute('download', 'items.yaml')
      link.href = window.URL.createObjectURL(new Blob([file]))
      document.body.appendChild(link)
      link.click()
    },
    parseItems(arrayBuffer) {
        let dataview = new DataView(arrayBuffer)

        const itemSize = dataview.getUint16(4, true) + 1
        for(let id = 100; id < itemSize; ++id) {
          this.parseItem(id, dataview)
        }

        this.offset = 12
    },
    parseItem(id, dataview) {
      let item = { 
        id: id,
        attributes: {},
        properties: {} 
      }

      while (true) { // iterate until the last attribute 255
        const attr = dataview.getUint8(this.offset++, true)
        if (attr === 255) {
          break
        }

        if (attr == 254) { // usable different value
          attr = 28
        }

        switch(attr) {
          case 22: // ThingAttrLight
            item.properties.light_level = dataview.getUint8(this.offset, true)
            this.offset += 2
            item.properties.light_color = dataview.getUint8(this.offset, true)
            this.offset += 2
            break;
          case 25: // ThingAttrDisplacement
            this.offset += 4 // 2 uint16
            break;
          case 26: // ThingAttrElevation
            this.offset += 2 // 1 uint16
            break;
          case 34: // ThingAttrMarket
            this.offset += 6 // 3 uint16

            const lenght = dataview.getUint16(this.offset, true)
            this.offset += 2

            let name = []
            for (let i = 0; i < lenght; i++) {
              const char = String.fromCharCode(dataview.getUint8(this.offset++, true))
              name.push(char)
            }

            item.attributes.name = name.join("")

            this.offset += 4 // 2 uint16
            break;
          case 0:  // ThingAttrGround
          case 8:  // ThingAttrWritable
          case 9:  // ThingAttrWritableOnce
          case 29: // ThingAttrMinimapColor
          case 30: // ThingAttrLensHelp
          case 33: // ThingAttrCloth
          case 35: // ThingAttrAction
            if (this.properties[attr]) {
              item.properties[this.properties[attr]] = dataview.getUint16(this.offset, true)
            }
            this.offset += 2
            break;
          default:
            if (this.properties[attr]) {
              item.properties[this.properties[attr]] = true
            }
            break;
        }
      }

      const width = dataview.getUint8(this.offset++, true) // width
      const height = dataview.getUint8(this.offset++, true) // height

      if (width > 1 || height > 1) {
        this.offset++ // 1 uint8
      }

      const layers = dataview.getUint8(this.offset++, true)
      const patternX = dataview.getUint8(this.offset++, true)
      const patternY = dataview.getUint8(this.offset++, true)
      const patternZ = dataview.getUint8(this.offset++, true)
      const groupAnimationsPhases = dataview.getUint8(this.offset++, true)

      if (groupAnimationsPhases > 1) {
        this.offset += 6 // 1 uint8 1 uint32 1 uint8
        this.offset += groupAnimationsPhases * 8 // 2 uint32
      }

      const totalSprites = width * height * layers * patternX * patternY * patternZ * groupAnimationsPhases;

      this.offset += totalSprites * 4 // 1 uint32

      let foundItem = this.items[id - 100]

      if (foundItem) {
        foundItem.attributes = {...foundItem.attributes, ...item.attributes}
        foundItem.properties = item.properties
      } else {
        this.items.push(item)
      }
    }
  }
};
</script>
