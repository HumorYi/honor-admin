<template>
  <div>
    <el-form
      ref="form"
      :model="playerForm"
      :rules="rules"
    >
      <el-form-item
        prop="accountname"
        label="账户名"
      >
        <el-input v-model="playerForm.accountname" />
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
      <el-form-item
        prop="avatar"
        label="⽤户头像"
      >
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :before-upload="beforeAvatarUpload"
          :on-success="handleAvatarSuccess"
        >
          <img
            v-if="imageUrl"
            :src="imageUrl"
            class="avatar"
          >
          <i
            v-else
            class="el-icon-plus avatar-uploader-icon"
          />
        </el-upload>
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Ref, Vue } from 'vue-property-decorator'

import {
  ElUploadInternalFileDetail,
  ElUploadInternalRawFile
} from 'element-ui/types/upload'

import { getPlayer, createPlayer, updatePlayer } from '@/api/players'

import { getDefaultPlayer } from '@/utils/players.ts'
import { Form } from 'element-ui'

@Component
export default class PlayerDetail extends Vue {
  @Prop({ default: false }) private isEdit!: boolean;

  @Ref() private form!: Form;

  // 初始化数据，默认均为空
  private playerForm = getDefaultPlayer();
  private loading = false;

  private rules = {
    accountname: [{ validator: this.validateRequire }],
    nickname: [{ validator: this.validateRequire }]
  };

  private imageUrl = '';

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
      console.log(data.player)
      this.playerForm = data.player
    } catch (err) {
      console.error(err)
    }
  }

  private validateRequire(rule: any, value: string, callback: Function) {
    if (value) {
      callback()
      return
    }

    const message = rule.field + '必须填写'
    this.$message({
      message,
      type: 'error'
    })

    callback(new Error(message))
  }

  private beforeAvatarUpload(file: ElUploadInternalRawFile) {
    const isLt1M = file.size / 1024 / 1024 <= 1

    if (!isLt1M) {
      this.$message.error('上传头像图⽚⼤⼩不能超过1MB!')
    }

    return isLt1M
  }

  private handleAvatarSuccess(res: any, file: ElUploadInternalFileDetail) {
    // 预览图⽚
    this.imageUrl = URL.createObjectURL(file.raw)

    // 将返回图⽚名称设置到playerForm上，设置为响应中图⽚地址
    this.playerForm.avatar = file.name
  }

  private async submitForm() {
    this.form.validate(async valid => {
      if (!valid) {
        console.error('校验失败，请修改后重试')
        return
      }

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
    })
  }
}
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
