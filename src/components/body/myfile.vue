<template>
  <div>
    <h2>系统使用的实体类</h2>
    <el-button @click="showFieldTable()">点击展示/折叠表格</el-button>
    <div>
      <el-table
        v-if="FieldTable"
        :data="tableData"
        height="250"
        fit
        style="width: 100%">
        <el-table-column
          prop="name"
          label="属性名称"
          width="auto" 
          min-width="33%"
         
         >
        </el-table-column>
        <el-table-column
          prop="class"
          label="所在实体类"
          width="auto" 
          min-width="33%"
         
          >
        </el-table-column>
        <el-table-column
          prop="type"
          label="属性类型"
          width="auto" 
          min-width="33%"
          
          >
        </el-table-column>
        
      </el-table>
    </div>
    <h2>系统关于实体类使用的方法</h2>
    <el-button @click="showMethodTable()">点击展示/折叠表格</el-button>
    <div>
      <el-table
        v-if="MethodTable"
        :data="MethodsData"
        height="440"
        fit
        style="width: 100%">
        <el-table-column
          prop="name"
          label="方法名称"
          width="auto" 
          min-width="16%"
         
         >
        </el-table-column>
        <el-table-column
          prop="class"
          label="方法所在类"
          width="auto" 
          min-width="16%"
         
          >
        </el-table-column>
        <el-table-column
          prop="paramType"
          label="参数类型"
          width="auto" 
          min-width="16%"
          >
          <span slot-scope="scope">
                <span v-for="item in scope.row.paramType" style="line-height: 30px;">{{ item }}<br></span>
          </span>
        </el-table-column>
        <el-table-column
          prop="returnType"
          label="返回类型"
          width="auto" 
          min-width="16%"
          >
        </el-table-column>
        <el-table-column
          prop="modifier"
          label="修饰符"
          width="auto" 
          min-width="12%"
          >
        </el-table-column>
        <el-table-column
          prop="exception"
          label="包含异常"
          width="auto" 
          min-width="20%"
          >
          <span slot-scope="scope">
                <span v-for="item in scope.row.exception">{{ item }}<br></span>
          </span>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import * as API from '@/api/main'
export default {
  data(){
    return {
      tableData: [
        {
            name: 'id',
            class: 'bookList',
            type: 'int',
        }, 
      ],
      MethodsData: [
        {
          name: 'getAllBook',
          class: 'bookListController',
          paramType: ['java.lang.String','java.lang.String','java.lang.String','int','java.lang.String'],
          returnType: 'java.util.List',
          modifier: 'public',
          exception: ['java.sql.SQLException','java.lang.ClassNotFoundException'],
          modifier: ''
        }
      ],
      FieldTable: true,
      MethodTable: true
    }
  },
  methods: {
      showFieldTable(){
          this.FieldTable = !this.FieldTable
      },
      showMethodTable(){
          this.MethodTable = !this.MethodTable
      },

      /**
       * API
       */
      
      // 获取所有属性
      async getFields(){
          const res = await API.getFields()
          this.tableData = res
          console.log(res);
      },
      // 获取所有方法属性
      async getMethods(){
          const res = await API.getMethods()
          this.MethodsData = res

          console.log(res);
      },


  },
  mounted() {
    this.getFields();
    this.getMethods();
  },
}
</script>

<style>

h2 {
    text-align: center;
}

</style>