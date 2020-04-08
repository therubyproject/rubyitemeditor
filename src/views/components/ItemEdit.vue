<template>
    <div class="col-sm-12 col-md-9">
        <!-- edit item -->
        <div :hidden="!selected">
            <!-- properties -->
            <div class="row">
                <div class="col-12">
                    <h4 class="m-4">
                        <span>Properties</span>
                    </h4>
                </div>
            </div>

            <div class="row ml-3 mr-3">
                <div class="col-6 col-sm-3">
                    <b-form-checkbox v-model="item.properties.container" class="mb-3">
                        Container
                    </b-form-checkbox>
                    <b-form-checkbox v-model="item.properties.stackable" class="mb-3">
                        Stackable
                    </b-form-checkbox>
                    <b-form-checkbox v-model="item.properties.force_use" class="mb-3">
                        Force Use
                    </b-form-checkbox>
                    <b-form-checkbox v-model="item.properties.multiuse" class="mb-3">
                        Multiuse
                    </b-form-checkbox>
                    <b-form-checkbox v-model="item.properties.fuild_container" class="mb-3">
                        Fluid Container
                    </b-form-checkbox>
                    <b-form-checkbox v-model="item.properties.fluid" class="mb-3">
                        Fluid
                    </b-form-checkbox>
                </div>
                <div class="col-6 col-sm-3">
                    <b-form-checkbox v-model="item.properties.not_walkable" class="mb-3">
                        Not Walkable
                    </b-form-checkbox>
                    <b-form-checkbox v-model="item.properties.not_movable" class="mb-3">
                        Not Movable
                    </b-form-checkbox>
                    <b-form-checkbox v-model="item.properties.block_projectile" class="mb-3">
                        Block Projectile
                    </b-form-checkbox>
                    <b-form-checkbox v-model="item.properties.not_pathable" class="mb-3">
                        Not Pathable
                    </b-form-checkbox>
                    <b-form-checkbox v-model="item.properties.dont_change_animation" class="mb-3">
                        Dont Change Animation
                    </b-form-checkbox>
                    <b-form-checkbox v-model="item.properties.pickupable" class="mb-3">
                        Pickupable
                    </b-form-checkbox>
                </div>
                <div class="col-6 col-sm-3">
                    <b-form-checkbox v-model="item.properties.hangable" class="mb-3">
                        Hangable
                    </b-form-checkbox>
                    <b-form-checkbox v-model="item.properties.hook_south" class="mb-3">
                        Hook South
                    </b-form-checkbox>
                    <b-form-checkbox v-model="item.properties.hook_east" class="mb-3">
                        Hook East
                    </b-form-checkbox>
                    <b-form-checkbox v-model="item.properties.rotatable" class="mb-3">
                        Rotatable
                    </b-form-checkbox>
                    <b-form-checkbox v-model="item.properties.dont_hide" class="mb-3">
                        Dont Hide
                    </b-form-checkbox>
                    <b-form-checkbox v-model="item.properties.translucent" class="mb-3">
                        Translucent
                    </b-form-checkbox>
                </div>
                <div class="col-6 col-sm-3">
                    <b-form-checkbox v-model="item.properties.lying_corpse" class="mb-3">
                        Lying Corpse
                    </b-form-checkbox>
                    <b-form-checkbox v-model="item.properties.full_ground" class="mb-3">
                        Full Ground
                    </b-form-checkbox>
                    <b-form-checkbox v-model="item.properties.ignore_look" class="mb-3">
                        Ignore Look
                    </b-form-checkbox>
                    <b-form-checkbox v-model="item.properties.useable" class="mb-3">
                        Useable
                    </b-form-checkbox>
                </div>
            </div>

            <div class="row ml-3 mr-3">
                <div class="col-sm-3">
                    <div class="row mb-2">
                        <div class="col-12">
                            <small class="text-uppercase font-weight-bold">Light Color</small>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-12">
                            <b-form-input v-model="item.properties.light_color" type="number" placeholder=""></b-form-input>
                        </div>
                    </div>
                </div>
                <div class="col-sm-3">
                    <div class="row mb-2">
                        <div class="col-12">
                            <small class="text-uppercase font-weight-bold">Light Level</small>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-12">
                            <b-form-input v-model="item.properties.light_level" type="number" placeholder=""></b-form-input>
                        </div>
                    </div>
                </div>
                <div class="col-sm-3">
                    <div class="row mb-2">
                        <div class="col-12">
                            <small class="text-uppercase font-weight-bold">Ground Speed</small>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-12">
                            <b-form-input v-model="item.properties.ground" type="number" placeholder=""></b-form-input>
                        </div>
                    </div>
                </div>
                <div class="col-sm-3">
                    <div class="row mb-2">
                        <div class="col-12">
                            <small class="text-uppercase font-weight-bold">Slot</small>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-12">
                            <b-form-select v-model="item.properties.slot" :options="slots" ></b-form-select>
                        </div>
                    </div>
                </div>
            </div>

            <!-- attributes -->
            <div class="row">
                <div class="col-12">
                    <h4 class="m-4">
                        <span>Attributes</span>
                    </h4>
                </div>
            </div>

            <div v-for="(attribute, index) in attributes" :key="index" class="row ml-3 mr-3">
                <div class="col-5 col-sm-3">
                    <!-- <b-form-input v-model="item.properties[index]" placeholder="key"></b-form-input> -->
                    <base-input v-model="attribute.key" placeholder="key" @keyup="saveAttributes"></base-input>
                </div>
                <div class="col-6 col-sm-8">
                    <base-input v-model="attribute.value" placeholder="value" size="sm" @keyup="saveAttributes"></base-input>
                </div>
                <div class="col-1 col-sm-1 align-self-center p-0">
                    <h1 @click="removeAttribute(index)"><i class="cursor-pointer ni ni-fat-remove text-danger"></i></h1>
                </div>
            </div>

            <div class="row ml-3 mr-3">
                <div class="col-11">
                </div>
                <div class="col-1 align-self-center p-0">
                    <h1 @click="addAttribute"><i class="cursor-pointer ni ni-fat-add text-success"></i></h1>
                </div>
            </div>
        </div>
        
        <!-- no item selected -->
        <div :hidden="selected" class="text-center">
            <img class="align-middle" src="https://avatars2.githubusercontent.com/u/63268979?s=400&u=af291bdde94e15c28e0b75568f8a66366db47e5e&v=4">
            <h3>No item selected.</h3>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
import YAML from 'yaml'

export default {
    name: "itemlist",
    props: {
        item: {
            type: Object,
            default: function() {
                return { 
                    attributes: {}, 
                    properties: {}
                }
            },
            description: "Item to be edited."
        }
    },
    data() {
        return {
            selected: false,
            attributes: [],
            slots: [
                { text: 'Pokeball', value: 0 },
                { text: 'Backpack', value: 3 },
            ]
        }
    },
    methods: {
        addAttribute() {
            this.attributes.push({})
        },
        removeAttribute(attr) {
            Vue.delete(this.attributes, attr)
            this.saveAttributes()
        },
        saveAttributes() {
            let updateAttributes = {}
            for (let attribute in this.attributes) {
                const attr = this.attributes[attribute]
                if (attr.value) {
                    updateAttributes[attr.key] = attr.value
                }
            }
            this.item.attributes = updateAttributes
        }
    },
    watch: {
        item(newItem, oldItem) {
            if (!this.selected) this.selected = true

            this.attributes = []
            const keys = Object.keys(newItem.attributes)
            for (let key in keys) {
                const index = keys[key]
                const value = newItem.attributes[index]
                if (value) {
                    this.attributes.push({ key: index, value: value})
                }
            }
        }
    }
};
</script>
