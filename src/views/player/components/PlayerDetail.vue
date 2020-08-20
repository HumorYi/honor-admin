<template>
  <div>
    <el-form
      ref="playerForm"
      :model="playerForm"
      :rules="rules"
    >
      <el-form-item
        prop="accountname"
        label="账户名"
      >
        <el-input v-model="playerForm.acountname" />
      </el-form-item>
      <el-form-item
        prop="nickname"
        label="昵称"
      >
        <el-input v-model="playerForm.nickname" />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="submitForm"
        >
          提交
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

import { getPlayer, createPlayer, updatePlayer } from '@/api/players'

import { getDefaultPlayer } from '@/utils/players.ts'

@Component
export default class PlayerDetail extends Vue {
  @Prop({ default: false })
  private isEdit!: boolean;

  // 初始化数据，默认均为空
  private playerForm = getDefaultPlayer();
  private loading = false;
  private rules = {};

  created() {
    // 如果是更新数据则获取对应玩家信息
    if (this.isEdit) {
      const id = this.$route.params && this.$route.params.id
      id && this.getPlayer(parseInt(id))
    }
  }

  private async getPlayer(id: number) {
    try {
      const { data } = await getPlayer(id, {})
      this.playerForm = data.player
    } catch (err) {
      console.error(err)
    }
  }

  private async submitForm() {
    this.loading = true

    try {
      if (this.isEdit) {
        await updatePlayer(this.playerForm.id, this.playerForm)
      } else {
        await createPlayer(this.playerForm)
      }

      this.$notify({
        title: '操作成功',
        message: '新增玩家数据成功',
        type: 'success',
        duration: 2000
      })

      this.loading = false

      this.$router.push({ name: 'PlayerList' })
    } catch (error) {
      console.error(error)
    }
  }
}
</script>
