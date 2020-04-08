<template>
    <div class="col-sm-12 col-md-3 bg-secondary">
        <!-- search box -->
        <div class="row">
            <div class="col-12 pt-2 ml-2">
                <b-form-input 
                    v-model="filterInput" 
                    type="text" 
                    placeholder="Search"
                    @keyup.enter="search">
                </b-form-input>
            </div>
        </div>

        <!-- pagination box -->
        <div class="row sticky-bottom">
            <div class="col-12 pt-2 pl-4">
                <ul class="pagination justify-content-center">
                    <li class="page-item prev-page" :class="{disabled: currentPage === 1}">
                    <a class="page-link" aria-label="Previous" @click="firstPage">
                        <span aria-hidden="true"><i class="fa fa-angle-double-left" aria-hidden="true"></i></span>
                    </a>
                    </li>
                    <li class="page-item prev-page" :class="{disabled: currentPage === 1}">
                    <a class="page-link" aria-label="Previous" @click="prevPage">
                        <span aria-hidden="true"><i class="fa fa-angle-left" aria-hidden="true"></i></span>
                    </a>
                    </li>
                    <li class="page-item">
                        <a class="page-link">{{ currentPage }}</a>
                    </li>
                    <li class="page-item next-page" :class="{disabled: currentPage === pageNumbers}">
                    <a class="page-link" aria-label="Next" @click="nextPage">
                        <span aria-hidden="true"><i class="fa fa-angle-right" aria-hidden="true"></i></span>
                    </a>
                    </li>
                    <li class="page-item next-page" :class="{disabled: currentPage === pageNumbers}">
                    <a class="page-link" aria-label="Next" @click="lastPage">
                        <span aria-hidden="true"><i class="fa fa-angle-double-right" aria-hidden="true"></i></span>
                    </a>
                    </li>
                </ul>
            </div>
        </div>

        <!-- item list -->
        <div class="row h-100vh">
            <div class="col-12">
                <div v-for="(item, index) in filteredItems" :key="index" @click="updateSelected(item)" class="cursor-pointer row item-select" :class="{ 'bg-primary' : selectedItem.id === item.id }">
                    <div class="col-4 d-flex justify-content-center align-self-center">
                        <img v-lazy="'img/unknown.png'" alt="Rounded image" class="align-middle img-fluid"
                                style="width: 32px; height: 32px;">
                    </div>
                    <div class="col-8 d-flex justify-content-left pt-2">
                        <div class="row">
                            <div class="col-12">
                                <h6 :class="{ 'text-white' : selectedItem.id === item.id }">{{ itemId(item) }}</h6>
                            </div>
                            <div class="col-12 text-truncate">
                                <h6 class="d-inline-block text-truncate" :class="{ 'text-white' : selectedItem.id === item.id }" style="max-width:190px">{{ itemName(item) }}</h6>
                            </div>
                        </div>
                    </div>    
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "itemlist",
    props: {
        items: {
            type: Array,
            default: function() {
                return []
            },
            description: "List of items to be shown."
        }
    },
    data() {
        return {
            selectedItem: {},
            currentPage: 1,
            postsPerPage: 10,
            filter: "",
            filterInput: ""
        }
    },
    computed: {
        filteredItems() {
            return this.items.filter((item) => {
                return (item.id.toString().includes(this.filter)) ||
                       ((item.attributes && item.attributes.name) ? 
                       item.attributes.name.includes(this.filter) : false)
            }).slice((this.currentPage - 1) * this.postsPerPage, this.currentPage * this.postsPerPage )
        },
        pageNumbers() {
            const pages = this.items.length / this.postsPerPage
            return pages > 0 ? pages : 1
        }
    },
    methods: {
        itemId(item) {
            return (!isNaN(item.id) ? item.id : -1);   
        },
        itemName(item) {
            return (item.attributes && item.attributes.name ? item.attributes.name : '-')
        },
        updateSelected(item) {
            this.selectedItem = item
            this.$emit("onSelectItem", item)
        },
        nextPage() {
            if (this.currentPage < this.pageNumbers) {
                this.currentPage++
            }
        },
        prevPage() {
            if (this.currentPage > 1) {
                this.currentPage--
            }
        },
        firstPage() {
            this.currentPage = 1
        },
        lastPage() {
            if (this.pageNumbers > 1) {
                this.currentPage = Math.round(this.pageNumbers)
            }
        },
        search() {
            this.currentPage = 1
            this.filter = this.filterInput
        }
    }
};
</script>

<style scoped>

.item-list {
    overflow-y: scroll;
}

.item-select:hover, .item-select > .d-flex > .row > .col-12 > .h6:hover {
    background-color: #ff6180;
    color: white !important;
}

</style>
