<template>
    <div class="mmi">
        <!-- 搜索 -->
        <div>
            <el-form :inline="true" :model="formInline" class="demo-form-inline" ref="formInline">
                <el-form-item label="书籍编号" prop="bookId">
                    <el-input v-model="formInline.bookId" placeholder="书籍编号"></el-input>
                </el-form-item>
                <el-form-item label="书籍名称" prop="bookName">
                    <el-input v-model="formInline.bookName" placeholder="书籍名称"></el-input>
                </el-form-item>
                <el-form-item label="书籍作者" prop="bookAuthor">
                    <el-input v-model="formInline.bookAuthor" placeholder="书籍作者"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" icon="el-icon-search" @click="searchFor">搜索</el-button>
                    <el-button type="Info" @click="resetForm('formInline')" icon="el-icon-refresh">重置</el-button>
                </el-form-item>
            </el-form>

            <el-row style="line-height: normal; text-align: left;">
                <el-button
                type="primary"
                plain size="small"
                icon="el-icon-plus" 
                @click="add()">新增</el-button>
                <el-button 
                type="danger" 
                plain size="small" 
                icon="el-icon-delete" 
                :disabled = "!buttons.dele"
                @click="deleteMore()">删除</el-button>
                
            </el-row>
            
            <!-- 新增 -->
            <el-dialog 
                class="dia" 
                title="书籍新增" 
                :visible.sync="dialogAddFormVisible"
                width="30%"
                >
                <el-form :model="diaform" :rules="rules">
                <el-form-item label="书籍编号" :label-width="formLabelWidth" prop="bookId">
                    <el-input v-model="diaform.bookId" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="书籍名称" :label-width="formLabelWidth" prop="bookName">
                    <el-input v-model="diaform.bookName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="书籍作者" :label-width="formLabelWidth" prop="bookAuthor">
                    <el-input v-model="diaform.bookAuthor" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="书籍数量" :label-width="formLabelWidth" prop="bookNumber">
                    <el-input v-model.number="diaform.bookNumber" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="书籍简介" :label-width="formLabelWidth" prop="bookProfile">
                    <el-input v-model="diaform.bookProfile" autocomplete="off" type="textarea"></el-input>
                </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                <el-button @click="dialogAddFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="addBooks()">确 定</el-button>
                </div>
            </el-dialog>

            <!-- 修改 -->
            <el-dialog 
                class="dia" 
                title="书籍修改" 
                :visible.sync="dialogChangeFormVisible"
                width="30%"
                >
                <el-form :model="diaChangeform" :rules="rules">
                <!-- <el-form-item label="书籍编号" :label-width="formLabelWidth">
                    <el-input v-model="diaform.bookId" autocomplete="off"></el-input>
                </el-form-item> -->
                <el-form-item label="书籍名称" :label-width="formLabelWidth" prop="bookName">
                    <el-input v-model="diaChangeform.bookName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="书籍作者" :label-width="formLabelWidth" prop="bookAuthor">
                    <el-input v-model="diaChangeform.bookAuthor" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="书籍数量" :label-width="formLabelWidth" prop="bookNumber">
                    <el-input v-model.number="diaChangeform.bookNumber" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="书籍简介" :label-width="formLabelWidth" prop="bookProfile">
                    <el-input v-model="diaChangeform.bookProfile" autocomplete="off" type="textarea"></el-input>
                </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                <el-button @click="dialogChangeFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="changeBooks()">确 定</el-button>
                </div>
            </el-dialog>

            <!-- 查看简介 -->
            <el-dialog 
                class="dia" 
                title="书籍简介查看" 
                :visible.sync="dialogViewFormVisible"
                width="30%"
                >
                
                <p style="line-height: 35px;">《{{this.diaViewform.bookName}}》</p>
                <p style="line-height: 35px;">作者：{{ this.diaViewform.bookAuthor }}</p>
                <p style="line-height: 35px;">作品简介：{{ this.diaViewform.bookProfile }}</p>

                <div slot="footer" class="dialog-footer">
                <el-button @click="dialogViewFormVisible = false">关闭</el-button>
                </div>
            </el-dialog>
            
        </div>
        <hr>
        
        <!-- 列表 -->
        <div>
            <el-table
                ref="multipleTable"
                :data="tableData"
                tooltip-effect="dark"
                height="600"
                style="width: 100% ;line-height: normal;"
                @selection-change="handleSelectionChange">
                <el-table-column
                type="selection"
                width="55">
                </el-table-column>
                <el-table-column
                label="书籍编号"
                width="220">
                <template slot-scope="scope">{{ scope.row.bookId }}</template>
                </el-table-column>
                <el-table-column
                prop="bookName"
                label="书籍名称"
                width="320">
                </el-table-column>
                
                <el-table-column
                prop="bookAuthor"
                label="书籍作者"
                width="220">
                </el-table-column>
                <el-table-column
                prop="bookNumber"
                label="书籍数量"
                width="220">
                </el-table-column>
                <el-table-column
                prop="insertDate"
                label="添加日期"
                width="220">
                </el-table-column>
                <el-table-column
                fixed="right"
                label="操作"
                width="250">
                <template slot-scope="scope">
                    <el-button type="text" size="medium" @click="CheckProfile(scope.row)">查看简介</el-button>
                    <el-button type="text" size="medium" @click="change(scope.row)">编辑</el-button>
                    <el-button @click="handleClick(scope.row)" type="text" size="medium">删除</el-button>
                </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
import * as API from '@/api/main'
export default {
    data() {
      return {
        // 书籍列表
        tableData: [
            {
              bookId: '1',
              bookName: '百年孤独',
              bookAuthor:'马尔克斯',
              bookNumber: 90,
              bookProfile: '从入门到放弃',
              insertDate: '2022-12-27',
            },
        ],
        // 检索
        formInline: {
            bookId: '',
            bookName: '',
            bookAuthor: '',
          
        },
        // 添加书籍的表单
        diaform: {
            bookId: '',
            bookName: '',
            bookAuthor: '',
            bookNumber: 1,
            bookProfile: '',
        },
        // 修改书籍的表单
        diaChangeform: {
            bookId: '',
            bookName: '',
            bookAuthor: '',
            bookNumber: 1,
            bookProfile: '',
        },
        // 展示概述
        diaViewform: {
            bookId: '',
            bookName: '',
            bookAuthor: '',
            bookProfile: '',
        },
        // 全局删除按钮
        buttons:{
            dele: false,
        },
        multipleSelection: [],
        // 表单固定宽度
        formLabelWidth: '120px',
        // 添加
        dialogAddFormVisible: false,
        dialogChangeFormVisible: false,
        dialogViewFormVisible: false,
        rules: {
            bookId: [
                { required: true, message: '请输入图书编号,范围在 100101-100999', trigger: 'blur' },
            ],
            bookName: [
                { required: true, message: '请输入图书名称', trigger: 'blur' },
            ],
            bookNumber: [
                { required: true, message: '请输入图书编号,范围在10010之上', trigger: 'blur' },
                {type: 'number', message: '数量不能小于0'}
            ],

        }
      }
    },
    methods: {
        // 搜索
        searchFor() {
            console.log('submit!');
            this.getBooks();
        },
         // 重置表单
        resetForm(formName) {
            if (this.$refs[formName]!== undefined) {
                this.$refs[formName].resetFields();
            }
        },
        // 多选框的选择
        handleSelectionChange(val) {
            this.multipleSelection = val;
            console.log(val);
            // console.log(val.length);
            if(!this.buttons.dele || val.length > 0)
                this.buttons.dele = true;
            else this.buttons.dele = false;
        },
        // 多个删除
        deleteMore(){
            for(let i = 0 ;i < this.multipleSelection.length; i++){
                this.deleteBook(this.multipleSelection[i].bookId);
            }
            this.getAllBook();
        },
        
        // 删除操作 
        handleClick(row) {
            this.deleteBook(row.bookId);
            this.getAllBook();
            // this.Deleteclassify(deleteID);
            // this.Getclassifies()
        },
        // 查看简介
        CheckProfile(row){
            this.diaViewform.bookId = row.bookId;
            this.getBookProfile();
            this.dialogViewFormVisible = true;
        },
        // 新增书籍
        addBooks(){
            this.addBook();
            this.dialogAddFormVisible = false;
            
        },
        // 新增dialog打开
        add(){
            this.dialogAddFormVisible = true;
        },
        // 修改dialog打开
        change(row){
            this.dialogChangeFormVisible = true
            this.diaChangeform.bookId = row.bookId
            this.diaChangeform.bookName = row.bookName
            this.diaChangeform.bookAuthor = row.bookAuthor
            this.diaChangeform.bookNumber = row.bookNumber
            this.diaChangeform.bookProfile = row.bookProfile
        },
        changeBooks(){
            this.changeBook();
            // this.getAllBook(); 
            this.dialogChangeFormVisible = false;       
        },


        /**
         * API
         */
        
        // 获取所有图书
        async getAllBook(){
            const res = await API.getAllBook()
            this.tableData = res
            for(let i = 0;i < res.length ; i++){
                this.tableData[i].bookName = "《" + this.tableData[i].bookName + "》"
            }
            console.log(this.tableData);
            console.log(res);
        },

        // 检索获取图书
        async getBooks(){
            
            const res = await API.getBooks({
                bookId: this.formInline.bookId,
                bookName: this.formInline.bookName,
                bookAuthor: this.formInline.bookAuthor
            })
            this.tableData = res
            for(let i = 0;i < res.length ; i++){
                this.tableData[i].bookName = "《" + this.tableData[i].bookName + "》"
            }
            console.log(this.tableData);
            console.log(res);
        },
        // 检索获取图书
        async getBookProfile(){
            
            const res = await API.getBooks({
                bookId: this.diaViewform.bookId,
                bookName: this.formInline.bookName,
                bookAuthor: this.formInline.bookAuthor
            })
            this.diaViewform.bookName = res[0].bookName
            this.diaViewform.bookAuthor = res[0].bookAuthor
            this.diaViewform.bookProfile = res[0].bookProfile
            console.log(res[0]);
        },

        // 添加图书
        async addBook(){
            const res = await API.addBook({
                bookId: this.diaform.bookId,
                bookName: this.diaform.bookName,
                bookAuthor: this.diaform.bookAuthor,
                bookNumber: this.diaform.bookNumber,
                bookProfile: this.diaform.bookProfile,
            })
            this.getAllBook();
            console.log(res);
        },
        

        // 删除图书
        async deleteBook(bookId){
            const res = await API.deleteBook({
                bookId: bookId,
            })
            console.log(res);
        },

        // 修改图书
        async changeBook(){
            const res = await API.changeBook({
                bookId: this.diaChangeform.bookId,
                bookName: this.diaChangeform.bookName,
                bookAuthor: this.diaChangeform.bookAuthor,
                bookNumber: this.diaChangeform.bookNumber,
                bookProfile: this.diaChangeform.bookProfile,
            })
            this.getAllBook();
            console.log(res);
        },
        
    },
    mounted() {
        this.getAllBook();
    }
}
</script>

<style  scoped>
.header {
    margin-top: 50px;
    margin-left: 100px;
    font-size: 24px;
    font-weight: bolder;
}
.mmi {
    
    padding-left: 100px;
}
</style>