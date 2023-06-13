<template>
  <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu 
            :router="true"
        >
        <el-menu-item class="title1" index="/main">
            图书管理系统
        </el-menu-item>
        <el-menu-item class="title1" index="/MyFile">
            关于系统
        </el-menu-item>
        <!-- <el-menu-item index="/main" class="title1">
            书籍列表
        </el-menu-item> -->

        </el-menu>
    </el-aside>
</template>

<script>
export default {

}
</script>

<style scoped>
.el-aside {
    color: #333;
}


.title1 {
    padding-left: 40px !important;
}
</style>