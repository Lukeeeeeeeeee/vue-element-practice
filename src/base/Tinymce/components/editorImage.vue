<template>
    <!-- 
        append-to-body  Dialog 自身是否插入至 body 元素上。
                        嵌套的 Dialog 必须指定该属性并赋值为 true
        visible         是否显示 Dialog，支持 .sync 修饰符
     -->
    <div class="upload-container">
        <el-button icon="el-icon-upload" size="mini"
            :style="{backgroundColor: color, borderColor: color}"
            @click="dialogVisible=true" type="primary">上传图片</el-button>
        <el-dialog append-to-body :visible.sync="dialogVisible">
            <!-- 
                action	        必选参数，上传的地址
                multiple	    是否支持多选文件
                file-list	    上传的文件列表, 例如: [{name: 'food.jpg', url: 'https://xxx.cdn.com/xxx.jpg'}]
                show-file-list	是否显示已上传文件列表
                list-type	    文件列表的类型(text/picture/picture-card)
                on-remove	    文件列表移除文件时的钩子
                on-success	    文件上传成功时的钩子
                before-upload	上传文件之前的钩子，参数为上传的文件，
                                若返回 false 或者返回 Promise 且被 reject，则停止上传。
             -->
            <el-upload class="editor-slide-upload" action="https://httpbin.org/post"
                :multiple="true" :file-list="fileList" :show-file-list="true"
                list-type="picture-card" :on-remove="handleRemove" :on-success="handleSuccess"
                :before-upload="beforeUpload">
                <el-button type="primary" size="small">点击上传</el-button>
            </el-upload>
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="handleSubmit">确 定</el-button>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'editorSlideUpload',
    props: {
        color: {
            type: String,
            default: '#1890ff'
        }
    },
    data() {
        return {
            dialogVisible: false,
            fileList: [],
            listObj: {}
        }
    },
    methods: {
        beforeUpload(file) {
            const _self = this;
            const _URL = window.URL || window.webkitURL;
            const fileName = file.uid;
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.src = _URL.createObjectURL(file)
                img.onload = function () {
                    _self.listObj[fileName] = { hasSuccess: false, uid: file.uid, width: this.width, height: this.height }
                }
                resolve(true)
            })
        },
        handleSuccess(response, file) {
            const uid = file.uid; // 获取时间戳
            const objKeyArr = Object.keys(this.listObj);
            console.log(this.listObj[objKeyArr])
            for (let i = 0, len = objKeyArr.length; i < len; i++) {
                if (this.listObj[objKeyArr[i]].uid === uid) {
                    this.listObj[objKeyArr[i]].url = response.files.file;
                    this.listObj[objKeyArr[i]].hasSuccess = true;
                    return
                }
            }
        },
        checkAllSuccess() {
            return Object.keys(this.listObj).every(item => this.listObj[item].hasSuccess);
        },
        handleSubmit() {
            const arr = Object.keys(this.listObj).map(v => this.listObj[v]);
            if (!this.checkAllSuccess()) {
                this.$message('请等待所有图片上传成功');
                return;
            }
            console.log(arr);
            this.$emit('successCBK', arr);
            this.listObj = {};
            this.fileList = [];
            this.dialogVisible = false;
        },
        handleRemove(response, file) {
            const uid = file.uid;
            const objKeyArr = Object.keys(this.listObj);
            for (let i = 0, len = objKeyArr.length; i < len; i++) {
                delete this.listObj[objKeyArr[i]];
                return;
            }
        }
    }
}
</script>

<style>
.editor-slide-upload .el-upload--picture-card {
    margin: 0 8px 8px 0;
}
</style>


