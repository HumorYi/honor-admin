<template>
  <!--创建⼀个player-detail组件，更新时可复⽤-->
  <player-detail :is-edit="false" />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import PlayerDetail from './components/PlayerDetail.vue'

@Component({
  components: {
    PlayerDetail
  }
})
export default class CreatePlayer extends Vue {}
</script>
