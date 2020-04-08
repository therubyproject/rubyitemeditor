<template>
    <header class="header-global">
        <nav class="navbar bg-primary navbar-expand pt-3 pb-3 pl-3">
            <h6 @click="openFile" class="pt-0 pb-0 pl-3 m-0 text-white cursor-pointer">
                <i class="fa fa-folder-open"></i>
                <small class="ml-1">open yaml</small>
            </h6>
            <input id="fileUpload" @change="processOpenFile" type="file" ref="yamlInput" accept=".yaml,.yml" hidden>

            <h6 @click="openDatFile" class="pt-0 pb-0 pl-3 m-0 text-white cursor-pointer">
                <i class="fa fa-folder-open"></i>
                <small class="ml-1">open dat</small>
            </h6>
            <input id="datUpload" @change="processOpenDatFile" type="file" ref="datInput" accept=".dat" hidden>
            
            <h6 @click="saveFile" class="pt-0 pb-0 pl-3 m-0 text-white cursor-pointer">
                <i class="fa fa-floppy-o"></i>
                <small class="ml-1">save</small>
            </h6>

            <h6 @click="saveFileAs" class="pt-0 pb-0 pl-3 m-0 text-white cursor-pointer">
                <i class="fa fa-reply"></i>
                <small class="ml-1">export</small>
            </h6>
        </nav>
    </header>
</template>
<script>
export default {
  mounted() {
    this._keyListener = function(e) {
      if (e.key === "s" && (e.ctrlKey || e.metaKey)) {
        this.saveFile();
      }

      if (e.key === "s" && (e.ctrlKey || e.metaKey) && (e.shiftKey)) {
        this.saveFileAs();
      }
    };

    document.addEventListener('keydown', this._keyListener.bind(this));
  },
  methods: {
    openFile() {
      document.getElementById("fileUpload").click()
    },
    openDatFile() {
      document.getElementById("datUpload").click()
    },
    processOpenFile(e) {
      const file = e.target.files[0]

      const input = this.$refs.yamlInput
      input.value = ''

      if (!file) {
        return 
      }

      this.$emit('onLoadItems', file)
    },
    processOpenDatFile(e) {
      const file = e.target.files[0]

      const input = this.$refs.datInput
      input.value = ''

      if (!file) {
        return 
      }

      this.$emit('onLoadDat', file)
    },
    saveFile() {
      this.$emit('onSaveItems')
    },
    saveFileAs() {
      this.$emit('onSaveItemsAs')
    }
  }
};
</script>
<style>
</style>
