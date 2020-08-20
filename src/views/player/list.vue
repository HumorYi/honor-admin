<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.accountname"
        :placeholder="$t('player.accountname')"
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-button
        v-waves
        type="primary"
        icon="el-icon-search"
        @click="handleFilter"
      >
        {{ $t("player.search") }}
      </el-button>
      <router-link :to="{name: 'CreatePlayer'}">
        <el-button
          type="primary"
          icon="el-icon-edit"
        >
          {{ $t("player.create") }}
        </el-button>
      </router-link>
    </div>

    <el-table
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column
        align="center"
        label="ID"
      >
        <template v-slot="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="登录账户"
      >
        <template v-slot="{row}">
          <span>{{ row.accountname }}</span>
        </template>
      </el-table-column>
    </el-table>

    <Pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import Pagination from '@/components/Pagination/index.vue'

import { getPlayers } from '@/api/players'
import { Player } from '@/api/types'

@Component({
  components: {
    Pagination
  }
})
export default class PlayerList extends Vue {
  private list: Player[] = [];
  private listLoading = true;
  private total = 0;

  private listQuery = {
    page: 1,
    limit: 10,
    accountname: undefined
  };

  created() {
    this.getList()
  }

  // 获取列表
  private async getList() {
    this.listLoading = true

    const {
      data: { list, total }
    } = await getPlayers(this.listQuery)

    this.list = list
    this.total = total
    this.listLoading = false
  }

  private handleFilter() {
    this.listQuery.page = 1
    this.total = 0
    this.list = []
    this.getList()
  }
}
</script>
