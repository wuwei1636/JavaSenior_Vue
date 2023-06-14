<template>
  <el-container style="height: 100%; ">
    
    <Silder/>
    <el-container>
        <el-header style="text-align: right; font-size: 12px">
        <!-- <el-dropdown>
            <i class="el-icon-setting" style="margin-right: 15px"></i>
            <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>查看</el-dropdown-item>
            <el-dropdown-item>新增</el-dropdown-item>
            <el-dropdown-item>删除</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
        <span>王小虎</span> -->
<!--          nisho -->
        </el-header>
        
        <el-main>
        <router-view></router-view>
        </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Silder from '@/components/frame/silder.vue'
export default {
    components: {
        Silder,
    },  
    data() {
      const item = {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      };
      return {
        tableData: Array(10).fill(item)
      }
    }
}
</script>

<style scoped>

.el-container {
  height: 100%;
  border: 0px;
}
.el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  
</style>