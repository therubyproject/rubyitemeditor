<template>
    <section class="section-components pb-0" id="section-components">
            <div class="row justify-content-center">
                <item-list :items="items" @onSelectItem="onSelectItem"></item-list>
                <item-edit :item="item"></item-edit>
            </div>
    </section>

</template>
<script>
import YAML from 'yaml'
import ItemList from './ItemList'
import ItemEdit from './ItemEdit'

export default {
    props: {
        items: {
            type: Array,
            default: function() {
                return []
            },
            description: "List of items to be handled."
        }
    },
    components: {
        ItemList,
        ItemEdit
    },
    data() {
        return {
            item: {
                attributes: {}, 
                properties: {}
            }
        }
    },
    methods: {
        onSelectItem(item) {
            this.item = item
        }
    }
};
</script>
<style>
</style>
